import React, {useEffect, useState} from 'react';
import PropTypes from 'prop-types';
import ContentWrapper from 'Components/Layout/ContentWrapper';
import { Prompt, withRouter } from 'react-router';
import {
    Row,
    Card,
    CardHeader,
    CardBody,
    FormGroup,
    Input,
    Button } from 'reactstrap';
import FormValidator from 'Components/FormValidator';
import { ACTIVE, GT_COVER_CO, PASSIVE, ERROR_MESSAGES, ROLES } from 'AppConstants';

import './edit.scss';
import { compose } from 'recompose';
import { connect } from 'react-redux';
import { createGTCoverCO, getGTCoverCO, updateGTCoverCO, getAllCourseOutcomes, getAllGradingTools, getAllGTCoverCO } from 'Actions';
import PopoverModal from 'Components/PopoverModal';
import { isUpdated } from 'Utils';

const GTCoverCOEdit = (props) => {
    const {match, history, gtcco={course_outcome_id: '', grading_tool_id: ''}, departments, courses, programOutcomes, courseOutcomes, gtccoList, gradingTools} = props;
    
    const [isNew, setIsNew] = useState(true)
    const [form, setForm] = useState({course_outcome_id: '', grading_tool_id: ''})

    const [flag, setFlag] = useState(false)
    const [successFlag, setSuccessFlag] = useState(false)
    const [isModalOpen, setIsModalOpen] = useState(false)

    useEffect(() => {
        const id = match.params.id
        const courseId = match.params.courseId
        courseId && props.getAllCourseOutcomes(courseId)
        courseId && props.getAllGradingTools(null, courseId)
        courseId && props.getAllGTCoverCO(courseId)
        if(id){ 
            setIsNew(false)
            props.getGTCoverCO(id)
        }
        else setIsNew(true)
    }, [match])

    useEffect(() => {
        if(!isNew) {
            const tempFormObj = {}
            Object.keys(form).map(field => tempFormObj[field] = gtcco[field] || '')
            setForm({...tempFormObj})
        }
    }, [gtcco, isNew])

    const handleModalState = () => {
        setSuccessFlag(false)
        setIsModalOpen(!isModalOpen)
    }

    const validateOnChange = event => {
        const input = event.target;
        const value = input.type === 'checkbox' ? input.checked : input.value;
        const result = FormValidator.validate(input);
        setForm({
            ...form,
            [input.name]: value,
            errors: {
                ...form.errors,
                [input.name]: result
            }
        });
    }

    const onSubmit = e => {
        e.preventDefault();
        !flag && setFlag(true)
        const form_object = e.target;
        const inputs = [...form_object.elements].filter(i => ['INPUT', 'SELECT'].includes(i.nodeName))

        const { errors, hasError } = FormValidator.bulkValidate(inputs)
        setForm({
            ...form,
            errors
        });
        if(!hasError){
            setSuccessFlag(true)
            !isNew ? setIsModalOpen(true) : handleSubmit()
        }

    }

    const handleSubmit = () => {
        delete form.errors
        
        if(isNew){
            props.createGTCoverCO(form)
        } else {
            props.updateGTCoverCO(gtcco.id, form)
        }
        setIsModalOpen(false)
    }

    /* Simplify error check */
    const hasError = (inputName, method) => {
        return  form &&
                form.errors &&
                form.errors[inputName] &&
                form.errors[inputName][method]
    }

    const groupCOs = (d) => {
        d = d.sort(function(a, b) {
            const nameA = a.co_code.toUpperCase();
            const nameB = b.co_code.toUpperCase();
            if (nameA < nameB) return -1;
            else if (nameA > nameB) return 1;
            return 0;
        })
        let g = Object.entries(d.reduce((r,c)=>(r[c.co_code]=[...r[c.co_code]||[], c],r),{}))
        return g.reduce((r,c) => (r.children.push(
           {name: c[0], children: c[1]}), r),{name: "Children Array", children:[]})
    }

    const prompt = <Prompt
    when={isUpdated(form, gtcco) && !successFlag}
    message={ERROR_MESSAGES.unsaved}/>

    const gtOptions = gradingTools?.content?.map(gt=> {
        return <option key={gt.id} value={gt.id}>{`${gt.assessmentName} - ${gt.question_number}`}</option>
    })

    const coOptions = courseOutcomes?.content?.map(co=> {
        return <option key={co.id} value={co.id}>{`${co.code} - ${co.explanation}`}</option>
    })

    return (
        <>
        {prompt}
        <ContentWrapper>
            <div className="content-heading">
               {GT_COVER_CO.edit.pageName}
            </div>
            <Card className="card-page-title">
                <CardHeader className="card-header-title">
                    {isNew ? GT_COVER_CO.edit.createCardHeader : GT_COVER_CO.edit.editCardHeader}
                </CardHeader>
                <CardBody>
                <div>
                    <p>Dersin diğer GTCoverCO'ları</p>
                    <hr/>
                    <div className="gt-cover-co-edit__list">
                    {
                        groupCOs(gtccoList).children.map(item => {
                            return <div key={item.name}>
                                <b className="gt-cover-co-edit__list-title">{item.name}</b>
                                {item.children.map(gts => `${gts.assessment_name} - ${gts.question_number}`).join(", ")}
                            </div>
                        })
                    }
                    </div>
                </div>
                <hr/>
                <form className="form-horizontal gt-cover-co-edit__form" onSubmit={onSubmit}>
                    <Row>
                        <div className="col-md-10 col-xl-5 col-xl-6">
                        <fieldset>
                            <FormGroup row>
                                <label className="col-md-2 col-form-label">{GT_COVER_CO.edit.formFields.courseOutcome}</label>
                                <div className="col-md-10">
                                    <select name="course_outcome_id" 
                                        value={form.course_outcome_id || ''} 
                                        className="custom-select custom-select-sm" 
                                        onChange={validateOnChange}
                                    >
                                        <option disabled value="">Ders Çıktısı Seçiniz</option>
                                        {coOptions}
                                    </select>
                                </div>
                            </FormGroup>
                        </fieldset>
                        </div>
                        
                        <div className="col-md-10 col-xl-5 col-xl-6">
                        <fieldset>
                            <FormGroup row>
                                <label className="col-md-2 col-form-label">{GT_COVER_CO.edit.formFields.gradingTool}</label>
                                <div className="col-md-10">
                                    <select name="grading_tool_id" 
                                        value={form.grading_tool_id || ''} 
                                        className="custom-select custom-select-sm" 
                                        onChange={validateOnChange}
                                    >
                                        <option disabled value="">Değerlendirme Aracı Seçiniz</option>
                                        {gtOptions}
                                    </select>
                                </div>
                            </FormGroup>
                        </fieldset>
                        </div>

                    </Row>
                    <PopoverModal
                        content={GT_COVER_CO.modals.edit}
                        toggleModal={isModalOpen}
                        handleToggleModal={handleModalState}
                        handleAction={handleSubmit}
                        interceptorState={setSuccessFlag}
                    />
                    <Button color="primary" type="submit" disabled={!isUpdated(form, gtcco)}>{isNew ? GT_COVER_CO.edit.sendButton.new : GT_COVER_CO.edit.sendButton.edit}</Button>
                </form>
            </CardBody>
        </Card>
    </ContentWrapper>
    </>
    );
};


GTCoverCOEdit.propTypes = {

};

const mapStateToProps = state => ({
    gtcco: state.gtcco.gtcco,
    gtccoList: state.gtcco.gtccoList,
    departments: state.departments.departments,
    programOutcomes: state.programOutcomes.programOutcomes,
    courses: state.courses.courses,
    courseOutcomes: state.courseOutcomes.courseOutcomes,
    gradingTools: state.gradingTools.gradingTools
});
const mapDispatchToProps = dispatch => ({ 
    getGTCoverCO: (id)=>{
        dispatch(getGTCoverCO(id))
    },
    updateGTCoverCO: (id, gtcco)=>{
        dispatch(updateGTCoverCO(id, gtcco))
    },
    createGTCoverCO: (gtcco)=>{
        dispatch(createGTCoverCO(gtcco))
    },
    getAllCourseOutcomes: (course_id) => {
        dispatch(getAllCourseOutcomes(course_id))
    },
    getAllGradingTools: (assessment_id, course_id) => {
        dispatch(getAllGradingTools(assessment_id, course_id))
    },
    getAllGTCoverCO: (course_id) => {
        dispatch(getAllGTCoverCO(null, course_id))
    }
});

export default compose(withRouter, connect(mapStateToProps, mapDispatchToProps))(GTCoverCOEdit);

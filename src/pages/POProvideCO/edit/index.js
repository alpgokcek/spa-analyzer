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
import { ACTIVE, PO_PROVIDE_CO, PASSIVE, ERROR_MESSAGES, ROLES } from 'AppConstants';

import './edit.scss';
import { compose } from 'recompose';
import { connect } from 'react-redux';
import { createPOProvideCO, getPOProvideCO, updatePOProvideCO, getAllCourseOutcomes, getAllProgramOutcomes, getAllPOProvideCO, getAllDepartments } from 'Actions';
import PopoverModal from 'Components/PopoverModal';
import { isUpdated } from 'Utils';

const POProvideCOEdit = (props) => {
    const {match, history, popco={course_outcome_id: '', program_outcome_id: ''}, programOutcomes, courseOutcomes, popcoList, departments} = props;
    
    const [isNew, setIsNew] = useState(true)
    const [form, setForm] = useState({course_outcome_id: '', program_outcome_id: ''})
    const [formExternal, setFormExternal] = useState({po_department_id: ''})

    const [flag, setFlag] = useState(false)
    const [successFlag, setSuccessFlag] = useState(false)
    const [isModalOpen, setIsModalOpen] = useState(false)

    useEffect(() => {
        const id = match.params.id
        const courseId = match.params.courseId
        props.getAllDepartments()
        courseId && props.getAllCourseOutcomes(courseId)
        courseId && props.getAllPOProvideCO(courseId)
        if(id){ 
            setIsNew(false)
            props.getPOProvideCO(id)
        }
        else setIsNew(true)
    }, [match])

    useEffect(() => {
        if(!isNew) {
            const tempFormObj = {}
            Object.keys(form).map(field => tempFormObj[field] = popco[field] || '')
            setForm({...tempFormObj})
            setFormExternal({po_department_id:popco.department_id})
        }
    }, [popco, isNew])

    useEffect(() => {
        formExternal.po_department_id && props.getAllProgramOutcomes(formExternal.po_department_id)
    }, [formExternal.po_department_id])

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
            props.createPOProvideCO(form)
        } else {
            props.updatePOProvideCO(popco.id, form)
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
    when={isUpdated(form, popco) && !successFlag}
    message={ERROR_MESSAGES.unsaved}/>

    const departmentOptions = departments?.content?.map(department=> {
        return <option key={department.id} value={department.id}>{department.name}</option>
    })

    const poOptions = programOutcomes?.content?.map(po=> {
        return <option key={po.id} value={po.id}>{`${po.code} - ${po.explanation}`}</option>
    })

    const coOptions = courseOutcomes?.content?.map(co=> {
        return <option key={co.id} value={co.id}>{`${co.code} - ${co.explanation}`}</option>
    })

    return (
        <>
        {prompt}
        <ContentWrapper>
            <div className="content-heading">
               {PO_PROVIDE_CO.edit.pageName}
            </div>
            <Card className="card-page-title">
                <CardHeader className="card-header-title">
                    {isNew ? PO_PROVIDE_CO.edit.createCardHeader : PO_PROVIDE_CO.edit.editCardHeader}
                </CardHeader>
                <CardBody>
                <div>
                    <p>Dersin diğer POProvideCO'ları</p>
                    <hr/>
                    <div className="po-provide-co-edit__list">
                    {
                        groupCOs(popcoList).children.map(item => {
                            return <div key={item.name}>
                                <b className="po-provide-co-edit__list-title">{item.name}</b>
                                {item.children.map(pos => `${pos.po_code}`).join(", ")}
                            </div>
                        })
                    }
                    </div>
                </div>
                <hr/>
                <form className="form-horizontal po-provide-co-edit__form" onSubmit={onSubmit}>
                    <Row>
                    <div className="col-md-10 col-xl-5 col-xl-6">
                        <fieldset>
                            <FormGroup row>
                                <label className="col-md-2 col-form-label">{PO_PROVIDE_CO.edit.formFields.department}</label>
                                <div className="col-md-10">
                                    <select name="po_department_id" 
                                        value={formExternal.po_department_id || ''} 
                                        className="custom-select custom-select-sm" 
                                        onChange={e=>setFormExternal({...formExternal, po_department_id:e.target.value})}
                                    >
                                        <option disabled value="">Departman Seçiniz</option>
                                        {departmentOptions}
                                    </select>
                                </div>
                            </FormGroup>
                        </fieldset>
                        </div>
                        { formExternal.po_department_id &&
                        <div className="col-md-10 col-xl-5 col-xl-6">
                        <fieldset>
                            <FormGroup row>
                                <label className="col-md-2 col-form-label">{PO_PROVIDE_CO.edit.formFields.programOutcome}</label>
                                <div className="col-md-10">
                                    <select name="program_outcome_id" 
                                        value={form.program_outcome_id || ''} 
                                        className="custom-select custom-select-sm" 
                                        onChange={validateOnChange}
                                    >
                                        <option disabled value="">Program Çıktısı Seçiniz</option>
                                        {poOptions}
                                    </select>
                                </div>
                            </FormGroup>
                        </fieldset>
                        </div>
                        }
                        <div className="col-md-10 col-xl-5 col-xl-6">
                        <fieldset>
                            <FormGroup row>
                                <label className="col-md-2 col-form-label">{PO_PROVIDE_CO.edit.formFields.courseOutcome}</label>
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
                    </Row>
                    <PopoverModal
                        content={PO_PROVIDE_CO.modals.edit}
                        toggleModal={isModalOpen}
                        handleToggleModal={handleModalState}
                        handleAction={handleSubmit}
                        interceptorState={setSuccessFlag}
                    />
                    <Button color="primary" type="submit" disabled={!isUpdated(form, popco)}>{isNew ? PO_PROVIDE_CO.edit.sendButton.new : PO_PROVIDE_CO.edit.sendButton.edit}</Button>
                </form>
            </CardBody>
        </Card>
    </ContentWrapper>
    </>
    );
};


POProvideCOEdit.propTypes = {

};

const mapStateToProps = state => ({
    popco: state.popco.popco,
    popcoList: state.popco.popcoList,
    departments: state.departments.departments,
    programOutcomes: state.programOutcomes.programOutcomes,
    courseOutcomes: state.courseOutcomes.courseOutcomes
});
const mapDispatchToProps = dispatch => ({ 
    getPOProvideCO: (id)=>{
        dispatch(getPOProvideCO(id))
    },
    updatePOProvideCO: (id, popco)=>{
        dispatch(updatePOProvideCO(id, popco))
    },
    createPOProvideCO: (popco)=>{
        dispatch(createPOProvideCO(popco))
    },
    getAllCourseOutcomes: (course_id) => {
        dispatch(getAllCourseOutcomes(course_id))
    },
    getAllProgramOutcomes: (department_id) => {
        dispatch(getAllProgramOutcomes(department_id))
    },
    getAllPOProvideCO: (course_id) => {
        dispatch(getAllPOProvideCO(null, course_id))
    },
    getAllDepartments: () => {
        dispatch(getAllDepartments())
    },
});

export default compose(withRouter, connect(mapStateToProps, mapDispatchToProps))(POProvideCOEdit);

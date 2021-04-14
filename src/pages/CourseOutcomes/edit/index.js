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
import { ACTIVE, COURSE_OUTCOMES, PASSIVE, ERROR_MESSAGES } from 'AppConstants';

import './edit.scss';
import { compose } from 'recompose';
import { connect } from 'react-redux';
import { createCourseOutcome, getCourseOutcome, updateCourseOutcome, getAllCourses, getAllProgramOutcomes } from 'Actions';
import PopoverModal from 'Components/PopoverModal';
import { isUpdated } from 'Utils';

const CourseOutcomeEdit = (props) => {
    const {match, history, courseOutcome={code: '', course_id: '', explanation: '', measured_average: '', survey_average: '', department_id: ''}, courses, programOutcomes} = props;

    const [isNew, setIsNew] = useState(true)
    const [form, setForm] = useState({code: '', course_id: '', explanation: '', measured_average: '0', survey_average: '0', department_id: ''})
    const [flag, setFlag] = useState(false)
    const [successFlag, setSuccessFlag] = useState(false)
    const [isModalOpen, setIsModalOpen] = useState(false)

    useEffect(() => {
        const id = match.params.id
        props.getAllCourses()
        if(id){ 
            setIsNew(false)
            props.getCourseOutcome(id)
        }
        else setIsNew(true)
    }, [match])

    useEffect(() => {
        if(!isNew) {
            const tempFormObj = {}
            Object.keys(form).map(field => tempFormObj[field] = courseOutcome[field] || '0')
            setForm({...tempFormObj})
        }        
    }, [courseOutcome, isNew])

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
            props.createCourseOutcome(form)
        } else {
            props.updateCourseOutcome(courseOutcome.id, form)
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

    const courseOptions = courses?.content?.map(course=> {
        return <option key={course.id} value={course.id}>{course.title}</option>
    })


    return (
        <>
        <ContentWrapper>
            <div className="content-heading">
               {COURSE_OUTCOMES.edit.pageName}
            </div>
            <Card className="card-page-title">
                <CardHeader className="card-header-title">
                    {isNew ? COURSE_OUTCOMES.edit.createCardHeader : COURSE_OUTCOMES.edit.editCardHeader}
                </CardHeader>
                <CardBody>
                <form className="form-horizontal" onSubmit={onSubmit}>
                    <Row>
                        <div className="col-md-10 col-xl-5 col-xl-6">
                        <fieldset>
                            <FormGroup row>
                                <label className="col-md-2 col-form-label">{COURSE_OUTCOMES.edit.formFields.code}</label>
                                <div className="col-md-10">
                                    <Input type="text" 
                                        name="code"
                                        onChange={validateOnChange}
                                        invalid={hasError('code','len')}
                                        data-validate='["len"]'
                                        data-param="[2,250]"
                                        value={form.code}
                                    />
                                    { hasError('code','len') && <span className="invalid-feedback">{ERROR_MESSAGES.lengthRange(2, 250)}</span> }
                                </div>
                            </FormGroup>
                        </fieldset>
                        </div>
                        <div className="col-md-10 col-xl-5 col-xl-6">
                        <fieldset>
                            <FormGroup row>
                                <label className="col-md-2 col-form-label">{COURSE_OUTCOMES.edit.formFields.explanation}</label>
                                <div className="col-md-10">
                                    <Input type="text" 
                                        name="explanation"
                                        onChange={validateOnChange}
                                        invalid={hasError('explanation','len')}
                                        data-validate='["len"]'
                                        data-param="[2,250]"
                                        value={form.explanation}
                                    />
                                    { hasError('explanation','len') && <span className="invalid-feedback">{ERROR_MESSAGES.lengthRange(2, 250)}</span> }
                                </div>
                            </FormGroup>
                        </fieldset>
                        </div>
                        <div className="col-md-10 col-xl-5 col-xl-6">
                        <fieldset>
                            <FormGroup row>
                                <label className="col-md-2 col-form-label">{COURSE_OUTCOMES.edit.formFields.measured_average}</label>
                                <div className="col-md-10">
                                    <Input type="text" 
                                        name="measured_average"
                                        onChange={validateOnChange}
                                        invalid={hasError('measured_average','len')}
                                        data-validate='["len"]'
                                        data-param="[1,12]"
                                        value={form.measured_average}
                                    />
                                    { hasError('measured_average','len') && <span className="invalid-feedback">{ERROR_MESSAGES.lengthRange(1, 12)}</span> }
                                </div>
                            </FormGroup>
                        </fieldset>
                        </div>
                        <div className="col-md-10 col-xl-5 col-xl-6">
                        <fieldset>
                            <FormGroup row>
                                <label className="col-md-2 col-form-label">{COURSE_OUTCOMES.edit.formFields.survey_average}</label>
                                <div className="col-md-10">
                                    <Input type="text" 
                                        name="survey_average"
                                        onChange={validateOnChange}
                                        invalid={hasError('survey_average','len')}
                                        data-validate='["len"]'
                                        data-param="[1,12]"
                                        value={form.survey_average}
                                    />
                                    { hasError('survey_average','len') && <span className="invalid-feedback">{ERROR_MESSAGES.lengthRange(1, 12)}</span> }
                                </div>
                            </FormGroup>
                        </fieldset>
                        </div>
                        <div className="col-md-10 col-xl-5 col-xl-6">
                        <fieldset>
                            <FormGroup row>
                                <label className="col-md-2 col-form-label">{COURSE_OUTCOMES.edit.formFields.course}</label>
                                <div className="col-md-10">
                                    <select name="course_id" 
                                        value={form.course_id || ''} 
                                        className="custom-select custom-select-sm" 
                                        onChange={validateOnChange}
                                        data-validate='["required"]'
                                    >
                                        <option disabled value="">Ders Seçiniz</option>
                                        {courseOptions}
                                    </select>
                                    { hasError('course_id','required') && <div className="user-edit-invalid-field">{ERROR_MESSAGES.required}</div> }
                                </div>
                            </FormGroup>
                        </fieldset>
                        </div>
                    </Row>
                    <PopoverModal
                        content={COURSE_OUTCOMES.modals.edit}
                        toggleModal={isModalOpen}
                        handleToggleModal={handleModalState}
                        handleAction={handleSubmit}
                        interceptorState={setSuccessFlag}
                    />
                    <Button color="primary" type="submit" >{isNew ? COURSE_OUTCOMES.edit.sendButton.new : COURSE_OUTCOMES.edit.sendButton.edit}</Button>
                </form>
            </CardBody>
        </Card>
    </ContentWrapper>
    </>
    );
};


CourseOutcomeEdit.propTypes = {

};

const mapStateToProps = state => ({
    courseOutcome: state.courseOutcomes.courseOutcome,
    programOutcomes: state.programOutcomes.programOutcomes,
    courses: state.courses.courses
});
const mapDispatchToProps = dispatch => ({ 
    getCourseOutcome: (id)=>{
        dispatch(getCourseOutcome(id))
    },
    updateCourseOutcome: (id, courseOutcome)=>{
        dispatch(updateCourseOutcome(id, courseOutcome))
    },
    createCourseOutcome: (courseOutcome)=>{
        dispatch(createCourseOutcome(courseOutcome))
    },
    getAllCourses: ()=>{
        dispatch(getAllCourses())
    },
    getAllProgramOutcomes: (department_id) => {
        getAllProgramOutcomes(department_id)
    }
});

export default compose(withRouter, connect(mapStateToProps, mapDispatchToProps))(CourseOutcomeEdit);

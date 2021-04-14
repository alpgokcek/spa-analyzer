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
import { ACTIVE, ASSESSMENTS, PASSIVE, ERROR_MESSAGES } from 'AppConstants';

import './edit.scss';
import { compose } from 'recompose';
import { connect } from 'react-redux';
import { createAssessment, getAssessment, updateAssessment, getAllCourses } from 'Actions';
import PopoverModal from 'Components/PopoverModal';
import { isUpdated } from 'Utils';

const AssessmentEdit = (props) => {
    const {match, history, assessment={name: '', course_id: '', percentage: ''}, courses} = props;

    const [isNew, setIsNew] = useState(true)
    const [form, setForm] = useState({name: '', course_id: '', percentage: ''})
    const [flag, setFlag] = useState(false)
    const [successFlag, setSuccessFlag] = useState(false)
    const [isModalOpen, setIsModalOpen] = useState(false)

    useEffect(() => {
        const id = match.params.id
        props.getAllCourses()
        if(id){ 
            setIsNew(false)
            props.getAssessment(id)
        }
        else setIsNew(true)
    }, [match])

    useEffect(() => {
        if(!isNew) {
            const tempFormObj = {}
            Object.keys(form).map(field => tempFormObj[field] = assessment[field] || '')
            setForm({...tempFormObj})
        }
    }, [assessment, isNew])

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

    const handleStatusChange = (newValue) => setForm({...form, status: newValue})

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
            props.createAssessment(form)
        } else {
            props.updateAssessment(assessment.id, form)
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

    const prompt = <Prompt
    when={isUpdated(form, assessment) && !successFlag}
    message={ERROR_MESSAGES.unsaved}/>

    const courseOptions = courses?.content?.map(course=> {
        return <option key={course.id} value={course.id}>{course.title}</option>
    })


    return (
        <>
        {prompt}
        <ContentWrapper>
            <div className="content-heading">
               {ASSESSMENTS.edit.pageName}
            </div>
            <Card className="card-page-title">
                <CardHeader className="card-header-title">
                    {isNew ? ASSESSMENTS.edit.createCardHeader : ASSESSMENTS.edit.editCardHeader}
                </CardHeader>
                <CardBody>
                <form className="form-horizontal" onSubmit={onSubmit}>
                    <Row>
                        <div className="col-md-10 col-xl-5 col-xl-6">
                        <fieldset>
                            <FormGroup row>
                                <label className="col-md-2 col-form-label">{ASSESSMENTS.edit.formFields.name}</label>
                                <div className="col-md-10">
                                    <Input type="text" 
                                        name="name"
                                        onChange={validateOnChange}
                                        invalid={hasError('name','len')}
                                        data-validate='["len"]'
                                        data-param="[2,250]"
                                        value={form.name}
                                    />
                                    { hasError('name','len') && <span className="invalid-feedback">{ERROR_MESSAGES.lengthRange(2, 250)}</span> }
                                </div>
                            </FormGroup>
                        </fieldset>
                        </div>
                        <div className="col-md-10 col-xl-5 col-xl-6">
                        <fieldset>
                            <FormGroup row>
                                <label className="col-md-2 col-form-label">{ASSESSMENTS.edit.formFields.percentage}</label>
                                <div className="col-md-10">
                                    <Input type="text" 
                                        name="percentage"
                                        onChange={validateOnChange}
                                        invalid={hasError('percentage','len')}
                                        data-validate='["len"]'
                                        data-param="[1,3]"
                                        value={form.percentage}
                                    />
                                    { hasError('percentage','len') && <span className="invalid-feedback">{ERROR_MESSAGES.lengthRange(1, 3)}</span> }
                                </div>
                            </FormGroup>
                        </fieldset>
                        </div>
                        <div className="col-md-10 col-xl-5 col-xl-6">
                        <fieldset>
                            <FormGroup row>
                                <label className="col-md-2 col-form-label">{ASSESSMENTS.edit.formFields.course}</label>
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
                        content={ASSESSMENTS.modals.edit}
                        toggleModal={isModalOpen}
                        handleToggleModal={handleModalState}
                        handleAction={handleSubmit}
                        interceptorState={setSuccessFlag}
                    />
                    <Button color="primary" type="submit" disabled={!isUpdated(form, assessment)}>{isNew ? ASSESSMENTS.edit.sendButton.new : ASSESSMENTS.edit.sendButton.edit}</Button>
                </form>
            </CardBody>
        </Card>
    </ContentWrapper>
    </>
    );
};


AssessmentEdit.propTypes = {

};

const mapStateToProps = state => ({
    assessment: state.assessments.assessment,
    courses: state.courses.courses
});
const mapDispatchToProps = dispatch => ({ 
    getAssessment: (id)=>{
        dispatch(getAssessment(id))
    },
    updateAssessment: (id, assessment)=>{
        dispatch(updateAssessment(id, assessment))
    },
    createAssessment: (assessment)=>{
        dispatch(createAssessment(assessment))
    },
    getAllCourses: ()=>{
        dispatch(getAllCourses())
    }
});

export default compose(withRouter, connect(mapStateToProps, mapDispatchToProps))(AssessmentEdit);

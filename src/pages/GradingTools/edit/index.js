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
import { ACTIVE, GRADING_TOOLS, PASSIVE, ERROR_MESSAGES } from 'AppConstants';

import './edit.scss';
import { compose } from 'recompose';
import { connect } from 'react-redux';
import { createGradingTool, getGradingTool, updateGradingTool, getAllAssessments } from 'Actions';
import PopoverModal from 'Components/PopoverModal';
import { isUpdated } from 'Utils';

const GradingToolEdit = (props) => {
    const {match, history, gradingTool={question_number: '', assessment_id: '', percentage: ''}, assessments} = props;

    const [isNew, setIsNew] = useState(true)
    const [form, setForm] = useState({question_number: '', assessment_id: '', percentage: ''})
    const [flag, setFlag] = useState(false)
    const [successFlag, setSuccessFlag] = useState(false)
    const [isModalOpen, setIsModalOpen] = useState(false)

    useEffect(() => {
        const id = match.params.id
        props.getAllAssessments(match.params.courseId)
        if(id){ 
            setIsNew(false)
            props.getGradingTool(id)
        }
        else setIsNew(true)
    }, [match])

    useEffect(() => {
        if(!isNew) {
            const tempFormObj = {}
            Object.keys(form).map(field => tempFormObj[field] = gradingTool[field] || '')
            setForm({...tempFormObj})
        }
    }, [gradingTool, isNew])

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
            props.createGradingTool(match.params.courseId, form)
        } else {
            props.updateGradingTool(match.params.courseId, gradingTool.id, form)
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
    when={isUpdated(form, gradingTool) && !successFlag}
    message={ERROR_MESSAGES.unsaved}/>

    const assessmentOptions = assessments?.content?.map(assessment=> {
        return <option key={assessment.id} value={assessment.id}>{assessment.name}</option>
    })


    return (
        <>
        {prompt}
        <ContentWrapper>
            <div className="content-heading">
               {GRADING_TOOLS.edit.pageName}
            </div>
            <Card className="card-page-title">
                <CardHeader className="card-header-title">
                    {isNew ? GRADING_TOOLS.edit.createCardHeader : GRADING_TOOLS.edit.editCardHeader}
                </CardHeader>
                <CardBody>
                <form className="form-horizontal" onSubmit={onSubmit}>
                    <Row>
                        <div className="col-md-10 col-xl-5 col-xl-6">
                        <fieldset>
                            <FormGroup row>
                                <label className="col-md-2 col-form-label">{GRADING_TOOLS.edit.formFields.name}</label>
                                <div className="col-md-10">
                                    <Input type="text" 
                                        name="question_number"
                                        onChange={validateOnChange}
                                        invalid={hasError('question_number','len')}
                                        data-validate='["len"]'
                                        data-param="[1,250]"
                                        value={form.question_number}
                                    />
                                    { hasError('question_number','len') && <span className="invalid-feedback">{ERROR_MESSAGES.lengthRange(1, 250)}</span> }
                                </div>
                            </FormGroup>
                        </fieldset>
                        </div>
                        <div className="col-md-10 col-xl-5 col-xl-6">
                        <fieldset>
                            <FormGroup row>
                                <label className="col-md-2 col-form-label">{GRADING_TOOLS.edit.formFields.percentage}</label>
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
                                <label className="col-md-2 col-form-label">{GRADING_TOOLS.edit.formFields.assessment}</label>
                                <div className="col-md-10">
                                    <select name="assessment_id" 
                                        value={form.assessment_id || ''} 
                                        className="custom-select custom-select-sm" 
                                        onChange={validateOnChange}
                                        data-validate='["required"]'
                                    >
                                        <option disabled value="">Değerlendirme Seçiniz</option>
                                        {assessmentOptions}
                                    </select>
                                    { hasError('assessment_id','required') && <div className="user-edit-invalid-field">{ERROR_MESSAGES.required}</div> }
                                </div>
                            </FormGroup>
                        </fieldset>
                        </div>
                    </Row>
                    <PopoverModal
                        content={GRADING_TOOLS.modals.edit}
                        toggleModal={isModalOpen}
                        handleToggleModal={handleModalState}
                        handleAction={handleSubmit}
                        interceptorState={setSuccessFlag}
                    />
                    <Button color="primary" type="submit" disabled={!isUpdated(form, gradingTool)}>{isNew ? GRADING_TOOLS.edit.sendButton.new : GRADING_TOOLS.edit.sendButton.edit}</Button>
                </form>
            </CardBody>
        </Card>
    </ContentWrapper>
    </>
    );
};


GradingToolEdit.propTypes = {

};

const mapStateToProps = state => ({
    gradingTool: state.gradingTools.gradingTool,
    assessments: state.assessments.assessments
});
const mapDispatchToProps = dispatch => ({ 
    getGradingTool: (id)=>{
        dispatch(getGradingTool(id))
    },
    updateGradingTool: (courseId, id, gradingTool)=>{
        dispatch(updateGradingTool(courseId, id, gradingTool))
    },
    createGradingTool: (courseId, gradingTool)=>{
        dispatch(createGradingTool(courseId, gradingTool))
    },
    getAllAssessments: (courseId)=>{
        dispatch(getAllAssessments(courseId))
    }
});

export default compose(withRouter, connect(mapStateToProps, mapDispatchToProps))(GradingToolEdit);

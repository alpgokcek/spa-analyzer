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
import { ACTIVE, SECTIONS, PASSIVE, ERROR_MESSAGES } from 'AppConstants';

import './edit.scss';
import { compose } from 'recompose';
import { connect } from 'react-redux';
import { createSection, getSection, updateSection, getAllCourses } from 'Actions';
import PopoverModal from 'Components/PopoverModal';
import { isUpdated } from 'Utils';

const SectionEdit = (props) => {
    const {match, history, section={ title: '', status: ACTIVE, course_id: '', is_file_uploaded: PASSIVE }, courses} = props;

    const [isNew, setIsNew] = useState(true)
    const [form, setForm] = useState({title: '', status: ACTIVE, course_id: '', is_file_uploaded: PASSIVE})
    const [flag, setFlag] = useState(false)
    const [successFlag, setSuccessFlag] = useState(false)
    const [isModalOpen, setIsModalOpen] = useState(false)

    useEffect(() => {
        const courseId = match.params.courseId
        setForm({...form, course_id: courseId})
        const id = match.params.id
        props.getAllCourses()
        if(id){ 
            setIsNew(false)
            props.getSection(id)
        }
        else setIsNew(true)
    }, [match])

    useEffect(() => {
        if(!isNew) {
            const tempFormObj = {}
            Object.keys(form).map(field => tempFormObj[field] = section[field] === 0  ? 0 : (section[field] || '0'))
            setForm({...tempFormObj})
        }
    }, [section, isNew])

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
            props.createSection(form)
        } else {
            props.updateSection(section.id, form)
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
    when={isUpdated(form, section) && !successFlag}
    message={ERROR_MESSAGES.unsaved}/>

    const courseOptions = courses?.content?.map(course=> {
        return <option key={course.id} value={course.id}>{course.title}</option>
    })


    return (
        <>
        {prompt}
        <ContentWrapper>
            <div className="content-heading">
               {SECTIONS.edit.pageName}
            </div>
            <Card className="card-page-title">
                <CardHeader className="card-header-title">
                    {isNew ? SECTIONS.edit.createCardHeader : SECTIONS.edit.editCardHeader}
                </CardHeader>
                <CardBody>
                <form className="form-horizontal" onSubmit={onSubmit}>
                    <Row>
                        <div className="col-md-10 col-xl-5 col-xl-6">
                        <fieldset>
                            <FormGroup row>
                                <label className="col-md-2 col-form-label">{SECTIONS.edit.formFields.name}</label>
                                <div className="col-md-10">
                                    <Input type="text" 
                                        name="title"
                                        onChange={validateOnChange}
                                        invalid={hasError('title','len')}
                                        data-validate='["len"]'
                                        data-param="[2,250]"
                                        value={form.title}
                                    />
                                    { hasError('title','len') && <span className="invalid-feedback">{ERROR_MESSAGES.lengthRange(2, 250)}</span> }
                                </div>
                            </FormGroup>
                        </fieldset>
                        </div>
                        <div className="col-md-10 col-xl-5 col-xl-6">
                        <fieldset>
                            <FormGroup row>
                                <label className="col-md-2 col-form-label">{SECTIONS.edit.formFields.course}</label>
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
                        { !isNew && <>
                        <div className="col-md-10 col-xl-5 col-xl-6">
                        <fieldset>
                            <FormGroup row>
                                <label className="col-md-2 col-form-label">{SECTIONS.edit.formFields.status}</label>
                                <div className="col-md-10 user-edit__radio">
                                        <label className="c-radio">
                                        <Input id="status-active" type="radio" name="status" checked={form.status === ACTIVE} onChange={(e)=>handleStatusChange(ACTIVE)}/>
                                        <span className="fa fa-circle"></span>Aktif</label>
                                        <label className="c-radio ml-4">
                                        <Input id="status-passive" type="radio" name="status" checked={form.status === PASSIVE} onChange={(e)=>handleStatusChange(PASSIVE)}/>
                                        <span className="fa fa-circle"></span>Pasif</label>
                                </div>
                            </FormGroup>
                        </fieldset>
                        </div>
                        <div className="col-md-10 col-xl-5 col-xl-6">
                        <fieldset>
                            <FormGroup row>
                                <label className="col-md-2 col-form-label">{SECTIONS.edit.formFields.is_file_uploaded}</label>
                                <div className="col-md-10 user-edit__radio">
                                        <label className="c-radio">
                                        <Input id="status-active" type="radio" name="is_file_uploaded" checked={form.is_file_uploaded === ACTIVE} disabled/>
                                        <span className="fa fa-circle"></span>Yüklendi</label>
                                        <label className="c-radio ml-4">
                                        <Input id="status-passive" type="radio" name="is_file_uploaded" checked={form.is_file_uploaded === PASSIVE} disabled/>
                                        <span className="fa fa-circle"></span>Yüklenmedi</label>
                                </div>
                            </FormGroup>
                        </fieldset>
                        </div>
                        </>
                        }
                    </Row>
                    <PopoverModal
                        content={SECTIONS.modals.edit}
                        toggleModal={isModalOpen}
                        handleToggleModal={handleModalState}
                        handleAction={handleSubmit}
                        interceptorState={setSuccessFlag}
                    />
                    <Button color="primary" type="submit" disabled={!isUpdated(form, section)}>{isNew ? SECTIONS.edit.sendButton.new : SECTIONS.edit.sendButton.edit}</Button>
                </form>
            </CardBody>
        </Card>
    </ContentWrapper>
    </>
    );
};


SectionEdit.propTypes = {

};

const mapStateToProps = state => ({
    section: state.sections.section,
    courses: state.courses.courses
});
const mapDispatchToProps = dispatch => ({ 
    getSection: (id)=>{
        dispatch(getSection(id))
    },
    updateSection: (id, section)=>{
        dispatch(updateSection(id, section))
    },
    createSection: (section)=>{
        dispatch(createSection(section))
    },
    getAllCourses: ()=>{
        dispatch(getAllCourses())
    }
});

export default compose(withRouter, connect(mapStateToProps, mapDispatchToProps))(SectionEdit);

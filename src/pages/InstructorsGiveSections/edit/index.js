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
import { ACTIVE, INSTRUCTORS_GIVE_SECTIONS, PASSIVE, ERROR_MESSAGES, ROLES } from 'AppConstants';

import './edit.scss';
import { compose } from 'recompose';
import { connect } from 'react-redux';
import { createInstructorsGiveSections, getInstructorsGiveSections, updateInstructorsGiveSections, getAllDepartments, getAllUsers, getAllCourses, getAllSections } from 'Actions';
import PopoverModal from 'Components/PopoverModal';
import { isUpdated } from 'Utils';

const InstructorsGiveSectionsEdit = (props) => {
    const {match, history, instructorsGiveSections={instructor_id: '', section_id: ''}, departments, instructors, courses, sections} = props;

    const [isNew, setIsNew] = useState(true)
    const [form, setForm] = useState({instructor_id: '', section_id: ''})
    const [formExternal, setFormExternal] = useState({instructor_department_id: '', course_section_id: ''})

    const [flag, setFlag] = useState(false)
    const [successFlag, setSuccessFlag] = useState(false)
    const [isModalOpen, setIsModalOpen] = useState(false)

    useEffect(() => {
        const id = match.params.id
        props.getAllDepartments()
        props.getAllCourses()
        if(id){ 
            setIsNew(false)
            props.getInstructorsGiveSections(id)
        }
        else setIsNew(true)
    }, [match])

    useEffect(() => {
        if(!isNew) {
            const tempFormObj = {}
            Object.keys(form).map(field => tempFormObj[field] = instructorsGiveSections[field] || '')
            setForm({...tempFormObj})
            setFormExternal({instructor_department_id:instructorsGiveSections.department_id, course_section_id: instructorsGiveSections.course_id})
        }
    }, [instructorsGiveSections, isNew])

    useEffect(() => {
        formExternal.instructor_department_id && props.getAllUsers(formExternal.instructor_department_id, ROLES.INSTRUCTOR)
    }, [formExternal.instructor_department_id])

    useEffect(() => {
        formExternal.course_section_id && props.getAllSections(formExternal.course_section_id)
    }, [formExternal.course_section_id])

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
            props.createInstructorsGiveSections(form)
        } else {
            props.updateInstructorsGiveSections(instructorsGiveSections.id, form)
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
    when={isUpdated(form, instructorsGiveSections) && !successFlag}
    message={ERROR_MESSAGES.unsaved}/>

    const departmentOptions = departments?.content?.map(department=> {
        return <option key={department.id} value={department.id}>{department.name}</option>
    })

    const instructorOptions = instructors?.content?.map(instructor=> {
        return <option key={instructor.id} value={instructor.id}>{instructor.name}</option>
    })

    const courseOptions = courses?.content?.map(course=> {
        return <option key={course.id} value={course.id}>{`${course.title} - ${course.year_and_term}`}</option>
    })

    const sectionOptions = sections?.content?.map(section=> {
        return <option key={section.id} value={section.id}>{section.title}</option>
    })

    return (
        <>
        {prompt}
        <ContentWrapper>
            <div className="content-heading">
               {INSTRUCTORS_GIVE_SECTIONS.edit.pageName}
            </div>
            <Card className="card-page-title">
                <CardHeader className="card-header-title">
                    {isNew ? INSTRUCTORS_GIVE_SECTIONS.edit.createCardHeader : INSTRUCTORS_GIVE_SECTIONS.edit.editCardHeader}
                </CardHeader>
                <CardBody>
                <form className="form-horizontal" onSubmit={onSubmit}>
                    <Row>
                    <div className="col-md-10 col-xl-5 col-xl-6">
                        <fieldset>
                            <FormGroup row>
                                <label className="col-md-2 col-form-label">{INSTRUCTORS_GIVE_SECTIONS.edit.formFields.course}</label>
                                <div className="col-md-10">
                                    <select name="course_section_id" 
                                        value={formExternal.course_section_id || ''} 
                                        className="custom-select custom-select-sm" 
                                        onChange={e=>setFormExternal({...formExternal, course_section_id:e.target.value})}
                                    >
                                        <option disabled value="">Ders Seçiniz</option>
                                        {courseOptions}
                                    </select>
                                </div>
                            </FormGroup>
                        </fieldset>
                        </div>
                        { formExternal.course_section_id &&
                        <div className="col-md-10 col-xl-5 col-xl-6">
                        <fieldset>
                            <FormGroup row>
                                <label className="col-md-2 col-form-label">{INSTRUCTORS_GIVE_SECTIONS.edit.formFields.section}</label>
                                <div className="col-md-10">
                                    <select name="section_id" 
                                        value={form.section_id || ''} 
                                        className="custom-select custom-select-sm" 
                                        onChange={validateOnChange}
                                    >
                                        <option disabled value="">Ders Grubu Seçiniz</option>
                                        {sectionOptions}
                                    </select>
                                </div>
                            </FormGroup>
                        </fieldset>
                        </div>
                        }
                        <div className="col-md-10 col-xl-5 col-xl-6">
                        <fieldset>
                            <FormGroup row>
                                <label className="col-md-2 col-form-label">{INSTRUCTORS_GIVE_SECTIONS.edit.formFields.department}</label>
                                <div className="col-md-10">
                                    <select name="instructor_department_id" 
                                        value={formExternal.instructor_department_id || ''} 
                                        className="custom-select custom-select-sm" 
                                        onChange={e=>setFormExternal({...formExternal, instructor_department_id:e.target.value})}
                                    >
                                        <option disabled value="">Departman Seçiniz</option>
                                        {departmentOptions}
                                    </select>
                                </div>
                            </FormGroup>
                        </fieldset>
                        </div>
                        { formExternal.instructor_department_id &&
                        <div className="col-md-10 col-xl-5 col-xl-6">
                        <fieldset>
                            <FormGroup row>
                                <label className="col-md-2 col-form-label">{INSTRUCTORS_GIVE_SECTIONS.edit.formFields.instructor}</label>
                                <div className="col-md-10">
                                    <select name="instructor_id" 
                                        value={form.instructor_id || ''} 
                                        className="custom-select custom-select-sm" 
                                        onChange={validateOnChange}
                                    >
                                        <option disabled value="">Öğretim Görevlisi Seçiniz</option>
                                        {instructorOptions}
                                    </select>
                                </div>
                            </FormGroup>
                        </fieldset>
                        </div>
                        }
                    </Row>
                    <PopoverModal
                        content={INSTRUCTORS_GIVE_SECTIONS.modals.edit}
                        toggleModal={isModalOpen}
                        handleToggleModal={handleModalState}
                        handleAction={handleSubmit}
                        interceptorState={setSuccessFlag}
                    />
                    <Button color="primary" type="submit" disabled={!isUpdated(form, instructorsGiveSections)}>{isNew ? INSTRUCTORS_GIVE_SECTIONS.edit.sendButton.new : INSTRUCTORS_GIVE_SECTIONS.edit.sendButton.edit}</Button>
                </form>
            </CardBody>
        </Card>
    </ContentWrapper>
    </>
    );
};


InstructorsGiveSectionsEdit.propTypes = {

};

const mapStateToProps = state => ({
    instructorsGiveSections: state.instructorsGiveSections.instructorsGiveSections,
    departments: state.departments.departments,
    instructors: state.users.users,
    courses: state.courses.courses,
    sections: state.sections.sections
});
const mapDispatchToProps = dispatch => ({ 
    getInstructorsGiveSections: (id)=>{
        dispatch(getInstructorsGiveSections(id))
    },
    updateInstructorsGiveSections: (id, instructorsGiveSections)=>{
        dispatch(updateInstructorsGiveSections(id, instructorsGiveSections))
    },
    createInstructorsGiveSections: (instructorsGiveSections)=>{
        dispatch(createInstructorsGiveSections(instructorsGiveSections))
    },
    getAllDepartments: ()=>{
        dispatch(getAllDepartments())
    },
    getAllUsers: (department_id, user_type) => {
        dispatch(getAllUsers(department_id, user_type))
    },
    getAllCourses: ()=>{
        dispatch(getAllCourses())
    },
    getAllSections: (course_id) => {
        dispatch(getAllSections(course_id))
    }
});

export default compose(withRouter, connect(mapStateToProps, mapDispatchToProps))(InstructorsGiveSectionsEdit);

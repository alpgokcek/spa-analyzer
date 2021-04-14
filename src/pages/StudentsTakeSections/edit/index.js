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
import { ACTIVE, STUDENTS_TAKE_SECTIONS, PASSIVE, ERROR_MESSAGES, ROLES } from 'AppConstants';

import './edit.scss';
import { compose } from 'recompose';
import { connect } from 'react-redux';
import { createStudentsTakeSections, getStudentsTakeSections, updateStudentsTakeSections, getAllDepartments, getAllUsers, getAllCourses, getAllSections } from 'Actions';
import PopoverModal from 'Components/PopoverModal';
import { isUpdated } from 'Utils';

const StudentsTakeSectionsEdit = (props) => {
    const {match, history, studentsTakeSections={student_id: '', section_id: '', letter_grade: '', average: ''}, departments, students, courses, sections} = props;

    const [isNew, setIsNew] = useState(true)
    const [form, setForm] = useState({student_id: '', section_id: '', letter_grade: '', average: ''})
    const [formExternal, setFormExternal] = useState({student_department_id: '', course_section_id: ''})

    const [flag, setFlag] = useState(false)
    const [successFlag, setSuccessFlag] = useState(false)
    const [isModalOpen, setIsModalOpen] = useState(false)

    useEffect(() => {
        const id = match.params.id
        props.getAllDepartments()
        props.getAllCourses()
        if(id){ 
            setIsNew(false)
            props.getStudentsTakeSections(id)
        }
        else setIsNew(true)
    }, [match])

    useEffect(() => {
        if(!isNew) {
            const tempFormObj = {}
            Object.keys(form).map(field => tempFormObj[field] = studentsTakeSections[field] || '')
            setForm({...tempFormObj})
            setFormExternal({student_department_id:studentsTakeSections.department_id, course_section_id: studentsTakeSections.course_id})
        }
    }, [studentsTakeSections, isNew])

    useEffect(() => {
        props.getAllUsers(formExternal.student_department_id, ROLES.STUDENT)
    }, [formExternal.student_department_id])

    useEffect(() => {
        props.getAllSections(formExternal.course_section_id)
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
            props.createStudentsTakeSections(form)
        } else {
            props.updateStudentsTakeSections(studentsTakeSections.id, form)
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
    when={isUpdated(form, studentsTakeSections) && !successFlag}
    message={ERROR_MESSAGES.unsaved}/>

    const departmentOptions = departments?.content?.map(department=> {
        return <option key={department.id} value={department.id}>{department.name}</option>
    })

    const studentOptions = students?.content?.map(student=> {
        return <option key={student.studentID} value={student.studentID}>{student.name}</option>
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
               {STUDENTS_TAKE_SECTIONS.edit.pageName}
            </div>
            <Card className="card-page-title">
                <CardHeader className="card-header-title">
                    {isNew ? STUDENTS_TAKE_SECTIONS.edit.createCardHeader : STUDENTS_TAKE_SECTIONS.edit.editCardHeader}
                </CardHeader>
                <CardBody>
                <form className="form-horizontal" onSubmit={onSubmit}>
                    <Row>
                    <div className="col-md-10 col-xl-5 col-xl-6">
                        <fieldset>
                            <FormGroup row>
                                <label className="col-md-2 col-form-label">{STUDENTS_TAKE_SECTIONS.edit.formFields.course}</label>
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
                                <label className="col-md-2 col-form-label">{STUDENTS_TAKE_SECTIONS.edit.formFields.section}</label>
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
                                <label className="col-md-2 col-form-label">{STUDENTS_TAKE_SECTIONS.edit.formFields.department}</label>
                                <div className="col-md-10">
                                    <select name="student_department_id" 
                                        value={formExternal.student_department_id || ''} 
                                        className="custom-select custom-select-sm" 
                                        onChange={e=>setFormExternal({...formExternal, student_department_id:e.target.value})}
                                    >
                                        <option disabled value="">Departman Seçiniz</option>
                                        {departmentOptions}
                                    </select>
                                </div>
                            </FormGroup>
                        </fieldset>
                        </div>
                        { formExternal.student_department_id &&
                        <div className="col-md-10 col-xl-5 col-xl-6">
                        <fieldset>
                            <FormGroup row>
                                <label className="col-md-2 col-form-label">{STUDENTS_TAKE_SECTIONS.edit.formFields.student}</label>
                                <div className="col-md-10">
                                    <select name="student_id" 
                                        value={form.student_id || ''} 
                                        className="custom-select custom-select-sm" 
                                        onChange={validateOnChange}
                                    >
                                        <option disabled value="">Öğrenci Seçiniz</option>
                                        {studentOptions}
                                    </select>
                                </div>
                            </FormGroup>
                        </fieldset>
                        </div>
                        }
                        <div className="col-md-10 col-xl-5 col-xl-6">
                        <fieldset>
                            <FormGroup row>
                                <label className="col-md-2 col-form-label">{STUDENTS_TAKE_SECTIONS.edit.formFields.average}</label>
                                <div className="col-md-10">
                                    <Input type="text" 
                                        name="average"
                                        onChange={validateOnChange}
                                        invalid={hasError('average','len')}
                                        data-validate='["len"]'
                                        data-param="[1,10]"
                                        value={form.average}
                                    />
                                    { hasError('average','len') && <span className="invalid-feedback">{ERROR_MESSAGES.lengthRange(1, 10)}</span> }
                                </div>
                            </FormGroup>
                        </fieldset>
                        </div>
                        <div className="col-md-10 col-xl-5 col-xl-6">
                        <fieldset>
                            <FormGroup row>
                                <label className="col-md-2 col-form-label">{STUDENTS_TAKE_SECTIONS.edit.formFields.letter_grade}</label>
                                <div className="col-md-10">
                                    <Input type="text" 
                                        name="letter_grade"
                                        onChange={validateOnChange}
                                        invalid={hasError('letter_grade','len')}
                                        data-validate='["len"]'
                                        data-param="[1,5]"
                                        placeholder="I"
                                        value={form.letter_grade}
                                    />
                                    { hasError('letter_grade','len') && <span className="invalid-feedback">{ERROR_MESSAGES.lengthRange(1, 5)}</span> }
                                </div>
                            </FormGroup>
                        </fieldset>
                        </div>
                    </Row>
                    <PopoverModal
                        content={STUDENTS_TAKE_SECTIONS.modals.edit}
                        toggleModal={isModalOpen}
                        handleToggleModal={handleModalState}
                        handleAction={handleSubmit}
                        interceptorState={setSuccessFlag}
                    />
                    <Button color="primary" type="submit" disabled={!isUpdated(form, studentsTakeSections)}>{isNew ? STUDENTS_TAKE_SECTIONS.edit.sendButton.new : STUDENTS_TAKE_SECTIONS.edit.sendButton.edit}</Button>
                </form>
            </CardBody>
        </Card>
    </ContentWrapper>
    </>
    );
};


StudentsTakeSectionsEdit.propTypes = {

};

const mapStateToProps = state => ({
    studentsTakeSections: state.studentsTakeSections.studentsTakeSections,
    departments: state.departments.departments,
    students: state.users.users,
    courses: state.courses.courses,
    sections: state.sections.sections
});
const mapDispatchToProps = dispatch => ({ 
    getStudentsTakeSections: (id)=>{
        dispatch(getStudentsTakeSections(id))
    },
    updateStudentsTakeSections: (id, studentsTakeSections)=>{
        dispatch(updateStudentsTakeSections(id, studentsTakeSections))
    },
    createStudentsTakeSections: (studentsTakeSections)=>{
        dispatch(createStudentsTakeSections(studentsTakeSections))
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

export default compose(withRouter, connect(mapStateToProps, mapDispatchToProps))(StudentsTakeSectionsEdit);

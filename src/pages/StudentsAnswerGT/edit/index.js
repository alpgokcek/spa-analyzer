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
import { ACTIVE, STUDENTS_ANSWER_GT, PASSIVE, ERROR_MESSAGES, ROLES } from 'AppConstants';

import './edit.scss';
import { compose } from 'recompose';
import { connect } from 'react-redux';
import { createStudentsAnswerGT, getStudentsAnswerGT, updateStudentsAnswerGT, getAllDepartments, getAllUsers, getAllCourses, getAllGradingTools, getAllAssessments } from 'Actions';
import PopoverModal from 'Components/PopoverModal';
import { isUpdated } from 'Utils';

const StudentsAnswerGTEdit = (props) => {
    const {match, history, sagt={student_id: '', grading_tool_id: '', grade: ''}, departments, courses, students, sagtList, gradingTools, assessments} = props;
    const [isNew, setIsNew] = useState(true)
    const [form, setForm] = useState({student_id: '', grading_tool_id: '', grade: ''})
    const [formExternal, setFormExternal] = useState({gt_assessment_id: '', student_department_id: ''})

    const [flag, setFlag] = useState(false)
    const [successFlag, setSuccessFlag] = useState(false)
    const [isModalOpen, setIsModalOpen] = useState(false)

    useEffect(() => {
        const id = match.params.id
        const courseId = match.params.courseId
        props.getAllDepartments()
        props.getAllAssessments(courseId)
        if(id){ 
            setIsNew(false)
            props.getStudentsAnswerGT(id)
        }
        else setIsNew(true)
    }, [match])

    useEffect(() => {
        if(!isNew) {
            const tempFormObj = {}
            Object.keys(form).map(field => tempFormObj[field] = sagt[field] || '0')
            setForm({...tempFormObj})
            setFormExternal({student_department_id:sagt.department_id, gt_assessment_id: sagt.assessment_id})
        }
    }, [sagt, isNew])

    useEffect(() => {
        formExternal.student_department_id &&  props.getAllUsers(formExternal.student_department_id, ROLES.STUDENT)
    }, [formExternal.student_department_id])
    /*
    useEffect(() => {
        const obj = { };

        if(students){
           obj.
        }
        setFormExternal({student_department_id:sagt.department_id, gt_assessment_id: sagt.assessment_id})

    }, [students, gradingTools])
    */

    useEffect(() => {
        formExternal.gt_assessment_id && props.getAllGradingTools(formExternal.gt_assessment_id)
    }, [formExternal.gt_assessment_id])

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
            props.createStudentsAnswerGT(form)
        } else {
            props.updateStudentsAnswerGT(sagt.id, form)
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
    when={isUpdated(form, sagt) && !successFlag}
    message={ERROR_MESSAGES.unsaved}/>

    const departmentOptions = departments?.content?.map(department=> {
        return <option key={department.id} value={department.id}>{department.name}</option>
    })

    const studentOptions = students?.content?.map(std=> {
        return <option key={std.id} value={std.studentID}>{`${std.studentID} - ${std.name}`}</option>
    })

    const assessmentOptions = assessments?.content?.map(item=> {
        return <option key={item.id} value={item.id}>{`${item.name} - %${item.percentage}`}</option>
    })

    const gtOptions = gradingTools?.content?.map(item=> {
        return <option key={item.id} value={item.id}>{`${item.question_number} - %${item.percentage}`}</option>
    })

    return (
        <>
        {prompt}
        <ContentWrapper>
            <div className="content-heading">
               {STUDENTS_ANSWER_GT.edit.pageName}
            </div>
            <Card className="card-page-title">
                <CardHeader className="card-header-title">
                    {isNew ? STUDENTS_ANSWER_GT.edit.createCardHeader : STUDENTS_ANSWER_GT.edit.editCardHeader}
                </CardHeader>
                <CardBody>
                <form className="form-horizontal" onSubmit={onSubmit}>
                    <Row>
                    <div className="col-md-10 col-xl-5 col-xl-6">
                        <fieldset>
                            <FormGroup row>
                                <label className="col-md-2 col-form-label">{STUDENTS_ANSWER_GT.edit.formFields.assessment}</label>
                                <div className="col-md-10">
                                    <select name="gt_assessment_id" 
                                        value={formExternal.gt_assessment_id || ''} 
                                        className="custom-select custom-select-sm" 
                                        onChange={e=>setFormExternal({...formExternal, gt_assessment_id:e.target.value})}
                                    >
                                        <option disabled value="">Değerlendirme Seçiniz</option>
                                        {assessmentOptions}
                                    </select>
                                </div>
                            </FormGroup>
                        </fieldset>
                        </div>
                        { formExternal.gt_assessment_id &&
                        <div className="col-md-10 col-xl-5 col-xl-6">
                        <fieldset>
                            <FormGroup row>
                                <label className="col-md-2 col-form-label">{STUDENTS_ANSWER_GT.edit.formFields.gradingTool}</label>
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
                        }
                        <div className="col-md-10 col-xl-5 col-xl-6">
                        <fieldset>
                            <FormGroup row>
                                <label className="col-md-2 col-form-label">{STUDENTS_ANSWER_GT.edit.formFields.department}</label>
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
                                <label className="col-md-2 col-form-label">{STUDENTS_ANSWER_GT.edit.formFields.student}</label>
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
                                    <label className="col-md-2 col-form-label">{STUDENTS_ANSWER_GT.edit.formFields.grade}</label>
                                    <div className="col-md-10">
                                        <Input type="text" 
                                            name="grade"
                                            onChange={validateOnChange}
                                            invalid={hasError('grade','len')}
                                            data-validate='["len"]'
                                            data-param="[1,10]"
                                            value={form.grade}
                                        />
                                        { hasError('grade','len') && <span className="invalid-feedback">{ERROR_MESSAGES.lengthRange(1, 10)}</span> }
                                    </div>
                                </FormGroup>
                            </fieldset>
                        </div>
                    </Row>
                    <PopoverModal
                        content={STUDENTS_ANSWER_GT.modals.edit}
                        toggleModal={isModalOpen}
                        handleToggleModal={handleModalState}
                        handleAction={handleSubmit}
                        interceptorState={setSuccessFlag}
                    />
                    <Button color="primary" type="submit" disabled={!isUpdated(form, sagt)}>{isNew ? STUDENTS_ANSWER_GT.edit.sendButton.new : STUDENTS_ANSWER_GT.edit.sendButton.edit}</Button>
                </form>
            </CardBody>
        </Card>
    </ContentWrapper>
    </>
    );
};


StudentsAnswerGTEdit.propTypes = {

};

const mapStateToProps = state => ({
    sagt: state.sagt.sagt,
    departments: state.departments.departments,
    courses: state.courses.courses,
    courseOutcomes: state.courseOutcomes.courseOutcomes,
    assessments: state.assessments.assessments,
    students: state.users.users,
    gradingTools: state.gradingTools.gradingTools

});
const mapDispatchToProps = dispatch => ({ 
    getStudentsAnswerGT: (id)=>{
        dispatch(getStudentsAnswerGT(id))
    },
    updateStudentsAnswerGT: (id, sagt)=>{
        dispatch(updateStudentsAnswerGT(id, sagt))
    },
    createStudentsAnswerGT: (sagt)=>{
        dispatch(createStudentsAnswerGT(sagt))
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
    getAllGradingTools: (assessment_id) => {
        dispatch(getAllGradingTools(assessment_id))
    },
    getAllAssessments: (course_id) => {
        dispatch(getAllAssessments(course_id))
    }
});

export default compose(withRouter, connect(mapStateToProps, mapDispatchToProps))(StudentsAnswerGTEdit);

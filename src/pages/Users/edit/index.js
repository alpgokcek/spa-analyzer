import React, {useEffect, useState} from 'react';
import PropTypes from 'prop-types';
import ContentWrapper from 'Components/Layout/ContentWrapper';
import { Prompt, withRouter } from 'react-router';
import { compose } from 'recompose';
import { connect } from 'react-redux';
import FormValidator from 'Components/FormValidator';
import { ACTIVE, USERS, PASSIVE, ROLES, ERROR_MESSAGES, LEVEL_TO_ROLE } from 'AppConstants';

import {
    Row,
    Card,
    CardHeader,
    CardBody,
    FormGroup,
    Input,
    Button} from 'reactstrap';
import { createUser, getUser, updateUser, getAllUniversities, getAllFaculties, getAllDepartments } from 'Actions';
import PopoverModal from 'Components/PopoverModal';

import './user-edit.scss';


const UserEdit = (props) => {
    const {match, history, user={api_token: "",department_id: "",email: "",faculty_id: "",level: "",name: "",phone: "",photo: "",student_id: "",university: ""}, universityList, facultiesList, departmentsList} = props;
    const [isNew, setIsNew] = useState(true)
    const [form, setForm] = useState({api_token: "",department_id: "",email: "",faculty_id: "",level: ROLES.STUDENT,name: "",phone: "",photo: "",student_id: "",university: ""})
    const [flag, setFlag] = useState(false)
    const [successFlag, setSuccessFlag] = useState(false)
    const [isModalOpen, setIsModalOpen] = useState(false)

    useEffect(() => {
        const id = match.params.id
        props.getAllUniversities()
        if(id){ 
            setIsNew(false)
            props.getUser(id)
        }
        else setIsNew(true)
    }, [match])

    useEffect(() => {
        props.getAllFaculties(form.university)
    }, [form.university])
    useEffect(() => {
        props.getAllDepartments(form.faculty_id)
    }, [form.faculty_id])

    useEffect(() => {
        if(!isNew) {
            const tempFormObj = {}
            Object.keys(form).map(field => tempFormObj[field] = user[field] || '')
            setForm({...tempFormObj})
        }
    }, [isNew, user])

    const handleModalState = () => {
        setSuccessFlag(false)
        setIsModalOpen(!isModalOpen)
    }

    const handleStatusChange = (newValue) => setForm({...form, level: newValue})

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
            const obj = {...form, password: form.email}
            props.createUser(obj)
        } else {
            props.updateUser(user.id, form)
        }
        setIsModalOpen(false)
    }

    const universityOptions = universityList.content?.map(university=> {
        return <option key={university.id} value={university.id}>{university.name}</option>
    })
    const facultiesOptions = facultiesList.content?.map(faculty=> {
        return <option key={faculty.id} value={faculty.id}>{faculty.title}</option>
    })
    const departmentsOptions = departmentsList.content?.map(department=> {
        return <option key={department.id} value={department.id}>{department.name}</option>
    })

    /* Simplify error check */
    const hasError = (inputName, method) => {
        return  form &&
                form.errors &&
                form.errors[inputName] &&
                form.errors[inputName][method]
    }

    return (
        <>
        <ContentWrapper>
            <div className="content-heading">
               {USERS.edit.pageName}
            </div>
            <Card className="card-page-title">
                <CardHeader className="card-header-title">
                    {isNew ? USERS.edit.createCardHeader : USERS.edit.editCardHeader}
                </CardHeader>
                <CardBody>
                <form className="form-horizontal" onSubmit={onSubmit}>
                    <Row>
                        <div className="col-md-10 col-xl-5 col-xl-6">
                        <fieldset>
                            <FormGroup row>
                                <label className="col-md-2 col-form-label">{USERS.edit.formFields.name}</label>
                                <div className="col-md-10">
                                    <Input type="text" 
                                        name="name"
                                        onChange={validateOnChange}
                                        invalid={hasError('name','len') || hasError('name','non-numeric')}
                                        data-validate='["len", "non-numeric"]'
                                        data-param="[2,30]"
                                        value={form.name}
                                    />
                                    { hasError('name','len') && <span className="invalid-feedback">{ERROR_MESSAGES.lengthRange(2, 30)}</span> }
                                    { hasError('name','non-numeric') && <span className="invalid-feedback">{ERROR_MESSAGES.valid}</span> }
                                </div>
                            </FormGroup>
                        </fieldset>
                        </div>

                        <div className="col-md-10 col-xl-5 col-xl-6">
                        <fieldset>
                            <FormGroup row>
                                <label className="col-md-2 col-form-label">{USERS.edit.formFields.email}</label>
                                <div className="col-md-10">
                                    <Input type="email" 
                                        name="email"
                                        invalid={hasError('email','required') || hasError('email','email')}
                                        data-validate='["required", "email"]'
                                        onChange={validateOnChange}
                                        value={form.email}
                                    />
                                    { hasError('email','required') && <span className="invalid-feedback">{ERROR_MESSAGES.required}</span> }
                                    { hasError('email','email') && <span className="invalid-feedback">{ERROR_MESSAGES.email}</span> }
                                </div>
                            </FormGroup>
                        </fieldset>
                        </div>
                    </Row>
                    <Row>
                    { form.level === ROLES.STUDENT &&
                    <div className="col-md-10 col-xl-5 col-xl-6">
                        <fieldset>
                            <FormGroup row>
                                <label className="col-md-2 col-form-label">{USERS.edit.formFields.student_id}</label>
                                <div className="col-md-10">
                                    <Input type="text" 
                                        name="student_id"
                                        onChange={validateOnChange}
                                        invalid={hasError('student_id','len')}
                                        data-validate='["len", "non-numeric"]'
                                        data-param="[0,30]"
                                        value={form.student_id}/>
                                    { hasError('student_id','len') && <span className="invalid-feedback">{ERROR_MESSAGES.lengthRange(0, 30)}</span> }
                                </div>
                            </FormGroup>
                        </fieldset>
                        </div>
                        }
                    </Row>
                    <Row>
                        <div className="col-md-10 col-xl-5 col-xl-6">
                        <fieldset>
                            <FormGroup row>
                                <label className="col-md-2 col-form-label">{USERS.edit.formFields.university}</label>
                                <div className="col-md-10">
                                    <select name="university"
                                        value={form.university || ''} 
                                        className="custom-select custom-select-sm" 
                                        onChange={validateOnChange}
                                        data-validate='["required"]'
                                    >
                                        <option disabled value="">Üniversite Seçiniz</option>
                                        {universityOptions}
                                    </select>
                                    { hasError('university','required') && <div className="user-edit-invalid-field">{ERROR_MESSAGES.required}</div> }
                                </div>
                            </FormGroup>
                        </fieldset>
                        </div>
                        <div className="col-md-10 col-xl-5 col-xl-6">
                       { form.university && ![ROLES.ADMIN].includes(form.level) &&
                        <fieldset>
                            <FormGroup row>
                                <label className="col-md-2 col-form-label">{USERS.edit.formFields.faculty_id}</label>
                                <div className="col-md-10">
                                    <select name="faculty_id"
                                        value={form.faculty_id || ''} 
                                        className="custom-select custom-select-sm" 
                                        onChange={validateOnChange}
                                        data-validate='["required"]'
                                    >
                                        <option disabled value="">Fakülte Seçiniz</option>
                                        {facultiesOptions}
                                    </select>
                                    { hasError('faculty_id','required') && <div className="user-edit-invalid-field">{ERROR_MESSAGES.required}</div> }
                                </div>
                            </FormGroup>
                        </fieldset>
                        }
                        </div>
                        <div className="col-md-10 col-xl-5 col-xl-6">
                        { form.faculty_id && ![ROLES.ADMIN, ROLES.DEAN].includes(form.level) &&
                        <fieldset>
                            <FormGroup row>
                                <label className="col-md-2 col-form-label">{USERS.edit.formFields.department_id}</label>
                                <div className="col-md-10">
                                    <select name="department_id"
                                        value={form.department_id || ''} 
                                        className="custom-select custom-select-sm" 
                                        onChange={validateOnChange}
                                        data-validate='["required"]'
                                    >
                                        <option disabled value="">Departman Seçiniz</option>
                                        {departmentsOptions}
                                    </select>
                                    { hasError('deparment_id','required') && <div className="user-edit-invalid-field">{ERROR_MESSAGES.required}</div> }
                                </div>
                            </FormGroup>
                        </fieldset>
                        }
                        </div>
                    </Row>
                    <Row>
                        <div className="col-md-10 col-xl-10 col-xl-6">
                        <fieldset>
                            <FormGroup row>
                                <label className="col-md-2 col-form-label">{USERS.edit.formFields.roles}</label>
                                <div className="col-md-10 user-edit__radio">
                                        <label className="c-radio">
                                        <Input id="status-active" type="radio" name="level" checked={form.level === ROLES.ADMIN} onChange={(e)=>handleStatusChange(ROLES.ADMIN)}/>
                                        <span className="fa fa-circle"></span>{LEVEL_TO_ROLE[ROLES.ADMIN]}</label>
                                        <label className="c-radio ml-1">
                                        <Input id="status-active" type="radio" name="level" checked={form.level === ROLES.RECTOR} onChange={(e)=>handleStatusChange(ROLES.RECTOR)}/>
                                        <span className="fa fa-circle"></span>{LEVEL_TO_ROLE[ROLES.RECTOR]}</label>
                                        <label className="c-radio ml-1">
                                        <Input id="status-active" type="radio" name="level" checked={form.level === ROLES.DEAN} onChange={(e)=>handleStatusChange(ROLES.DEAN)}/>
                                        <span className="fa fa-circle"></span>{LEVEL_TO_ROLE[ROLES.DEAN]}</label>
                                        <label className="c-radio ml-1">
                                        <Input id="status-active" type="radio" name="level" checked={form.level === ROLES.HEAD_OF_DEPARTMENT} onChange={(e)=>handleStatusChange(ROLES.HEAD_OF_DEPARTMENT)}/>
                                        <span className="fa fa-circle"></span>{LEVEL_TO_ROLE[ROLES.HEAD_OF_DEPARTMENT]}</label>
                                        <label className="c-radio ml-1">
                                        <Input id="status-active" type="radio" name="level" checked={form.level === ROLES.INSTRUCTOR} onChange={(e)=>handleStatusChange(ROLES.INSTRUCTOR)}/>
                                        <span className="fa fa-circle"></span>{LEVEL_TO_ROLE[ROLES.INSTRUCTOR]}</label>
                                        <label className="c-radio ml-1">
                                        <Input id="status-active" type="radio" name="level" checked={form.level === ROLES.STUDENT} onChange={(e)=>handleStatusChange(ROLES.STUDENT)}/>
                                        <span className="fa fa-circle"></span>{LEVEL_TO_ROLE[ROLES.STUDENT]}</label>
                                </div>
                            </FormGroup>
                        </fieldset>
                        </div>
                    </Row>
                    <PopoverModal
                        content={USERS.modals.edit}
                        toggleModal={isModalOpen}
                        handleToggleModal={handleModalState}
                        handleAction={handleSubmit}
                        interceptorState={setSuccessFlag}
                    />
                    <Button color="primary"
                    type="submit">{isNew ? USERS.edit.sendButton.new : USERS.edit.sendButton.edit}</Button>
                </form>
            </CardBody>
        </Card>
    </ContentWrapper>
    </>
    );
};



const mapStateToProps = state => ({
    user: state.users.user,
    universityList: state.universities.universities,
    facultiesList: state.faculties.faculties,
    departmentsList: state.departments.departments
});
const mapDispatchToProps = dispatch => ({ 
    getUser: (id)=>{
        dispatch(getUser(id))
    },
    updateUser: (id, user)=>{
        dispatch(updateUser(id, user))
    },
    createUser: (user)=>{
        dispatch(createUser(user))
    },
    getAllUniversities: ()=>{
        dispatch(getAllUniversities())
    },
    getAllFaculties: department_id => {
        dispatch(getAllFaculties(department_id))
    },
    getAllDepartments: facultyId => {
        dispatch(getAllDepartments(facultyId))
    }
});

export default compose(withRouter, connect(mapStateToProps, mapDispatchToProps))(UserEdit);

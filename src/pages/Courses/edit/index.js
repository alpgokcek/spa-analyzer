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
import { ACTIVE, COURSES, PASSIVE, ERROR_MESSAGES } from 'AppConstants';

import './edit.scss';
import { compose } from 'recompose';
import { connect } from 'react-redux';
import { createCourse, getCourse, updateCourse, getAllDepartments } from 'Actions';
import PopoverModal from 'Components/PopoverModal';
import { isUpdated } from 'Utils';

const CourseEdit = (props) => {
    const {match, history, course={title: '', department_id: '', code: '', year_and_term: '', credit: '', status: ACTIVE}, departments} = props;

    const [isNew, setIsNew] = useState(true)
    const [form, setForm] = useState({
        title: '',
        department_id: '',
        code: '',
        year_and_term: '',
        credit: '',
        status: ACTIVE
    })
    const [flag, setFlag] = useState(false)
    const [successFlag, setSuccessFlag] = useState(false)
    const [isModalOpen, setIsModalOpen] = useState(false)

    useEffect(() => {
        const id = match.params.id
        props.getAllDepartments()
        if(id){ 
            setIsNew(false)
            props.getCourse(id)
        }
        else setIsNew(true)
    }, [match])

    useEffect(() => {
        if(!isNew) {
            const tempFormObj = {}
            Object.keys(form).map(field => tempFormObj[field] = course[field] || '')
            setForm({...tempFormObj})
        }
    }, [course, isNew])

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
            props.createCourse(form)
        } else {
            props.updateCourse(course.id, form)
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
    when={isUpdated(form, course) && !successFlag}
    message={ERROR_MESSAGES.unsaved}/>

    const departmentOptions = departments?.content?.map(department=> {
        return <option key={department.id} value={department.id}>{department.name}</option>
    })


    return (
        <>
        {prompt}
        <ContentWrapper>
            <div className="content-heading">
               {COURSES.edit.pageName}
            </div>
            <Card className="card-page-title">
                <CardHeader className="card-header-title">
                    {isNew ? COURSES.edit.createCardHeader : COURSES.edit.editCardHeader}
                </CardHeader>
                <CardBody>
                <form className="form-horizontal" onSubmit={onSubmit}>
                    <Row>
                        <div className="col-md-10 col-xl-5 col-xl-6">
                        <fieldset>
                            <FormGroup row>
                                <label className="col-md-2 col-form-label">{COURSES.edit.formFields.name}</label>
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
                                <label className="col-md-2 col-form-label">{COURSES.edit.formFields.code}</label>
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
                                <label className="col-md-2 col-form-label">{COURSES.edit.formFields.year_and_term}</label>
                                <div className="col-md-10">
                                    <Input type="text" 
                                        name="year_and_term"
                                        onChange={validateOnChange}
                                        invalid={hasError('year_and_term','len')}
                                        placeholder="2019-2020-01"
                                        data-validate='["len"]'
                                        data-param="[12]"
                                        value={form.year_and_term}
                                    />
                                    { hasError('year_and_term','len') && <span className="invalid-feedback">{ERROR_MESSAGES.fixedLength(12)}</span> }
                                </div>
                            </FormGroup>
                        </fieldset>
                        </div>
                        <div className="col-md-10 col-xl-5 col-xl-6">
                        <fieldset>
                            <FormGroup row>
                                <label className="col-md-2 col-form-label">{COURSES.edit.formFields.credit}</label>
                                <div className="col-md-10">
                                    <Input type="text" 
                                        name="credit"
                                        onChange={validateOnChange}
                                        invalid={hasError('credit','len')}
                                        data-validate='["len"]'
                                        data-param="[1,2]"
                                        value={form.credit}
                                    />
                                    { hasError('credit','len') && <span className="invalid-feedback">{ERROR_MESSAGES.valid}</span> }
                                </div>
                            </FormGroup>
                        </fieldset>
                        </div>
                        <div className="col-md-10 col-xl-5 col-xl-6">
                        <fieldset>
                            <FormGroup row>
                                <label className="col-md-2 col-form-label">{COURSES.edit.formFields.department}</label>
                                <div className="col-md-10">
                                    <select name="department_id" 
                                        value={form.department_id || ''} 
                                        className="custom-select custom-select-sm" 
                                        onChange={validateOnChange}
                                        data-validate='["required"]'
                                    >
                                        <option disabled value="">Departman Seçiniz</option>
                                        {departmentOptions}
                                    </select>
                                    { hasError('department_id','required') && <div className="user-edit-invalid-field">{ERROR_MESSAGES.required}</div> }
                                </div>
                            </FormGroup>
                        </fieldset>
                        </div>
                        { !isNew &&
                        <div className="col-md-10 col-xl-5 col-xl-6">
                        <fieldset>
                            <FormGroup row>
                                <label className="col-md-2 col-form-label">{COURSES.edit.formFields.status}</label>
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
                        }
                    </Row>
                    <PopoverModal
                        content={COURSES.modals.edit}
                        toggleModal={isModalOpen}
                        handleToggleModal={handleModalState}
                        handleAction={handleSubmit}
                        interceptorState={setSuccessFlag}
                    />
                    <Button color="primary" type="submit" disabled={!isUpdated(form, course)}>{isNew ? COURSES.edit.sendButton.new : COURSES.edit.sendButton.edit}</Button>
                </form>
            </CardBody>
        </Card>
    </ContentWrapper>
    </>
    );
};


CourseEdit.propTypes = {

};

const mapStateToProps = state => ({
    course: state.courses.course,
    departments: state.departments.departments
});
const mapDispatchToProps = dispatch => ({ 
    getCourse: (id)=>{
        dispatch(getCourse(id))
    },
    updateCourse: (id, course)=>{
        dispatch(updateCourse(id, course))
    },
    createCourse: (course)=>{
        dispatch(createCourse(course))
    },
    getAllDepartments: ()=>{
        dispatch(getAllDepartments())
    }
});

export default compose(withRouter, connect(mapStateToProps, mapDispatchToProps))(CourseEdit);

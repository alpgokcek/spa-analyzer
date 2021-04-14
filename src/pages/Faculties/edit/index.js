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
import { ACTIVE, FACULTIES, PASSIVE, ERROR_MESSAGES } from 'AppConstants';

import './faculty-edit.scss';
import { compose } from 'recompose';
import { connect } from 'react-redux';
import { createFaculty, getFaculty, updateFaculty, getAllUniversities } from 'Actions';
import PopoverModal from 'Components/PopoverModal';
import { isUpdated } from 'Utils';

const FacultyEdit = (props) => {
    const {match, history, faculty={title: '', status: ACTIVE}, universities} = props;
    
    const [isNew, setIsNew] = useState(true)
    const [form, setForm] = useState({
        title: '',
        status: ACTIVE,
        university: 1
    })
    const [flag, setFlag] = useState(false)
    const [successFlag, setSuccessFlag] = useState(false)
    const [isModalOpen, setIsModalOpen] = useState(false)

    useEffect(() => {
        const id = match.params.id
        props.getAllUniversities()
        if(id){ 
            setIsNew(false)
            props.getFaculty(id)
        }
        else setIsNew(true)
    }, [match])

    useEffect(() => {
        if(!isNew) {
            const tempFormObj = {}
            Object.keys(form).map(field => tempFormObj[field] = faculty[field] || '')
            setForm({...tempFormObj})
        }
    }, [faculty, isNew])

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
            props.createFaculty(form)
        } else if(Object.keys(form).length !== 0){
            props.updateFaculty(faculty.id, form)
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
    when={isUpdated(form, faculty) && !successFlag}
    message={ERROR_MESSAGES.unsaved}/>



    const universityOptions = universities?.content?.map(uni=> {
        return <option key={uni.id} value={uni.id}>{uni.name}</option>
    })


    return (
        <>
        {prompt}
        <ContentWrapper>
            <div className="content-heading">
               {FACULTIES.edit.pageName}
            </div>
            <Card className="card-page-title">
                <CardHeader className="card-header-title">
                    {isNew ? FACULTIES.edit.createCardHeader : FACULTIES.edit.editCardHeader}
                </CardHeader>
                <CardBody>
                <form className="form-horizontal" onSubmit={onSubmit}>
                    <Row>
                        <div className="col-md-10 col-xl-5 col-xl-6">
                        <fieldset>
                            <FormGroup row>
                                <label className="col-md-2 col-form-label">{FACULTIES.edit.formFields.name}</label>
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
                                <label className="col-md-2 col-form-label">{FACULTIES.edit.formFields.university}</label>
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
                        { !isNew &&
                        <div className="col-md-10 col-xl-5 col-xl-6">
                        <fieldset>
                            <FormGroup row>
                                <label className="col-md-2 col-form-label">{FACULTIES.edit.formFields.status}</label>
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
                        content={FACULTIES.modals.edit}
                        toggleModal={isModalOpen}
                        handleToggleModal={handleModalState}
                        handleAction={handleSubmit}
                        interceptorState={setSuccessFlag}
                    />
                    <Button color="primary" type="submit" disabled={!isUpdated(form, faculty)}>{isNew ? FACULTIES.edit.sendButton.new : FACULTIES.edit.sendButton.edit}</Button>
                </form>
            </CardBody>
        </Card>
    </ContentWrapper>
    </>
    );
};


FacultyEdit.propTypes = {

};

const mapStateToProps = state => ({
    faculty: state.faculties.faculty,
    universities: state.universities.universities
});
const mapDispatchToProps = dispatch => ({ 
    getFaculty: (id)=>{
        dispatch(getFaculty(id))
    },
    updateFaculty: (id, faculty)=>{
        dispatch(updateFaculty(id, faculty))
    },
    createFaculty: (faculty)=>{
        dispatch(createFaculty(faculty))
    },
    getAllUniversities: ()=>{
        dispatch(getAllUniversities())
    }
});

export default compose(withRouter, connect(mapStateToProps, mapDispatchToProps))(FacultyEdit);

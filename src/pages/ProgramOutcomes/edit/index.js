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
import { ACTIVE, PROGRAM_OUTCOMES, PASSIVE, ERROR_MESSAGES } from 'AppConstants';

import './edit.scss';
import { compose } from 'recompose';
import { connect } from 'react-redux';
import { createProgramOutcome, getProgramOutcome, updateProgramOutcome, getAllDepartments } from 'Actions';
import PopoverModal from 'Components/PopoverModal';
import { isUpdated } from 'Utils';

const ProgramOutcomeEdit = (props) => {
    const {match, history, programOutcome={code: '', department_id: '', explanation: '', year_and_term: ''}, departments} = props;

    const [isNew, setIsNew] = useState(true)
    const [form, setForm] = useState({code: '', department_id: '', explanation: '', year_and_term: ''})
    const [flag, setFlag] = useState(false)
    const [successFlag, setSuccessFlag] = useState(false)
    const [isModalOpen, setIsModalOpen] = useState(false)

    useEffect(() => {
        const id = match.params.id
        props.getAllDepartments()
        if(id){ 
            setIsNew(false)
            props.getProgramOutcome(id)
        }
        else setIsNew(true)
    }, [match])

    useEffect(() => {
        if(!isNew) {
            const tempFormObj = {}
            Object.keys(form).map(field => tempFormObj[field] = programOutcome[field] || '0')
            setForm({...tempFormObj})
        }
    }, [programOutcome, isNew])

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
            props.createProgramOutcome(form)
        } else {
            props.updateProgramOutcome(programOutcome.id, form)
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
    when={isUpdated(form, programOutcome) && !successFlag}
    message={ERROR_MESSAGES.unsaved}/>

    const programOptions = departments?.content?.map(program=> {
        return <option key={program.id} value={program.id}>{program.name}</option>
    })


    return (
        <>
        {prompt}
        <ContentWrapper>
            <div className="content-heading">
               {PROGRAM_OUTCOMES.edit.pageName}
            </div>
            <Card className="card-page-title">
                <CardHeader className="card-header-title">
                    {isNew ? PROGRAM_OUTCOMES.edit.createCardHeader : PROGRAM_OUTCOMES.edit.editCardHeader}
                </CardHeader>
                <CardBody>
                <form className="form-horizontal" onSubmit={onSubmit}>
                    <Row>
                        <div className="col-md-10 col-xl-5 col-xl-6">
                        <fieldset>
                            <FormGroup row>
                                <label className="col-md-2 col-form-label">{PROGRAM_OUTCOMES.edit.formFields.code}</label>
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
                                <label className="col-md-2 col-form-label">{PROGRAM_OUTCOMES.edit.formFields.explanation}</label>
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
                                <label className="col-md-2 col-form-label">{PROGRAM_OUTCOMES.edit.formFields.year_and_term}</label>
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
                                <label className="col-md-2 col-form-label">{PROGRAM_OUTCOMES.edit.formFields.program}</label>
                                <div className="col-md-10">
                                    <select name="department_id" 
                                        value={form.department_id || ''} 
                                        className="custom-select custom-select-sm" 
                                        onChange={validateOnChange}
                                        data-validate='["required"]'
                                    >
                                        <option disabled value="">Ders Seçiniz</option>
                                        {programOptions}
                                    </select>
                                    { hasError('department_id','required') && <div className="user-edit-invalid-field">{ERROR_MESSAGES.required}</div> }
                                </div>
                            </FormGroup>
                        </fieldset>
                        </div>
                    </Row>
                    <PopoverModal
                        content={PROGRAM_OUTCOMES.modals.edit}
                        toggleModal={isModalOpen}
                        handleToggleModal={handleModalState}
                        handleAction={handleSubmit}
                        interceptorState={setSuccessFlag}
                    />
                    <Button color="primary" type="submit" disabled={!isUpdated(form, programOutcome)}>{isNew ? PROGRAM_OUTCOMES.edit.sendButton.new : PROGRAM_OUTCOMES.edit.sendButton.edit}</Button>
                </form>
            </CardBody>
        </Card>
    </ContentWrapper>
    </>
    );
};


ProgramOutcomeEdit.propTypes = {

};

const mapStateToProps = state => ({
    programOutcome: state.programOutcomes.programOutcome,
    departments: state.departments.departments
});
const mapDispatchToProps = dispatch => ({ 
    getProgramOutcome: (id)=>{
        dispatch(getProgramOutcome(id))
    },
    updateProgramOutcome: (id, programOutcome)=>{
        dispatch(updateProgramOutcome(id, programOutcome))
    },
    createProgramOutcome: (programOutcome)=>{
        dispatch(createProgramOutcome(programOutcome))
    },
    getAllDepartments: ()=>{
        dispatch(getAllDepartments())
    }
});

export default compose(withRouter, connect(mapStateToProps, mapDispatchToProps))(ProgramOutcomeEdit);

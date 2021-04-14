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
import { ACTIVE, UPLOAD_FILE_PAGE, PASSIVE, ERROR_MESSAGES, ROLES, FILE_UPLOAD, FILE_TYPES } from 'AppConstants';

import './file-upload.scss';
import { compose } from 'recompose';
import { connect } from 'react-redux';
import { getSection, uploadFile, uploadSPAFile, deleteSPAFile } from 'Actions';
import PopoverModal from 'Components/PopoverModal';
import { isUpdated } from 'Utils';
import { file } from 'jszip';

const FileUpload = (props) => {
    const {match, history, fileType, section} = props;
    const isSPAUpload = fileType === FILE_UPLOAD.SPA_FILE
    const spaDefaultForm = {
        section:'', 
        department:'', 
        year_and_term:'', 
        type:'', 
        code:'',
        name:'', 
        credit:'',
        file: ''
    }
    const [form, setForm] = useState(isSPAUpload ? {...spaDefaultForm} : {fileUrl: ''})
    const [formExternal, setFormExternal] = useState({student_department_id: '', course_section_id: ''})

    const [flag, setFlag] = useState(false)
    const [successFlag, setSuccessFlag] = useState(false)
    const [isModalOpen, setIsModalOpen] = useState(false)

    useEffect(() => {
        isSPAUpload && props.getSection(match.params.sectionId)
    }, [isSPAUpload])

    useEffect(() => {
        if(section.id && isSPAUpload) {
            const formObj = {
                section: section.id, 
                department:section.department_id, 
                year_and_term:section.year_and_term,  
                code: section.course_code,
                name: section.courseName, 
                credit:section.credit
            }
            setForm({...form, ...formObj})
        }
    }, [section])

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
            setIsModalOpen(true)
        }

    }

    const handleSubmit = () => {
        delete form.errors
        console.log("handleSubmit", form)
        if(isSPAUpload){
            props.uploadSPAFile(form)
        } else {
            props.uploadFile(form, fileType)
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

    return (
        <>
        <ContentWrapper>
            <div className="content-heading">
               {UPLOAD_FILE_PAGE.edit.pageName}
            </div>
            <Card className="card-page-title">
                <CardHeader className="card-header-title">
                    {UPLOAD_FILE_PAGE.edit.createCardHeader}
                </CardHeader>
                <CardBody>
                <form className="form-horizontal" onSubmit={onSubmit}>
                    <Row>
                        {
                            isSPAUpload ?
                            <>
                                <div className="col-md-10 col-xl-5 col-xl-6">
                                    <fieldset>
                                        <FormGroup row>
                                            <label className="col-md-2 col-form-label">{UPLOAD_FILE_PAGE.edit.formFields.section}</label>
                                            <div className="col-md-10">
                                                <Input type="text" 
                                                    name="section"
                                                    value={form.section}
                                                    disabled
                                                />
                                            </div>
                                        </FormGroup>
                                    </fieldset>
                                </div>
                                <div className="col-md-10 col-xl-5 col-xl-6">
                                    <fieldset>
                                        <FormGroup row>
                                            <label className="col-md-2 col-form-label">{UPLOAD_FILE_PAGE.edit.formFields.department}</label>
                                            <div className="col-md-10">
                                                <Input type="text" 
                                                    name="department"
                                                    value={form.department}
                                                    disabled
                                                />
                                            </div>
                                        </FormGroup>
                                    </fieldset>
                                </div>
                                <div className="col-md-10 col-xl-5 col-xl-6">
                                    <fieldset>
                                        <FormGroup row>
                                            <label className="col-md-2 col-form-label">{UPLOAD_FILE_PAGE.edit.formFields.year_and_term}</label>
                                            <div className="col-md-10">
                                                <Input type="text" 
                                                    name="year_and_term"
                                                    value={form.year_and_term}
                                                    disabled
                                                />
                                            </div>
                                        </FormGroup>
                                    </fieldset>
                                </div>
                                <div className="col-md-10 col-xl-5 col-xl-6">
                                    <fieldset>
                                        <FormGroup row>
                                            <label className="col-md-2 col-form-label">{UPLOAD_FILE_PAGE.edit.formFields.code}</label>
                                            <div className="col-md-10">
                                                <Input type="text" 
                                                    name="code"
                                                    value={form.code}
                                                    disabled
                                                />
                                            </div>
                                        </FormGroup>
                                    </fieldset>
                                </div>
                                <div className="col-md-10 col-xl-5 col-xl-6">
                                    <fieldset>
                                        <FormGroup row>
                                            <label className="col-md-2 col-form-label">{UPLOAD_FILE_PAGE.edit.formFields.name}</label>
                                            <div className="col-md-10">
                                                <Input type="text" 
                                                    name="name"
                                                    value={form.name}
                                                    disabled
                                                />
                                            </div>
                                        </FormGroup>
                                    </fieldset>
                                </div>
                                <div className="col-md-10 col-xl-5 col-xl-6">
                                    <fieldset>
                                        <FormGroup row>
                                            <label className="col-md-2 col-form-label">{UPLOAD_FILE_PAGE.edit.formFields.credit}</label>
                                            <div className="col-md-10">
                                                <Input type="text" 
                                                    name="credit"
                                                    value={form.credit}
                                                    disabled
                                                />
                                            </div>
                                        </FormGroup>
                                    </fieldset>
                                </div>
                                <div className="col-md-10 col-xl-5 col-xl-6">
                                    <fieldset>
                                        <FormGroup row>
                                            <label className="col-md-2 col-form-label">{UPLOAD_FILE_PAGE.edit.formFields.type}</label>
                                            <div className="col-md-10 user-edit__radio">
                                                    <label className="c-radio">
                                                    <Input id="type-active" type="radio" name="type" checked={form.type === FILE_TYPES.SPA} onChange={(e)=>setForm({...form, type: FILE_TYPES.SPA})}/>
                                                    <span className="fa fa-circle"></span>SPA Dosyası</label>
                                                    <label className="c-radio ml-4">
                                                    <Input id="type-passive" type="radio" name="type" checked={form.type === FILE_TYPES.GAT} onChange={(e)=>setForm({...form, type: FILE_TYPES.GAT})}/>
                                                    <span className="fa fa-circle"></span>GAT Dosyası</label>
                                            </div>
                                        </FormGroup>
                                    </fieldset>
                                </div>
                                <div className="col-md-10 col-xl-5 col-xl-6">
                                    <fieldset>
                                        <FormGroup row>
                                            <label className="col-md-2 col-form-label">{UPLOAD_FILE_PAGE.edit.formFields.file}</label>
                                            <div className="col-md-10">
                                                <Input type="file" 
                                                    name="file"
                                                    onChange={e=>{
                                                        console.log(e.target.files[0])
                                                        setForm({...form, file:e.target.files[0]})
                                                    }}
                                                    accept="application/vnd.openxmlformats-officedocument.spreadsheetml.sheet,application/vnd.ms-excel"
                                                />
                                            </div>
                                        </FormGroup>
                                    </fieldset>
                                </div>
                            </> :
                            <>
                                <div className="col-md-10 col-xl-5 col-xl-6">
                                    <fieldset>
                                        <FormGroup row>
                                            <label className="col-md-2 col-form-label">{UPLOAD_FILE_PAGE.edit.formFields.file}</label>
                                            <div className="col-md-10">
                                                <Input type="file" 
                                                    name="fileUrl"
                                                    onChange={e=>setForm({...form, fileUrl:e.target.files[0]})}
                                                    value={form.fileUrl}
                                                />
                                            </div>
                                        </FormGroup>
                                    </fieldset>
                                </div>
                            </>
                            
                        }
                    </Row>
                    <PopoverModal
                        content={UPLOAD_FILE_PAGE.modals.edit}
                        toggleModal={isModalOpen}
                        handleToggleModal={handleModalState}
                        handleAction={handleSubmit}
                        interceptorState={setSuccessFlag}
                    />
                    <Button color="primary" type="submit" disabled={isSPAUpload ? !form.file : !form.fileUrl}>{UPLOAD_FILE_PAGE.edit.sendButton.new}</Button>
                </form>
            </CardBody>
        </Card>
    </ContentWrapper>
    </>
    );
};


FileUpload.propTypes = {

};

const mapStateToProps = state => ({
    section: state.sections.section
});

const mapDispatchToProps = dispatch => ({ 
    getSection: (id)=>{
        dispatch(getSection(id))
    },
    uploadFile: (file, path)=>{
        dispatch(uploadFile(file, path))
    },
    uploadSPAFile: (file)=>{
        dispatch(uploadSPAFile(file))
    },
    deleteSPAFile: (file)=>{
        dispatch(deleteSPAFile(file))
    }
});

export default compose(withRouter, connect(mapStateToProps, mapDispatchToProps))(FileUpload);

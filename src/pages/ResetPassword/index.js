import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router';
import { Input } from 'reactstrap';
import { compose } from 'redux';
import { RESET_PASSWORD, RESET, DEFINE, ERROR_MESSAGES } from 'AppConstants';

import FormValidator from '../../components/FormValidator';
import { forgotPassword, resetPassword } from'Actions';
import './reset-password.scss';

const ResetPassword = (props) =>  {
    const { location, type, history } = props
    const query = new URLSearchParams(location.search);
    const [state, setState] = useState({
        email: '',
        password: '',
        password2: '',
        showPassword1:false,
        showPassword2:false
    });

     /**
      * Validate input using onChange event
      * @param  {String} formName The name of the form in the state object
      * @return {Function} a function used for the event
      */
    const validateOnChange = event => {
        const input = event.target;
        const form = input.form
        const value = input.type === 'checkbox' ? input.checked : input.value;

        const result = FormValidator.validate(input);

        setState({
            ...state,
            [input.name]: value,
            errors: {
                ...state.errors,
                [input.name]: result
            }
        });

    }

    const onSubmit = e => {
        const form = e.target;
        const inputs = [...form.elements].filter(i => ['INPUT', 'SELECT'].includes(i.nodeName))

        const { errors, hasError } = FormValidator.bulkValidate(inputs)

        setState({
            ...state,
            errors
        });

        if(!hasError) {
            if(!query.get('token')){
                props.forgotPassword(state.email)
            } else{
                props.resetPassword(query.get('token'), state.password)
            }
            e.preventDefault()
        }
    }

    /* Simplify error check */
    const hasError = (inputName, method) => {
        return  state &&
                state.errors &&
                state.errors[inputName] &&
                state.errors[inputName][method]
    }

    useEffect(() => {
        if(!query.get('token') && type === DEFINE){
            history.push('/')
        }
    }, [type, query])


    return (
        <div className="block-center mt-4 wd-xl">
            {/* START card */}
            <div className="card card-flat">
                <div className="card-header text-center bg-light">
                    <a href="">
                        <img className="block-center" src="assets/img/logo.png" alt="Logo"/>
                    </a>
                </div>
                <div className="card-body">
                    <p className="text-center py-2">{query.get('token') ? RESET_PASSWORD.cardHeader.setPassword : RESET_PASSWORD.cardHeader.resetPassword}</p>
                    <form className="mb-3" name="formResetPassword" onSubmit={onSubmit}>
                        { query.get('token') &&
                        <>
                            <div className="form-group">
                                <label className="text-muted" htmlFor="signupInputPassword1">Şifre</label>
                                <div className="input-group with-focus">
                                    <Input type="text"
                                        id="id-password"
                                        type={state.showPassword1 ? "text":"password"}
                                        name="password"
                                        placeholder="Şifre"
                                        invalid={hasError('password','required') || hasError('password','len')}
                                        onChange={validateOnChange}
                                        data-validate='["required", "len"]'
                                        data-param="[8,32]"
                                        value={state.password}
                                    />
                                    <div className="input-group-append" onClick={()=>setState({...state, showPassword1: !state.showPassword1})}>
                                        <span className="input-group-text text-muted bg-transparent border-left-0">
                                            <em className="fa fa-eye"></em>
                                        </span>
                                    </div>
                                    <div className="input-group-append reset-password-input">
                                        <span className="input-group-text text-muted bg-transparent border-left-0">
                                            <em className="fa fa-lock"></em>
                                        </span>
                                    </div>
                                    { hasError('password','required') && <span className="invalid-feedback">{ERROR_MESSAGES.required}</span> }
                                    { hasError('password','len') && <span className="invalid-feedback">{ERROR_MESSAGES.lengthRange(8, 32)}</span> }                                </div>
                            </div>
                            <div className="form-group">
                                <label className="text-muted" htmlFor="signupInputRePassword1">Şifre Onayı</label>
                                <div className="input-group with-focus">
                                    <Input type="text" name="password2"
                                        placeholder="Şifrenizi tekrar girin."
                                        type={state.showPassword2 ? "text":"password"}
                                        invalid={hasError('password2','equalto')}
                                        onChange={validateOnChange}
                                        data-validate='["equalto"]'
                                        value={state.password2}
                                        data-param="id-password"
                                    />
                                    <div className="input-group-append" onClick={()=>setState({...state, showPassword2: !state.showPassword2})}>
                                        <span className="input-group-text text-muted bg-transparent border-left-0">
                                            <em className="fa fa-eye"></em>
                                        </span>
                                    </div>
                                    <div className="input-group-append reset-password-input">
                                        <span className="input-group-text text-muted bg-transparent border-left-0">
                                            <em className="fa fa-lock"></em>
                                        </span>
                                    </div>
                                    { hasError('password2','equalto') && <span className="invalid-feedback">{ERROR_MESSAGES.equalto}</span> }
                                </div>
                            </div>
                        </> 
                        } 
                        {
                            !query.get('token') && <div> 
                                <div className="form-group">
                                    <label className="text-muted" htmlFor="signupInputRePassword1">Email Adresi</label>
                                    <div className="input-group with-focus">
                                    <Input type="email"
                                        name="email"
                                        placeholder="Email adresi"
                                        invalid={hasError('email','required')||hasError('email','email')}
                                        onChange={validateOnChange}
                                        data-validate='["required", "email"]'
                                        value={state.email}/>
                                        <div className="input-group-append reset-password-input">
                                            <span className="input-group-text text-muted bg-transparent border-left-0">
                                                <em className="fa fa-envelope"></em>
                                            </span>
                                        </div>
                                        { hasError('email','required') && <span className="invalid-feedback">{ERROR_MESSAGES.required}</span> }
                                        { hasError('email','email') && <span className="invalid-feedback">{ERROR_MESSAGES.email}</span> }
                                    </div>
                                </div>
                            </div>
                        }
                        <button className="btn btn-block btn-primary mt-3" type="submit">{ query.get('token') ? RESET_PASSWORD.actionButtons.setPassword : RESET_PASSWORD.actionButtons.resetPassword}</button>
                        
                    </form>
                </div>
            </div>
            {/* END card */}
        </div>
    );
}



const mapDispatchToProps = dispatch => ({
    forgotPassword: (email)=>{
        dispatch(forgotPassword(email))
    },
    resetPassword: (token, password)=>{
        dispatch(resetPassword(token, password))
    }
})

export default compose(connect(null, mapDispatchToProps), withRouter)(ResetPassword)


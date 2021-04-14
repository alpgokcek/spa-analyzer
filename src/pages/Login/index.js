import React, { useState } from 'react';
import { Link, withRouter } from 'react-router-dom';
import { Input, CustomInput } from 'reactstrap';
import FormValidator from '../../components/FormValidator';
import { connect } from 'react-redux'
import { login } from '../../store/actions/auth.actions'
import { compose } from 'redux';
import { ERROR_MESSAGES, LOGIN_ERROR, LOGIN_PAGE } from 'AppConstants';

import './login.scss';

const Login = (props) => {
    const {isAuthenticated, error, history} = props
    const [state, setState] = useState({
        email: '',
        password: ''
    });
    
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
        e.preventDefault()
        const form = e.target;
        const inputs = [...form.elements].filter(i => ['INPUT', 'SELECT'].includes(i.nodeName))

        const { errors, hasError } = FormValidator.bulkValidate(inputs)

        setState({
            ...state,
            errors
        });
        if(!hasError) {
            props.login(state.email, state.password)
        }
    }

    /* Simplify error check */
    const hasError = (inputName, method) => {
        return  state &&
                state.errors &&
                state.errors[inputName] &&
                state.errors[inputName][method]
    }

    return (
        <div className="block-center mt-4 wd-xl">
            {isAuthenticated && history.push('/')}
            <div className="card card-flat">
                <div className="card-header text-center bg-light">
                    <a href="">
                        <img className="block-center rounded" src="assets/img/logo.png" alt="Logo"/>
                    </a>
                </div>
                <div className="card-body">
                    <p className="text-center py-2">{LOGIN_PAGE.header}</p>
                    <form className="mb-3" name="formLogin" onSubmit={onSubmit}>
                        <div className="form-group">
                            <div className="input-group with-focus">
                                <Input type="email"
                                    name="email"
                                    placeholder="Email adresi"
                                    invalid={ hasError('email','required') || hasError('email','email') }
                                    onChange={validateOnChange}
                                    data-validate='["required", "email"]'
                                    value={state.email}/>
                                <div className="input-group-append">
                                    <span className="input-group-text text-muted bg-transparent border-left-0">
                                        <em className="fa fa-envelope"></em>
                                    </span>
                                </div>
                                { hasError('email','required') && <span className="invalid-feedback">{ERROR_MESSAGES.required}</span> }
                                { hasError('email','email') && <span className="invalid-feedback">{ERROR_MESSAGES.email}</span> }
                            </div>
                        </div>
                        <div className="form-group">
                            <div className="input-group with-focus">
                                <Input type="password"
                                    id="id-password"
                                    name="password"
                                    placeholder="Şifre"
                                    invalid={ hasError('password','required') }
                                    onChange={validateOnChange}
                                    data-validate='["required"]'
                                    value={state.password}
                                />
                                <div className="input-group-append">
                                    <span className="input-group-text text-muted bg-transparent border-left-0">
                                        <em className="fa fa-lock"></em>
                                    </span>
                                </div>
                                { hasError('password','required') && <span className="invalid-feedback">{ERROR_MESSAGES.required}</span> }
                                { error && <span className="login-invalid-field">{LOGIN_ERROR}</span> }
                            </div>
                        </div>
                        <div className="clearfix">
                            <div className="w-100 flex flex login-forgot-password">
                                <Link to="/sifre-sifirlama" className="text-muted">{LOGIN_PAGE.forgotPassword}</Link>
                            </div>
                        </div>
                        <button className="btn btn-block btn-primary mt-3" type="submit">{LOGIN_PAGE.loginButton}</button>
                    </form>
                </div>
            </div>
        </div>
    );

}




const mapStateToProps = (state) => ({
    isAuthenticated: state.auth.isAuthenticated,
    error: state.auth.error
})

const mapDispatchToProps = dispatch => ({
    login: (email, password)=>{
        dispatch(login(email, password))
    }
})

export default compose(connect(mapStateToProps, mapDispatchToProps), withRouter)(Login)

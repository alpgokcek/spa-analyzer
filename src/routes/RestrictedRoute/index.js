import { ROLES } from 'AppConstants';
import React from 'react'
import { connect } from 'react-redux';
import { Route, Redirect, withRouter } from 'react-router-dom';

const RestrictedRoute = props => {
    const {isAuthenticated, roles, userRole} = props

    const canAccessThePage = () => {
        if(!isAuthenticated) return false
        return roles?.includes(userRole)
    }
    
    return (
        <>
            {canAccessThePage() ? <Route {...props}/> : <Redirect to={ '/giris-yap' } />}
        </>
    )
}
const mapStateToProps = state => {
    return({
        isAuthenticated: state.auth.isAuthenticated,
        userRole: state.auth.role
    })
}
export default connect(mapStateToProps, null)(RestrictedRoute)
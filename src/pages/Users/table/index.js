import React, {useEffect, useState} from 'react';
import {LEVEL_TO_ROLE, ROLES, USERS} from 'AppConstants'
import { withRouter } from 'react-router';

import { connect } from 'react-redux';
import { compose } from 'redux';
import { clearUser, getAllUsers } from '../../../store/actions/users.actions';
import Table from '../../../components/Table'

import './users-table.scss';

const UsersTable = (props) => {
    const {history, usersList, userType, match} = props

    const handleOnClick = (e, to, id) => {
        e.preventDefault();
        to === 'users' ? history.push(`/${userType ? userType === ROLES.STUDENT ? 'students' : 'instructors' : 'users'}/edit/${id}`) : history.push(`/${to}/${id}`)
        

    }
    const [state, setState] = useState({page: 1, totalSize: 0, flag: true})
    const [sortQuery, setSortQuery] = useState('')
    const [searchQuery, setSearchQuery] = useState('')

    const handleTableChange = (type, { page, sizePerPage }) => {
        setState({
            ...state,
            page,
            sizePerPage
        });
      }

    useEffect(() => {
        props.clearUser()
        props.getAllUsers(match.params.departmentId, userType)
    }, [state.page, state.flag])

    useEffect(() => {
        setState({...state, page: 1, flag: !state.flag})
    }, [sortQuery, searchQuery])

    useEffect(() => {
        if(usersList.page) setState({...state, totalSize: usersList.page.totalElements})
    }, [usersList])
    return (
        <div>
            <Table
            columns={USERS.list.columns.map(col => {
                return {
                    ...col,
                    onSort: (field, order) => setSortQuery(`&sort_by=${field}&order=${order}`)
                }
            })}
            data={ usersList?.content?.map(user=>{
                return {
                    ...user,
                    level: LEVEL_TO_ROLE[user.level],
                    _actions: <div className="users-table__actions">
                                    {user.level === ROLES.STUDENT && <div onClick={e=>handleOnClick(e, `students-take-sections/student`, user.studentID)} className="courses-table__edit-button"><i className="fa fa-columns"></i></div>}
                                    {[ROLES.RECTOR, ROLES.INSTRUCTOR, ROLES.HEAD_OF_DEPARTMENT, ROLES.DEAN].includes(user.level) && <div onClick={e=>handleOnClick(e, `instructors-give-sections/instructor`, user.id)} className="courses-table__edit-button"><i className="fa fa-columns"></i></div>}
                                    <div onClick={e=>handleOnClick(e, 'users', user.api_token)} className="users-table__edit-button"><i className="fa fa-edit"></i></div>
                                </div>
                    
                }
            }) || []}
            page={ state.page }
            totalSize={ usersList?.page || 0 }
            onTableChange={ handleTableChange }
            setQuery={setSearchQuery}
        />
        </div>
    );
}
const mapStateToProps = state => ({
    usersList: state.users.users
});
const mapDispatchToProps = dispatch => ({ 
    getAllUsers: (department_id, user_type)=>{
        dispatch(getAllUsers(department_id, user_type))
    },
    clearUser: ()=>{
        dispatch(clearUser())
    }
});

export default compose(withRouter, connect(mapStateToProps, mapDispatchToProps))(UsersTable);
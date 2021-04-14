import React, {useEffect, useState} from 'react';

import {DEPARTMENTS, ACTIVE} from 'AppConstants'
import { withRouter } from 'react-router';

import { connect } from 'react-redux';
import { compose } from 'redux';
import { clearDepartment, deleteDepartment, getAllDepartments } from 'Actions';
import Table from 'Components/Table'
import './department-table.scss';

const DepartmentsTable = (props) => {
    const {history, match, departmentsList} = props
    const handleOnClick = (e, to, id) => {
        e.preventDefault();
        to === 'departments' ? history.push(`/departments/${match.params.facultyId}/edit/${id}`) : history.push(`/${to}/${id}`)
    }
    const handleDelete = (e, id) => {
        props.deleteDepartment(id, match.params.facultyId)
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
        props.clearDepartment()
        props.getAllDepartments(match.params.facultyId)
    }, [state.page, state.flag])

    useEffect(() => {
        setState({...state, page: 1, flag: !state.flag})
    }, [sortQuery, searchQuery])

    useEffect(() => {
        if(departmentsList.page) setState({...state, totalSize: departmentsList.page.totalElements})
    }, [departmentsList])

    return (
        <div>
            <Table
                columns={DEPARTMENTS.list.columns.map(col => {
                    return {
                        ...col,
                        onSort: (field, order) => setSortQuery(`&sort_by=${field}&order=${order}`)
                    }
                })}
                data={ departmentsList?.content?.map(department=>{
                    return {
                        ...department,
                        status: department.status === ACTIVE ? 'Aktif' : 'Pasif',
                        _actions: <div className="departments-table__actions">
                                    <div onClick={e=>handleOnClick(e, 'instructors', department.id)} className="departments-table__edit-button"><i className="fa fa-user-md"></i></div>
                                    <div onClick={e=>handleOnClick(e, 'students', department.id)} className="departments-table__edit-button"><i className="fa fa-graduation-cap"></i></div>
                                    <div onClick={e=>handleOnClick(e, 'courses', department.id)} className="departments-table__edit-button"><i className="fa fa-book"></i></div>
                                    <div onClick={e=>handleOnClick(e, 'program-outcomes',department.id)} className="courses-table__edit-button"><i className="fa fa-outdent"></i></div>
                                    <div onClick={e=>handleOnClick(e, 'departments',department.id)} className="departments-table__edit-button"><i className="fa fa-edit"></i></div>
                                    <div onClick={e=>handleDelete(e, department.id)} className="departments-table__edit-button"><i className="fa fa-trash"></i></div>
                                </div>
                    }
                }) || [] }
                page={ state.page }
                totalSize={ departmentsList?.page || 0 }
                onTableChange={ handleTableChange }
                setQuery={setSearchQuery}
            />       
        </div>
    );
}
const mapStateToProps = state => ({
    departmentsList: state.departments.departments
});
const mapDispatchToProps = dispatch => ({ 
    getAllDepartments: (facultyId)=>{
        dispatch(getAllDepartments(facultyId))
    },
    deleteDepartment: (id, facultyId)=>{
        dispatch(deleteDepartment(id, facultyId))
    },
    clearDepartment: ()=>{
        dispatch(clearDepartment())
    }
});

export default compose(withRouter, connect(mapStateToProps, mapDispatchToProps))(DepartmentsTable);
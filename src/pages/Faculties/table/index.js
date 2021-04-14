import React, {useEffect, useState} from 'react';

import {FACULTIES, ACTIVE} from 'AppConstants'
import { withRouter } from 'react-router';

import { connect } from 'react-redux';
import { compose } from 'redux';
import { clearFaculty, deleteFaculty, getAllFaculties } from 'Actions';
import Table from 'Components/Table'
import './faculties-table.scss';

const FacultiesTable = (props) => {
    const {history, facultiesList} = props
    const handleOnClick = (e, to, id) => {
        e.preventDefault();
        to === 'departments' ? history.push(`/departments/${id}`): history.push(`/${to}/edit/${id}`)
    }
    const handleDelete = (e, id) => {
        props.deleteFaculty(id)
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
        props.clearFaculty()
        props.getAllFaculties()
    }, [state.page, state.flag])

    useEffect(() => {
        setState({...state, page: 1, flag: !state.flag})
    }, [sortQuery, searchQuery])

    useEffect(() => {
        if(facultiesList.page) setState({...state, totalSize: facultiesList.page.totalElements})
    }, [facultiesList])

    return (
        <div>
            <Table
                columns={FACULTIES.list.columns.map(col => {
                    return {
                        ...col,
                        onSort: (field, order) => setSortQuery(`&sort_by=${field}&order=${order}`)
                    }
                })}
                data={ facultiesList?.content?.map(faculty=>{
                    return {
                        ...faculty,
                        status: faculty.status === ACTIVE ? 'Aktif' : 'Pasif',
                        _actions: <div className="faculties-table__actions">
                                    <div onClick={e=>handleOnClick(e, 'departments', faculty.id)} className="faculties-table__edit-button"><i className="fa fa-building"></i></div>
                                    <div onClick={e=>handleOnClick(e, 'faculties',faculty.id)} className="faculties-table__edit-button"><i className="fa fa-edit"></i></div>
                                    <div onClick={e=>handleDelete(e, faculty.id)} className="faculties-table__edit-button"><i className="fa fa-trash"></i></div>
                                </div>
                    }
                }) || [] }
                page={ state.page }
                totalSize={ facultiesList?.page || 0 }
                onTableChange={ handleTableChange }
                setQuery={setSearchQuery}
            />       
        </div>
    );
}
const mapStateToProps = state => ({
    facultiesList: state.faculties.faculties
});
const mapDispatchToProps = dispatch => ({ 
    getAllFaculties: ()=>{
        dispatch(getAllFaculties())
    },
    deleteFaculty: (id)=>{
        dispatch(deleteFaculty(id))
    },
    clearFaculty: ()=>{
        dispatch(clearFaculty())
    }
});

export default compose(withRouter, connect(mapStateToProps, mapDispatchToProps))(FacultiesTable);
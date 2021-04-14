import React, {useEffect, useState} from 'react';

import {STUDENTS_TAKE_SECTIONS, ACTIVE} from 'AppConstants'
import { withRouter } from 'react-router';

import { connect } from 'react-redux';
import { compose } from 'redux';
import { clearStudentsTakeSections, deleteStudentsTakeSections, getAllStudentsTakeSections } from 'Actions';
import Table from 'Components/Table'
import './table.scss';

const StudentsTakeSectionsTable = (props) => {
    const {history, match, studentsTakeSectionsList} = props
    const handleOnClick = (e, to, id) => {
        e.preventDefault();
        to === 'students-take-sections' ? history.push(`/students-take-sections/edit/${id}`) : history.push(`/${to}/${id}`)
    }
    const handleDelete = (e, id) => {
        props.deleteStudentsTakeSections(id)
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
        props.clearStudentsTakeSections()
        props.getAllStudentsTakeSections(match.params.studentId ? `?student=${match.params.studentId}` : `?section=${match.params.sectionId}`)
    }, [state.page, state.flag])

    useEffect(() => {
        if(studentsTakeSectionsList.page) setState({...state, totalSize: studentsTakeSectionsList.page.totalElements})
    }, [studentsTakeSectionsList])

    return (
        <div>
            <Table
                columns={STUDENTS_TAKE_SECTIONS.list.columns}
                data={ studentsTakeSectionsList?.content?.map(sts=>{
                    return {
                        ...sts,
                        average: Number(sts.average).toFixed(2),
                        _actions: <div className="students-take-sections-table__actions">
                                    <div onClick={e=>handleOnClick(e, 'program-report', sts.id)} className="students-take-sections-table__edit-button"><i className="fa fa-columns"></i></div>
                                    <div onClick={e=>handleOnClick(e, 'students', sts.id)} className="students-take-sections-table__edit-button"><i className="fa fa-paperclip"></i></div>
                                    <div onClick={e=>handleOnClick(e, 'students-take-sections',sts.id)} className="students-take-sections-table__edit-button"><i className="fa fa-edit"></i></div>
                                    <div onClick={e=>handleDelete(e, sts.id)} className="students-take-sections-table__edit-button"><i className="fa fa-trash"></i></div>
                                </div>
                    }
                }) || [] }
                page={ state.page }
                totalSize={ studentsTakeSectionsList?.page || 0 }
                onTableChange={ handleTableChange }
                setQuery={setSearchQuery}
            />       
        </div>
    );
}
const mapStateToProps = state => ({
    studentsTakeSectionsList: state.studentsTakeSections.studentsTakeSectionsList
});
const mapDispatchToProps = dispatch => ({ 
    getAllStudentsTakeSections: (query)=>{
        dispatch(getAllStudentsTakeSections(query))
    },
    deleteStudentsTakeSections: (id)=>{
        dispatch(deleteStudentsTakeSections(id))
    },
    clearStudentsTakeSections: ()=>{
        dispatch(clearStudentsTakeSections())
    }
});

export default compose(withRouter, connect(mapStateToProps, mapDispatchToProps))(StudentsTakeSectionsTable);
import React, {useEffect, useState} from 'react';

import {ASSESSMENTS, ACTIVE} from 'AppConstants'
import { withRouter } from 'react-router';

import { connect } from 'react-redux';
import { compose } from 'redux';
import { clearAssessment, deleteAssessment, getAllAssessments } from 'Actions';
import Table from 'Components/Table'
import './table.scss';

const AssessmentsTable = (props) => {
    const {history, match, assessmentsList} = props
    const handleOnClick = (e, to, id) => {
        e.preventDefault();
        to === 'assessments' ? history.push(`/assessments/${match.params.courseId}/edit/${id}`) : history.push(`/${to}/${id}`)
    }
    const handleDelete = (e, id) => {
        props.deleteAssessment(id, match.params.courseId)
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
        props.clearAssessment()
        props.getAllAssessments(match.params.courseId)
    }, [state.page, state.flag])

    useEffect(() => {
        setState({...state, page: 1, flag: !state.flag})
    }, [sortQuery, searchQuery])

    useEffect(() => {
        if(assessmentsList.page) setState({...state, totalSize: assessmentsList.page.totalElements})
    }, [assessmentsList])

    return (
        <div>
            <Table
                columns={ASSESSMENTS.list.columns.map(col => {
                    return {
                        ...col,
                        onSort: (field, order) => setSortQuery(`&sort_by=${field}&order=${order}`)
                    }
                })}
                data={ assessmentsList?.content?.map(assessment=>{
                    return {
                        ...assessment,
                        _actions: <div className="assessments-table__actions">
                                    <div onClick={e=>handleOnClick(e, `grading-tools/${assessment.course_id}`, assessment.id)} className="assessments-table__edit-button"><i className="fa fa-outdent"></i></div>
                                    <div onClick={e=>handleOnClick(e, 'assessments',assessment.id)} className="assessments-table__edit-button"><i className="fa fa-edit"></i></div>
                                    <div onClick={e=>handleDelete(e, assessment.id)} className="assessments-table__edit-button"><i className="fa fa-trash"></i></div>
                                </div>
                    }
                }) || [] }
                page={ state.page }
                totalSize={ assessmentsList?.page || 0 }
                onTableChange={ handleTableChange }
                setQuery={setSearchQuery}
            />       
        </div>
    );
}
const mapStateToProps = state => ({
    assessmentsList: state.assessments.assessments
});
const mapDispatchToProps = dispatch => ({ 
    getAllAssessments: (courseId)=>{
        dispatch(getAllAssessments(courseId))
    },
    deleteAssessment: (id, assessmentId)=>{
        dispatch(deleteAssessment(id, assessmentId))
    },
    clearAssessment: ()=>{
        dispatch(clearAssessment())
    }
});

export default compose(withRouter, connect(mapStateToProps, mapDispatchToProps))(AssessmentsTable);
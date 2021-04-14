import React, {useEffect, useState} from 'react';

import {COURSE_OUTCOMES, ACTIVE} from 'AppConstants'
import { withRouter } from 'react-router';

import { connect } from 'react-redux';
import { compose } from 'redux';
import { clearCourseOutcome, deleteCourseOutcome, getAllCourseOutcomes } from 'Actions';
import Table from 'Components/Table'
import './table.scss';

const CourseOutcomeTable = (props) => {
    const {history, match, courseOutcomesList} = props
    const handleOnClick = (e, to, id) => {
        e.preventDefault();
        to === 'course-outcomes' ? history.push(`/course-outcomes/${match.params.courseId}/edit/${id}`) : history.push(`/${to}/${id}`)
    }
    const handleDelete = (e, id) => {
        props.deleteCourseOutcome(id, match.params.courseId)
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
        props.clearCourseOutcome()
        props.getAllCourseOutcomes(match.params.courseId)
    }, [state.page, state.flag])

    useEffect(() => {
        setState({...state, page: 1, flag: !state.flag})
    }, [sortQuery, searchQuery])

    useEffect(() => {
        if(courseOutcomesList.page) setState({...state, totalSize: courseOutcomesList.page.totalElements})
    }, [courseOutcomesList])

    return (
        <div>
            <Table
                columns={COURSE_OUTCOMES.list.columns.map(col => {
                    return {
                        ...col,
                        onSort: (field, order) => setSortQuery(`&sort_by=${field}&order=${order}`)
                    }
                })}
                data={ courseOutcomesList?.content?.map(courseOutcome=>{
                    return {
                        ...courseOutcome,
                        _actions: <div className="course-outcomes-table__actions">
                                    <div onClick={e=>handleOnClick(e, `po-provide-co/${courseOutcome.course_id}/course-outcome`,courseOutcome.id)} className="course-outcomes-table__edit-button"><i className="fa fa-recycle"></i></div>
                                    <div onClick={e=>handleOnClick(e, `gt-cover-co/${courseOutcome.course_id}/course-outcome`,courseOutcome.id)} className="course-outcomes-table__edit-button"><i className="fa fa-map-signs"></i></div>
                                    <div onClick={e=>handleOnClick(e, 'course-outcomes',courseOutcome.id)} className="course-outcomes-table__edit-button"><i className="fa fa-edit"></i></div>
                                    <div onClick={e=>handleDelete(e, courseOutcome.id)} className="course-outcomes-table__edit-button"><i className="fa fa-trash"></i></div>
                                </div>
                    }
                }) || [] }
                page={ state.page }
                totalSize={ courseOutcomesList?.page || 0 }
                onTableChange={ handleTableChange }
                setQuery={setSearchQuery}
            />       
        </div>
    );
}
const mapStateToProps = state => ({
    courseOutcomesList: state.courseOutcomes.courseOutcomes
});
const mapDispatchToProps = dispatch => ({ 
    getAllCourseOutcomes: (courseId)=>{
        dispatch(getAllCourseOutcomes(courseId))
    },
    deleteCourseOutcome: (id, courseId)=>{
        dispatch(deleteCourseOutcome(id, courseId))
    },
    clearCourseOutcome: ()=>{
        dispatch(clearCourseOutcome())
    }
});

export default compose(withRouter, connect(mapStateToProps, mapDispatchToProps))(CourseOutcomeTable);
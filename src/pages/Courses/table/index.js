import React, {useEffect, useState} from 'react';

import {COURSES, ACTIVE} from 'AppConstants'
import { withRouter } from 'react-router';

import { connect } from 'react-redux';
import { compose } from 'redux';
import { clearCourse, deleteCourse, getAllCourses } from 'Actions';
import Table from 'Components/Table'
import './table.scss';

const CoursesTable = (props) => {
    const {history, match, coursesList} = props
    const handleOnClick = (e, to, id) => {
        e.preventDefault();
        to === 'courses' ? history.push(`/courses/${match.params.departmentId}/edit/${id}`) : history.push(`/${to}/${id}`)
    }
    const handleDelete = (e, id) => {
        props.deleteCourse(id, match.params.departmentId)
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
        props.clearCourse()
        props.getAllCourses(match.params.departmentId)
    }, [state.page, state.flag])

    useEffect(() => {
        setState({...state, page: 1, flag: !state.flag})
    }, [sortQuery, searchQuery])

    useEffect(() => {
        if(coursesList.page) setState({...state, totalSize: coursesList.page.totalElements})
    }, [coursesList])

    return (
        <div>
            <Table
                columns={COURSES.list.columns.map(col => {
                    return {
                        ...col,
                        onSort: (field, order) => setSortQuery(`&sort_by=${field}&order=${order}`)
                    }
                })}
                data={ coursesList?.content?.map(course=>{
                    return {
                        ...course,
                        _actions: <div className="courses-table__actions">
                                    <div onClick={e=>handleOnClick(e, 'sections', course.id)} className="courses-table__edit-button"><i className="fa fa-columns"></i></div>
                                    <div onClick={e=>handleOnClick(e, 'course-outcomes',course.id)} className="courses-table__edit-button"><i className="fa fa-outdent"></i></div>
                                    <div onClick={e=>handleOnClick(e, 'assessments', course.id)} className="courses-table__edit-button"><i className="fa fa-paperclip"></i></div>
                                    <div onClick={e=>handleOnClick(e, 'courses',course.id)} className="courses-table__edit-button"><i className="fa fa-edit"></i></div>
                                    <div onClick={e=>handleDelete(e, course.id)} className="courses-table__edit-button"><i className="fa fa-trash"></i></div>
                                </div>
                    }
                }) || [] }
                page={ state.page }
                totalSize={ coursesList?.page || 0 }
                onTableChange={ handleTableChange }
                setQuery={setSearchQuery}
            />       
        </div>
    );
}
const mapStateToProps = state => ({
    coursesList: state.courses.courses
});
const mapDispatchToProps = dispatch => ({ 
    getAllCourses: (departmentId)=>{
        dispatch(getAllCourses(departmentId))
    },
    deleteCourse: (id, departmentId)=>{
        dispatch(deleteCourse(id, departmentId))
    },
    clearCourse: ()=>{
        dispatch(clearCourse())
    }
});

export default compose(withRouter, connect(mapStateToProps, mapDispatchToProps))(CoursesTable);
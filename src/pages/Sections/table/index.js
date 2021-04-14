import React, {useEffect, useState} from 'react';

import {SECTIONS, ACTIVE} from 'AppConstants'
import { withRouter } from 'react-router';

import { connect } from 'react-redux';
import { compose } from 'redux';
import { clearSection, deleteSection, getAllSections } from 'Actions';
import Table from 'Components/Table'
import './table.scss';

const SectionTable = (props) => {
    const {history, match, sectionsList} = props
    const handleOnClick = (e, to, id) => {
        e.preventDefault();
        to === 'sections' ? history.push(`/sections/${match.params.courseId}/edit/${id}`) : history.push(`/${to}/${id}`)
    }
    const handleDelete = (e, id) => {
        props.deleteSection(id, match.params.courseId)
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
        props.clearSection()
        props.getAllSections(match.params.courseId)
    }, [state.page, state.flag])

    useEffect(() => {
        setState({...state, page: 1, flag: !state.flag})
    }, [sortQuery, searchQuery])

    useEffect(() => {
        if(sectionsList.page) setState({...state, totalSize: sectionsList.page.totalElements})
    }, [sectionsList])

    return (
        <div>
            <Table
                columns={SECTIONS.list.columns.map(col => {
                    return {
                        ...col,
                        onSort: (field, order) => setSortQuery(`&sort_by=${field}&order=${order}`)
                    }
                })}
                data={ sectionsList?.content?.map(section=>{
                    return {
                        ...section,
                        status: section.status === ACTIVE ? 'Aktif' : 'Pasif',
                        _actions: <div className="sections-table__actions">
                                    <div onClick={e=>handleOnClick(e, 'instructors-give-sections/section', section.id)} className="departments-table__edit-button"><i className="fa fa-user-md"></i></div>
                                    <div onClick={e=>handleOnClick(e, 'students-take-sections/section', section.id)} className="departments-table__edit-button"><i className="fa fa-graduation-cap"></i></div>
                                    <div onClick={e=>handleOnClick(e, 'course-outcomes',section.course_id)} className="sections-table__edit-button"><i className="fa fa-outdent"></i></div>
                                    {!section.is_file_uploaded && <div onClick={e=>handleOnClick(e, '/sections/spa-file-upload',section.id)} className="sections-table__edit-button"><i className="fa fa-upload"></i></div>}
                                    <div onClick={e=>handleOnClick(e, 'sections',section.id)} className="sections-table__edit-button"><i className="fa fa-edit"></i></div>
                                    <div onClick={e=>handleDelete(e, section.id)} className="sections-table__edit-button"><i className="fa fa-trash"></i></div>
                                </div>
                    }
                }) || [] }
                page={ state.page }
                totalSize={ sectionsList?.page || 0 }
                onTableChange={ handleTableChange }
                setQuery={setSearchQuery}
            />       
        </div>
    );
}
const mapStateToProps = state => ({
    sectionsList: state.sections.sections
});
const mapDispatchToProps = dispatch => ({ 
    getAllSections: (courseId)=>{
        dispatch(getAllSections(courseId))
    },
    deleteSection: (id, courseId)=>{
        dispatch(deleteSection(id, courseId))
    },
    clearSection: ()=>{
        dispatch(clearSection())
    }
});

export default compose(withRouter, connect(mapStateToProps, mapDispatchToProps))(SectionTable);
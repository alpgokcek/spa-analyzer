import React, {useEffect, useState} from 'react';

import {INSTRUCTORS_GIVE_SECTIONS, ACTIVE} from 'AppConstants'
import { withRouter } from 'react-router';

import { connect } from 'react-redux';
import { compose } from 'redux';
import { clearInstructorsGiveSections, deleteInstructorsGiveSections, getAllInstructorsGiveSections } from 'Actions';
import Table from 'Components/Table'
import './table.scss';

const InstructorsGiveSectionsTable = (props) => {
    const {history, match, instructorsGiveSectionsList} = props
    const handleOnClick = (e, to, id) => {
        e.preventDefault();
        to === 'instructors-give-sections' ? history.push(`/instructors-give-sections/edit/${id}`) : history.push(`/${to}/${id}`)
    }
    const handleDelete = (e, id) => {
        props.deleteInstructorsGiveSections(id)
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
        props.clearInstructorsGiveSections()
        props.getAllInstructorsGiveSections(match.params.instructorId ? `?instructor=${match.params.instructorId}` : `?section=${match.params.sectionId}`)
    }, [state.page, state.flag])

    useEffect(() => {
        if(instructorsGiveSectionsList.page) setState({...state, totalSize: instructorsGiveSectionsList.page.totalElements})
    }, [instructorsGiveSectionsList])

    return (
        <div>
            <Table
                columns={INSTRUCTORS_GIVE_SECTIONS.list.columns}
                data={ instructorsGiveSectionsList?.content?.map(sts=>{
                    return {
                        ...sts,
                        average: Number(sts.average).toFixed(2),
                        _actions: <div className="instructors-give-sections-table__actions">
                                    <div onClick={e=>handleOnClick(e, 'program-report', sts.id)} className="instructors-give-sections-table__edit-button"><i className="fa fa-columns"></i></div>
                                    <div onClick={e=>handleOnClick(e, 'students', sts.id)} className="instructors-give-sections-table__edit-button"><i className="fa fa-paperclip"></i></div>
                                    <div onClick={e=>handleOnClick(e, 'instructors-give-sections',sts.id)} className="instructors-give-sections-table__edit-button"><i className="fa fa-edit"></i></div>
                                    <div onClick={e=>handleDelete(e, sts.id)} className="instructors-give-sections-table__edit-button"><i className="fa fa-trash"></i></div>
                                </div>
                    }
                }) || [] }
                page={ state.page }
                totalSize={ instructorsGiveSectionsList?.page || 0 }
                onTableChange={ handleTableChange }
                setQuery={setSearchQuery}
            />       
        </div>
    );
}
const mapStateToProps = state => ({
    instructorsGiveSectionsList: state.instructorsGiveSections.instructorsGiveSectionsList
});
const mapDispatchToProps = dispatch => ({ 
    getAllInstructorsGiveSections: (query)=>{
        dispatch(getAllInstructorsGiveSections(query))
    },
    deleteInstructorsGiveSections: (id)=>{
        dispatch(deleteInstructorsGiveSections(id))
    },
    clearInstructorsGiveSections: ()=>{
        dispatch(clearInstructorsGiveSections())
    }
});

export default compose(withRouter, connect(mapStateToProps, mapDispatchToProps))(InstructorsGiveSectionsTable);
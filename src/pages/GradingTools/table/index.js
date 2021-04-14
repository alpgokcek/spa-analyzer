import React, {useEffect, useState} from 'react';

import {GRADING_TOOLS, ACTIVE} from 'AppConstants'
import { withRouter } from 'react-router';

import { connect } from 'react-redux';
import { compose } from 'redux';
import { clearGradingTool, deleteGradingTool, getAllGradingTools } from 'Actions';
import Table from 'Components/Table'
import './table.scss';

const GradingToolsTable = (props) => {
    const {history, match, gradingToolsList} = props
    const handleOnClick = (e, to, id) => {
        e.preventDefault();
        to === 'grading-tools' ? history.push(`/grading-tools/${match.params.courseId}/${match.params.assessmentId}/edit/${id}`) : history.push(`/${to}/${id}`)
    }
    const handleDelete = (e, id) => {
        props.deleteGradingTool(id, match.params.assessmentId)
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
        props.clearGradingTool()
        props.getAllGradingTools(match.params.assessmentId)
    }, [state.page, state.flag])

    useEffect(() => {
        setState({...state, page: 1, flag: !state.flag})
    }, [sortQuery, searchQuery])

    useEffect(() => {
        if(gradingToolsList.page) setState({...state, totalSize: gradingToolsList.page.totalElements})
    }, [gradingToolsList])

    return (
        <div>
            <Table
                columns={GRADING_TOOLS.list.columns.map(col => {
                    return {
                        ...col,
                        onSort: (field, order) => setSortQuery(`&sort_by=${field}&order=${order}`)
                    }
                })}
                data={ gradingToolsList?.content?.map(gt=>{
                    return {
                        ...gt,
                        _actions: <div className="grading-tools-table__actions">
                                    <div onClick={e=>handleOnClick(e, `students-answer-gt/${gt.course_id}/grading-tool`, gt.id)} className="assessments-table__edit-button"><i className="fa fa-book"></i></div>
                                    <div onClick={e=>handleOnClick(e, `gt-cover-co/${gt.course_id}/grading-tool`, gt.id)} className="departments-table__edit-button"><i className="fa fa-outdent"></i></div>
                                    <div onClick={e=>handleOnClick(e, 'grading-tools',gt.id)} className="grading-tools-table__edit-button"><i className="fa fa-edit"></i></div>
                                    <div onClick={e=>handleDelete(e, gt.id)} className="grading-tools-table__edit-button"><i className="fa fa-trash"></i></div>
                                </div>
                    }
                }) || [] }
                page={ state.page }
                totalSize={ gradingToolsList?.page || 0 }
                onTableChange={ handleTableChange }
                setQuery={setSearchQuery}
            />       
        </div>
    );
}
const mapStateToProps = state => ({
    gradingToolsList: state.gradingTools.gradingTools
});
const mapDispatchToProps = dispatch => ({ 
    getAllGradingTools: (assessmentId)=>{
        dispatch(getAllGradingTools(assessmentId))
    },
    deleteGradingTool: (id, gradingToolId)=>{
        dispatch(deleteGradingTool(id, gradingToolId))
    },
    clearGradingTool: ()=>{
        dispatch(clearGradingTool())
    }
});

export default compose(withRouter, connect(mapStateToProps, mapDispatchToProps))(GradingToolsTable);
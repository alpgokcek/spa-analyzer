import React, {useEffect, useState} from 'react';

import { STUDENTS_ANSWER_GT } from 'AppConstants'
import { withRouter } from 'react-router';

import { connect } from 'react-redux';
import { compose } from 'redux';
import { clearStudentsAnswerGT, deleteStudentsAnswerGT, getAllStudentsAnswerGT } from 'Actions';
import Table from 'Components/Table'
import './table.scss';

const StudentsAnswerGTTable = (props) => {
    const {history, match, sagtList} = props
    const handleOnClick = (e, to, id) => {
        e.preventDefault();
        to === 'students-answer-gt' ? history.push(`/students-answer-gt/${match.params.courseId}/edit/${id}`) : history.push(`/${to}/${id}`)
    }
    const handleDelete = (e, id) => {
        props.deleteStudentsAnswerGT(id)
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
        props.clearStudentsAnswerGT()
        props.getAllStudentsAnswerGT(match.params.studentId ? `?student=${match.params.studentId}` : `?gradingTool=${match.params.gradingToolId}`)
    }, [state.page, state.flag])

    useEffect(() => {
        if(sagtList.page) setState({...state, totalSize: sagtList.page.totalElements})
    }, [sagtList])

    return (
        <div>
            <Table
                columns={STUDENTS_ANSWER_GT.list.columns}
                data={ sagtList?.map(sagt=>{
                    return {
                        ...sagt,
                        name: `${sagt.course_code} - ${sagt.course_name}`,
                        grading_tool: `${sagt.assessment_name} - ${sagt.question_number}`,
                        _actions: <div className="students-answer-gt-table__actions">
                                    <div onClick={e=>handleOnClick(e, 'students-answer-gt',sagt.id)} className="students-answer-gt-table__edit-button"><i className="fa fa-edit"></i></div>
                                    <div onClick={e=>handleDelete(e, sagt.id)} className="students-answer-gt-table__edit-button"><i className="fa fa-trash"></i></div>
                                </div>
                    }
                }) || [] }
                page={ state.page }
                totalSize={ sagtList?.page || sagtList?.length || 0 }
                onTableChange={ handleTableChange }
                setQuery={setSearchQuery}
            />       
        </div>
    );
}
const mapStateToProps = state => ({
    sagtList: state.sagt.sagtList
});
const mapDispatchToProps = dispatch => ({ 
    getAllStudentsAnswerGT: (query)=>{
        dispatch(getAllStudentsAnswerGT(query))
    },
    deleteStudentsAnswerGT: (id)=>{
        dispatch(deleteStudentsAnswerGT(id))
    },
    clearStudentsAnswerGT: ()=>{
        dispatch(clearStudentsAnswerGT())
    }
});

export default compose(withRouter, connect(mapStateToProps, mapDispatchToProps))(StudentsAnswerGTTable);
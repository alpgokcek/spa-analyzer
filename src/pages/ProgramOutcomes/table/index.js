import React, {useEffect, useState} from 'react';

import {COURSE_OUTCOMES, ACTIVE} from 'AppConstants'
import { withRouter } from 'react-router';

import { connect } from 'react-redux';
import { compose } from 'redux';
import { clearProgramOutcome, deleteProgramOutcome, getAllProgramOutcomes } from 'Actions';
import Table from 'Components/Table'
import './table.scss';

const ProgramOutcomeTable = (props) => {
    const {history, match, programOutcomesList} = props
    const handleOnClick = (e, to, id) => {
        e.preventDefault();
        to === 'program-outcomes' ? history.push(`/program-outcomes/${match.params.departmentId}/edit/${id}`) : history.push(`/${to}/${id}`)
    }
    const handleDelete = (e, id) => {
        props.deleteProgramOutcome(id, match.params.departmentId)
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
        props.clearProgramOutcome()
        props.getAllProgramOutcomes(match.params.departmentId)
    }, [state.page, state.flag])

    useEffect(() => {
        setState({...state, page: 1, flag: !state.flag})
    }, [sortQuery, searchQuery])

    useEffect(() => {
        if(programOutcomesList.page) setState({...state, totalSize: programOutcomesList.page.totalElements})
    }, [programOutcomesList])

    return (
        <div>
            <Table
                columns={COURSE_OUTCOMES.list.columns.map(col => {
                    return {
                        ...col,
                        onSort: (field, order) => setSortQuery(`&sort_by=${field}&order=${order}`)
                    }
                })}
                data={ programOutcomesList?.content?.map(programOutcome=>{
                    return {
                        ...programOutcome,
                        _actions: <div className="program-outcomes-table__actions">
                                    <div onClick={e=>handleOnClick(e, 'students', programOutcome.id)} className="program-outcomes-table__edit-button"><i className="fa fa-paperclip"></i></div>
                                    <div onClick={e=>handleOnClick(e, 'program-outcomes',programOutcome.id)} className="program-outcomes-table__edit-button"><i className="fa fa-edit"></i></div>
                                    <div onClick={e=>handleDelete(e, programOutcome.id)} className="program-outcomes-table__edit-button"><i className="fa fa-trash"></i></div>
                                </div>
                    }
                }) || [] }
                page={ state.page }
                totalSize={ programOutcomesList?.page || 0 }
                onTableChange={ handleTableChange }
                setQuery={setSearchQuery}
            />       
        </div>
    );
}
const mapStateToProps = state => ({
    programOutcomesList: state.programOutcomes.programOutcomes
});
const mapDispatchToProps = dispatch => ({ 
    getAllProgramOutcomes: (departmentId)=>{
        dispatch(getAllProgramOutcomes(departmentId))
    },
    deleteProgramOutcome: (id, departmentId)=>{
        dispatch(deleteProgramOutcome(id, departmentId))
    },
    clearProgramOutcome: ()=>{
        dispatch(clearProgramOutcome())
    }
});

export default compose(withRouter, connect(mapStateToProps, mapDispatchToProps))(ProgramOutcomeTable);
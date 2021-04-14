import React, {useEffect, useState} from 'react';

import { GT_COVER_CO, ACTIVE } from 'AppConstants'
import { withRouter } from 'react-router';

import { connect } from 'react-redux';
import { compose } from 'redux';
import { clearGTCoverCO, deleteGTCoverCO, getAllGTCoverCO } from 'Actions';
import Table from 'Components/Table'
import './table.scss';

const GTCoverCOTable = (props) => {
    const {history, match, gtccoList} = props
    const handleOnClick = (e, to, id) => {
        e.preventDefault();
        ///${match.params.gradingToolId ? `grading-tool/${match.params.gradingToolId}` : `course-outcome/${match.params.courseOutcomeId}`}
        to === 'gt-cover-co' ? history.push(`/gt-cover-co/${match.params.courseId}/edit/${id}`) : history.push(`/${to}/${id}`)

    }
    const handleDelete = (e, id) => {
        props.deleteGTCoverCO(id)
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
        props.clearGTCoverCO()
        props.getAllGTCoverCO(match.params.courseOutcomeId ? `?courseOutcome=${match.params.courseOutcomeId}` : `?gradingTool=${match.params.gradingToolId}`)
    }, [state.page, state.flag])

    useEffect(() => {
        if(gtccoList.page) setState({...state, totalSize: gtccoList.page.totalElements})
    }, [gtccoList])

    return (
        <div>
            <Table
                columns={GT_COVER_CO.list.columns}
                data={ gtccoList?.map(gtcco=>{
                    return {
                        ...gtcco,
                        name: `${gtcco.assessment_name} - ${gtcco.question_number}`,
                        _actions: <div className="gt-cover-co-table__actions">
                                    <div onClick={e=>handleOnClick(e, 'gt-cover-co',gtcco.id)} className="gt-cover-co-table__edit-button"><i className="fa fa-edit"></i></div>
                                    <div onClick={e=>handleDelete(e, gtcco.id)} className="gt-cover-co-table__edit-button"><i className="fa fa-trash"></i></div>
                                </div>
                    }
                }) || [] }
                page={ state.page }
                totalSize={ gtccoList?.page || gtccoList?.length || 0 }
                onTableChange={ handleTableChange }
                setQuery={setSearchQuery}
            />       
        </div>
    );
}
const mapStateToProps = state => ({
    gtccoList: state.gtcco.gtccoList
});
const mapDispatchToProps = dispatch => ({ 
    getAllGTCoverCO: (query)=>{
        dispatch(getAllGTCoverCO(query))
    },
    deleteGTCoverCO: (id)=>{
        dispatch(deleteGTCoverCO(id))
    },
    clearGTCoverCO: ()=>{
        dispatch(clearGTCoverCO())
    }
});

export default compose(withRouter, connect(mapStateToProps, mapDispatchToProps))(GTCoverCOTable);
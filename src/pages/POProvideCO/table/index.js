import React, {useEffect, useState} from 'react';

import { PO_PROVIDE_CO, ACTIVE } from 'AppConstants'
import { withRouter } from 'react-router';

import { connect } from 'react-redux';
import { compose } from 'redux';
import { clearPOProvideCO, deletePOProvideCO, getAllPOProvideCO } from 'Actions';
import Table from 'Components/Table'
import './table.scss';

const POPCOTable = (props) => {
    const {history, match, popcoList} = props
    const handleOnClick = (e, to, id) => {
        e.preventDefault();
        to === 'po-provide-co' ? history.push(`/po-provide-co/${match.params.courseId}/edit/${id}`) : history.push(`/${to}/${id}`)
    }
    const handleDelete = (e, id) => {
        props.deletePOProvideCO(id)
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
        props.clearPOProvideCO()
        props.getAllPOProvideCO(match.params.courseOutcomeId ? `?courseOutcome=${match.params.courseOutcomeId}` : `?programOutcome=${match.params.programOutcomeId}`)
    }, [state.page, state.flag])

    useEffect(() => {
        if(popcoList.page) setState({...state, totalSize: popcoList.page.totalElements})
    }, [popcoList])

    return (
        <div>
            <Table
                columns={PO_PROVIDE_CO.list.columns}
                data={ popcoList?.map(popco=>{
                    return {
                        ...popco,
                        _actions: <div className="po-provide-co-table__actions">
                                    <div onClick={e=>handleOnClick(e, 'po-provide-co',popco.id)} className="po-provide-co-table__edit-button"><i className="fa fa-edit"></i></div>
                                    <div onClick={e=>handleDelete(e, popco.id)} className="po-provide-co-table__edit-button"><i className="fa fa-trash"></i></div>
                                </div>
                    }
                }) || [] }
                page={ state.page }
                totalSize={ popcoList?.page || popcoList?.length || 0 }
                onTableChange={ handleTableChange }
                setQuery={setSearchQuery}
            />       
        </div>
    );
}
const mapStateToProps = state => ({
    popcoList: state.popco.popcoList
});
const mapDispatchToProps = dispatch => ({ 
    getAllPOProvideCO: (query)=>{
        dispatch(getAllPOProvideCO(query))
    },
    deletePOProvideCO: (id)=>{
        dispatch(deletePOProvideCO(id))
    },
    clearPOProvideCO: ()=>{
        dispatch(clearPOProvideCO())
    }
});

export default compose(withRouter, connect(mapStateToProps, mapDispatchToProps))(POPCOTable);
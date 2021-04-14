import React from 'react';
import ContentWrapper from 'Components/Layout/ContentWrapper';
import { Card, CardHeader, CardBody, Button } from 'reactstrap';
import POPCOTable from './table';
import { PO_PROVIDE_CO } from 'AppConstants';
import { withRouter } from 'react-router';

import './po-provide-co.scss';

function POProvideCO(props){
    const {history, match} = props
    return (
        <ContentWrapper>
            <div className="content-heading">
               {PO_PROVIDE_CO.list.pageName}
            </div>
            <Card>
                <CardHeader className="po-provide-co-card-header">
                    <span>{PO_PROVIDE_CO.list.cardHeader}</span>
                    <Button onClick={()=>history.push(`/po-provide-co/create`)} color="primary" className="btn-labeled po-provide-co-card-header__button">
                        <span className="btn-label"><i className="fa fa-plus"></i></span>{PO_PROVIDE_CO.list.new}
                    </Button>
                </CardHeader>
                <CardBody>
                    <POPCOTable/>
                </CardBody>
            </Card>
        </ContentWrapper>
    );
}

export default withRouter(POProvideCO);
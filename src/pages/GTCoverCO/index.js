import React from 'react';
import ContentWrapper from 'Components/Layout/ContentWrapper';
import { Card, CardHeader, CardBody, Button } from 'reactstrap';
import GTCoverCOTable from './table';
import { GT_COVER_CO } from 'AppConstants';
import { withRouter } from 'react-router';

import './gt-cover-co.scss';

function GTCoverCO(props){
    const {history} = props
    return (
        <ContentWrapper>
            <div className="content-heading">
               {GT_COVER_CO.list.pageName}
            </div>
            <Card>
                <CardHeader className="gt-cover-co-card-header">
                    <span>{GT_COVER_CO.list.cardHeader}</span>
                    <Button onClick={()=>history.push(`/gt-cover-co/create`)} color="primary" className="btn-labeled gt-cover-co-card-header__button">
                        <span className="btn-label"><i className="fa fa-plus"></i></span>{GT_COVER_CO.list.new}
                    </Button>
                </CardHeader>
                <CardBody>
                    <GTCoverCOTable/>
                </CardBody>
            </Card>
        </ContentWrapper>
    );
}

export default withRouter(GTCoverCO);
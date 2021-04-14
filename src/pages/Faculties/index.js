import React from 'react';
import ContentWrapper from 'Components/Layout/ContentWrapper';
import { Card, CardHeader, CardBody, Button } from 'reactstrap';
import FacultiesTable from './table';
import { FACULTIES } from 'AppConstants';
import { withRouter } from 'react-router';

import './faculties.scss';

function Faculties(props){
    const {history} = props

        return (
            <ContentWrapper>
                <div className="content-heading">
                   {FACULTIES.list.pageName}
                </div>
                <Card>
                    <CardHeader className="faculties-card-header">
                        <span>{FACULTIES.list.cardHeader}</span>
                        <Button onClick={()=>history.push('/faculties/create')} color="primary" className="btn-labeled faculties-card-header__button">
                            <span className="btn-label"><i className="fa fa-plus"></i></span>{FACULTIES.list.new}
                        </Button>
                    </CardHeader>
                    <CardBody>
                        <FacultiesTable/>
                    </CardBody>
                </Card>
            </ContentWrapper>
        );

}

export default withRouter(Faculties);
import React from 'react';
import ContentWrapper from 'Components/Layout/ContentWrapper';
import { Card, CardHeader, CardBody, Button } from 'reactstrap';
import DepartmentsTable from './table';
import { DEPARTMENTS } from 'AppConstants';
import { withRouter } from 'react-router';

import './departments.scss';

function Departments(props){
    const {history, match} = props
    return (
        <ContentWrapper>
            <div className="content-heading">
               {DEPARTMENTS.list.pageName}
            </div>
            <Card>
                <CardHeader className="departments-card-header">
                    <span>{DEPARTMENTS.list.cardHeader}</span>
                    <Button onClick={()=>history.push(`/departments/create`)} color="primary" className="btn-labeled departments-card-header__button">
                        <span className="btn-label"><i className="fa fa-plus"></i></span>{DEPARTMENTS.list.new}
                    </Button>
                </CardHeader>
                <CardBody>
                    <DepartmentsTable/>
                </CardBody>
            </Card>
        </ContentWrapper>
    );

}

export default withRouter(Departments);
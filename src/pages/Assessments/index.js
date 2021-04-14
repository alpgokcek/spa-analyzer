import React from 'react';
import ContentWrapper from 'Components/Layout/ContentWrapper';
import { Card, CardHeader, CardBody, Button } from 'reactstrap';
import AssessmentsTable from './table';
import { ASSESSMENTS } from 'AppConstants';
import { withRouter } from 'react-router';

import './assessments.scss';

function Assessments(props){
    const {history, match} = props
    return (
        <ContentWrapper>
            <div className="content-heading">
               {ASSESSMENTS.list.pageName}
            </div>
            <Card>
                <CardHeader className="assessments-card-header">
                    <span>{ASSESSMENTS.list.cardHeader}</span>
                    <Button onClick={()=>history.push({pathname:`/assessments/create`, courseId: match.params.courseId})} color="primary" className="btn-labeled assessments-card-header__button">
                        <span className="btn-label"><i className="fa fa-plus"></i></span>{ASSESSMENTS.list.new}
                    </Button>
                </CardHeader>
                <CardBody>
                    <AssessmentsTable/>
                </CardBody>
            </Card>
        </ContentWrapper>
    );

}

export default withRouter(Assessments);
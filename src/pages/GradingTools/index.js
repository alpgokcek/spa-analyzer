import React from 'react';
import ContentWrapper from 'Components/Layout/ContentWrapper';
import { Card, CardHeader, CardBody, Button } from 'reactstrap';
import GradingToolsTable from './table';
import { GRADING_TOOLS } from 'AppConstants';
import { withRouter } from 'react-router';

import './grading-tools.scss';

function GradingTools(props){
    const {history, match} = props
    return (
        <ContentWrapper>
            <div className="content-heading">
               {GRADING_TOOLS.list.pageName}
            </div>
            <Card>
                <CardHeader className="grading-tools-card-header">
                    <span>{GRADING_TOOLS.list.cardHeader}</span>
                    <Button onClick={()=>history.push(`/grading-tools/${match.params.courseId}/create`)} color="primary" className="btn-labeled grading-tools-card-header__button">
                        <span className="btn-label"><i className="fa fa-plus"></i></span>{GRADING_TOOLS.list.new}
                    </Button>
                </CardHeader>
                <CardBody>
                    <GradingToolsTable/>
                </CardBody>
            </Card>
        </ContentWrapper>
    );

}

export default withRouter(GradingTools);
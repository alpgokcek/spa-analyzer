import React from 'react';
import ContentWrapper from 'Components/Layout/ContentWrapper';
import { Card, CardHeader, CardBody, Button } from 'reactstrap';
import CourseOutcomesTable from './table';
import { COURSE_OUTCOMES } from 'AppConstants';
import { withRouter } from 'react-router';

import './course-outcomes.scss';

function CourseOutcomes(props){
    const {history, match} = props
    return (
        <ContentWrapper>
            <div className="content-heading">
               {COURSE_OUTCOMES.list.pageName}
            </div>
            <Card>
                <CardHeader className="course-outcomes-card-header">
                    <span>{COURSE_OUTCOMES.list.cardHeader}</span>
                    <Button onClick={()=>history.push(`/course-outcomes/create`)} color="primary" className="btn-labeled course-outcomes-card-header__button">
                        <span className="btn-label"><i className="fa fa-plus"></i></span>{COURSE_OUTCOMES.list.new}
                    </Button>
                </CardHeader>
                <CardBody>
                    <CourseOutcomesTable/>
                </CardBody>
            </Card>
        </ContentWrapper>
    );

}

export default withRouter(CourseOutcomes);
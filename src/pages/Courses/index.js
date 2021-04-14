import React from 'react';
import ContentWrapper from 'Components/Layout/ContentWrapper';
import { Card, CardHeader, CardBody, Button } from 'reactstrap';
import CoursesTable from './table';
import { COURSES } from 'AppConstants';
import { withRouter } from 'react-router';

import './courses.scss';

function Courses(props){
    const {history, match} = props
    return (
        <ContentWrapper>
            <div className="content-heading">
               {COURSES.list.pageName}
            </div>
            <Card>
                <CardHeader className="courses-card-header">
                    <span>{COURSES.list.cardHeader}</span>
                    <div className="courses-buttons">
                        <Button onClick={()=>history.push(`/courses/import`)} color="primary" className="btn-labeled courses-card-header__button">
                            <span className="btn-label"><i className="fa fa-file-import"></i></span>{COURSES.list.import}
                        </Button>
                        <Button onClick={()=>history.push(`/courses/create`)} color="primary" className="btn-labeled courses-card-header__button">
                            <span className="btn-label"><i className="fa fa-plus"></i></span>{COURSES.list.new}
                        </Button>
                    </div>
                    
                </CardHeader>
                <CardBody>
                    <CoursesTable/>
                </CardBody>
            </Card>
        </ContentWrapper>
    );

}

export default withRouter(Courses);
import React from 'react';
import ContentWrapper from 'Components/Layout/ContentWrapper';
import { Card, CardHeader, CardBody, Button } from 'reactstrap';
import StudentsTakeSectionsTable from './table';
import { STUDENTS_TAKE_SECTIONS } from 'AppConstants';
import { withRouter } from 'react-router';

import './students-take-sections.scss';

function StudentsTakeSections(props){
    const {history, match} = props
    return (
        <ContentWrapper>
            <div className="content-heading">
               {STUDENTS_TAKE_SECTIONS.list.pageName}
            </div>
            <Card>
                <CardHeader className="students-take-sections-card-header">
                    <span>{STUDENTS_TAKE_SECTIONS.list.cardHeader}</span>
                    <div className="students-take-sections-buttons">
                        <Button onClick={()=>history.push(`/students-take-sections/import`)} color="primary" className="btn-labeled students-take-sections-card-header__button">
                            <span className="btn-label"><i className="fa fa-file-import"></i></span>{STUDENTS_TAKE_SECTIONS.list.import}
                        </Button>
                        <Button onClick={()=>history.push(`/students-take-sections/create`)} color="primary" className="btn-labeled students-take-sections-card-header__button">
                            <span className="btn-label"><i className="fa fa-plus"></i></span>{STUDENTS_TAKE_SECTIONS.list.new}
                        </Button>
                    </div>
                </CardHeader>
                <CardBody>
                    <StudentsTakeSectionsTable/>
                </CardBody>
            </Card>
        </ContentWrapper>
    );

}

export default withRouter(StudentsTakeSections);
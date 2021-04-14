import React from 'react';
import ContentWrapper from 'Components/Layout/ContentWrapper';
import { Card, CardHeader, CardBody, Button } from 'reactstrap';
import StudentsAnswerGTTable from './table';
import { STUDENTS_ANSWER_GT } from 'AppConstants';
import { withRouter } from 'react-router';

import './students-answer-gt.scss';

function StudentsAnswerGT(props){
    const {history, match} = props
    return (
        <ContentWrapper>
            <div className="content-heading">
               {STUDENTS_ANSWER_GT.list.pageName}
            </div>
            <Card>
                <CardHeader className="students-answer-gt-card-header">
                    <span>{STUDENTS_ANSWER_GT.list.cardHeader}</span>
                    <Button onClick={()=>history.push(`/students-answer-gt/create`)} color="primary" className="btn-labeled students-answer-gt-card-header__button">
                        <span className="btn-label"><i className="fa fa-plus"></i></span>{STUDENTS_ANSWER_GT.list.new}
                    </Button>
                </CardHeader>
                <CardBody>
                    <StudentsAnswerGTTable/>
                </CardBody>
            </Card>
        </ContentWrapper>
    );
}

export default withRouter(StudentsAnswerGT);
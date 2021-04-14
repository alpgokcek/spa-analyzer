import React from 'react';
import ContentWrapper from 'Components/Layout/ContentWrapper';
import { Card, CardHeader, CardBody, Button } from 'reactstrap';
import CourseOutcomesTable from './table';
import { SECTIONS } from 'AppConstants';
import { withRouter } from 'react-router';

import './sections.scss';

function CourseOutcomes(props){
    const {history, match} = props
    return (
        <ContentWrapper>
            <div className="content-heading">
               {SECTIONS.list.pageName}
            </div>
            <Card>
                <CardHeader className="sections-card-header">
                    <span>{SECTIONS.list.cardHeader}</span>
                    <div className="sections-buttons">
                        <Button onClick={()=>history.push(`/sections/import`)} color="primary" className="btn-labeled sections-card-header__button">
                            <span className="btn-label"><i className="fa fa-file-import"></i></span>{SECTIONS.list.import}
                        </Button>
                        <Button onClick={()=>history.push(`/sections/${match.params.courseId}/create`)} color="primary" className="btn-labeled sections-card-header__button">
                            <span className="btn-label"><i className="fa fa-plus"></i></span>{SECTIONS.list.new}
                        </Button>
                    </div>
                </CardHeader>
                <CardBody>
                    <CourseOutcomesTable/>
                </CardBody>
            </Card>
        </ContentWrapper>
    );

}

export default withRouter(CourseOutcomes);
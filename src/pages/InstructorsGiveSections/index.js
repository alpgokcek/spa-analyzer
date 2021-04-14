import React from 'react';
import ContentWrapper from 'Components/Layout/ContentWrapper';
import { Card, CardHeader, CardBody, Button } from 'reactstrap';
import StudentsTakeSectionsTable from './table';
import { INSTRUCTORS_GIVE_SECTIONS } from 'AppConstants';
import { withRouter } from 'react-router';

import './instructors-give-sections.scss';

function InstructorsGiveSections(props){
    const {history, match} = props
    return (
        <ContentWrapper>
            <div className="content-heading">
               {INSTRUCTORS_GIVE_SECTIONS.list.pageName}
            </div>
            <Card>
                <CardHeader className="instructors-give-sections-card-header">
                    <span>{INSTRUCTORS_GIVE_SECTIONS.list.cardHeader}</span>
                    <div className="instructors-give-sections-buttons">
                        <Button onClick={()=>history.push(`/instructors-give-sections/import`)} color="primary" className="btn-labeled instructors-give-sections-card-header__button">
                            <span className="btn-label"><i className="fa fa-file-import"></i></span>{INSTRUCTORS_GIVE_SECTIONS.list.import}
                        </Button>
                        <Button onClick={()=>history.push(`/instructors-give-sections/create`)} color="primary" className="btn-labeled instructors-give-sections-card-header__button">
                            <span className="btn-label"><i className="fa fa-plus"></i></span>{INSTRUCTORS_GIVE_SECTIONS.list.new}
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

export default withRouter(InstructorsGiveSections);
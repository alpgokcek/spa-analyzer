import React from 'react';
import ContentWrapper from 'Components/Layout/ContentWrapper';
import { Card, CardHeader, CardBody, Button } from 'reactstrap';
import ProgramOutcomesTable from './table';
import { PROGRAM_OUTCOMES } from 'AppConstants';
import { withRouter } from 'react-router';

import './program-outcomes.scss';

function ProgramOutcomes(props){
    const {history, match} = props
    return (
        <ContentWrapper>
            <div className="content-heading">
               {PROGRAM_OUTCOMES.list.pageName}
            </div>
            <Card>
                <CardHeader className="program-outcomes-card-header">
                    <span>{PROGRAM_OUTCOMES.list.cardHeader}</span>
                    <Button onClick={()=>history.push(`/program-outcomes/create`)} color="primary" className="btn-labeled program-outcomes-card-header__button">
                        <span className="btn-label"><i className="fa fa-plus"></i></span>{PROGRAM_OUTCOMES.list.new}
                    </Button>
                </CardHeader>
                <CardBody>
                    <ProgramOutcomesTable/>
                </CardBody>
            </Card>
        </ContentWrapper>
    );

}

export default withRouter(ProgramOutcomes);
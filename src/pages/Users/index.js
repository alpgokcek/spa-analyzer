import React from 'react';
import ContentWrapper from '../../components/Layout/ContentWrapper';
import { Card, CardHeader, CardBody, Button } from 'reactstrap';
import UsersTable from './table';

import './users.scss';
import { USERS } from 'AppConstants';
import { withRouter } from 'react-router';

function Users(props){
    const {history, userType} = props;
    return (
        <ContentWrapper>
            <div className="content-heading">
               {USERS.list.pageName}
            </div>
            <Card>
                <CardHeader className="users-card-header">
                    <span>{USERS.list.cardHeader}</span>
                    <div className="users-buttons">
                        <Button onClick={()=>history.push(`/users/import`)} color="primary" className="btn-labeled users-card-header__button">
                            <span className="btn-label"><i className="fa fa-file-import"></i></span>{USERS.list.import}
                        </Button>
                        <Button onClick={()=>history.push('/users/create')} color="primary" className="btn-labeled users-card-header__button">
                            <span className="btn-label"><i className="fa fa-plus"></i></span>{USERS.list.new}
                        </Button>
                    </div>
                </CardHeader>
                <CardBody>
                    <UsersTable userType={userType}/>
                </CardBody>
            </Card>
        </ContentWrapper>
    );

}

export default withRouter(Users);
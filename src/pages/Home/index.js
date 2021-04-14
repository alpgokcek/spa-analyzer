import React from 'react';
import ContentWrapper from '../../components/Layout/ContentWrapper';
import { Card, CardHeader, CardBody, CardTitle } from 'reactstrap';
import { ROLES } from 'AppConstants';

const Home = () => {
    return (
        <ContentWrapper>
            <div className="content-heading">
               <div>Ana Sayfa
                  <small>Hoşgeldiniz!</small>
               </div>
            </div>
            <Card>
                <CardHeader>
                    <CardTitle>Deneme Başlık</CardTitle>
                    <div className="text-sm">Deneme alt başlık</div>
                </CardHeader>
                <CardBody>
                    Deneme içerik
                </CardBody>
            </Card>
        </ContentWrapper>
    );

}

export default Home;
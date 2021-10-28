import React from 'react';
import { Card, CardImg, CardText, CardBody, CardTitle } from 'reactstrap';
import { Loading } from './LoadingComponent';
import { baseUrl } from '../shared/baseUrl';
import { FadeTransform } from 'react-animation-components';

function RenderCard({ item, isLoading, errMess }) {
    if (isLoading) {
        return <Loading />
    }
    if (errMess) {
        return <h4>{errMess}</h4>
    }
    const url = item;
    return (
        <FadeTransform
            in
            transformProps={{
                exitTransform: 'scale(0.5) translateY(50%)'
            }}>
            <Card>
                <CardImg src={console.log('URL: ' + url)} alt={item.name} />
                <CardBody>
                    <CardTitle>{item.name}</CardTitle>
                    <CardText>{item.description}</CardText>
                </CardBody>
            </Card>
        </FadeTransform>
    );
}

function Home(props) {
    return (
        <div className="container">
            <div className="row">
                <div className="col-md m-1">
                    <RenderCard item={props.campsite} isLoading={props.campsitesLoading} errMess={props.campsitesErrMess} />
                </div>
                <div className="col-md m-1">
                    <RenderCard item={props.promotions} isLoading={props.promotionLoading} errMess={props.promotionErrMess} />
                </div>
                <div className="col-md m-1">
                    <RenderCard item={props.partner} isLoading={props.partnerLoading} errMess={props.partnerErrMess} />
                </div>
            </div>
        </div>
    );
}

export default Home;

// C:\NucampFolder\NucampFolder\3-React\nucampsite\public\assets\images\breadcrumb-trail.jpg
// public\assets\images\breadcrumb-trail.jpg
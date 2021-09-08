import React from 'react';
import { Card, CardImg, CardText, CardBody } from 'reactstrap'
import { Breadcrumb, BreadcrumbItem } from 'reactstrap'
import { Link } from 'react-router-dom';
// import Directory from './DirectoryComponents';


function RenderComments({comments}){
    if (comments){
        return(
            <div>
                <h3>Comments</h3>
                {comments.map(comments => <section><p className='m-0'>{comments.text}</p><p>--{comments.author}, {new Intl.DateTimeFormat('en-US', {
                                                                                                     year: 'numeric',
                                                                                                     month: 'short',
                                                                                                     day: '2-digit'}).format(new Date(Date.parse(comments.date)))}</p></section>)}                
            </div>
        )
    }
}


function RenderCampsite({campsite}){
    return(
        <div class = 'col-md-5 m-1'>
            <Card>
                <CardImg top src={campsite.image} alt={campsite.name}/>
                <CardBody>
                    <CardText>{campsite.description}</CardText>
                </CardBody>
            </Card>
        </div>
    )
}

function CampsiteInfo(props){
    if (props.campsite){
        return(
            <div className = 'container'>
                <div className="row">
                    <div className="col">
                        <Breadcrumb>
                            <BreadcrumbItem><Link to="/directory">Directory</Link></BreadcrumbItem>
                            <BreadcrumbItem><Link active>{props.campsite.name}</Link></BreadcrumbItem>
                        </Breadcrumb>
                        <h2>{props.campsite.name}</h2>
                        <hr />
                    </div>
                </div>
                <div className = 'row'>
                    <RenderCampsite campsite = {props.campsite}/>
                    <RenderComments comments ={props.comments}/>
                </div>
            </div>

        )
    }else{
        return(
            <div>
                
            </div>
        )
    }
}
    

export default CampsiteInfo;
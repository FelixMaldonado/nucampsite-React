import React, {Component} from 'react';
// import { Card, CardImg, CardText, CardBody, Button } from 'reactstrap'
import { Breadcrumb, BreadcrumbItem, Modal, ModalHeader, ModalBody, Label, Card, CardImg, CardText, CardBody, Button } from 'reactstrap'
import { Link } from 'react-router-dom';
import { Control, LocalForm, Errors } from 'react-redux-form';
import {Loading} from './LoadingComponent';
import { baseUrl } from '../shared/baseUrl'


const required = val => val && val.length;
const maxLength = len => val => !val || (val.length <= len);
const minLength = len => val => val && (val.length >= len);
// const isNumber = val => !isNaN(+val);
// const validEmail = val => /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(val);

function RenderComments({comments, addComment, campsiteId}){
    if (comments){
        return(
            <div>
                <h3>Comments</h3>
                {comments.map(comments => <section><p className='m-0'>{comments.text}</p><p>--{comments.author}, {new Intl.DateTimeFormat('en-US', {
                                                                                                     year: 'numeric',
                                                                                                     month: 'short',
                                                                                                     day: '2-digit'}).format(new Date(Date.parse(comments.date)))}</p></section>)}   
                <CommentForm campsiteId={campsiteId} addComment={addComment} />             
            </div>
        )
    }
}


function RenderCampsite({campsite}){
    return(
        <div class = 'col-md-5 m-1'>
            <Card>
                <CardImg top src={baseUrl + campsite.image} alt={campsite.name}/>
                <CardBody>
                    <CardText>{campsite.description}</CardText>
                </CardBody>
            </Card>
            
        </div>
    )
}

function CampsiteInfo(props){
    if(props.isLoading){
        return(
            <div className = "container">
                <div className="row">
                    <Loading />
                </div>
            </div>
        )
    }
    if(props.errMess){
        return(
            <div className = "container">
                <div className="row">
                    <div className="col">
                        <h4>{props.errMess}</h4>
                    </div>
                </div>
            </div>
        )
    }
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
                    <RenderComments comments ={props.comments} 
                                    addComment={props.addComment}
                                    campsiteId={props.campsite.id}
                    />
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

class CommentForm extends Component{
    constructor(props){
        super(props);

        this.state= {
            isModalOpen: false,
            setDropDown: false,
            name: '',
            rating: '',
            comment: '',
            touched: {
                name: false,
                rating: false,
                comment: false,
            }
        };
    }

    toggleModal = () => {
        this.setState({isModalOpen: !this.state.isModalOpen});
    }

    handleSubmit(values){
        this.toggleModal();
        this.props.addComment(this.props.campsiteId, values.rating, values.author, values.text);
    }

    render(){
        return(
            <div className="container">
                <Button type="submit" color="light"  onClick={this.toggleModal}>
                <i className="fa fa-pencil fa-lg" />Submit Comment
                </Button>

                <Modal isOpen={this.state.isModalOpen} toggle={this.toggleModal}>
                    <ModalHeader toggle={this.toggleModal}>Submit Comment</ModalHeader>
                    <ModalBody>
                        <LocalForm onSubmit={values => this.handleSubmit(values)}>
                            <div className="form-group">
                                <Label htmlFor="rating">Rating</Label>
                                <Control.select model=".rating" id="rating" name="rating" className="form-control">
                                    <option value='1'>1</option>
                                    <option value='2'>2</option>
                                    <option value='3'>3</option>
                                    <option value='4'>4</option>
                                    <option value='5'>5</option>
                                </Control.select>   
                            </div>
                            <div className ="form-group">
                                <Label htmlFor="name">Your Name</Label>
                                    <Control.text model=".name" id="name" name="name"
                                        placeholder="Your Name"
                                        className ="form-control"
                                        validators={{
                                            required,
                                            minLength: minLength(2),
                                            maxLength: maxLength(15)
                                        }} 
                                    />
                                    <Errors
                                        className="text-danger"
                                        model=".name"
                                        show="touched"
                                        componenet="div"
                                        messages={{
                                            requreid: 'Required',
                                            minLength: 'Must be at least 2 characters',
                                            maxLength: 'Must be 15 character or less'
                                        }}
                                    />
                            </div>
                            <div className="form-group">
                                <Label htmlFor ="comment">Comment</Label>
                                    <Control.textarea model=".comment" id="comment" name="comment"
                                        placeholder=""
                                        className ="form-control"
                                        validators={{
                                            required,
                                            minLength: minLength(2),
                                            maxLength: maxLength(500)
                                        }} 
                                    />
                                    <Errors
                                        className="text-danger"
                                        model=".comment"
                                        show="touched"
                                        componenet="div"
                                        messages={{
                                            requreid: 'Required',
                                            minLength: 'Must be at least 2 characters',
                                            maxLength: 'Must be 500 character or less'
                                        }}
                                    />
                            </div>
                            <Button type='submit' value="submit" color="primary" onClick={this.toggleModal}>Submit</Button>
                        </LocalForm>
                    </ModalBody>
                </Modal>
            </div>
        )
    }
}
    

export default CampsiteInfo;
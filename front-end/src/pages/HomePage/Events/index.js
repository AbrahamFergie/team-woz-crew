import React, { Component } from 'react';
import { Container, Button, Modal, Row, Col, Image } from 'react-bootstrap';
import parse from 'html-react-parser';
import axios from 'axios';

require("./index.css");

const Meetup_API = "2657185b242c4410412771346973716d";

export class Events extends Component {
  constructor(props){
    super(props);
    this.state = {
      events: [],
      interest: 'python',
      //displayedIndex: null,
      readMore: false,
      modalData: { name: "", description: "<div></div>", localized_location: "" }
    }
  }
  
  componentDidMount = () => {
    this.getMeetup();
  }
  
  // handleReadMore = index => {
  //   this.setState({ readMore: true, displayedIndex: index })    
  // }

  // handleCollapse = () => {
  //   this.setState({ readMore: false, displayedIndex: null })    
  // }

  handleModalShow = ( index ) => {
    const { events, readMore } = this.state

    this.setState({ readMore: !readMore, modalData: events[index] })
  }
  
  handleShareAction = ( index ) => {
    const { events } = this.state
    const event = events[ index ]
    axios.post("/api/share/add", { type: "event", payload: event })
    .then( response => {
      console.log("event response", response)
    })
    .catch( err => {
      console.log('====err====', err)
    })
  }
  //Get Meetup API
  getMeetup = async () => {
    
    let interest = interest;
    const events = await axios.get(`https://cors-anywhere.herokuapp.com/api.meetup.com/find/groups?&zip=94544&text=programming&radius=10&key=${Meetup_API}`,{crossDomain: true})
    this.setState({
      events: events.data
    })
    //console.log(events)
  }
  
  render() {
    //displayedIndex, 
    const { events } = this.state
    console.log('====events====', events)
    return (
      <Container fluid={true} className="center">
        <h2><u>Events</u></h2>
        <hr></hr>
        <Row className="event-row">          
          { events ? events.map( (event, index) =>  {     
           let desc = event.description && typeof event.description === "string" ? parse(event.description) : "No description available";            
            return ( 
              <Col key={ index } md="4" className="center">

                <div className="event-title">
                  <h4>{ event.name }</h4>
                  <h5>{ event.localized_location }</h5>
                </div>

                {/* <Button variant="outline-dark" onClick={ this.handleModalShow.bind( this, index )}>
                  Read More
                </Button>

                <Modal
                  { ...this.props }
                  show={ this.state.readMore }
                  onHide={ this.handleModalShow.bind( this, index )}
                  size="lg"
                  aria-labelledby="contained-modal-title-vcenter"
                  centered
                  >
                  <Modal.Header closeButton>
                    <Modal.Title id="contained-modal-title-vcenter">
                      <h4>{ modalData.name }</h4>
                    </Modal.Title>
                  </Modal.Header>
                  <Modal.Body>
                    <Image src={ modalData.key_photo ? modalData.key_photo.photo_link : modalData.key_photo } thumbnail />
                    <h5>{ modalData.localized_location }</h5>
                    <div className="event-description">
                      <div>Description: { desc }</div>
                    </div>
                    <a className="btn btn-outline-dark" href={ modalData.link } target="_blank" rel="noopener noreferrer">Go To Posting</a>
                  </Modal.Body>                  
                </Modal> */}
                <Button type="button" className="btn" variant="dark" data-toggle="modal" data-target={`#modal-${ index }`}>
                  Read More
                </Button>
                <a className="btn btn-outline-dark" href={ event.link } target="_blank" rel="noopener noreferrer">Go To Posting</a>
                

                <div className="modal fade" id={`modal-${ index }`} tabIndex="-1" role="dialog" aria-labelledby="" aria-hidden="true">
                  <div className="modal-dialog modal-dialog-scrollable" role="document">
                    <div className="modal-content">
                      <div className="modal-header">
                        <h5 className="modal-title" id="">Modal title</h5>
                        <Button type="button" className="close" data-dismiss="modal" aria-label="Close">
                          <span aria-hidden="true">&times;</span>
                        </Button>
                      </div>
                      <div className="modal-body">
                        <Image src={ event.key_photo ? event.key_photo.photo_link : event.key_photo } thumbnail />
                        <h5>{ event.localized_location }</h5>
                        <div className="event-description">
                          <div>Description: { desc }</div>
                        </div>
                        <a className="btn btn-outline-dark" href={ event.link } target="_blank" rel="noopener noreferrer">Go To Posting</a>
                      </div>
                      <div className="modal-footer">
                        <Button className="btn" variant="dark" onClick={ this.handleShareAction.bind(this, index) }>Share</Button>    
                        <Button type="button" className="btn btn-secondary" data-dismiss="modal">Close</Button>
                      </div>
                    </div>
                  </div>
                </div>
                {/* <Row>
                  <Col>
                  { displayedIndex === index ? <Button className="btn btn-outline-dark" onClick={ this.handleCollapse.bind(this)}>Collapse</Button> : 
                  <Button key={ index } variant="outline-dark" onClick={ this.handleReadMore.bind(this, index)}>
                      Read More
                    </Button> }                    
                  </Col>
                  <Col>
                    <a className="btn btn-outline-dark" href={ event.link } target="_blank" rel="noopener noreferrer">Go To Posting</a>
                  </Col>
                  <Col>
                    <Button className="btn" variant="dark" onClick={ this.handleShareAction.bind(this, index) }>Share</Button>
                  </Col>
                </Row>
                { displayedIndex === index ? 
                <Row>
                  <Col>
                    <Image src={ event.key_photo ? event.key_photo.photo_link : event.key_photo } />
                    <div className="event-description">
                      <div><h4><strong>Description:</strong></h4> { desc }</div>
                    </div>
                  </Col>
                </Row> : <div></div> }  */}              
                <hr></hr> 
              </Col>
            )
          }) : <div><br></br><h4 className="center">Loading...</h4><br></br></div>
        }
      </Row>
    </Container>
    )
  }
}

export default Events

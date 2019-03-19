import React, { Component } from 'react';
import { Navbar, Nav, Button, ButtonGroup } from 'react-bootstrap';
import axios from 'axios';

require("./index.css");

export default class NavigationBar extends Component {
  constructor(props) {
    super(props)
    this.state = {
      userLoggedIn: false
    }
  }

  componentDidMount() {
    const { state } = this.props.history.location

    this.setState({ userLoggedIn: state ? state.loggedIn : false })
  }

  componentWillMount() {
    this.unlisten = this.props.history.listen(({ state }) => {
      this.setState({ userLoggedIn: state.loggedIn })
    });
  }

  componentWillUnmount() {
    this.unlisten();
  }

  handleLogout = async () => {
    localStorage.setItem("username", "")
    const result = await axios.get("/api/auth/logout");
    if(result.status === 200) {
      this.setState({ userLoggedIn: false })
      window.location.href = "/"
    };
  }

  handleRedirect = async ( page ) => {
    const userLoggedIn = await axios.get("/api/user/check-user")
    this.props.history.push( page, { loggedIn: userLoggedIn.data })
  }
  
  render() {
    const { userLoggedIn } = this.state
    return (
      <Navbar className="fixed-top w-100">
        <Navbar.Brand className="navvy" href="/">DevCompanion</Navbar.Brand>
        <Nav className="mr-auto">
<<<<<<< HEAD
<<<<<<< HEAD
          <Nav.Link href="/home">Home</Nav.Link>
          <Nav.Link href="/shared">Shared</Nav.Link>
          <Nav.Link href="/profile">Profile</Nav.Link>
          <Nav.Link href="/users">Users</Nav.Link>
=======
          <Button type="button" variant="light" className="navvy" onClick={this.handleHomeRedirect.bind(this)}>Home</Button>
          <Button type="button" variant="light" className="navvy" onClick={this.handleSharedRedirect.bind(this)}>Shared</Button>
          <Button type="button" variant="light" className="navvy" onClick={this.handleProfileRedirect.bind(this)}>Profile</Button>
          {/* <Nav.Link className="navvy" href="/home">Home</Nav.Link>
          <Nav.Link className="navvy" href="/shared">Shared</Nav.Link>
          <Nav.Link className="navvy" href="/profile">Profile</Nav.Link> */}
>>>>>>> logout button is persisting through page change
=======
        <ButtonGroup toggle>
          <Button type="button" variant="dark" defaultChecked value="1" className="navvy" onClick={this.handleRedirect.bind(this, "/home")}>Home</Button>
          <Button type="button" variant="dark" value="2" className="navvy" onClick={this.handleRedirect.bind(this, "/share-page")}>Shared</Button>
          <Button type="button" variant="dark" value="3" className="navvy" onClick={this.handleRedirect.bind(this, "/profile")}>Profile</Button>
        </ButtonGroup>
>>>>>>> styling and functionality updates
        </Nav>
        { userLoggedIn ? <Button variant="outline-secondary" onClick={this.handleLogout.bind(this)} className="btn float-right"><strong>Logout</strong></Button> : <div></div> }
      </Navbar>
    );
  }
}
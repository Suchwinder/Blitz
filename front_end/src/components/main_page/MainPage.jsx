import React from 'react';
import Nav from 'react-bootstrap/Nav'
import Navbar from 'react-bootstrap/Navbar'
import Form from 'react-bootstrap/Form'

const MainPage = () => {
  return(
    <Navbar bg="primary" variant="dark">
      <Navbar.Brand href="#home">Blitz</Navbar.Brand>
      <Nav className="mr-auto">
        <Nav.Link href="#home">Home</Nav.Link>
        <Nav.Link href="#create-group">Create Group</Nav.Link>
        <Nav.Link href="#join-group">Join Group</Nav.Link>
      </Nav>
      <Form inline>
      </Form>
    </Navbar>
)
    
}

export default MainPage;
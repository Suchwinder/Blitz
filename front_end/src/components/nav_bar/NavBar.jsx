import React from 'react';
import Nav from 'react-bootstrap/Nav'
import Navbar from 'react-bootstrap/Navbar'


const NavBar = () => {
  return(
    <header>
      <Navbar bg="primary" variant="dark">
        <Navbar.Brand href="#home">Blitz</Navbar.Brand>
        <Nav className="ml-auto">
          <Nav.Link href="#home">Home</Nav.Link>
          <Nav.Link href="#create-group">Create Group</Nav.Link>
          <Nav.Link href="#join-group">Join Group</Nav.Link>
        </Nav>
      </Navbar>
    </header>
  )   
}

export default NavBar;

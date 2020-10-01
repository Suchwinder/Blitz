import React from 'react';
import Nav from 'react-bootstrap/Nav'
import Navbar from 'react-bootstrap/Navbar'
import './MainPage.css'

const MainPage = () => {
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
      <div className="center">
        <h1>What do we do?</h1>
        <p>We help people split the bill.</p>
        <h2>How it works:</h2>
        <ol>
          <li>Create a group</li>{" "}
          <li>Enter Parameters (enter number of people)</li>{" "}
          <li>Upload the receipt and share your group's link</li>{" "}
          <li>Each individual selects their purchase(s)</li> <li>That's it</li>{" "}
        </ol>{" "}
      </div>
    </header>
    
)   
}

export default MainPage;
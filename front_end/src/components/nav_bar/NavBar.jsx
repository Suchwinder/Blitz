import React, { useEffect, useState } from 'react';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import { Redirect } from 'react-router-dom';


const NavBar = (props) => {
  const [page, setPage] = useState("");

  useEffect(() => {
    console.log("resetting", page);
    setPage("");
  })

  if(page === "main") {
    console.log(page);
    return <Redirect to="/"/>
  } else if (page === "create") {
    console.log(page);
    return <Redirect to="/create_group"/>
  } else if (page === "join") {
    console.log(page);
    return <Redirect to="/join_group"/>
  }
  
  return(
    <header>
      <Navbar bg="primary" variant="dark">
        <Navbar.Brand href="#home">Blitz</Navbar.Brand>
        <Nav className="ml-auto">
          <button onClick={() => setPage("main")}> Home </button>
          <button onClick={() => setPage("create")}> Create </button>
          <button onClick={() => setPage("join")}> Join </button>
          {/* <Nav.Link href="#home">Home</Nav.Link> */}
          {/* <Nav.Link href="#create-group">Create Group</Nav.Link> */}
          {/* <Nav.Link href="#join-group">Join Group</Nav.Link> */}
        </Nav>
      </Navbar>
    </header>
  )   
}

export default NavBar;

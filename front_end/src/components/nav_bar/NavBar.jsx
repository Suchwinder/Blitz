import React, { useEffect, useState } from "react";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import { Redirect } from "react-router-dom";
import { Button } from "reactstrap";

const NavBar = (props) => {
  const [page, setPage] = useState("");

  useEffect(() => {
    console.log("resetting", page);
    setPage("");
  });

  if (page === "main") {
    console.log(page);
    return <Redirect to="/" />;
  } else if (page === "create") {
    console.log(page);
    return <Redirect to="/create_group" />;
  } else if (page === "join") {
    console.log(page);
    return <Redirect to="/join_group" />;
  }

  return (
    <header>
      <Navbar bg="dark" variant="dark">
        <Navbar.Brand>Blitz</Navbar.Brand>
        <Nav className="ml-auto">
          <Button
            className="button"
            variant="dark"
            onClick={() => setPage("main")}
          >
            {" "}
            Home{" "}
          </Button>
          <Button variant="dark" onClick={() => setPage("create")}>
            {" "}
            Create{" "}
          </Button>
          <Button variant="dark" onClick={() => setPage("join")}>
            {" "}
            Join{" "}
          </Button>
          {/* <Nav.Link href="#home">Home</Nav.Link> */}
          {/* <Nav.Link href="#create-group">Create Group</Nav.Link> */}
          {/* <Nav.Link href="#join-group">Join Group</Nav.Link> */}
        </Nav>
      </Navbar>
    </header>
  );
};

export default NavBar;

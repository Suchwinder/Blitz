import React, { useEffect, useState } from "react";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import { Redirect } from "react-router-dom";
import { Button } from "reactstrap";

const NavBar = (props) => {
  const [page, setPage] = useState("");

  useEffect(() => {
    setPage("");
  }, [page]);

  if (page === "main") {
    return <Redirect to="/" />;
  } else if (page === "create") {
    return <Redirect to="/create_group" />;
  } else if (page === "join") {
    return <Redirect to="/join_group" />;
  }

  return (
    <header>
      <Navbar bg="dark" variant="dark">
        <Navbar.Brand onClick={() => setPage("main")}>Blitz</Navbar.Brand>
        <Nav className="ml-auto">
          <Button variant="dark" onClick={() => setPage("main")}>
            Home
          </Button>
          <Button variant="dark" onClick={() => setPage("create")}>
            Create
          </Button>
          <Button variant="dark" onClick={() => setPage("join")}>
            Join
          </Button>
        </Nav>
      </Navbar>
    </header>
  );
};

export default NavBar;

import React, { useEffect, useState } from "react";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import { Redirect } from "react-router-dom";
import { Button } from "reactstrap";
import { Link } from 'react-scroll';
import { makeStyles } from "@material-ui/core";

const useStyles = makeStyles({
  btn_space:{
    marginRight: "5px"
  }
});

const NavBar = (props) => {
  const classes = useStyles();
  const [page, setPage] = useState("");

  useEffect(() => {
    setPage("");
  }, [page]);

  if (page === "main") {
    return <Redirect to="/" />;
  } else if (page === "create") {
    return <Redirect to="/create_group" />;
  } 

  return (
    <header>
      <Navbar bg="dark" variant="dark">
        <Navbar.Brand onClick={() => setPage("main")}>Blitz</Navbar.Brand>
        <Nav className="ml-auto">
          <Button variant="dark" className={classes.btn_space} onClick={() => setPage("main")}>
            Home
          </Button>
          <Link activeClass= "active"
            to ="about"
            spy={true}
            smooth={true}
            offset ={-50}
            duration={500}>
          <Button variant="dark" className={classes.btn_space} onClick={() => setPage("main")}>
            About
          </Button> 
          </Link>
          <Button variant="dark" className={classes.btn_space} onClick={() => setPage("create")}>
            Create
          </Button>
        </Nav>
      </Navbar>
    </header>
  );
};

export default NavBar;

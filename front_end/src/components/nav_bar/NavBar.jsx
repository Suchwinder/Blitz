// import React, { useEffect, useState } from "react";
import React, {Component} from 'react';
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import { Redirect, Link } from "react-router-dom";
import { withRouter } from "react-router";
import { Button } from "reactstrap";
import Modal from '@material-ui/core/Modal';
import Fade from '@material-ui/core/Fade';
import Backdrop from '@material-ui/core/Backdrop';
import { withStyles } from "@material-ui/core/styles";

const styles = (theme) => ({
  root: {
    flexGrow: 1,
  },
  paper: {
    padding: theme.spacing(2),
    // textAlign: 'center',
    color: theme.palette.text.secondary,
    margin: '1%'
  },
  fullWidth: {
    width: '100%',
  },
  item_button: {
    margin: '0.1em'
    
  },
  modal: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  paper_modal: {
    backgroundColor: theme.palette.background.paper,
    border: '2px solid #000',
    boxShadow: theme.shadows[5],
    padding: theme.spacing(2, 4, 3),
  },
});

class NavBar extends Component {
  constructor(props) {
    super(props)
    this.state = {
      show_join: false,
      show_create: false,
      page: "",
    }
  }

  // Handle Redirect ----------------------------
  handlePageChange = (event) => {
    this.setState({
      page: event.target.name
    })
  }

  // Handle Modal Display -----------------------
  handleModalOpen = (target) => {
    // console.log(event.target.name)
    // console.log(this.state[event.target.name])
    // this.setState({
    //   [event.target.name]: !this.state[event.target.name]
    // }, () => console.log(this.state))
    // console.log(target)
    this.setState({
      [target]: !this.state[target]
    })
    return;
  }

  // Hooks Edition ------------------------------
  // const NavBar = (props) => {
  // const [page, setPage] = useState("");

  // useEffect(() => {
  //   setPage("");
  // }, [page]);

  // if (page === "main") {
  //   return <Redirect to="/" />;
  // } else if (page === "create") {
  //   return <Redirect to="/create_group" />;
  // } else if (page === "join") {
  //   return <Redirect to="/join_group" />;
  // }
  // --------------------------------------------

  componentDidUpdate = () => {
    // to ensure it doesn't update infinitely with the setstate function
    // alternative is to just use Link but then styling messes up so we didn't use it and stuck with buttons
    if(this.state.page !== "") {
      this.setState({
        page: ""
      })
    }
  }

  render () {
    /*
      Be careful with logic in redirect inside a render
      if i redirect to same page it doesnt unmount adn remount
      so now it will not show the navbar itself because it is
      inside the if statement. In this case canuse Link to avoid issue,
      can solve by emptying the state inside if statements
      cant do in componentDiDUpdate cause then infinitely occurring unless
      use and if to control execution of state update
    */
    if (this.state.page === "main") {
      // not favored so using componentdidupdate
      // this.setState({
      //   page: ""
      // })
      return <Redirect to="/"/>;
    } 
    // else if (this.state.page === "create") {
    //   // this.setState({
    //   //   page: ""
    //   // })
    //   return <Redirect to="/create_group" />;
    // } else if (this.state.page === "join") {
    //   // this.setState({
    //   //   page: ""
    //   // })
    //   return <Redirect to="/join_group" />;
    // }
    const classes = this.props.classes;
    return (
      <header>
        <Navbar bg="dark" variant="dark">
          <Navbar.Brand>Blitz</Navbar.Brand>
          <Nav className="ml-auto">
            <Button
              // to="/"
              className={classes.item_button}
              variant="dark"
              name="main" 
              onClick={this.handlePageChange}
            >
              {" "}Home{" "}
            </Button>
            <Button variant="dark" className={classes.item_button} name="show_create" onClick={()=>this.handleModalOpen('show_create')}>
              {" "}Create{" "}
            </Button>
            <Button variant="dark" className={classes.item_button} onClick={()=>this.handleModalOpen('show_join')}>
              {" "}Join{" "}
            </Button>
            <Modal
              style={{"align": "right"}}
              aria-labelledby="transition-modal-title"
              aria-describedby="transition-modal-description"
              className={classes.modal}
              open={this.state.show_join}
              onClick={()=>this.handleModalOpen('show_join')}
              closeAfterTransition
              BackdropComponent={Backdrop}
              BackdropProps={{
                timeout: 500,
              }}
            >
              <Fade in={this.state.show_join}>
                <div className={classes.paper_modal}>
                  <p>Hello</p>
                  <Button onClick={()=>this.handleModalOpen('show_join')} name="show_join">Cancel</Button>
                </div>
              </Fade>
            </Modal>

            <Modal
              style={{"align": "right"}}
              aria-labelledby="transition-modal-title"
              aria-describedby="transition-modal-description"
              className={classes.modal}
              open={this.state.show_create}
              onClick={()=>this.handleModalOpen('show_create')}
              closeAfterTransition
              BackdropComponent={Backdrop}
              BackdropProps={{
                timeout: 500,
              }}
            >
              <Fade in={this.state.show_create}>
                <div className={classes.paper_modal}>
                  <p>Hello</p>
                  <Button onClick={()=>this.handleModalOpen('show_create')} name="show_create">Cancel</Button>
                </div>
              </Fade>
            </Modal>

            {/* <Nav.Link href="#home">Home</Nav.Link> */}
            {/* <Nav.Link href="#create-group">Create Group</Nav.Link> */}
            {/* <Nav.Link href="#join-group">Join Group</Nav.Link> */}
          </Nav>
        </Navbar>
      </header>
    )
  }
};

// use styles for Material UI with react class component
export default withStyles(styles, { withTheme: true })(NavBar);
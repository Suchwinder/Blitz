import React, { Component } from "react";
import NavBar from "../nav_bar/NavBar";
import { Button } from "reactstrap";
import FormHelperText from '@material-ui/core/FormHelperText';
import { Input } from "@material-ui/core";
import "./JoinGroup.css";
import { Redirect } from "react-router-dom";
import { withStyles } from "@material-ui/core/styles";


const styles = (theme) => ({
  item_button: {
    margin: '0.1em'
  },
});

class JoinGroup extends Component {
  constructor(props){
    super(props);
    this.state = {
      session_link: "",
      submit_link: "",
    };
  }

  handleChange = (event) =>{
    this.setState({
      session_link: event.target.value
    });
  }

  handleSubmit = () =>{
    if(this.state.session_link.length === 0) {
      return(alert("Please enter a link"))
    }
    const start = this.state.session_link.search('/split_bill');

    if(start === -1) {
      return (alert("Please enter a valid link"))
    }
    this.state.session_link.substring(start);

    this.setState({
      submit_link: this.state.session_link.substring(start, this.state.session_link.length),
    })
  }

  render(){  
    const classes = this.props.classes;
    if(this.state.submit_link !== "") {
      return <Redirect to={this.state.submit_link}/>
    }
    return (
        <div>
          {/* <NavBar /> */}
          <div className="text">
              <label className="form">
                Enter your invite link:
                <br></br>
                <Input type="text" value={this.state.session_link} onChange={this.handleChange}></Input>
              </label>
              <br></br>
              {/* <input type="submit" value="Submit"/> */}
              <Button className={classes.item_button} type="submit" onClick={this.handleSubmit}>Join</Button>
              <Button className={classes.item_button} onClick={()=>this.props.handleModalOpen('show_join')} name="show_join">Cancel</Button>
              <FormHelperText id="my-helper-text">This will redirect you to your session.</FormHelperText>
          </div>
        </div>
    );
  }
};

export default withStyles(styles, { withTheme: true })(JoinGroup);

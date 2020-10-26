import React, { Component } from "react";
import NavBar from "../nav_bar/NavBar";
import { Button, Label } from "reactstrap";
import FormControl from '@material-ui/core/FormControl';
import FormHelperText from '@material-ui/core/FormHelperText';
import { Input } from "@material-ui/core";
import "./JoinGroup.css";

// https://stackoverflow.com/questions/50644976/react-button-onclick-redirect-page

class JoinGroup extends Component {
  constructor(props){
    super(props)
    this.state = {
      session_link: "",
    }
  }
  joinSession = async () => {
    const link = {
      "session_link": this.state.session_link,
    }
    const response = await fetch('/api/join', {
      method:"PUT",
      body: JSON.stringify(link)
    });

    const status = response.status;

    if(status === 400 || status === 500){
      alert("Please fix your link");
      return;
    }
    else{
      this.setState({
        
      });
    }
  }
  render(){  
    return (
        <div className="join-group-page">
          <NavBar />
          <div className="text">
            <FormControl>
              <Label className="form" id="session_link" type="link">
                Enter your invite link:
                <br></br>
                <Input type="text" name="link"></Input>
              </Label>
              <Button type="submit" onClick={this.joinSession}><a className="isDisabled" href="/split_bill">Submit form</a></Button>
              <FormHelperText id="my-helper-text">This will redirect you to your session.</FormHelperText>
            </FormControl>
          </div>
        </div>
    );
  }
};

export default JoinGroup;
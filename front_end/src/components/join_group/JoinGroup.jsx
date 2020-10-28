import React, { Component } from "react";
import NavBar from "../nav_bar/NavBar";
// import { Button, Label } from "reactstrap";
// import FormControl from '@material-ui/core/FormControl';
import FormHelperText from '@material-ui/core/FormHelperText';
import { Input } from "@material-ui/core";
import "./JoinGroup.css";

// https://stackoverflow.com/questions/50644976/react-button-onclick-redirect-page

class JoinGroup extends Component {
  constructor(props){
    super(props);
    this.state = {
      session_link: "",
    };

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleChange(event) {
    this.setState({session_link: event.target.value});
  }

  handleSubmit(event) {
    alert('A link was submitted: ' + this.state.session_link);
    event.preventDefault();
  }

  // joinSession = async () => {
  //   const link = {
  //     "session_link": this.state.session_link,
  //   }
  //   const response = await fetch('/api/join', {
  //     method:"PUT",
  //     body: JSON.stringify(link)
  //   });

  //   const status = response.status;

  //   if(status === 400 || status === 500){
  //     alert("Please fix your link");
  //     return;
  //   }
  //   else{
  //     this.setState({
  //       session_link: link
  //     });
  //   }
  // }
  render(){  
    return (
        <div className="join-group-page">
          <NavBar />
          <div className="text">
            <form onSubmit={this.handleSubmit}>
              <label className="form">
                Enter your invite link:
                <br></br>
                <Input type="text" value={this.state.session_link} onChange={this.handleChange}></Input>
              </label>
              <br></br>
              <input type="submit" value="Submit"/>
              {/* <Button type="submit" onClick={this.joinSession}><a className="isDisabled" href="/split_bill">Submit form</a></Button> */}
              <FormHelperText id="my-helper-text">This will redirect you to your session.</FormHelperText>
            </form>
          </div>
        </div>
    );
  }
};

export default JoinGroup;
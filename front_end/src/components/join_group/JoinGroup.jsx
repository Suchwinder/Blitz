import React, { Component } from "react";
import NavBar from "../nav_bar/NavBar";
import { Button} from "reactstrap";
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



  // componentDidMount() {
  //   fetch("/api/session_link")
  //     .then(res => res.json())
  //     .then(
  //       (result) => {
  //         this.setState({
  //           isLoaded: true,
  //           session_link: result.session_link
  //         });
  //       },
  //       // Note: it's important to handle errors here
  //       // instead of a catch() block so that we don't swallow
  //       // exceptions from actual bugs in components.
  //       (error) => {
  //         this.setState({
  //           isLoaded: true,
  //           error
  //         });
  //       }
  //     )
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
              {/* <input type="submit" value="Submit"/> */}
              <Button type="submit" onClick={this.joinSession}><a className="isDisabled" href="/split_bill">Submit</a></Button>
              <FormHelperText id="my-helper-text">This will redirect you to your session.</FormHelperText>
            </form>
          </div>
        </div>
    );
  }
};

export default JoinGroup;
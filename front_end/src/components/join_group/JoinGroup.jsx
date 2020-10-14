import React from "react";
import NavBar from "../nav_bar/NavBar";
import { Button } from "reactstrap";
import { useHistory } from "react-router-dom";
import "./JoinGroup.css";

const JoinGroup = () => {
  const history = useHistory();

  const routeChange = () =>{ 
    let path = `split_bill`; 
    history.push(path);
  }
  return (
      <div className="join-group-page">
        <NavBar />
        <div className="text">
          <form>
            <label className="form" htmlFor="link">
              Enter your invite link:{" "}
            </label>
            <input type="text" id="link" name="link"></input>
            <br></br>
            <Button className="button" variant="dark" onClick={routeChange}>Join Your Group</Button>
          </form>
        </div>
      </div>
  );
};

export default JoinGroup;
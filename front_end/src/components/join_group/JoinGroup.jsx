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
    <header>
      <div className="join-group-page">
        <NavBar />
      </div>
      <div className="center">
        <form>
          <label className="form" htmlFor="link">
            This is your shareable link:{" "}
          </label>
          <input type="text" id="link" name="link"></input>
          <br></br>
          <Button className="button" variant="dark" onClick={routeChange}>Join Your Group</Button>
        </form>
      </div>
    </header>
  );
};

export default JoinGroup;
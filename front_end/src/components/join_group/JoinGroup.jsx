import React from "react";
import NavBar from "../nav_bar/NavBar";
import { Button } from "reactstrap";
import "./JoinGroup.css";

const JoinGroup = () => {
  return (
    <header>
      <div className="join-group-page">
        <NavBar />
      </div>
      <div className="center">
        <form action="/BillSplitting.jsx">
          <label className="form" htmlFor="link">
            Enter your shared link to join your group:{" "}
          </label>
          <input type="text" id="link" name="link"></input>
          <br></br>
          <Button className="button" variant="dark">
            Join Your Group
          </Button>
        </form>
      </div>
    </header>
  );
};

export default JoinGroup;

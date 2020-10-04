import React from "react";
import NavBar from "../nav_bar/NavBar";
import { Button } from "reactstrap";
import "./JoinGroup.css";
import ChooseFile from "../upload_button/ChooseFile";

const JoinGroup = () => {
  return (
    <header>
      <div className="join-group-page">
        <NavBar />
      </div>
      <div className="center">
        <form action="/.jsx">
          <label className="form" for="link">
            This is your shareable link:{" "}
          </label>
          <input type="text" id="link" name="link"></input>
          <br></br>
          <Button className="button" variant="dark">Join Your Group</Button>
          <ChooseFile/>
        </form>
      </div>
    </header>
  );
};

export default JoinGroup;
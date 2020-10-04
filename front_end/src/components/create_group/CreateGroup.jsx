import React from 'react';
import NavBar from '../nav_bar/NavBar'
import ChooseFile from '../upload_button/ChooseFile';
import UploadButton from '../upload_button/UploadButton'
import './CreateGroup.css'

// Todo: Have to move submit button

const CreateGroup = () => {
  return(
    <div className="create-group-page">
      <NavBar/>
      <div className="body">
        <p1>This is your sharable link:
          <h1 className="boxed"> https://bit.ly/2GyrlZh </h1>
        </p1>
        <p2>Your link expires in 1 day.</p2>
        <br></br>
        <form action="/BillSplitting.jsx">         
          <label className="form" for="names">Input names for the split: </label>
          <input type="text" id="names" name="names"></input>
          <br></br>
          <label className="form" for="address">Address(optional): </label>
          <input type="text" id="address" name="address"></input>
          <br></br>
          <label className="form" for="states">State(optional):</label>
          <select>
            <option>Select</option>
            <option value="AL">AL</option>
            <option value="AK">AK</option>
            <option value="AZ">AZ</option>
            <option value="AR">AR</option>
            <option value="CA">CA</option>
            <option value="CO">CO</option>
            <option value="CT">CT</option>
            <option value="DE">DE</option>
            <option value="FL">FL</option>
            <option value="GA">GA</option>
            <option value="HI">HI</option>
            <option value="ID">ID</option>
            <option value="IL">IL</option>
            <option value="IN">IN</option>
            <option value="IA">IA</option>
            <option value="KS">KS</option>
            <option value="KY">KY</option>
            <option value="LA">LA</option>
            <option value="ME">ME</option>
            <option value="MD">MD</option>
            <option value="MA">MA</option>
            <option value="MI">MI</option>
            <option value="MN">MN</option>
            <option value="MS">MS</option>
            <option value="MO">MO</option>
            <option value="MT">MT</option>
            <option value="NE">NE</option>
            <option value="NV">NV</option>
            <option value="NH">NH</option>
            <option value="NJ">NJ</option>
            <option value="NM">NM</option>
            <option value="NY">NY</option>
            <option value="NC">NC</option>
            <option value="ND">ND</option>
            <option value="OH">OH</option>
            <option value="OK">OK</option>
            <option value="OR">OR</option>
            <option value="PA">PA</option>
            <option value="RI">RI</option>
            <option value="SC">SC</option>
            <option value="SD">SD</option>
            <option value="TN">TN</option>
            <option value="TX">TX</option>
            <option value="UT">UT</option>
            <option value="VT">VT</option>
            <option value="VA">VA</option>
            <option value="WA">WA</option>
            <option value="WV">WV</option>
            <option value="WI">WI</option>
            <option value="WY">WY</option>
          </select>
          <br></br>
          <br></br>
          <ChooseFile/>
          <input className="submitButton" type="submit" value="Submit"></input>
        </form>

      </div>
    </div>
  )   
}

export default CreateGroup;



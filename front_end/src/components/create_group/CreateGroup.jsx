import React, { Component } from 'react';
import NavBar from '../nav_bar/NavBar';
// import UploadImage from '../upload_button/UploadImage'
import './CreateGroup.css';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import { Formik } from 'formik';
import PlacesAutocomplete from '../places_autocomplete/PlacesAutocomplete';
import Autocomplete from "@material-ui/lab/Autocomplete";
import { TextField } from "@material-ui/core";




// https://react-bootstrap.github.io/components/forms/?#forms-validation-libraries
// https://codesandbox.io/s/vxv6q4z5?file=/index.js

class CreateGroup extends Component {
  constructor(props){
    super(props)
    this.state = {
      file: null,
      preview: null,
      input_users: "",
      input_address: "",
      select_state: "",
      input_tip: "",
    }
    this.inputFileRef = React.createRef();
    this.handleImage = this.handleImage.bind(this);
    this.handleChange = this.handleChange.bind(this);
  }

  //  uploadImage = async () => {
  //   let data = new FormData();
  //   data.append('file', this.state.file);

  //   const response = await fetch('/api/upload_image', {
  //     method: 'POST',
  //     body: data
  //   })
  //   const status = response.status
  //   if(status === 200) {
  //     const result = await response.json()
  //     console.log("hello", result.message)
  //   }
  // }

  // handle the form here
  handleChange(event) {
    this.setState({
      [event.target.name]: event.target.value
    })
  }

  handleImage(event) {
    console.log("the event thingy is: ", event.target.files, " and the type is: " , typeof(event.target.files[0]))
    let image = URL.createObjectURL(event.target.files[0]) // for preview
    const imageblob = new Blob([event.target.files[0]]) // to store
    this.setState({
      file: imageblob,
      preview: image
    })
  }

  // call the api endpoint here
  // put upload image here if it exists, call upload image api
  handleSubmit = (event) => {
    const names = this.state.input_users.split(',')
    let data = {
      "users": names,
      "street_address": "695 Park Ave",
      "city": "New York",
      "location_name": "Hunter College",
      "zip_code": 10065,
      "image_s3url": this.state.preview,
      "tip_rate": 10
    }
    console.log(data);
    // fetch("localhost:5000/api/create_group", {
    //   method: 'POST',
    //   body: data
    // }).then(res => {
    //     res.json();
    //     return res;
    //   }).then(response => {
    //     if (!response.ok) {
    //       throw new Error();
    //       // return error message
    //     }
    //     if (response.ok) {
    //       const redirectLink = response.link;
    //       const message = response.message;
    //       return (<Redirect to={redirectLink} />)
    //     }
    //   })
  } 


  render () {
    return(
      <Formik
        onSubmit={this.handleSubmit}
        initialValues={{
          input_users: '',
          input_address: '',
        }}
      >
        {({
          handleSubmit,
          handleChange,
          handleBlur,
          values,
          touched,
          isValid,
          errors,
        }) => (
        <div className="create-group-page">
          <NavBar/>
        <div className="text">
          <div>Creating Your Group</div>
          <br></br>
            <Form className="form" onSubmit={handleSubmit}>

              <Form.Group controlId="form.input_users">
                <Form.Label>
                  Input names here:
                </Form.Label>
              <Form.Control 
                type="text"
                name="input_users"
                onChange={this.handleChange}
                value={this.state.input_users}
                isValid={touched.input_users && !errors.input_users}
                as="textarea" rows="1" 
                required
              /> 
                <Form.Control.Feedback>Looks good!</Form.Control.Feedback>
              </Form.Group>

              {errors.input_users && touched.input_users && errors.input_users}

              <Form.Group controlId="form.input_address">
                <Form.Label>Address:</Form.Label>
                <PlacesAutocomplete/>
                {/* <Form.Control
                  type="text"
                  placeholder="Address"
                  name="input_address"
                  onChange={handleChange}
                  value={values.input_address}
                  as="textarea" rows="1" 
                /> */}
              </Form.Group>

              <Form.Group className="form-group" controlId="form.select_state">
                <Form.Label>State(optional):</Form.Label>
                <Form.Control
                  name="select_state"
                  onChange={this.handleChange}
                  onBlur={handleBlur}
                  value={this.state.select_state}
                  as="select">
                  <option value="">Select a state</option>
                  <option value="Alabama">Alabama</option>
                  <option value="Alaska">Alaska</option>
                  <option value="Arizona">Arizona</option>
                  <option value="Arkansas">Arkansas</option>
                  <option value="California">California</option>
                  <option value="Colorado">Colorado</option>
                  <option value="Connecticut">Connecticut</option>
                  <option value="Delaware">Delaware</option>
                  <option value="Florida">Florida</option>
                  <option value="Georgia">Georgia</option>
                  <option value="Hawaii">Hawaii</option>
                  <option value="Idaho">Idaho</option>
                  <option value="Illinois">Illinois</option>
                  <option value="Indiana">Indiana</option>
                  <option value="Iowa">Iowa</option>
                  <option value="Kansas">Kansas</option>
                  <option value="Kentucky">Kentucky</option>
                  <option value="Louisiana">Louisiana</option>
                  <option value="Maine">Maine</option>
                  <option value="Maryland">Maryland</option>
                  <option value="Massachusetts">Massachusetts</option>
                  <option value="Michigan">Michigan</option>
                  <option value="Minnesota">Minnesota</option>
                  <option value="Mississippi">Mississippi</option>
                  <option value="Missouri">Missouri</option>
                  <option value="Montana">Montana</option>
                  <option value="Nebraska">Nebraska</option>
                  <option value="Nevada">Nevada</option>
                  <option value="New Hampshire">New Hampshire</option>
                  <option value="New Jersey">New Jersey</option>
                  <option value="New Mexico">New Mexico</option>
                  <option value="New York">New York</option>
                  <option value="North Carolina">North Carolina</option>
                  <option value="North Dakota">North Dakota</option>
                  <option value="Ohio">Ohio</option>
                  <option value="Oklahoma">Oklahoma</option>
                  <option value="Oregon">Oregon</option>
                  <option value="Pennsylvania">Pennsylvania</option>
                  <option value="Rhode Island">Rhode Island</option>
                  <option value="South Carolina">South Carolina</option>
                  <option value="South Dakota">South Dakota</option>
                  <option value="Tennessee">Tennessee</option>
                  <option value="Texas">Texas</option>
                  <option value="Utah">Utah</option>
                  <option value="Vermont">Vermont</option>
                  <option value="Virginia">Virginia</option>
                  <option value="Washington">Washington</option>
                  <option value="West Virginia">West Virginia</option>
                  <option value="Wisconsin">Wisconsin</option>
                  <option value="Wyoming">Wyoming</option>
                </Form.Control>
                <br></br>
                <div>
                  <input type="file" name="file" ref={this.inputFileRef} onChange={this.handleImage}/>
                  <br></br>
                  <img style={{width: 225}} src={this.state.preview} alt={""}/>
                </div>
                <br></br>
                {/* <Button type="submit" onClick={this.uploadImage}><a className="isDisabled" href="/split_bill">Submit form</a></Button> */}
                <Button type="submit" onClick={this.uploadImage}><a>Submit form</a></Button>
              </Form.Group>
            </Form>
            </div>
      </div>
    )} 
    </Formik>  

    )   
  }
}

export default CreateGroup;
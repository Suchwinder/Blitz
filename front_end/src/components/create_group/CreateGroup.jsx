import React, { Component } from 'react';
import NavBar from '../nav_bar/NavBar';
import './CreateGroup.css';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import { Formik } from 'formik';
import PlacesAutocomplete from '../places_autocomplete/PlacesAutocomplete';
// import FreesoloUsers from '../freesolo_users/FreesoloUsers'
import Chip from '@material-ui/core/Chip';
import Autocomplete from '@material-ui/lab/Autocomplete';
import TextField from '@material-ui/core/TextField';
import { Redirect } from 'react-router-dom';

class CreateGroup extends Component {
  constructor(props){
    super(props)
    this.state = {
      file: null,
      preview: null,
      input_users: [],
      input_address: "",
      input_tip: "",
      input_location: "",
      redirect: false,
      group_url: ""
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

  // Handle the form here
  handleChange(event) {
    this.setState({
      [event.target.name]: event.target.value
    })
    // console.log(event.target)
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

  handleUsers = (event, value, type) => {
    // console.log(value);
    console.log(type);
    if (type === "remove-option") {
      this.setState({
        input_users: value
      })
    } else if (type === "create-option") {
      let exists = false;
      this.state.input_users.map((user_name) => {
        if(user_name === event.target.value) {
          exists = true;
          return (alert("Duplicate User Cannot Exist"));
        }
      })
      if(exists) {
        return;
      }
      this.setState({
        input_users: [...this.state.input_users, event.target.value]
      })
    } else {
      return;
    }
  }

  // call the api endpoint here
  // put upload image here if it exists, call upload image api
  handleSubmit = async (event) => {
    // const names = this.state.input_users.split(',')
    let data = {
      // "users": names,
      "street_address": this.state.input_address,
      "location_name": this.state.input_location,
      "image_s3url": this.state.preview,
      "tip_rate": this.state.input_tip
    }
    console.log(data);

    try {
      const response = await fetch("localhost:5000/api/create_group", {
        method: 'POST',
        body: JSON.stringify(data)
      })

      const status = response.status;
      const result = await response.json();

      if(status === 200) {
        this.setState({
          group_url: result.link,
          redirect: true
        }, () => console.log(this.state))
      } else {
        console.log(result.error);
      }

    } catch (error) {
      console.log(error);
    }

    // fetch("localhost:5000/api/create_group", {
    //   method: 'POST',
    //   body: data
    // }).then(res => {
    //     res.json();
    //     return res;
    //   }).then(response => {
    //     if (!response.ok) {
    //       throw new Error();
    //       return "Connection to Database Failed"
    //     }
    //     if (response.ok) {
    //       const redirectLink = response.link;
    //       const message = response.message;
    //       return (<Redirect to={redirectLink} />)
    //     }
    //   })
  } 

  handleParentFunc = (value) =>{
    console.log("Sent from Place API: ",value);
  }

  render () {
    if(this.state.redirect) {
      return <Redirect to={this.state.group_url}/>
    }
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
              <Autocomplete
              multiple
              id="input_users"
              options={[]}
              freeSolo
              required = "Please enter at least one user"
              onChange = {this.handleUsers}
              value={this.state.input_users}
              // renderTags={(value, getTagProps) =>
              // value.map((option, index) => (
                //   <Chip variant="outlined" label={option} {...getTagProps({ index })} />
                  
                // ))
              //}
              renderInput={(params) => (
                <TextField {...params} variant="filled" label="Users" />
              )}
              
            />
                <Form.Control.Feedback>Looks good!</Form.Control.Feedback>
              </Form.Group>

              {errors.input_users && touched.input_users && errors.input_users}

              <Form.Group controlId="form.input_address">
                <Form.Label>Address:</Form.Label>
                 {/* <Form.Control
                  type="text"
                  placeholder="Address"
                  name="input_address"
                  onChange={handleChange}
                  value={values.input_address}
                  as="textarea" rows="1" 
                  required
                />  */}
                <PlacesAutocomplete
                  // onChange={(event, value) => {
                  //   this.handleParentFunc(value);
                  // }}
                  handleParentFunc={(value)=> {
                    // console.log("your value --> ", value);
                    // this.setState({
                    //   input_address: value
                    // })
                    this.handleParentFunc(value);
                    }
                  }
                />
              </Form.Group>
              {errors.input_address && touched.input_address && errors.input_address}

              <Form.Group controlId="form.input_location">
                <Form.Label>
                  Input location here:
                </Form.Label>
              <Form.Control 
                type="text"
                placeholder="Location Name"
                name="input_location"
                onChange={this.handleChange}
                value={this.state.input_location}
                isValid={touched.input_location && !errors.input_location}
                as="textarea" rows="1" 
                required = "Please enter your location"
              /> 
                <Form.Control.Feedback>Looks good!</Form.Control.Feedback>
              </Form.Group>

              {errors.input_users && touched.input_users && errors.input_users}
              
              <Form.Group className="form-group" controlId="form.select_state">
                <Form.Label>State(optional):</Form.Label>
                <Form.Control
                  name="select_state"
                  onChange={this.handleChange}
                  onBlur={handleBlur}
                  value={this.state.select_state}
                  as="select">
                  {/* <option value="">Select a state</option> */}
                  {/* <option value="Alabama">Alabama</option>
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
                  <option value="New Mexico">New Mexico</option> */}
                  <option value="New York">New York</option>
                  {/* <option value="North Carolina">North Carolina</option>
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
                  <option value="Wyoming">Wyoming</option> */}
                </Form.Control>
                <Form.Group controlId="form.input_tip">
                <Form.Label>Tip:</Form.Label>
                <Form.Control 
                type="text"
                name="input_tip"
                onChange={handleChange}
                value={values.input_tip}
                as="select" rows="1" 
                >
                <option value="">Select an amount</option>  
                <option value="10">10%</option>
                <option value="15">15%</option>
                <option value="20">20%</option>
                <option value="25">25%</option>
                </Form.Control>
              </Form.Group>
                <br></br>
                <div>
                  <input type="file" name="file" ref={this.inputFileRef} onChange={this.handleImage}/>
                  <br></br>
                  <img style={{width: 225}} src={this.state.preview} alt={""}/>
                </div>
                <br></br>
                <Button type="submit" onClick={this.uploadImage}><a className="isDisabled" href="/split_bill">Submit form</a></Button>
                {/* <Button type="submit" onClick={this.uploadImage}><a>Submit form</a></Button> */}
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
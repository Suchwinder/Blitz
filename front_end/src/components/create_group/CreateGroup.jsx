import React, { Component } from 'react';
import NavBar from '../nav_bar/NavBar';
import './CreateGroup.css';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import { Formik } from 'formik';
import PlacesAutocomplete from '../places_autocomplete/PlacesAutocomplete';
import Chip from '@material-ui/core/Chip';
import Autocomplete from '@material-ui/lab/Autocomplete';
import TextField from '@material-ui/core/TextField';
import { Redirect } from 'react-router-dom';
import FormControl from '@material-ui/core/FormControl';
import InputLabel from '@material-ui/core/InputLabel';
import FilledInput from '@material-ui/core/FilledInput';
import InputAdornment from '@material-ui/core/InputAdornment';

class CreateGroup extends Component {
  constructor(props){
    super(props)
    this.state = {
      file: null,
      preview: "",
      input_users: [],
      input_address: "",
      input_zip_code: "",
      input_city: "",
      input_state: "",
      input_tip: "",
      input_location: "",
      redirect: false,
      group_url: "",
      image_s3url: "",
    }
    this.inputFileRef = React.createRef();
    this.handleImage = this.handleImage.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.handleParentFunc = this.handleParentFunc.bind(this);
    this.handleUsers = this.handleUsers.bind(this);
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
    console.log(event.target)
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
    // console.log(type);
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
    // First need to upload the image if it exists
    if(this.state.preview !== "") { // check if preview empty rather then blob data
      // call uploadimage api to get object url
      let data = new FormData();
      data.append('file', this.state.file);

      const response = await fetch('/api/upload_image', {
        method: 'POST',
        body: data
      })
      const status = response.status
      const result = response.json();

      if(status === 200) {
        this.setState({
          image_s3url: result.message
        })
      } else {
        console.log(result.error)
        return;
      }
    }
    
    // Now upload rest of data
    let data = {
      "users": this.state.input_users,
      "street_address": this.state.input_address,
      "location_name": this.state.input_location,
      "city": this.state.input_city, 
      "state": this.state.input_state,
      "zip_code": this.state.input_zip_code,
      "image_s3url": this.state.image_s3url,
      "tip_rate": this.state.input_tip
    }

    try {
      const response = await fetch("/api/create_group", {
        headers: {
          "Content-Type": 'application/json',
          "Accept": 'application/json',
        },
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
        alert(result.error);
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

  //Handles Google API address field
  handleParentFunc = (value) =>{
    if (value) {
      const [input_address, input_city, input_state, input_zip_code] = value.split(',');
      if (input_address && input_city && input_state && input_zip_code) {
        this.setState({
          input_address,
          input_zip_code,
          input_city,
          input_state,
        });
        // console.log("Sent from Place API: ", input_address, input_city, input_state, input_zip_code);  
      }
    }
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
              renderInput={(params) => (
                <TextField {...params} variant="filled" label="Users" />
              )}
              
            />
              </Form.Group>
              
              <Form.Group className="form-group" controlId="form.input_location">
                <Form.Label>
                  Input location here:
                </Form.Label>
              {/* <Form.Control 
                placeholder="Location Name"
                name="input_location"
                onChange={this.handleChange}
                value={this.state.input_location}
                isValid={touched.input_location && !errors.input_location}
                as="textarea" rows="1" 
                required = "Please enter your location"
              />  */}
                <br></br>
                <TextField
                  fullWidth
                  required
                  label="Establishment"
                  name="input_location"
                  onChange={this.handleChange}
                  value={this.state.input_location}
                  // helperText="Ex: name of restaurant"
                  variant="filled"
                />
              </Form.Group>
              
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

              <Form.Group className="form-group" controlId="form.select_state">
                {/* <Form.Label>State(optional):</Form.Label> */}
                {/* <Form.Control
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
                </Form.Control> */}
              </Form.Group>
              
              <Form.Group controlId="form.input_tip">
                <Form.Label>
                  Input Tip here:
                </Form.Label>
              {/* <Form.Control 
                type="text"
                placeholder="Tip"
                name="input_tip"
                onChange={this.handleChange}
                value={this.state.input_tip}
                isValid={touched.input_tip && !errors.input_tip}
                as="textarea" rows="1" 
                required = "Please enter your tip"
              />  */}
              <FormControl fullWidth variant="filled">
                <InputLabel htmlFor="filled-adornment-amount">Amount</InputLabel>
                <FilledInput
                  id="filled-adornment-amount"
                  name="input_tip"
                  value={this.state.input_tip}
                  onChange={this.handleChange}
                  startAdornment={<InputAdornment position="start">$</InputAdornment>}
                />
              </FormControl>
                <Form.Control.Feedback></Form.Control.Feedback>
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
            </Form>
            </div>
      </div>
    )} 
    </Formik>  
    )   
  }
}

export default CreateGroup;

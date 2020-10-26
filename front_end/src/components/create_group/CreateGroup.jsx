import React, { Component } from 'react';
import NavBar from '../nav_bar/NavBar';
// import UploadImage from '../upload_button/UploadImage'
import './CreateGroup.css';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import { Formik } from 'formik';
import * as Yup from 'yup';


// https://react-bootstrap.github.io/components/forms/?#forms-validation-libraries
// https://codesandbox.io/s/vxv6q4z5?file=/index.js

const schema = Yup.object({
  input_users: Yup.string().required(),
  input_address: Yup.string().required(),
  select_state: Yup.string().required()
})

class CreateGroup extends Component {
  constructor(props){
    super(props)
    this.state = {
      file: null,
      preview: null
    }
    this.handleChange = this.handleChange.bind(this)
  }

   uploadImage = async () => {
    let data = new FormData();
    data.append('file', this.state.file);

    const response = await fetch('/api/upload', {
      method: 'POST',
      body: data
    })
    const status = response.status
    if(status === 200) {
      const result = await response.json()
      console.log("hello", result.message)
    }
  }

  handleChange(event) {
    console.log("the event thingy is: ", event.target.files, " and the type is: " , typeof(event.target.files[0]))
    let image = URL.createObjectURL(event.target.files[0]) // for preview
    const imageblob = new Blob([event.target.files[0]]) // to store
    this.setState({
      file: imageblob,
      preview: image
    })
  }

  render () {
    return(
      <Formik
        validationSchema={schema}
        onSubmit={console.log}
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
                onChange={handleChange}
                value={values.input_users}
                isValid={touched.input_users && !errors.input_users}
                as="textarea" rows="1" 
              />
                <Form.Control.Feedback>Looks good!</Form.Control.Feedback>
              </Form.Group>

              {errors.input_users && touched.input_users && errors.input_users}

              <Form.Group controlId="form.input_address">
                <Form.Label>Address(optional):</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Address"
                  name="input_address"
                  onChange={handleChange}
                  value={values.input_address}
                  as="textarea" rows="1" 
                />
              </Form.Group>

              <Form.Group className="form-group" controlId="form.select_state">
                <Form.Label>State(optional):</Form.Label>
                <Form.Control
                  name="select_state"
                  onChange={handleChange}
                  onBlur={handleBlur}
                  value={values.select_state}
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
                  <input type="file" onChange={this.handleChange}/>
                  <br></br>
                  <img style={{width: 250}} src={this.state.preview}/>
                </div>
                <br></br>
                <Button type="submit" onClick={this.uploadImage}><a className="isDisabled" href="/split_bill">Submit form</a></Button>
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
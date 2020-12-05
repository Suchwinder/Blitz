import React, { Component } from 'react';
import NavBar from '../nav_bar/NavBar';
import { withStyles } from "@material-ui/core/styles";
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import { Redirect } from 'react-router-dom';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Autocomplete from '@material-ui/lab/Autocomplete';
import Modal from '@material-ui/core/Modal';
import Backdrop from '@material-ui/core/Backdrop';
import Fade from '@material-ui/core/Fade';
import Form from 'react-bootstrap/Form';
import io from "socket.io-client";
import {Typography} from "@material-ui/core";
import MediaQuery from 'react-responsive';


var QRCode = require('qrcode.react');
// import QRCode from "qrcode.react";

const styles = (theme) => ({
    root: {
      flexGrow: 1,
    },
    paper: {
      padding: theme.spacing(2),
      // textAlign: 'center',
      color: theme.palette.text.secondary,
      margin: '1%'
    },
    fullWidth: {
      width: '100%',
    },
    item_button: {
      margin: '0.1em'
    },
    modal: {
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
    },
    paper_modal: {
      backgroundColor: theme.palette.background.paper,
      border: '2px solid #000',
      boxShadow: theme.shadows[5],
      padding: theme.spacing(2, 4, 3),
    },
    hr:{
      height:"3px",
      width:"90%",
      borderWidth:0,
      color:"gray",
      backgroundColor:"gray",
    },
    add_user_button:{
      paddingLeft: "70%",
      width: "100%",
    },
    items_flex_container: {
      display: "flex",
    },
    add_item_button: {
      flex: "1",
      paddingLeft: "68.5%",
    },

    mobile_add_item_button: {
      flex: "1",
      paddingLeft: "60%",
    },
    items_line: {
      textAlign: "center",
    },
    
    edit_flex_container: {
      justifyContent: "center",
      display: "flex",
    },
    qr_code:{
      display: "inline",
    },

    btn:{
      paddingLeft: "15%",
    },
    // border:{
    //   borderStyle: "solid",
    // },

    text:{
      display: 'block',
      marginBlockStart: '0.83em',
      marginBlockEnd: '0.83em',
      marginInlineStart: '0px',
      marginInlineEnd: '0px',
    },
    
    modal_padding:{
      paddingBottom:"10px",
    },
});

class SplitBillPage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      city: "",
      group_url: props.groupURL.match.url,
      full_url: window.location.href,
      image_url: "",
      item_assignments: {},
      user_assignments: {},
      items: [],
      location_name: "",
      state_name: "",
      street_address: "",
      sub_total: 0.0,
      tax_rate: 0.0,
      tip_rate: 0.0,
      total_adjustment: 0,
      total_cost: 0,
      users: [],
      zip_code: "",
      redirect: false,
      user_count: 0,
      address: "",
      user_modal: "",
      new_user_name: "",
      new_adjusted_amount: "",
      item_modal: "",
      new_item_name: "",
      new_item_cost: "",
      add_item: false,
      add_item_name: "",
      add_item_cost: "0.0",
      add_user: false,
      add_user_name: "",
      add_user_adjusted_amount: "0.0",
      new_tip_rate: "",
      copySuccess: false,
      show_image: false,
      socket: "",
      file: null,
      preview: "",
    }
  }

  handleChange = (event) => {
    event.preventDefault();
    this.setState({
      [event.target.name]: event.target.value
    })
  }

  // –––––––––––– Get Group Data –––––––––––––––––––––––
  fetchGroupData = async () => {
    // With get requests cant pass a body, so pass in URL parameter instead, should be URL encoded but in this case skipped as it currently works without it
    try {
      const response = await fetch(`/api/get_group/?group_URL=${this.state.group_url}`)
      const status = response.status;
      const result = await response.json();
  
      if(status === 200) {
        result.items.sort(function(a, b) {
          // console.log(a.item_name < b.item_name)
          if(a.item_name < b.item_name) { return -1; }
          if(a.item_name > b.item_name) { return 1; }
          return 0;
        });

        this.setState({
          city: result.city,
          image_url: result.image_url,
          item_assignments: result.item_assignments,
          user_assignments: result.user_assignments,
          items: result.items,
          location_name: result.location_name,
          state_name: result.state_name,
          street_address: result.street_address,
          sub_total: result.sub_total,
          tax_rate: result.tax_rate,
          tip_rate: result.tip_rate,
          total_adjustment: result.total_adjustment,
          total_cost: result.total_cost,
          users: result.users,
          user_count: result.user_count,
          zip_code: result.zip_code,
          address: result.street_address + ', ' + result.city + ', ' + result.state_name,
        })
      } else if (status >= 400) {
          this.setState({
            redirect: true
          }, () => {alert(result.error)});
      }
    } catch (error) {
      console.log(error);
    }
  }

  // –––––––––––– Assign or Unassign Member ––––––––––––
  handleAssign = async (event, value, type, s_name) => {
    // assign an item to a user
    let status = null;
    let result = null;
    if(type === 'create-option') {
      const data = {
        "nickname": value[value.length-1],
        "item_name": event.target.name,
        "group_url": this.state.group_url
      };

      const response = await fetch('/api/assign_item', {
        headers: {
          'Accept': 'application/json',
          "Content-Type": 'application/json'
        }, 
        method: "POST",
        body: JSON.stringify(data)
      });

      status = response.status;
      result = await response.json();
    } else if (type === 'remove-option') { // unassign and item to a user
      // get removed value by using difference between value and state
      let removed = null;
      if(!value) {
        removed = this.state.item_assignments[event.target.name][0];
      } else if (!event.target.name) {
        return;
      } else {
        removed = this.state.item_assignments[event.target.name].filter(item => 
          !value.includes(item)
        )
      }
      const data = {
        "nickname": removed[0],
        "item_name": event.target.name,
        "group_url": this.state.group_url
      };

      const response = await fetch('/api/unassign_item', {
        headers: {
          'Accept': 'application/json',
          "Content-Type": 'application/json'
        }, 
        method: "POST",
        body: JSON.stringify(data)
      });

      status = response.status;
      result = await response.json();
    } else {
      return;
    }
    if (status === 200) {
      // console.log(result.message);
      // get data again
      await this.fetchGroupData();
      this.state.socket.emit('new_update', this.state.group_url);
      // console.log("Data Updated");
    } else {
      alert(result.error);
    }
  }

  // –––––––––––– Edit Item or Edit User –––––––––––––––
  handleItemEdit = async (old_value) => {
    // parse integer into float
    let cost = "0.0";
    if(this.state.new_item_name === this.state.item_modal && this.state.new_item_cost === old_value) {
      return alert("Please enter some change to edit");
    } else if (this.state.new_item_name.length === 0) {
      return alert("Name cannot be empty");
    } else if(this.state.new_item_cost.length !== 0) {
      // cost = parseFloat(this.state.new_item_cost).toFixed(2);
      cost = this.state.new_item_cost;
    }
    
    const data = {
      "item_name": this.state.item_modal,
      "new_item_name": this.state.new_item_name, // if no new then can be empty or same as original
      "new_item_cost": cost, 
      "group_url": this.state.group_url
    }

    const response = await fetch('/api/edit_item', {
      headers: {
        "Content-Type": 'application/json',
        "Accept": 'application/json',
      },
      method: 'PUT',
      body: JSON.stringify(data)
    })

    const status = response.status;
    const result = await response.json();

    if(status === 200) {
      // console.log(result.message);
      await this.fetchGroupData();
      this.setState({
        item_modal: "",
        new_item_name: "",
        new_item_cost: "", 
      })
      this.state.socket.emit('new_update', this.state.group_url);
    } else {
      alert(result.error);
    }
  }

  handleUserEdit = async (old_value) => {
    let adjustment = "0.0";
    if(this.state.new_nickname === this.state.user_modal && this.state.new_adjusted_amount === old_value) {
      return alert("Please enter something different to edit");
    } else if (this.state.new_nickname.length === 0) {
      return alert("Username cannot be empty!");
    } else if (this.state.new_adjusted_amount !== 0) {
      adjustment  = this.state.new_adjusted_amount;
    }

    const data = {
      "nickname": this.state.user_modal,
      "new_nickname": this.state.new_nickname,
      "adjusted_amount": adjustment,
      "group_url": this.state.group_url
    };

    const response = await fetch('/api/edit_user', {
      headers: {
        "Content-Type": 'application/json',
        "Accept": 'application/json',
      },
      method: 'PUT',
      body: JSON.stringify(data)
    });

    const status = response.status;
    const result = await response.json();
    if(status === 200) {
      // console.log(result.message);
      await this.fetchGroupData();
      this.setState({
        user_modal: "",
        new_nickname: "",
        new_adjusted_amount: "", 
      })
      this.state.socket.emit('new_update', this.state.group_url);
    } else {
      alert(result.error);
    }
  }

  // –––––––––––– Modal Opening and Closing ––––––––––––
  handleOpen = (obj, name, cost) => {
    if(obj === "user_modal") {
      this.setState({
        [obj]: name,
        new_adjusted_amount: cost,
        new_nickname: name
      })
    } else if(obj === "item_modal") {
      this.setState({
        [obj]: name,
        new_item_cost: cost,
        new_item_name: name
      })
    } else if(obj === "add_item" || obj ==="add_user"){
      this.setState({
        [obj]: true
      })
    } else if(obj === "edit_tip") {
      this.setState({
        [obj]: true,
        new_tip_rate: this.state.tip_rate
      })
    }
  }

  handleClose = (obj) => {
    if(obj === "user_modal") {
      this.setState({
        [obj]: "",
        new_adjusted_amount: "",
        new_user_name: ""
      })
    } else if (obj === "item_modal") {
      this.setState({
        [obj]: "",
        new_item_cost: "",
        new_item_name: ""
      })
    } else if (obj === "add_item" || obj === "add_user" || obj ==="edit_tip") {
      this.setState({
        [obj]: false
      })
    }
  }
  // –––––––––––– Delete Item or User ––––––––––––––––––
  handleDeleteItem = async () => {
    const data = {
      "item_name": this.state.item_modal,
      "group_url": this.state.group_url
    }

    const response = await fetch('/api/delete_item', {
      headers: {
        "Content-Type": 'application/json',
        "Accept": 'application/json',
      },
      method: 'DELETE',
      body: JSON.stringify(data)
    })

    const status = response.status;
    const result = await response.json();

    if(status === 200) {
      // console.log(result.message);
      await this.fetchGroupData();
      this.setState({
        item_modal: "",
        new_item_name: "",
        new_item_cost: "", 
      })
      this.state.socket.emit('new_update', this.state.group_url);
    } else {
      alert(result.error);
    }
  }

  handleDeleteUser = async () => {
    const data = {
      "nickname": this.state.user_modal,
      "group_url": this.state.group_url
    };

    const response = await fetch('/api/delete_user', {
      headers: {
        "Content-Type": 'application/json',
        "Accept": 'application/json',
      },
      method: 'DELETE',
      body: JSON.stringify(data)
    });

    const status = response.status;
    const result = await response.json();

    if(status === 200){
      // console.log(result.message)
      await this.fetchGroupData();
      this.setState({
        user_modal: "",
        new_adjusted_amount: "",
        new_user_name: ""
      })
      this.state.socket.emit('new_update', this.state.group_url);
    } else {
      alert(result.error)
    }
  }

  // –––––––––––– Add User or Item –––––––––––––––––––––
  handleAddUser = async () => {
    if(this.state.add_user_name.length === 0) {
      return alert("User must have name");
    } else if(this.state.add_user_adjusted_amount.length === 0) {
      return alert("User must have some cost");
    }

    const data = {
      "nickname": this.state.add_user_name,
      "amount_adjusted": this.state.add_user_adjusted_amount,
      "group_url": this.state.group_url
    }
      
    const response = await fetch('/api/create_user', {
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
      // console.log(result.message);
      await this.fetchGroupData();
      this.setState({
        add_user: false,
        add_user_name: "",
        add_user_adjusted_amount: "", 
      })
      this.state.socket.emit('new_update', this.state.group_url);
    } else {
      alert(result.error);
    }
  }

  handleAddItem = async () => {
    if(this.state.add_item_name.length === 0) {
      return alert("Item must have name");
    } else if(this.state.add_item_cost.length === 0) {
      return alert("Item must have some cost");
    }

    const data = {
      "item_name": this.state.add_item_name,
      "item_cost": this.state.add_item_cost,
      "group_url": this.state.group_url
    }
      
    const response = await fetch('/api/create_item', {
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
      // console.log(result.message);
      await this.fetchGroupData();
      this.setState({
        add_item: false,
        add_item_name: "",
        add_item_cost: "", 
      })
      this.state.socket.emit('new_update', this.state.group_url);
    } else {
      alert(result.error);
    }
  }

  // –––––––––––– Edit Tip –––––––––––––––––––––––––––––
  handleTip = async () => {
    let tip = "0.0";
    if (this.state.new_tip_rate.length > 0 && this.state.new_tip_rate[0] === '-') {
      return alert("Tip cannot be negative");
    } else if(parseFloat(this.state.new_tip_rate) === this.state.tip_rate) {
      return alert("Please enter a different tip rate");
    } else if (this.state.new_tip_rate.length !== 0) {
      tip = parseFloat(this.state.new_tip_rate);
    }

    const data = {
      "tip_rate": tip,
      "group_url": this.state.group_url
    };

    const response = await fetch('/api/edit_tip_rate', {
      headers: {
        "Content-Type": 'application/json',
        "Accept": 'application/json',
      },
      method: 'PUT',
      body: JSON.stringify(data)
    });

    const status = response.status;
    const result = await response.json();
    if(status === 200) {
      // console.log(result.message);
      await this.fetchGroupData();
      this.setState({
        edit_tip: false,
        new_tip_rate: "",
      })
      this.state.socket.emit('new_update', this.state.group_url);
    } else {
      alert(result.error);
    }
  }

  // –––––––––––– Handle preview –––––––––––––––––––––––
  handleImage = () => {
    this.setState({
      show_image: !this.state.show_image
    })
  }

  // –––––––––––– Copy URL –––––––––––––––––––––––––––––
  copyCodeToClipboard = () => {
    const el = this.textArea
    el.select()
    document.execCommand("copy")
    this.setState({copySuccess: true})
  }

  // –––––––––––– Reupload –––––––––––––––––––––––––––––
  handleReupload = async (event) => {
    event.preventDefault(); // prevent form from refreshing page by iteslf
    if((this.state.file === null) || (this.state.preview.length === 0)) {
      return alert("Please Choose a New Image to Upload");
    }
    let data = new FormData();
    data.append('file', this.state.file);
    for (var value of data.values()) {
      console.log(value); 
    }

    const response = await fetch(`/api/reupload_image/?group_URL=${this.state.group_url}`, {
      method: 'POST',
      body: data
    })
    const status = response.status
    const result = await response.json();

    if(status === 200) {
      this.setState({
        preview: "",
        show_image: false
      })
      this.state.socket.emit('new_update', this.state.group_url);
      await this.fetchGroupData();
      // window.location.reload(); // trigger entire page refresh can be solution for text displayed on screen
    } else {
      console.log(result.error)
      console.log("This doesn't work")
      return;
    }
  }

  handleImagePreview = (event) => {
    if(event.target.files[0] === undefined) {
      if(this.state.preview.length > 0) {
        this.setState({
          preview: ""
        })
      }
      return;
    }
    let image = URL.createObjectURL(event.target.files[0]) // for preview
    const imageblob = new Blob([event.target.files[0]]) // to store
    this.setState({
      file: imageblob,
      preview: image,
    })
  }

  componentDidMount = async () => {
    await this.fetchGroupData();

    const ENDPOINT = "/socket";
    const socket = io.connect(ENDPOINT, {
      reconnection: true,
      transports: ['websocket'] // need to upgrade to websockets succesfully 
    })

    this.setState({
      socket: socket
    })
        
    socket.emit('join', {
      'room': this.state.group_url
    })

    socket.on('new_update', () => {
      this.fetchGroupData();
    })
  }

  componentWillUnmount = () => {
    this.state.socket.emit('leave', {
      'room': this.state.group_url
    })
  }

  render() {
    // get access to the styling for our components to use
    const classes = this.props.classes;
    return (
      <div className={classes.root}>
        <NavBar/>
        {
          this.state.redirect 
          ? 
          <Redirect to='/'/>
          :
          <div>
            <br/>
            <h4 style={{"textAlign": "center"}}> {this.state.location_name} </h4>
            <p style={{"textAlign": "center"}}> {this.state.address} </p>
            <div style={{"textAlign": "center"}}>
              <textarea
                style={{"width": "235px"}}
                ref={(textarea) => this.textArea = textarea}
                defaultValue={this.state.full_url}
              />
            </div>
            <div style={{"textAlign": "center"}}>
              <button onClick={() => this.copyCodeToClipboard()}>
                Copy to Clipboard
              </button>
              {
                this.state.copySuccess ?
                <div style={{"color": "green"}}>
                  Success!
                </div> : null
              }
            </div>
            <div style={{"width": "100%", "textAlign": "center", "paddingTop": "5px"}}>
              <QRCode className={classes.qr_code} value={this.state.full_url}></QRCode>  
            </div>
            <hr className={classes.hr}></hr>
            <Grid container alignItems="center" justify="center">
              <Grid item>
                <Typography variant="h5" className={classes.text} style={{'textAlign':"center"}}>
                  Inventory
                </Typography>
                <Typography className={classes.text} style={{'textAlign':"center"}}>
                  Get started by adding items or assigning users to items.
                </Typography>
                <Typography className={classes.text} style={{'textAlign':"center"}}>
                  Or if there is an error, remove or edit them by selecting the item.
                </Typography>
              </Grid>              
            </Grid>
            <hr className={classes.hr}></hr>

            {/* Render item, item price, and user assignment that is modifyable
            should open a model to update for UI friendliness */}
            <Grid container>
              {/* Currently displaying item name and cost */}
              <Grid item xs className={classes.border}>
                <Paper className={classes.paper}>
                <div className={classes.items_flex_container}>
                <div className={classes.items_line} > Items </div>
                <Modal
                  style={{"align": "right"}}
                  aria-labelledby="transition-modal-title"
                  aria-describedby="transition-modal-description"
                  className={classes.modal}
                  open={this.state.add_item}
                  onClose={() => this.handleClose("add_item")}
                  closeAfterTransition
                  BackdropComponent={Backdrop}
                  BackdropProps={{
                    timeout: 500,
                  }}
                >
                  <Fade in={this.state.add_item}>
                    <div className={classes.paper_modal}>
                      <div className={classes.modal_padding}>
                      <TextField id="outlined-basic" label="Item Name" variant="outlined" name="add_item_name" placeholder="name" onChange={this.handleChange}/>
                      </div>
                      <TextField id="outlined-basic" label="Item Cost" variant="outlined" name="add_item_cost" placeholder="0.00" onChange={this.handleChange} type="number" step={0.01}/>
                      <div className={classes.btn}>
                      <Button onClick={this.handleAddItem}>Add</Button>
                      <Button onClick={() => this.handleClose("add_item")}>Cancel</Button>
                      </div>
                    </div>
                  </Fade>
                </Modal>
                <MediaQuery minWidth={430}>
                <div className={classes.add_item_button}>
                <Button variant="outlined" color="primary" className={classes.item_button} size='small' display="inline" onClick={() => this.handleOpen("add_item", "na", "na")}>
                  Add Item
                </Button>
                </div>
                </MediaQuery>
                <MediaQuery maxWidth={430}>
                <div className={classes.mobile_add_item_button}>
                <Button variant="outlined" color="primary" className={classes.item_button} size='small' display="inline" onClick={() => this.handleOpen("add_item", "na", "na")}>
                  Add Item
                </Button>
                </div>
                </MediaQuery>
                </div> 
                {/* <ul className="innerList"> */}
                {
                  this.state.items.map((item, index) => {
                    return (
                      <div key={index+1}>
                        <Modal
                          aria-labelledby="transition-modal-title"
                          aria-describedby="transition-modal-description"
                          className={classes.modal}
                          open={this.state.item_modal === item.item_name}
                          onClose={() => this.handleClose("item_modal")}
                          closeAfterTransition
                          BackdropComponent={Backdrop}
                          BackdropProps={{
                            timeout: 500,
                          }}
                        >
                          <Fade in={this.state.item_modal === item.item_name}>
                            <div className={classes.paper_modal}>
                            <div className={classes.modal_padding}>
                              <TextField id="outlined-basic" label="Change Item Name" variant="outlined" name="new_item_name" defaultValue={this.state.new_item_name} onChange={this.handleChange}/>
                              </div>
                              <TextField id="outlined-basic" label="Change Cost" variant="outlined" name="new_item_cost" defaultValue={this.state.new_item_cost} onChange={this.handleChange} type="number" step={0.01}/>
                              <div >
                              <Button onClick={this.handleDeleteItem}>Delete</Button>
                              <Button onClick={() => this.handleItemEdit(item.item_cost)}>Edit</Button>
                              <Button onClick={() => this.handleClose("item_modal")}>Cancel</Button>
                              </div>
                            </div>
                          </Fade>
                        </Modal>

                        <Button variant="outlined" color="primary" className={classes.item_button} onClick={() => this.handleOpen("item_modal", item.item_name, item.item_cost)} size='small' display="inline">
                          {item.item_name}: ${item.item_cost} 
                        </Button> 
                        <Autocomplete
                          id="free-solo-demo"
                          freeSolo
                          display='inline'
                          disableClearable={true}
                          disableCloseOnSelect={true}
                          value={this.state.item_assignments[item.item_name]}
                          multiple
                          options={[]}
                          onChange={this.handleAssign}
                          size='small'
                          name={item.item_name}
                          renderInput={(params) => (
                            <TextField {...params} label="user(s)" margin="normal" variant="outlined" name={item.item_name}/>
                          )}
                        />
                      </div>
                    )
                  })
                }
                {/* </ul> */}
                </Paper>
              </Grid>
            </Grid>
            
            <br></br>
            <hr className={classes.hr}></hr>
            {/* Render total for each individual */}
            <Grid container justify="center">
              <Grid item>
                <Typography variant="h5" className={classes.text} style={{'textAlign':"center"}}>
                  Users
                </Typography>
                <Typography className={classes.text} style={{'textAlign':"center"}}>
                  Allows you to add user(s) or remove user(s) with adjustments.
                </Typography>
              </Grid>              
            </Grid>
            <hr className={classes.hr}></hr>

            <Grid container>
                <Modal
                  aria-labelledby="transition-modal-title"
                  aria-describedby="transition-modal-description"
                  className={classes.modal}
                  // style={{"align": "right"}}
                  open={this.state.add_user}
                  onClose={() => this.handleClose("add_user")}
                  closeAfterTransition
                  BackdropComponent={Backdrop}
                  BackdropProps={{
                    timeout: 500,
                  }}
                >
                  <Fade in={this.state.add_user}>
                    <div className={classes.paper_modal}>
                    <div className={classes.modal_padding}>
                      <TextField id="outlined-basic" label="Username" variant="outlined" name="add_user_name" placeholder="name" onChange={this.handleChange}/>
                      </div>
                      <TextField id="outlined-basic" label="Adjusted Amount" variant="outlined" name="add_user_adjusted_amount" placeholder="0.00" onChange={this.handleChange} type="number" step={0.01}/>
                      <div className={classes.btn}>
                      <Button onClick={this.handleAddUser}>Add</Button>
                      <Button onClick={() => this.handleClose("add_user")}>Cancel</Button>
                      </div>
                    </div>
                  </Fade>
                </Modal>
                <div className={classes.add_user_button}>
                <Button variant="outlined" color="primary" className={classes.item_button} size='small'  display="inline"  onClick={() => this.handleOpen("add_user", "na", "na")}>
                  Add User
                </Button>
                </div>

                <br></br>
                {/* <hr className={classes.hr}></hr> */}
            {
              this.state.users.map((user, index) => {
                return (
                  <Grid item xs key={index+1}>
                    <Modal
                      aria-labelledby="transition-modal-title"
                      aria-describedby="transition-modal-description"
                      className={classes.modal}
                      open={this.state.user_modal === user.user_nickname}
                      onClose={() => this.handleClose("user_modal")}
                      closeAfterTransition
                      BackdropComponent={Backdrop}
                      BackdropProps={{
                        timeout: 500,
                      }}
                    >
                      <Fade in={this.state.user_modal === user.user_nickname}>
                        <div className={classes.paper_modal}>
                        <div className={classes.modal_padding}>
                            <TextField id="outlined-basic" label="Change User Name" variant="outlined" name="new_nickname" defaultValue={this.state.new_nickname} onChange={this.handleChange}/>
                            </div>
                            <TextField id="outlined-basic" label="Change Adjustment" variant="outlined" name="new_adjusted_amount" defaultValue={this.state.new_adjusted_amount} onChange={this.handleChange} type="number" step={0.01}/>
                            <div>
                            <Button onClick={this.handleDeleteUser}>Delete</Button>
                            <Button onClick={() => this.handleUserEdit(user.user_adjusted_amount)}>Edit</Button>
                            <Button onClick={() => this.handleClose("user_modal")}>Cancel</Button>
                            </div>
                        </div>
                      </Fade>
                    </Modal>
                    <Paper className={classes.paper}>
                      <div style={{
                          "display": "flex",
                          "justifyContent": "center",
                          "alignItems": "center",
                        }}>
                        <Button onClick={() => this.handleOpen("user_modal", user.user_nickname, user.user_adjusted_amount)}>{user.user_nickname}</Button>
                      </div>
                      <div className="innerList">
                        {
                          // check if the user_adjusted_amount exists
                          this.state.user_assignments === undefined
                          ?
                            <div style={{"textAlign": "center"}}>
                            no assignments
                            </div>
                          : (
                            // check if the user array is empty
                            this.state.user_assignments[user.user_nickname].length === 0
                            ?
                              <div>
                                <div style={{"textAlign": "center"}}> no assignments </div>
                                <div style={{"textAlign": "center"}}> adjustments: {user.user_adjusted_amount.toFixed(2)} </div>
                              </div>
                            : (
                              <div style={{"textAlign": "center"}}> 
                                { 
                                  this.state.user_assignments[user.user_nickname].map((item, index2) => {
                                    return (
                                      <div key={index2+1} style={{"textAlign": "center"}}>
                                        {item}
                                      </div>
                                    )
                                  })
                                }
                                <br/>
                                <div>
                                total: {user.user_amount_owed.toFixed(2)} 
                                <br/>
                                adjustments: {user.user_adjusted_amount.toFixed(2)}
                                </div>
                              </div>
                            )
                          )
                        }
                      </div>
                    </Paper>
                  </Grid>
                )
              })
            }
            </Grid>
            {/* Render group total */}
            <hr className={classes.hr}></hr>

            <Grid container justify="center">
              <Grid item>
                <Typography variant="h5" className={classes.text} style={{'textAlign':"center"}}>
                  Total
                </Typography>
                <Typography className={classes.text} style={{'textAlign':"center"}}>
                  Below displays the total cost and any additional adjustments.
                </Typography>
              </Grid>              
            </Grid>
            <hr className={classes.hr}></hr>

            <Grid container className={classes.border} styling={{"paddingBottom": "5px"}}>
              <Grid item xs>
                <Paper className={classes.paper}>
                  {/* Grand Total */}
                  {/* <ul className="innerList"> */}
                  {
                    this.state.edit_tip
                    ?
                    <div style={{"textAlign": "center"}}>
                      <TextField id="outlined-basic" label="Tip" variant="outlined" name="new_tip_rate" onChange={this.handleChange} defaultValue={this.state.new_tip_rate} type="number"/>
                      <div>
                      <Button onClick={this.handleTip}>Submit</Button>
                      <Button onClick={() => this.handleClose("edit_tip")}>Cancel</Button>
                      </div>
                    </div>
                    :
                    <div className={classes.edit_flex_container}>
                      <div>Tip Rate: {this.state.tip_rate}%</div>
                      <Button variant="outlined" color="primary" className={classes.item_button} size='small' display="inline" onClick={() => this.handleOpen("edit_tip")}>Edit Tip</Button>
                      </div>
                  }
                    <div style={{"textAlign": "center"}}>Tax Rate: {
                      this.state.tax_rate === 0
                      ? 0
                      : (this.state.tax_rate-1).toFixed(6) * 100
                    }% </div>
                    <div style={{"textAlign": "center"}}>SubTotal: ${this.state.sub_total.toFixed(2)}</div>
                    <div style={{"textAlign": "center"}}>Grand Total: ${this.state.total_cost.toFixed(2)}</div>
                    <div style={{"textAlign": "center"}}>Net Adjustments: ${this.state.total_adjustment.toFixed(2)}</div>
                  {/* </ul> */}
                  {
                    this.state.image_url.length > 0
                    ?
                      this.state.show_image 
                      ? 
                        <div>
                          <Button onClick={this.handleImage}>Hide</Button>
                          <img style={{width: 225}} src={this.state.image_url} alt={"None"}/>
                        </div>
                      :
                        <Button onClick={this.handleImage}>Show</Button>
                    :
                  <p>No Receipt Uploaded</p>
                  }
                  <Form className="form" onSubmit={this.handleReupload}>
                    <div>
                      <input type="file" name="file" accept="image/png, image/jpeg" onChange={this.handleImagePreview}/>
                      <br></br>
                      <img style={{width: 225}} src={this.state.preview} alt={""}/>
                    </div>
                    <Button type='submit'>New Upload</Button>
                  </Form>
                </Paper>
              </Grid>
            </Grid>  
            
            <br></br>
          </div>
        }
      </div>
    )
  }
}

// use styles for Material UI with react class component
export default withStyles(styles, { withTheme: true })(SplitBillPage);

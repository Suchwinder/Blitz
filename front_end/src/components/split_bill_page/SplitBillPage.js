import React, { Component } from 'react';
import NavBar from '../nav_bar/NavBar'
// need to use withStyles to combine Material UI design with react compnents at end of file when exporting
import { withStyles } from "@material-ui/core/styles";
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
// import { FormControl, Select, InputLabel, MenuItem} from '@material-ui/core';
import './SplitBill.css'
import { Redirect } from 'react-router-dom';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Autocomplete from '@material-ui/lab/Autocomplete';


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
    }
});

const ColoredLine = ({ color }) => (
    <hr
        style={{
            color: color,
            backgroundColor: color,
            height: 5
        }}
    />
);

class SplitBillPage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      city: "",
      group_url: window.location.href,
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
      userModal: null,
      ItemModal: null,
    }
  }

  // –––––––––––– Get Group Data ––––––––––––
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

        // result.items.forEach(item => {
        //   console.log(item.item_name);
        // })
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
        }/*, () => {console.log("after", this.state)}*/)
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
  handleAsssign = async (event, value, type) => {
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
      console.log(result.message);
      // get data again
      await this.fetchGroupData();
      console.log("Data Updated");
    } else {
      alert(result.error);
    }
  }
  // –––––––––––– Edit Item or Edit User ––––––––––––
  handleEdit = async () => {
  }
  // –––––––––––– Delete Item ––––––––––––

  // –––––––––––– Delete User ––––––––––––

  componentDidMount = async () => {
    await this.fetchGroupData();
  }

  render() {
    // get access to the styling for our components to use
    const classes = this.props.classes;
    return (
      <div>
        <NavBar/>
        {
          this.state.redirect 
          ? 
          <Redirect to='/'/>
          :
          <div className="split-bill-page">
            <br/>
            <h4 style={{"textAlign": "center"}}> {this.state.location_name} </h4>
            <p style={{"textAlign": "center"}}> {this.state.address} </p>
            {/* Render item, item price, and user assignment that is modifyable
            should open a model to update for UI friendliness */}
            <Grid container spacing={3}>
              {/* Currently displaying item name and cost */}
              <Grid item xs>
                <Paper className={classes.paper}>
                <h6 style={{"textAlign": "center"}}> Items </h6>
                {/* <ul className="innerList"> */}
                {
                  this.state.items.map((item, index) => {
                    return (
                      <div key={index+1}>
                        <Button variant="outlined" color="primary" className={classes.item_button} size='small' display="inline">
                          {item.item_name}: ${item.item_cost} 
                        </Button> 
                        <Autocomplete
                          id="free-solo-demo"
                          freeSolo
                          display='inline'
                          disableClearable={true}
                          value={this.state.item_assignments[item.item_name]}
                          multiple
                          options={[]}
                          onChange={this.handleAsssign}
                          size='small'
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
            <ColoredLine color="black" />
            <br></br>
            {/* Render total for each individual */}
            <Grid container spacing={3}>
            {
              this.state.users.map((user, index) => {
                return (
                  <Grid item xs key={index+1}>
                    <Paper className={classes.paper}>
                      <div style={{
                          "display": "flex",
                          "justifyContent": "center",
                          "alignItems": "center",
                        }}>
                        <Button>{user.user_nickname}</Button>
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
                              <div style={{"textAlign": "center"}}> no assignments </div>
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
            <Grid container spacing={3}>
              <Grid item xs>
                <Paper className={classes.paper}>
                  {/* Grand Total */}
                  {/* <ul className="innerList"> */}
                    <div style={{"textAlign": "center"}}>Tip Rate: {this.state.tip_rate}%</div>
                    <div style={{"textAlign": "center"}}>Tax Rate: {
                      this.state.tax_rate === 0
                      ? 0
                      : (this.state.tax_rate-1).toFixed(6) * 100
                    }% </div>
                    <div style={{"textAlign": "center"}}>SubTotal: ${this.state.sub_total.toFixed(2)}</div>
                    <div style={{"textAlign": "center"}}>Grand Total: ${this.state.total_cost.toFixed(2)}</div>
                  {/* </ul> */}
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

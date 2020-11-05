import React, { Component } from 'react';
import NavBar from '../nav_bar/NavBar'
// need to use withStyles to combine Material UI design with react compnents at end of file when exporting
import { withStyles } from "@material-ui/core/styles";
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import { FormControl, Select, InputLabel, MenuItem} from '@material-ui/core';
import '../split_bill/SplitBill.css'
import { Redirect } from 'react-router-dom';


const styles = (theme) => ({
    root: {
      flexGrow: 1,
    },
    paper: {
      padding: theme.spacing(2),
      textAlign: 'center',
      color: theme.palette.text.secondary,
    },
    fullWidth: {
      width: '100%',
    },
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
      group_url: props.groupURL.match.url,
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
    }
  }

  fetchGroupData = async () => {
    // With get requests cant pass a body, so pass in URL parameter instead, should be URL encoded but in this case skipped as it currently works without it
    try {
      const response = await fetch(`/api/get_group/?group_URL=http://localhost:3000${this.state.group_url}`)
      const status = response.status;
      const result = await response.json();
  
      if(status == 200) {
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

  // loadAllUserData = async () => {
  //   try {
  //     await this.fetchGroupData()

  //   } catch {
  //     console.log(error);
  //   }
  // }
  componentDidMount = async ()=> {
    // console.log(this.state.group_url);
    // console.log(window.location.href);
    // console.log(this.props);
    // await this.loadAllUserData();
    await this.fetchGroupData();
  }

  render() {
    // the 
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
            <Grid container spacing={3}>
              <Grid item xs>
                <Paper className={classes.paper}>
                Items
                  <ul className="innerList">
                    <li>
                      5 Apples
                    </li>
                    <li>
                      3 Oranges
                    </li>
                  </ul>
                </Paper>
              </Grid>
              <Grid item xs>
                <Paper className={classes.paper}>
                  $/unit
                  <ul className="innerList">
                    <li>
                      $3
                    </li>
                    <li>
                      $2
                    </li>
                  </ul>
                </Paper>
              </Grid>
              <Grid item xs>
                <Paper className={classes.paper}>
                  <FormControl>
                    <InputLabel >User 1</InputLabel>
                    <Select>
                      <MenuItem>Item 1</MenuItem>
                      <MenuItem>Item 2</MenuItem>
                    </Select>
                  </FormControl>
                  <br></br>
                  <FormControl>
                    <InputLabel >User 2</InputLabel>
                    <Select>
                      <MenuItem>Item 1</MenuItem>
                      <MenuItem>Item 2</MenuItem>
                    </Select>
                  </FormControl>
                </Paper>
              </Grid>
            </Grid>

            <br></br>
            <ColoredLine color="black" />
            <br></br>
            <Grid container spacing={3}>
            {
              this.state.users.map((user, index) => {
                return (
                  <Grid item xs key={index+1}>
                    <Paper className={classes.paper}>
                      {user.user_nickname}
                      <br/>
                      <ul className="innerList">
                        {
                          // check if the user_adjusted_amount exists
                          this.state.user_assignments === undefined
                          ?
                            <div>
                              <li> no assignments</li>
                            </div>
                          : (
                            // check if the user array is empty
                            this.state.user_assignments[user.user_nickname].length === 0
                            ?
                              <li> no assignments </li>
                            : (
                              <div>
                                { 
                                  this.state.user_assignments[user.user_nickname].map((item, index2) => {
                                    return (
                                      <li key={index2+1}>
                                        {item}
                                      </li>
                                    )
                                  })
                                }
                                <br/>
                                <li>
                                total: {user.user_amount_owed.toFixed(2)} 
                                <br/>
                                adjustments: {user.user_adjusted_amount.toFixed(2)}
                                </li>
                              </div>
                            )
                          )
                        }
                      </ul>
                    </Paper>
                  </Grid>
                )
              })
            }
            </Grid>
            <Grid container spacing={3}>
              <Grid item xs>
                <Paper className={classes.paper}>
                  Grand Total
                  <ul className="innerList">
                    <li>
                      5x Apple
                    </li>
                    <li>
                      3x Orange
                    </li>
                    <br></br>
                    <li>
                      Total: $21
                    </li>
                  </ul>
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

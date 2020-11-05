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
    }
  }

  fetchGroupData = async () => {
    // With get requests cant pass a body, so pass in URL parameter instead, should be URL encoded but in this case skipped as it currently works without it
    const response = await fetch(`/api/get_group/?group_URL=http://localhost:3000${this.state.group_url}`)
    const status = response.status;
    const result = await response.json();

    if(status == 200) { // good request can parse

    } else if (status >= 400) {
        alert(result.error);
        this.setState({
          redirect: true
        });
    }
  }

  componentDidMount = async ()=> {
    // console.log(this.state.group_url);
    // console.log(window.location.href);
    console.log(this.props);
    this.fetchGroupData();
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
            Hello World!
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
              <Grid item xs>
                <Paper className={classes.paper}>
                  User 1
                  <ul className="innerList">
                    <li>
                      1x Apple
                    </li>
                    <br></br>
                    <li>
                      Total: $3
                    </li>
                  </ul>
                </Paper>
              </Grid>
              <Grid item xs>
                <Paper className={classes.paper}>
                  User 2
                  <ul className="innerList">
                    <li>
                      2x Orange
                    </li>
                    <br></br>
                    <li>
                      Total: $4
                    </li>
                  </ul>
                </Paper>
              </Grid>
              <Grid item xs>
                <Paper className={classes.paper}>
                  User 3
                  <ul className="innerList">
                    <li>
                      4x Apple
                    </li>
                    <li>
                      1x Orange
                    </li>
                    <br></br>
                    <li>
                      Total: $14
                    </li>
                  </ul>
                </Paper>
              </Grid>
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

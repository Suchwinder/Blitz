import React, { Component } from 'react';
import NavBar from '../nav_bar/NavBar'
// need to use withStyles to combine Material UI design with react compnents at end of file when exporting
import { withStyles } from "@material-ui/core/styles";
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import { FormControl, Select, InputLabel, MenuItem} from '@material-ui/core';
import '../split_bill/SplitBill.css'


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
            group_url: props.groupURL.match.url
        }
    }

    componentDidMount() {
        // console.log(this.state.group_url);
        // console.log(window.location.href);
        console.log(this.props);
    }

    render() {
        // the 
        const classes = this.props.classes;
        return (
            <div>
                <NavBar/>
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
            </div>
        )
    }
}

// use styles for Material UI
export default withStyles(styles, { withTheme: true })(SplitBillPage);

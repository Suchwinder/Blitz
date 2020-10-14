import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import '../split_bill/SplitBill'

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  paper: {
    padding: theme.spacing(2),
    textAlign: 'center',
    color: theme.palette.text.secondary,
  },
}));

const ColoredLine = ({ color }) => (
    <hr
        style={{
            color: color,
            backgroundColor: color,
            height: 5
        }}
    />
);

export default function AutoGrid() {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <Grid container spacing={3}>
        <Grid item xs>
            <Paper className={classes.paper}>
              Items
                <ol>
                    <li>
                        5 Apples
                    </li>
                    <li>
                        3 Oranges
                    </li>
                </ol>
            </Paper>
        </Grid>
        <Grid item xs>
            <Paper className={classes.paper}>
                Price per Unit
                <ul className="peopleInput">
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
                People
                <ul className="peopleInput">
                    <li>
                        <input ></input>
                    </li>
                    <li>
                        <input ></input>
                    </li>
                </ul>
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
              <ul className="peopleInput">
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
              <ul className="peopleInput">
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
              <ul className="peopleInput">
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
              <ul className="peopleInput">
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
  );
}
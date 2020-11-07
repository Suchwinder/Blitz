import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import Autocomplete from '@material-ui/lab/Autocomplete';
import TextField from '@material-ui/core/TextField';
import '../split_bill/SplitBill';

const useStyles = makeStyles((theme) => ({
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

    // const[items, setItems] = useState([]);

    return (
        <div className={classes.root}>
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
                <div className={classes.root}>
                    <Autocomplete
                        multiple
                        id="tags-standard"
                        options={items_list}
                        getOptionLabel={(option) => option.string}
                        renderInput={(params) => (
                        <TextField
                            {...params}
                            variant="standard"
                            label="User 1"
                            placeholder="Selection"
                        />
                        )}
                    />
                </div>
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
    );
}
const items_list = [
    { string: 'Orange'},
    { string: 'Apple'},
  ];
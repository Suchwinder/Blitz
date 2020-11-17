import React, { Component } from 'react';
import NavBar from '../nav_bar/NavBar';
import Grid from '@material-ui/core/Grid';
import { Typography } from "@material-ui/core";
import { withStyles } from "@material-ui/core/styles";
import people from './people.jpg';
import { Button } from 'reactstrap';
// import './MainPage.css';

const styles = () => ({
  root:{
    
  },
  img:{
    // zIndex: -1,
    width: '25%',
    height: '25%',
    top: 0,
    left: 0,
  },
  text:{
    fontSize: '20px',
    color: 'black',
    position: 'static',
    textAlign: 'center',
  },
  steps:{
    justifyContent: 'center',
  },
});

class MainPage extends Component{
  render(){
    const { classes } = this.props;
    return(
      <div className={classes.root}>
        <NavBar/>
        <div className={classes.text}>
          <Grid container>
            <Grid item xs={12} sm={6}>
              <br></br>
              <Typography variant="h4">
                Welcome to Blitz
              </Typography>
              <Typography>  
                An easy-to-use platform to help distribute your group's costs. 
              </Typography>
              <Typography>
                Click below to get started.
              </Typography>
              <br></br>
              <Button>Get Started</Button>
            </Grid>
            <img className={classes.img} src={people} alt="people"/>
          </Grid>
          {/* <Grid item xs={12} sm={6}>
              
          </Grid> */}
          <Typography variant="h4">
              Get started with these simple steps:
          </Typography>
          <br></br>
          <Grid container className={classes.steps}>
            <Grid item xs={4} sm={2}>
              <Typography>
                1. Click 'Create' on the task bar above or the 'Get Started' button above to get started.
              </Typography>
            </Grid>
            <Grid item xs={4} sm={2}>
              <Typography>
                2. Fill out all of the prompts. Submitting your receipt is optional.
              </Typography>
            </Grid>
            <Grid item xs={4} sm={2}>
              <Typography>
                3. Submit and share! 
              </Typography>
            </Grid>
          </Grid>
        </div>
      </div>
    )   
  }
}

export default withStyles(styles)(MainPage);
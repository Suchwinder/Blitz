import React, { Component } from 'react';
import NavBar from '../nav_bar/NavBar';
import Grid from '@material-ui/core/Grid';
import { CardActionArea, Typography } from "@material-ui/core";
import { withStyles } from "@material-ui/core/styles";
import { Button } from 'reactstrap';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import People from '../images/people.jpg';
import Such from '../images/such.png';
import David from '../images/david.jpg';
import Kent from '../images/kent.png';
import Rohan from '../images/rohan.png';

const styles = () => ({
  root:{
    
  },
  img:{
    // zIndex: -1,
    maxWidth: '25%',
    height: 'auto',
    top: 0,
    left: 0,
  },
  text:{
    fontSize: '20px',
    color: 'black',
    position: 'static',
    textAlign: 'center',
  },
  columns:{
    justifyContent: 'center',
  },
  card:{
    width: 150,
    height: 200,
    margin: '2vh',
  },
  cards:{
    paddingTop: '2vh',
    paddingLeft : '2vh',
    paddingRight : '2vh',
    justifyContent: 'center',
  },
  media:{
    height: 125,
  },
  actionArea:{
    maxWidth: 188,
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
              {/* Introduction */}
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
            {/* Image */}
            <img className={classes.img} src={People} alt="people"/>
          </Grid>
          
          {/* How to - Guide */}
          <Typography variant="h4">
              Get started with these simple steps:
          </Typography>
          <br></br>
          <Grid container className={classes.columns}>
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

          <br></br>

          {/* About the Team  */}
          <Typography variant="h4">
            About Us
          </Typography>
          <br></br>
          <Grid container className={classes.columns}>
            <Grid item xs={8}>
              <Typography>
                Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                Nunc maximus, nulla ut commodo sagittis, sapien dui mattis dui, 
                non pulvinar lorem felis nec erat. Aliquam egestas, velit at condimentum placerat, 
                sem sapien laoreet mauris, dictum porttitor lacus est nec enim. 
                Vivamus feugiat elit lorem, eu porttitor ante ultrices id. 
                Phasellus suscipit tellus ante, nec dignissim elit imperdiet nec. 
                Nullam fringilla feugiat nisl. Ut pretium, metus venenatis dictum viverra, 
                dui metus finibus enim, ac rhoncus sem lorem vitae mauris. 
                Suspendisse ut venenatis libero. Suspendisse lorem felis, pretium in maximus id, tempor non ipsum.
              </Typography>
              <Typography>
                In progress: Capstone project where users can process receipts to manage costs of activities. 
                Will use React, Flask, OpenCV/Pytesseract, and web sockets. 
              </Typography>
              <Typography>
                <a href="https://github.com/Suchwinder/Blitz">
                  Blitz Github Link
                </a>
              </Typography>
              <Typography >                
                <a href="https://blitz-cost-management.herokuapp.com/">
                  Current deployment
                </a>
                </Typography>
            </Grid>
          </Grid>
          
          <br></br>

          {/* Team Githubs */}
          <Grid container className={classes.cards}>
            <CardActionArea className={classes.actionArea} 
            // onClick={(e) => {
            //   e.preventDefault();
            //   window.location.href='https://github.com/Suchwinder';
            // }}
            href='https://github.com/Suchwinder'
            >
              <Card className={classes.card}>
                <CardMedia 
                  className={classes.media}
                  image={Such}
                />  
                <CardContent>
                  <Typography>
                    Such
                  </Typography>
                </CardContent>
              </Card>
            </CardActionArea>
            
            <CardActionArea className={classes.actionArea} 
            // onClick={(e) => {
            //   e.preventDefault();
            //   window.location.href='https://github.com/davidy9000';
            // }}
            href='https://github.com/davidy9000'
            >
              <Card className={classes.card}>
                <CardMedia 
                  className={classes.media}
                  image={David}
                />  
                <CardContent>
                  <Typography>
                    David
                  </Typography>
                </CardContent>
              </Card>
            </CardActionArea>

            <CardActionArea className={classes.actionArea} 
            // onClick={(e) => {
            //   e.preventDefault();
            //   window.location.href='https://github.com/knt-zhang';
            // }}
            href='https://github.com/knt-zhang'
            >
              <Card className={classes.card}>
                <CardMedia 
                  className={classes.media}
                  image={Kent}
                />  
                <CardContent>
                  <Typography>
                    Kent
                  </Typography>
                </CardContent>
              </Card>
            </CardActionArea>

            <CardActionArea className={classes.actionArea} 
            // onClick={(e) => {
            //   e.preventDefault();
            //   window.location.href='https://github.com/rtohaan';
            // }}
            href='https://github.com/rtohaan'
            >
              <Card className={classes.card}>
                <CardMedia 
                  className={classes.media}
                  image={Rohan}
                />  
                <CardContent>
                  <Typography>
                    Rohan
                  </Typography>
                </CardContent>
              </Card>
            </CardActionArea>
          </Grid>
        </div>
      </div>
    )   
  }
}

export default withStyles(styles)(MainPage);
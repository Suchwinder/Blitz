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
import ReactLogo from '../images/react.png';
import Python from '../images/python.png';
import Flask from '../images/flask.png';
import Tesseract from '../images/tesseract.png';
import OpenCV from '../images/opencv.png';
import SQLAlchemy from '../images/sqlalchemy.png';
import Heroku from '../images/heroku.png';
import S3 from '../images/s3.png';
import PSQL from '../images/psql.png';
import MediaQuery from 'react-responsive';
import Navbar from 'react-bootstrap/esm/Navbar';
import './MainPage.css';



const styles = () => ({
  root:{
    
  },
  img:{
    maxWidth: '25%',
    height: 'auto',
    top: 0,
    left: 0,
  },
  mobile_img:{
    maxWidth: '85%',
    height: 'auto',
    top: 0,
    left: 0,
    marginLeft: 'auto',
    marginRight: 'auto',
  },
  title:{
    paddingTop: '2vh',
    paddingLeft : '2vh',
    paddingRight : '2vh',
  },
  text:{
    fontSize: '20px',
    color: 'black',
    position: 'static',
    textAlign: 'center',
  },
  columns:{
    justifyContent: 'center',
    // marginleft: '-.75rem',
    // marginright: '-.75rem',
    // margintop: '-.75rem',
  },
  card:{
    width: 150,
    height: 200,
    margin: '2vh',
  },
  cardsList:{
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
  background:{
    paddingLeft: '60px',
    paddingRight: '60px',
    padding: '60px',
  },
  steps:{
    padding: '.75rem',
  },
  tech:{
    width: 150,
    height: 150,
    paddingTop: '2vh',
    paddingLeft : '2vh',
    paddingRight : '2vh',
    justifyContent: 'center',
  },
  techImg:{
    width: '100%',
    height: '55%',
  },
  textPadding:{
    paddingTop: '2vh',
  },
  footer:{

  },
});

class MainPage extends Component{
  render(){
    const { classes } = this.props;
    return(
      <div className={classes.root}>
        <NavBar/>
        <div className={classes.text}>
          <Grid container alignItems="center" justify="center">
            <Grid item xs={12} sm={3}>
              {/* Introduction */}
              <Typography variant="h4" className={classes.title}>
                Welcome to Blitz
              </Typography>
              <Typography className={classes.textPadding}>  
                An easy-to-use platform to help distribute your group's costs. 
              </Typography>
              <Typography>
                Click below to get started.
              </Typography>
              <p className={classes.textPadding}></p>
              <Button>Get Started</Button>
            </Grid>
            {/* Image */}
            <MediaQuery minWidth={600} >
            <img className={classes.img} src={People} alt="people"/>
            </MediaQuery>
            <MediaQuery maxWidth={600}>
            <img className={classes.mobile_img} src={People} alt="people"/>
            </MediaQuery>
          </Grid>
          
          {/* How to - Guide */}
          <Typography variant="h4" className={classes.title}>
            Get started with these simple steps:
          </Typography>
          {/* <p className={classes.textPadding}></p> */}
          <Grid container className={classes.columns}>
            <Grid item xs={4} sm={2}>
              <Typography className={classes.steps}>
                1. Click 'Create' on the task bar above or the 'Get Started' button above to get started.
              </Typography>
            </Grid>
            <Grid item xs={4} sm={2}>
              <Typography className={classes.steps}>
                2. Fill out all of the prompts. Submitting your receipt is optional.
              </Typography>
            </Grid>
            <Grid item xs={4} sm={2}>
              <Typography className={classes.steps}>
                3. Submit and share! 
              </Typography>
            </Grid>
          </Grid>

          {/* About the Team  */}
          <Typography variant="h4" className={classes.title}>
            About Us
          </Typography>
          <Grid container className={classes.columns}>
            <Grid item xs={8}>
              <Typography className={classes.textPadding}>
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
              <Typography>                
                <a href="https://blitz-cost-management.herokuapp.com/">
                  Current deployment
                </a>
                </Typography>
            </Grid>
          </Grid>

          {/* Team Githubs */}
          <Grid container className={classes.cardsList}>
            <CardActionArea className={classes.actionArea} 
            href='https://github.com/Suchwinder'>
              <Card className={classes.card}>
                <CardMedia 
                  className={classes.media}
                  image={Such}/>  
                <CardContent>
                  <Typography>
                    Such
                  </Typography>
                </CardContent>
              </Card>
            </CardActionArea>
            
            <CardActionArea className={classes.actionArea} 
            href='https://github.com/davidy9000'>
              <Card className={classes.card}>
                <CardMedia 
                  className={classes.media}
                  image={David}/>  
                <CardContent>
                  <Typography>
                    David
                  </Typography>
                </CardContent>
              </Card>
            </CardActionArea>

            <CardActionArea className={classes.actionArea} 
            href='https://github.com/knt-zhang'>
              <Card className={classes.card}>
                <CardMedia 
                  className={classes.media}
                  image={Kent}/>  
                <CardContent>
                  <Typography>
                    Kent
                  </Typography>
                </CardContent>
              </Card>
            </CardActionArea>

            <CardActionArea className={classes.actionArea} 
            href='https://github.com/rtohaan'>
              <Card className={classes.card}>
                <CardMedia 
                  className={classes.media}
                  image={Rohan}/>  
                <CardContent>
                  <Typography>
                    Rohan
                  </Typography>
                </CardContent>
              </Card>
            </CardActionArea>
          </Grid>

          {/* Tools used */}
          <Typography variant="h4" className={classes.title}>
            Tools Used
          </Typography>
          <p className={classes.textPadding}></p>
          <Grid container justify="center">
            <Card className={classes.tech}>
              <CardMedia 
                className={classes.techImg}
                image={ReactLogo}/>
                React
            </Card>
            <Card className={classes.tech}>
              <CardMedia 
                className={classes.techImg}
                image={Python}/>
                Python
            </Card>
            <Card className={classes.tech}>
              <CardMedia 
                className={classes.techImg}
                image={Flask}/>
                Flask
            </Card>
            <Card className={classes.tech}>
              <CardMedia 
                className={classes.techImg}
                image={Tesseract}/>
                Tesseract
            </Card>
            <Card className={classes.tech}>
              <CardMedia 
                className={classes.techImg}
                image={OpenCV}/>
                OpenCV
            </Card>
            <Card className={classes.tech}>
              <CardMedia 
                className={classes.techImg}
                image={SQLAlchemy}/>
                SQL Alchemy
            </Card>
            <Card className={classes.tech}>
              <CardMedia 
                className={classes.techImg}
                image={Heroku}/>
                Heroku
            </Card>
            <Card className={classes.tech}>
              <CardMedia 
                className={classes.techImg}
                image={S3}/>
                Amazon S3
            </Card>
            <Card className={classes.tech}>
              <CardMedia 
                className={classes.techImg}
                image={PSQL}/>
                PostgreSQL
            </Card>
          </Grid>
          <p className={classes.textPadding}></p>
          
          {/* Footer */}
          <Navbar bg="dark" variant="dark" className={classes.footer}>
            Footer
          </Navbar>
        </div>
      </div>
    )   
  }
}

export default withStyles(styles)(MainPage);
import React, { Component } from 'react';
import NavBar from '../nav_bar/NavBar'
import './MainPage.css'
import io from "socket.io-client";


class MainPage extends Component{
  // componentDidMount = () => {
  //   const ENDPOINT = "http://localhost:5000";
  //   const socket = io.connect(ENDPOINT, {
  //     reconnection: true,
  //     // transports: ['websocket']
  //   });

  //   console.log("the socket: ",  socket);

  //   // socket.emit('asd', () => {
  //     // console.log('I emit the connection??')
  //   // })

  //   socket.on('asd', () => {
  //     console.log('I have successfully connected to the server');
  //   })
  // }

  render(){
    return(
      <div>
        <NavBar/>
        <div className="text">
          <h1>What do we do?</h1>
          <p>We help people split the bill.</p>
          <h2>How it works:</h2>
          <ol>
            <li>Create a group</li>{" "}
            <li>Enter Parameters (enter number of people)</li>{" "}
            <li>Upload the receipt and share your group's link</li>{" "}
            <li>Each individual selects their purchase(s)</li> <li>That's it</li>{" "}
          </ol>{" "}
        </div>
      </div>
    )   
  }
  
}

export default MainPage;
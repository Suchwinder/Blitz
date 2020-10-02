import React from 'react';
import NavBar from '../nav_bar/NavBar'
import './MainPage.css'

const MainPage = () => {
  return(
    <div className="main-page">
      <NavBar/>
      <div className="center">
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

export default MainPage;
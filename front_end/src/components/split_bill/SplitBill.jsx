import React from 'react';
import NavBar from '../nav_bar/NavBar'
import Grid from '../Grid/Grid'
import './SplitBill.css'

const SplitBill = () => {
  return(
    <div className="split-bill-page">
      <NavBar/>
      <div className="body">
        <div>This is your sharable link:
            <div className="boxed"> https://bit.ly/2GyrlZh </div>
            <copy-button target-element=".boxed"></copy-button>
        </div>
        <br></br>
        <Grid/>
        <div className="receipt">
            <img src="https://mdbootstrap.com/img/Photos/Others/placeholder.jpg" className="placeholder" alt="example placeholder"></img>
        </div>
      </div>
    </div>
    
)   
}

export default SplitBill;
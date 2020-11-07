import React, {Component} from 'react';
import NavBar from '../nav_bar/NavBar'
import Grid from '../grid/Grid'
import './SplitBill.css'

class SplitBill extends Component {
  render() {
      return(
        <div className="split-bill-page">
          <NavBar/>
          <div className="text">
            <div>This is your sharable invite link: {' '}
                <div className="boxed"> https://bit.ly/2GyrlZh </div>
                <copy-button target-element=".boxed"></copy-button>
            </div>
            <br></br>
            <Grid/>
          </div>
        </div>
        
    )   
  }   
}
export default SplitBill;
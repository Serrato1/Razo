import React, {Component} from 'react'
import {Link} from 'react-router-dom'
import TopNav from './TopNav'
class LandingPage extends Component{
  render(){
    return(
      <div className="main-container">
        <TopNav className="nav"/>
        <div style={{fontSize: '30px'}}className="top color-white text-center">
          RAZO
        </div>
        <div className="middle item-center">
          <i style={{color:'white',fontSize :  '100px'}} className="fa fa-camera" aria-hidden="true"></i>
        </div>
        <div className="bottom color-white text-center">
        </div>

      </div>
    )
  }
}



export default LandingPage;

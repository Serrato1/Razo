import React, {Component} from 'react'
import {Link} from 'react-router-dom'


class TopNav extends Component{
  render(){
    return(
      <div  style={{zIndex:'50'}} className="top-nav">
                <Link to='/' className="color-black no-style link-home"><i className="fa fa-home"></i></Link>
                <Link to = {{
                  pathname : '/Camera',
                  query:{
                    reset : true
                  }
                }
              } className="color-black no-style link-camera" >
                  <i className= 'fa     fa-camera'> </i>
                </Link>
                <Link to='/ShoppingCart' className="no-style color-black col-sz-2 ">
                  <i style={{color:'white',fontSize :  ' 40px' , position: 'absolute',right:'10px',bottom:'10px'}} className="fa fa-shopping-cart"> </i>
                </Link>

      </div>
    )
  }
}



export default TopNav;

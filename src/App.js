import React, { Component } from 'react';
import './styles/App.css';
import {BrowserRouter as Router, Route  } from 'react-router-dom';
import {Link} from 'react-router-dom';
import LandingPage from './components/LandingPage.js'
import Camera from './components/Camera.js'
import ShoppingCart from './components/ShoppingCart.js'
import {connect} from 'react-redux';
import {fetchAll, fetchCart} from './actions/index.js'
import {bindActionCreators} from 'redux'
import TopNav from './components/TopNav.js';
import ProductAnalysis from './components/ProductAnalysis';
class App extends Component {

  render() {
    console.log('Props: ', this.props.users);
    return (
      <Router>
        <div>
          <Route exact path='/' component={LandingPage}></Route>
          <Route exact path='/Camera' component={Camera}></Route>
          <Route exact path='/ShoppingCart' component={ShoppingCart}></Route>
          <Route exact path='/ProductAnalysis' component={ProductAnalysis} >   </Route>
        </div>
      </Router>

    );
  }
}
let mapStateToProps = (state)=>{
  return ({
    users : state.users
  })
}
let mapDispatchToProps = (dispatch)=>{
  return bindActionCreators({
    fetchUsers : fetchAll,
    fetchCart: fetchCart
  },dispatch)
}
export default connect(mapStateToProps,mapDispatchToProps)(App);

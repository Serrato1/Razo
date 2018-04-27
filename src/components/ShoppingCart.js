import React, {Component} from 'react'
import {Link} from 'react-router-dom'
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux'
import TopNav from './TopNav'
import {addToCart ,                          removeCartItem, fetchCart} from '../actions'

class ShoppingCart extends Component{
  componentWillMount(){
    this.props.fetchCart();
  }
  render(){
      let cartItems = this.props.cart.map((item,indx)=>{
        let amazonUrlSearch = item.keyword.split(' ').slice(0,3).join('+').replace(',','');
        return(<div className="grid-col-4 col-sz-4" key={indx}>
          <div className="item-center">{item.keyword.substring(0,20)}</div>
          <div className="item-center">${item.price}</div>
          <div className="item-center">  <a href={`https://www.amazon.com/s/ref=nb_sb_noss_2/136-6992849-0997462?url=search-alias%3Daps&field-keywords=${amazonUrlSearch}`} target="_blank">LINK</a></div>
          <div className="item-center"><button onClick={()=>{this.props.removeCartItem(item)}}className=" color-white bg-red no-style">Remove</button></div>
        </div>
      )
      });
    return(
      <div className='grid-col-1'>
        <TopNav />
        <h2 className='item-center'>Here is Your Shopping Cart</h2>
        <div className="grid-col-4 grid-row-8 shopping-cart">
          <div className="grid-col-4 col-sz-4"  style={{ background: '#36D7B7 '}}>
            <div className="color-white item-center">Product</div>
            <div className="color-white item-center">Price</div>
            <div className="color-white item-center">Purchase</div>
            <div className="color-white item-center"></div>
          </div>
          {typeof cartItems !== 'undefined'? cartItems : <div></div>}
        </div>
      </div>
    )
  }
}


let mapStateToProps = (state)=>{
  return ({
    cart : state.cart
  })
}
let mapDispatchToProps = (dispatch)=>{
  return bindActionCreators({
    addToCart: addToCart,
    removeCartItem : removeCartItem,
    fetchCart : fetchCart
  },dispatch)
}
export default connect(mapStateToProps,mapDispatchToProps)(ShoppingCart);

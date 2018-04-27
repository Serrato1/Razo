import {combineReducers} from 'redux'
import {FETCH_ALL, UPDATE_PRODUCT , RESET_PRODUCT, ADD_TO_CART, REMOVE_CART_ITEM, FETCH_CART} from '../actions'

function users(state =[],action){
  switch(action.type){
    case FETCH_ALL:
      return [...action.payload]
    default:
      return ['no users']
  }
}
function product(state = [],action){
  switch(action.type){
    case UPDATE_PRODUCT:
    console.log('Text ' , action.extractedText)
      return [{
        extractedText: action.extractedText,
        label: action.label ,
        matchedProducts   :      action.matchedProducts || false
      }]
    case RESET_PRODUCT:
      console.log("Resetting Product");
      return [];
    default:
      return []
  }
}
function cart(state = [],action){
  switch(action.type){
    case FETCH_CART:
      if(action.cart.length > 0 ){
        return [...action.cart]
      }else{
        return [];
      }
    case ADD_TO_CART:
      console.log('Adding To Cart ' , action.cartItem)
      return [...state , action.cartItem]
    case REMOVE_CART_ITEM:
      console.log('Removing from cart: ', action.cartItem)
      let newState = state.filter((item)=>{
        return item.keyword === action.cartItem.keyword ? false : true;
      })
      return [...newState]
    default:
      return []
  }
}
export default combineReducers({
  users,
  product,
  cart
})

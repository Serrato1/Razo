import axios from 'axios'



export const FETCH_ALL = 'FETCH_ALL'

export function fetchAll(){
  return (dispatch)=>{
    dispatch({
      type: FETCH_ALL,
      payload: ['noel']
    })
  }
}

export const UPDATE_PRODUCT = 'UPDATE_PRODUCT'

export function updateProduct(extractedText,label,matchedProducts){
  return (dispatch)=>{
    dispatch({
      type : UPDATE_PRODUCT,
      extractedText: extractedText,
      label : label,
      matchedProducts: matchedProducts
    })
  }
}

export const FETCH_CART = 'FETCH_CART'

export function fetchCart(){
  return (dispatch)=>{
    axios('http://localhost:8000/cart')
    .then((result)=>{
      let cart = result.data.cart;
      dispatch({
        type : FETCH_CART,
        cart: cart
      })
    })
    .catch((err)=>{
      dispatch({
        type : FETCH_CART,
        cart: []
      })
    })

  }
}

export const ADD_TO_CART = 'ADD_TO_CART'

export function addToCart(cartItem){
  return (dispatch)=>{
    axios.post('http://localhost:8000/cart',{
      keyword : cartItem.keyword,
      price : cartItem.price,
      url : cartItem.keyword.split(' ').slice(0,3).join('+').replace(',','')
    })
    .then((result)=>{
      console.log("Successfully Posted");
      dispatch({
        type : ADD_TO_CART,
        cartItem: cartItem
      })
    })

  }
}
export const REMOVE_CART_ITEM = 'REMOVE_CART_ITEM'

export function removeCartItem(cartItem){
  return (dispatch)=>{
    dispatch({
      type : REMOVE_CART_ITEM,
      cartItem: cartItem
    })
  }
}

export const RESET_PRODUCT = 'RESET_PRODUCT'

export function resetProduct(){
  return (dispatch)=>{
    dispatch({
      type : RESET_PRODUCT
    })
  }
}

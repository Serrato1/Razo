import React, {Component} from 'react'
import {Link} from 'react-router-dom'


class ProductAnalysis extends Component{
  render(){
      let {extractedText, label , matchedProducts} = this.props.product;
      if(extractedText){
        extractedText = extractedText.map( (text,indx) =>{
          return <li key={indx}>{text}</li>
        })
      }else{
        extractedText = <li></li>;
      }
      if(matchedProducts){
        matchedProducts = matchedProducts.map((product,indx)=>{
          return <li key={indx}> Name : {product.keyword}<br/> Price : {product.price}<br/>Image <img src={product.image_url} /><div>ADD TO CART</div></li>
        })
      }else{
        matchedProducts =    <li>No Matched Products</li>
      }
      return(
        <div >
          <h2>Successfully Scannned Photo</h2>
          <div>
            <h2>Text Analysis</h2>
            <ul>
              {extractedText}
            </ul>
            <h2>Product Analysis</h2>
            <ul>
              <div>{label[0].description}</div>
            </ul>
            <h2>Suggested Products</h2>
            <ul>
              {matchedProducts}
            </ul>
          </div>
        </div>
      )
  }
}



export default ProductAnalysis;

import React, {Component} from 'react'
import {Link} from 'react-router-dom'
import ReactDOM from 'react-dom';
import axios from 'axios'
import {bindActionCreators} from 'redux'
import {updateProduct , addToCart} from '../actions/'
import {connect} from 'react-redux'
import TopNav from './TopNav'

class Camera extends Component{
  state =  {
    videoRef: '',
    videoStream : '',
    capturedImage: '',
    constraints: {
      video: {
        width: 1200,
        height: 720
       }
    }
  }



  uploadImg(){
    axios.post('http://localhost:8000/upload',{
      imgBase64 : this.state.capturedImage
    })
    .then((result)=>{
      console.log('Successfully uploaded',result)
      alert('success');
      this.props.updateProduct(result.data.extractedText, result.data.label, result.data.matchedProducts)
    })
    .catch((err)=>{
      console.log("err",err);
    })
  }
  grabImage(){
    if(typeof this.videoElement !== 'undefined'){
      console.log("Taking Picture");
      console.log(this.videoElement);
      const context = this.canvasElement.getContext('2d');
      context.drawImage(this.videoElement, 0, 0, 640, 480);
      console.log("Context Element:\n",context);
      let image = this.canvasElement.toDataURL('image/jpeg',0.5);
      this.setState({capturedImage: image})
      console.log(image);
    }

    // }
  }
  componentDidMount(){
    console.log("component mounted");
    navigator.mediaDevices.getUserMedia(this.state.constraints)
    .then((videoStream)=>{
      this.handleStream(videoStream);
    })
    .catch((error)=>{
      this.handleError(error);
    })
  }
  handleStream(videoStream){
    console.log('Handling Stream:\n',videoStream)
    let streamObj = window.URL.createObjectURL(videoStream)
    this.setState({videoStream :  streamObj})
    console.log('videoStream',window.URL.createObjectURL(videoStream));
  }
  handleError(err){
    console.log(err);
  }


  render(){
    console.log(this.props.product);
    if(this.props.product.length <= 0){
      return(
        <div className=''>
          <TopNav />
          <div style={{left:'25%',width:'50%',fontSize: '30px',position:'absolute', textAlign:'center'}} className="top color-white text-center">
            SEARCH PRODUCT
          </div>
          <div className='video-stream'>
            <video ref={(video) =>{console.log('input : ',video);this.videoElement = video }}  src={this.state.videoStream} autoPlay={true} />
          </div>
          <canvas id="canvas" width="640" height="480" className="product" ref={(canvas) => this.canvasElement = canvas} ></canvas>
          {this.state.capturedImage !== '' ? (
            <div>
            <img src={this.state.capturedImage} />
            <button className='no-style bg-white z-top' onClick={()=>{this.uploadImg()}} >Upload Product </button>
          </div>
        ) : <h2 className="Picture Status"></h2>}
          <div className=''>
            <div className='button' onClick={()=>{this.grabImage()}}></div>
          </div>
        </div>
      )
    }else{
      let {extractedText, label , matchedProducts} = this.props.product[0];
      if(extractedText){
        extractedText = extractedText.map( (text,indx) =>{
          return <li key={indx}>{text}</li>
        })
      }else{
        extractedText = <li></li>;
      }
      if(matchedProducts){
        matchedProducts = matchedProducts.map((product,indx)=>{
          return <div key={indx} className="matchedProduct"> Product Name : {product.keyword.substring(0,40)}<br/> Price : ${product.price}  <br/>Image <img src={product.image_url} /><br/> <div onClick={()=>{this.props.addToCart(product)}}> Add To Cart </div>   </div>
        })
      }else{
        matchedProducts =    <li>No Matched Products</li>
      }
      return(
        <div className=''>
          <TopNav />
          <div style={{left:'25%',width:'50%',fontSize: '20px',position:'absolute', textAlign:'center'}} className="top color-white text-center">
            Text Analysis: {extractedText[0]}
          </div>
          {/* <div style={{left:'5%',width:'90%',fontSize: '20px',position:'absolute',top:'25px '    ,  textAlign:'center'}} className="top color-white text-center">
            {matchedProducts}
          </div> */}
          <div className='video-stream'>
            <video ref={(video) =>{console.log('input : ',video);this.videoElement = video }}  src={this.state.videoStream} autoPlay={true} />
          </div>
          <canvas id="canvas" width="640" height="480" className="product" ref={(canvas) => this.canvasElement = canvas} ></canvas>
          {this.state.capturedImage !== '' ? (
            <div>
            <img src={this.state.capturedImage} />
            <button className='no-style bg-white' onClick={()=>{this.uploadImg()}} >UPLOAD </button>
          </div>
        ) : <h2 className="Picture Status"></h2>}
          <div className=''>
            <div className='button' onClick={()=>{this.grabImage()}}></div>
          </div>
          {label[0].description}
            <h2>Suggested Products</h2>
            <ul>
              {matchedProducts}
            </ul>
        </div>

      )    }

  }
}


let mapStateToProps = (state)=>{
  return ({
    product : state.product
  })
}
let mapDispatchToProps = (dispatch)=>{
  return bindActionCreators({
    updateProduct : updateProduct,
    addToCart: addToCart
  },dispatch)
}
export default connect(mapStateToProps , mapDispatchToProps)(Camera);

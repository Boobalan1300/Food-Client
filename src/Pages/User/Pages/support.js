import React from "react";
import Carousel from "react-bootstrap/Carousel";
import support3 from "../Images/5.png";
import support2 from "../Images/8.png";
import support1 from "../Images/6.png";
import support5 from "../Images/4.png";
import support4 from "../Images/7.png";

import img33 from '../Images/img36.jpg'

import "./style.css";



const SupportComponent = () => {
  return (
    <>

    <div className="container my-4 px-5 ">
 
   <div className="my-5" style={{maxHeight:"300px"}} >
   <Carousel className="my-5 d-lg-none  text-center support-indicator" interval={2000}>
    <Carousel.Item>
      <img src={support1} className="w-50 p-3" style={{height:"150px"}}></img>
    </Carousel.Item>
    <Carousel.Item>
      <img src={support2} className="w-50 p-3" style={{height:"150px"}} ></img>
    </Carousel.Item>
    <Carousel.Item>
      <img src={support3} className="w-50 p-3" style={{height:"150px"}}></img>
    </Carousel.Item>
    <Carousel.Item>
      <img src={support4} className="w-50 p-3" style={{height:"150px"}} ></img>
    </Carousel.Item>
    <Carousel.Item>
      <img src={support5} className="w-50 p-3" style={{height:"150px"}}></img>
    </Carousel.Item>
  </Carousel>
   </div>

 
  <div className=" d-lg-flex  justify-content-evenly align-items-center d-none my-5">
    <div className="col-lg-3">
      <img src={support1} className="w-50"></img>
    </div>
    <div className="col-lg-2">
      <img src={support2} className="w-50" ></img>
    </div>
    <div className="col-lg-3">
      <img src={support3} className="w-50"></img>
    </div>
    <div className="col-lg-2">
      <img src={support4} className="w-50" ></img>
    </div>
    <div className="col-lg-2">
      <img src={support5} className="w-50" ></img>
    </div>
  </div>
  
</div>


         <div className='mt-3 mb-1'>
         <img src={img33} className='w-100'></img>
        </div>



    </>
  );
};

export default SupportComponent;


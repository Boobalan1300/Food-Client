import React from "react";
import Carousel from "react-bootstrap/Carousel";
import "bootstrap/dist/css/bootstrap.min.css";
import img1 from "../Images/h-1.jpg";
import img2 from "../Images/h-2.jpg";
import img3 from "../Images/h-3.jpg";
import intro1 from "../Images/intro1.png";

import intro3 from "../Images/intro3.png";
import intro4 from "../Images/intro4.png";
import intro5 from "../Images/intro5.png";
import "./style.css";
import NavBar from "../../../Common/navbar";
const HeaderComponent = () => {
  return (
    <>
      {/* <NavBar/> */}

      <div className="">
        <Carousel fade className="custom-img-sm" style={{ objectFit: "contain" }}>
          <Carousel.Item className="">
            <img src={img1} className="w-100 d-block " alt="First slide" />
            <div className="overlay"></div>
            <Carousel.Caption className="Carousel-Hero-text">
              <h1 className="text-white fw-bold  mt-3">Tasty the Best that</h1>
              <h1 className="text-white fw-bold  ">Surprise You</h1>
              <div className="w-50">
              <p className="text-white ">
                everyone, everywhere has enough affordable, 
                safe and nutritious food.
              </p>
              </div>
            </Carousel.Caption>
          </Carousel.Item>
          <Carousel.Item>
            <img src={img2} className="w-100 d-block" alt="Second slide" />
            <div className="overlay"></div>
            <Carousel.Caption className="Carousel-Hero-text">
              <h1 className="text-white fw-bold mt-3">Healthy Food</h1>
              <h1 className="text-white fw-bold">Surprise You</h1>
             <div className="w-75">
             <p className="text-white">
                Behind our food, there is always someone who produced, planted,
                harvested, fished or transported it.
              </p>
             </div>
            </Carousel.Caption>
          </Carousel.Item>

          <Carousel.Item>
            <img src={img3} className="w-100 d-block" alt="Third slide" />
            <div className="overlay"></div>
            <Carousel.Caption className="Carousel-Hero-text">
              <h1 className="text-white fw-bold mt-3">Best Food</h1>
              <h1 className="text-white fw-bold">When Hungry</h1>
              <div className="w-50">
              <p className="text-white ">
                Create a meal plan. ... Save and eat leftovers safely. ...
              </p>

              </div>
              
            </Carousel.Caption>
          </Carousel.Item>
        </Carousel>

        <div className="custom-margin-sm">
        <div className="container ">
          <div className="row">
            <div className="col-lg-3 col-md-3 col-sm-6 col-6">
              <div className="text-center">
                <img
                  src={intro1}
                  style={{ width: "100px", height: "100px" }}
                ></img>
                <div className="my-2 text-center">
                  <p className="fw-bolder mb-1">ONLINE SUPPORT</p>
                  <p>24/7 we supoort You..</p>
                </div>
              </div>
            </div>
            <div className="col-lg-3 col-md-3 col-sm-6 col-6">
              <div className="text-center">
                <img
                  src={intro5}
                  style={{ width: "100px", height: "100px" }}
                ></img>
                <div className="my-2 text-center">
                  <p className="fw-bolder mb-1">Home Delivery</p>
                  <p>Fast delivery</p>
                </div>
              </div>
            </div>
            <div className="col-lg-3 col-md-3 col-sm-6 col-6">
              <div className="text-center">
                <img
                  src={intro3}
                  style={{ width: "100px", height: "100px" }}
                ></img>
                <div className="my-2 text-center">
                  <p className="fw-bolder mb-1">return money</p>
                  <p> 3 days return money </p>
                </div>
              </div>
            </div>
            <div className="col-lg-3 col-md-3 col-sm-6 col-6">
              <div className="text-center">
                <img
                  src={intro4}
                  style={{ width: "100px", height: "100px" }}
                ></img>
                <div className="my-2 text-center">
                  <p className="fw-bolder mb-1">HEALTHY FOODS</p>
                  <p>Tasty Foods</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        </div>

        
      </div>
    </>
  );
};

export default HeaderComponent;

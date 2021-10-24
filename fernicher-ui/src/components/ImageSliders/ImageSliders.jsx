import React from "react";
import AliceCarousel from "react-alice-carousel";
import "react-alice-carousel/lib/alice-carousel.css";
import "./ImageSliders.scss";
import SingleLineImageList from "./SingleLineImageList";

function ImageSliders() {
  return (
    <div clasName="App">
      <AliceCarousel autoPlay autoPlayInterval="3000">
        <SingleLineImageList />
        <img
          src="/imgs/furniture7.jpg"
          alt="furniture1"
          className="sliderimg"
        />
        <SingleLineImageList />
        <img
          src="/imgs/furniture7.jpg"
          alt="furniture1"
          className="sliderimg"
        />
        <SingleLineImageList />
      </AliceCarousel>
    </div>
  );
}

export default ImageSliders;

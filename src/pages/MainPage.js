import React from "react";
import { imageOne, imageTwo, imageThree } from "../utils/imgUrls";

const MainPage = () => {
  return (
    <div
      id="carouselExampleSlidesOnly"
      className="carousel slide"
      data-bs-ride="carousel"
    >
      <div className="carousel-inner">
        <div className="carousel-item active">
          <img
            style={{ height: "600px" }}
            src={imageOne}
            className="d-block w-100"
            alt="calculator"
          />
        </div>
        <div className="carousel-item">
          <img
            style={{ height: "600px" }}
            src={imageTwo}
            className="d-block w-100"
            alt="diary"
          />
        </div>
        <div className="carousel-item">
          <img
            style={{ height: "600px" }}
            src={imageThree}
            className="d-block w-100"
            alt="nature"
          />
        </div>
      </div>
    </div>
  );
};

export default MainPage;

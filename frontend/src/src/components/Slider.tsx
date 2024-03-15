/*
 * Copyright (c) 2024. HackQC24.
 *  Author: Alpha Oumar
 *  Version: 1.0
 */

import { useState} from "react";
import "./css/slider.scss";

function Slider({images}: any)
{
  const [imageIndex, setImageIndex] = useState<number>(0);

  const changeSlide = (direction: string) =>
  {
    if (direction === "left")
    {
      if (imageIndex === 0)
      {
        setImageIndex(images.length - 1);
      }
      else
      {
        setImageIndex(imageIndex - 1);
      }
    }
    else
    {
      if (imageIndex === images.length - 1)
      {
        setImageIndex(0);
      }
      else
      {
        setImageIndex(imageIndex + 1);
      }
    }
  };

  return (
      <div className="slider">
        {imageIndex !== 0 && (
            <div className="fullSlider">
              <div className="arrow" onClick={() => changeSlide("left")}>
                <img src="/arrow.png" alt=""/>
              </div>
              <div className="imgContainer">
                <img src={images[imageIndex]} alt=""/>
              </div>
              <div className="arrow" onClick={() => changeSlide("right")}>
                <img src="/arrow.png" className="right" alt=""/>
              </div>
              <div className="close" onClick={() => setImageIndex(0)}>
                X
              </div>
            </div>
        )}
        <div className="bigImage">
          <img src={images[0]} alt="" onClick={() => setImageIndex(0)}/>
        </div>
        <div className="smallImages">
          {images.slice(1).map((image: string | undefined, index: number) => (
          <img
            src={image}
            alt=""
            key={index}
            onClick={() => setImageIndex(index + 1)}
          />
        ))}
      </div>
    </div>
  );
}

export default Slider;

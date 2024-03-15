/*
 * Copyright (c) 2024. HackQC24.
 *  Author: Alpha Oumar
 *  Version: 1.0
 */

import "./css/singlePage.scss";
import Slider from "../components/Slider.tsx";
import { singlePostData, userData } from "../lib/dummydata.ts";
import SideDetails from "./SideDetails.tsx";
import Reviews from "../components/Reviews.tsx";

function SinglePage()
{
  return (
    <div className="singlePage">
      <div className="details">
        <div className="wrapper">
          <Slider images={singlePostData.images} />
          <div className="info">
            <div className="top">
              <div className="post">
                <h1>{singlePostData.title}</h1>
                <div className="address">
                  <img src="/pin.png" alt="" />
                  <span>{singlePostData.address}</span>
                </div>
                <div className="price">$ {singlePostData.price}</div>
              </div>
              <div className="user">
                <img src={userData.img} alt="" />
                <span>{userData.name}</span>
              </div>
            </div>
            <div className="bottom">{singlePostData.description}</div>
            <Reviews/>
          </div>
        </div>
      </div>
      <SideDetails/>
    </div>
  );
}

export default SinglePage;

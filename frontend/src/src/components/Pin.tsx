/*
 * Copyright (c) 2024. HackQC24.
 *  Author: Alpha Oumar
 *  Version: 1.0
 */

import { Marker, Popup } from "react-leaflet";
import "./css/pin.scss";
import { Link } from "react-router-dom";

function Pin({ item }:any) {
  return (
    <Marker position={[item.latitude, item.longitude]}>
      <Popup>
        <div className="popupContainer">
          <img src={item.img} alt="" />
          <div className="textContainer">
            <Link to={`/${item.id}`}>{item.title}</Link>
            <span>{item.bedroom} bedroom</span>
            <b>$ {item.price}</b>
          </div>
        </div>
      </Popup>
    </Marker>
  );
}

export default Pin;

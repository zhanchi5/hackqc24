/*
 * Copyright (c) 2024. HackQC24.
 *  Author: Alpha Oumar
 *  Version: 1.0
 */

import React from 'react';
import { Link } from 'react-router-dom';
import './css/card.scss';

export interface CardProps {
  item: {
    id: string;
    img: string;
    title: string;
    address: string;
    price: number;
    bedroom: number;
    bathroom: number;
  };
}

const Card: React.FC<CardProps> = ({ item }) => {
  return (
      <div className="card">
        <Link to={`/${item.id}`} className="imageContainer">
          <img src={item.img} alt="" />
        </Link>
        <div className="textContainer">
          <h2 className="title">
            <Link to={`/${item.id}`}>{item.title}</Link>
          </h2>
          <p className="address">
            <img src="/pin.png" alt="" />
            <span>{item.address}</span>
          </p>
          <p className="price">$ {item.price}</p>
          <div className="bottom">
            <div className="features">
              <div className="feature">
                <img src="/bed.png" alt="" />
                <span>{item.bedroom} bedroom</span>
              </div>
              <div className="feature">
                <img src="/bath.png" alt="" />
                <span>{item.bathroom} bathroom</span>
              </div>
            </div>
            <div className="icons">
              <div className="icon">
                <img src="/save.png" alt="" />
              </div>
              <div className="icon">
                <img src="/chat.png" alt="" />
              </div>
            </div>
          </div>
        </div>
      </div>
  );
};

export default Card;
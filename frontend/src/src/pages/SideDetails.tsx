/*
 * Copyright (c) 2024. HackQC24.
 *  Author: Alpha Oumar
 *  Version: 1.0
 */

import Map from "../components/Map.tsx";
import {singlePostData} from "../lib/dummydata.ts";
import "./css/singlePage.scss";

const SideDetails = () =>
{
    return (
        <div className="features overflow-scroll">
            <div className="wrapper">
                <p className="title">General</p>
                <div className="listVertical">
                    <div className="feature">
                        <img src="/utility.png" alt=""/>
                        <div className="featureText">
                            <span>Utilities</span>
                            <p>Renter is responsible</p>
                        </div>
                    </div>
                    <div className="feature">
                        <img src="/pet.png" alt=""/>
                        <div className="featureText">
                            <span>Pet Policy</span>
                            <p>Pets Allowed</p>
                        </div>
                    </div>
                    <div className="feature">
                        <img src="/fee.png" alt=""/>
                        <div className="featureText">
                            <span>Property Fees</span>
                            <p>Must have 3x the rent in total household income</p>
                        </div>
                    </div>
                </div>
                <p className="title">Sizes</p>
                <div className="sizes">
                    <div className="size">
                        <img src="/size.png" alt=""/>
                        <span>80 sqft</span>
                    </div>
                    <div className="size">
                        <img src="/bed.png" alt=""/>
                        <span>2 beds</span>
                    </div>
                    <div className="size">
                        <img src="/bath.png" alt=""/>
                        <span>1 bathroom</span>
                    </div>
                </div>
                <p className="title">Nearby Places</p>
                <div className="listHorizontal">
                    <div className="feature">
                        <img src="/school.png" alt=""/>
                        <div className="featureText">
                            <span>School</span>
                            <p>250m away</p>
                        </div>
                    </div>
                    <div className="feature">
                        <img src="/pet.png" alt=""/>
                        <div className="featureText">
                            <span>Bus Stop</span>
                            <p>100m away</p>
                        </div>
                    </div>
                    <div className="feature">
                        <img src="/fee.png" alt=""/>
                        <div className="featureText">
                            <span>Restaurant</span>
                            <p>200m away</p>
                        </div>
                    </div>
                </div>
                <p className="title">Location</p>
                <div className="mapContainer">
                    <Map items={[singlePostData]}/>
                </div>
                <div className="buttons">
                    <button>
                        <img src="/chat.png" alt=""/>
                        Send a Message
                    </button>
                    <button>
                        <img src="/save.png" alt=""/>
                        Save the Place
                    </button>
                </div>
            </div>
        </div>
    )
}
export default SideDetails
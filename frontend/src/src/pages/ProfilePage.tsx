/*
 * Copyright (c) 2024. HackQC24.
 *  Author: Alpha Oumar
 *  Version: 1.0
 */

import Chat from "../components/Chat.tsx";
import List from "../components/List.tsx";
import "./css/profilePage.scss";
import EditMyProfile from "../components/modals/EditMyProfile.tsx";
import {useState} from "react";
import ListingModal from "../components/modals/ListingModal.tsx";

function ProfilePage()
{
  const [showModal, setShowModal] = useState(false);
  const [showListModal, setShowListModal] = useState(false);

  return (
      <div className="profilePage">
        <div className="details">
          <div className="wrapper">
            <div className="title">
              <h1>User Information</h1>
              <button
                  onClick={() => setShowModal(true)}
              >
                Update Profile
              </button>
            </div>
            <div className="info">
            <span>
              Avatar:
              <img
                  src="https://images.pexels.com/photos/91227/pexels-photo-91227.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2"
                  alt=""
              />
            </span>
              <span>
              Username: <b>Alpha Diallo</b>
            </span>
              <span>
              E-mail: <b>alpha@gmail.com</b>
            </span>
            </div>
            <div className="title">
              <h1>My List</h1>
              <button
                onClick={()=>setShowListModal(true)}
              >Create New Post</button>
            </div>
            <List/>
            <div className="title">
              <h1>Saved List</h1>
            </div>
            <List/>
          </div>
        </div>
        <div className="chatContainer">
          <div className="wrapper">
            <Chat/>
          </div>
        </div>

        <div>
          <EditMyProfile showModal={showModal} setShowModal={setShowModal}/>
        </div>
        <div>
          <ListingModal showListModal={showListModal} setShowListModal={setShowListModal}/>
        </div>
      </div>
  );
}

export default ProfilePage;

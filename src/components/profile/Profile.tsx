import { observer } from "mobx-react-lite";
import React from "react";
import { useStore } from "../../app/stores/stores";

function Profile() {
  const { user } = useStore();
  const { profile } = user;

  return (
    <div className="profile">
      <div className="background">
        <img
          src="https://wallpaperaccess.com/full/1853607.jpg"
          alt="background"
        />
      </div>
      <div className="account">
        <img
          src="https://images.unsplash.com/photo-1529665253569-6d01c0eaf7b6?ixid=MnwxMjA3fDB8MHxzZWFyY2h8Mnx8cHJvZmlsZXxlbnwwfHwwfHw%3D&ixlib=rb-1.2.1&w=1000&q=80"
          alt="profile_picture"
        />
        <div className="details">
          <h1>Juan Ramirez</h1>
          <span>New York, USA </span>
          <div className="followers">
            <span>followers</span>
            <span>following</span>
          </div>
        </div>
      </div>
      <div className="stories">
        <h1>Stories</h1>
      </div>
    </div>
  );
}

export default observer(Profile);

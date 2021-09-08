import React from "react";
import { Link } from "react-router-dom";

export default function ShareAStory() {
  return (
    <div className="shareAStory_container">
      <img
        src="https://images.unsplash.com/photo-1561296160-7ea9d1b5511d?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=1950&q=80"
        alt="share a story"
      />
      <Link className="title" to="/create">
        <h1>SHARE A STORY</h1>
      </Link>
    </div>
  );
}

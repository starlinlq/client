import React from "react";
import { Story } from "../../app/interfaces";

function StoryCard({}: Story) {
  return (
    <div className="story_card d-flex">
      <div className="_content ">
        <p className="title">The new nature era</p>
        <p className="author">By Steven thomas</p>
        <div className="story_link">
          <a className="_a" href={`/story/${2}`}>
            Read Story
          </a>
        </div>
      </div>
    </div>
  );
}

export default StoryCard;

import React from "react";
import { Story } from "../../app/interfaces";

function StoryCard({ name, story, title, id }: Story) {
  return (
    <div className="story_card d-flex">
      <div className="_content ">
        <p className="title">{title}</p>
        <p className="author">By {name}</p>
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

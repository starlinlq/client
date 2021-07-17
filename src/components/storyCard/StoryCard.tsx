import React from "react";
import { Story } from "../../app/interfaces";

function StoryCard({
  name,
  story,
  title,
  id,
}: {
  name: string;
  story: string;
  title: string;
  id: string;
  photo_url: string;
  category: string;
}) {
  return (
    <div className="story_card d-flex">
      <div className="_content ">
        <p className="title">{title}</p>
        <p className="author">By {name}</p>
        <div className="story_link">
          <a className="_a" href={`/story/${id}`}>
            Read Story
          </a>
        </div>
      </div>
    </div>
  );
}

export default StoryCard;

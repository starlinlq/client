import React from "react";
import { Story } from "../../app/interfaces";

function StoryCard({
  name,
  story,
  title,
  id,
  photo_url,
}: {
  name: string | undefined;
  story: string;
  title: string;
  id: string;
  photo_url: string;
  category: string;
}) {
  return (
    <div className="story_card d-flex">
      <img src={photo_url} alt={title} />
      <div className="_content ">
        <p className="title">{title.slice(0, 40)}</p>
        <div className="author">
          <span>by</span>
          <p>{name}</p>
        </div>
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

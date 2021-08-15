import React from "react";
import { Story } from "../../app/interfaces";
import { CgArrowLongRight } from "react-icons/cg";
import { Link } from "react-router-dom";

function StoryCard({
  name,
  story,
  title,
  id,
  photo_url,
  date,
}: {
  name: string | undefined;
  story: string;
  title: string;
  id: string;
  photo_url: string;
  category: string;
  date: string;
}) {
  return (
    <div className="story_card d-flex">
      <img src={photo_url} alt={title} />
      <div className="_content">
        <p className="date">{date.slice(0, 10)}</p>
        <p className="title">{title.slice(0, 40).toUpperCase()}</p>
        <div className="author_name">
          <span>by</span>
          <p>{name}</p>
        </div>
        <Link className="story_link _a" to={`/story/${id}`}>
          Read Story
          <CgArrowLongRight className="icon" />
        </Link>
      </div>
    </div>
  );
}

export default StoryCard;

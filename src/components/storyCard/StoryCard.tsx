import React from "react";
import { Story } from "../../app/interfaces";
import { CgArrowLongRight } from "react-icons/cg";
import { Link } from "react-router-dom";
import { IoIosHeartEmpty } from "react-icons/io";
import Like from "../like/Like";

function StoryCard({
  name,
  story,
  title,
  id,
  photo_url,
  date,
  flex,
  category,
}: {
  name: string | undefined;
  story: string;
  title: string;
  id: string;
  photo_url: string;
  category: string;
  date: string;
  flex?: boolean;
}) {
  return (
    <div
      className={`story_card d-flex ${flex ? "column-width" : "row-width"} `}
    >
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
      <div className="category_like_container">
        <div className="category_title">
          <p>{category}</p>
        </div>
        <div className="likes">
          <Like />
        </div>
      </div>
    </div>
  );
}

export default StoryCard;

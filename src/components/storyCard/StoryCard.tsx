import { CgArrowLongRight } from "react-icons/cg";
import { Link } from "react-router-dom";
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
  likes,
}: {
  name: string | undefined;
  story: string;
  title: string;
  id: number;
  photo_url: string;
  category: string;
  date: string;
  flex?: boolean;
  likes: {
    user_id: number;
    post_id: number;
    created_at: string;
    id: number;
    updated_at: string;
  }[];
}) {
  return (
    <div
      className={`story_card d-flex ${flex ? "column-width" : "row-width"} `}
    >
      <img src={photo_url} alt={title} />
      <div className="_content">
        <div className="title_container">
          <p className="date">{date.slice(0, 10)}</p>
          <p className="title">{title.slice(0, 45).toUpperCase()}</p>
          <div className="author_name">
            <span>by</span>
            <p>{name}</p>
          </div>
        </div>

        <div className="story_link_container">
          <Link className="story_link _a" to={`/story/${id}`}>
            <p>Read Story</p>
            <CgArrowLongRight className="icon" />
          </Link>
        </div>
      </div>
      <div className="category_like_container">
        <div className="category_title">
          <p>{category}</p>
        </div>
        <div className="likes">
          <Like likes={likes} story_id={id} />
        </div>
      </div>
    </div>
  );
}

export default StoryCard;

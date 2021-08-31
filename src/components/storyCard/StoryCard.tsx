import { CgArrowLongRight } from "react-icons/cg";
import { Link } from "react-router-dom";
import { useStore } from "../../app/stores/stores";
import Like from "../like/Like";
import { observer } from "mobx-react-lite";
import { useState } from "react";
import { BiEdit } from "react-icons/bi";

function StoryCard({
  user_id,
  name,
  story,
  title,
  id,
  photo_url,
  date,
  flex,
  category,
  likes,
  editData,
}: {
  editData?: Function;
  name: string | undefined;
  story: string;
  title: string;
  id: number;
  photo_url: string;
  category: string;
  date: string;
  user_id?: number;
  flex?: boolean;
  likes: {
    user_id: number;
    post_id: number;
    created_at: string;
    id: number;
    updated_at: string;
  }[];
}) {
  const { post, user } = useStore();
  const [confirmDelete, setConfirmDelete] = useState(false);

  const handleDelete = () => {
    setConfirmDelete(true);
  };

  const handleConfirmDelete = (type: string) => {
    if (type === "Yes") {
      post.delete(id);
    }
    setConfirmDelete(false);
  };

  const handleEdit = () => {
    if (editData) {
      editData({ story, category, title, active: true, photo_url, story_id: id, update: true });
    }
  };

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
      <div className="options_container">
        <div className="category_title">
          <p>{category}</p>
        </div>
        <div className="likes">
          <Like likes={likes} story_id={id} />
        </div>
        {user_id && user_id === user.id && (
          <div className="delete">
            <button type="button" onClick={handleDelete}>
              Delete
            </button>
          </div>
        )}
        {user_id && user_id === user.id && (
          <div className="edit">
            <BiEdit className="edit_icon" onClick={handleEdit} />
          </div>
        )}
      </div>
      {user_id && user_id === user.id && confirmDelete && (
        <div className="confirm_delete">
          <p>Are you sure?</p>
          <button
            type="button"
            className="button"
            onClick={() => handleConfirmDelete("Yes")}
          >
            Yes
          </button>
          <button
            type="button"
            className="button"
            onClick={() => handleConfirmDelete("No")}
          >
            No
          </button>
        </div>
      )}
    </div>
  );
}

export default observer(StoryCard);

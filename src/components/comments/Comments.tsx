import { observer } from "mobx-react-lite";
import { Fragment } from "react";
import { useStore } from "../../app/stores/stores";
import CreateComment from "./CreateComment";
import { Comment } from "../../app/interfaces";
import { user } from "../../app/api/agent";
import { history } from "../..";

const Comments = ({ id, user_id, comment, user_name }: Comment) => {
  const handleClick = () => {
    history.push(`/profile/${user_id}`);
  };
  return (
    <div className="display_comment">
      <div className="l_name">{user_name.slice(0, 1)}</div>
      <div className="content">
        <div className="author">
          <button onClick={handleClick} className="author_name" type="button">
            {user_name}
          </button>
        </div>
        <div className="comment">{comment}</div>
      </div>
    </div>
  );
};

export default observer(Comments);

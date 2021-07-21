import { observer } from "mobx-react-lite";
import { Comment } from "../../app/interfaces";
import { history } from "../..";
import { RiDeleteBin6Line } from "react-icons/ri";

const Comments = ({ id, user_id, comment, user_name }: Comment) => {
  const handleClick = () => {
    history.push(`/profile/${user_id}`);
  };

  const handleDelete = (comment_id:string) =>{
    


  }
  return (
    <div className="display_comment">
      <div className="l_name">
        <p>{user_name.slice(0, 1)}</p>
      </div>
      <div className="content">
        <div className="author">
          <button onClick={handleClick} className="author_name" type="button">
            {user_name}
          </button>
          <div className="icon">
            <RiDeleteBin6Line />
          </div>
        </div>
        <div className="comment">{comment}</div>
      </div>
    </div>
  );
};

export default observer(Comments);

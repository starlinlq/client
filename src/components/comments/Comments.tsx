import { observer } from "mobx-react-lite";
import { Comment } from "../../app/interfaces";
import { history } from "../..";
import { RiDeleteBin6Line, RiEdit2Line } from "react-icons/ri";
import { useStore } from "../../app/stores/stores";
import { useState } from "react";

const Comments = ({ id, user_id, comment, user_name }: Comment) => {
  const [deleting, setDeleting] = useState<number>();
  const [editing, setEditing] = useState({
    active: false,
    id: 0,
    comment: "",
  });
  const { post, user } = useStore();
  const { deletingComment } = post;

  const handleClick = () => {
    history.push(`/profile/${user_id}`);
  };

  const handleDelete = (comment_id: number) => {
    setDeleting(comment_id);
    post.delete_comment(comment_id);
  };
  const handleEdit = (comment_id: number) => {
    setEditing({ ...editing, active: true, id: comment_id, comment });
  };

  const handleOnChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    console.log(e.target.value);
    setEditing({ ...editing, comment: e.target.value });
  };
  const onSave = () => {
    post.edit_comment({ comment: editing.comment, id });
    setEditing({ ...editing, active: false });
  };

  const handleCancel = () => {
    setEditing({ ...editing, active: false });
  };

  if (deletingComment && deleting === id) {
    return (
      <div className="loading">
        <div></div>
        <div></div>
        <div></div>
      </div>
    );
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
            {user.id === user_id && user.isAuth && (
              <>
                <RiEdit2Line
                  className="edit"
                  onClick={() => {
                    handleEdit(id);
                  }}
                />
                <RiDeleteBin6Line
                  className="delete"
                  onClick={() => {
                    handleDelete(id);
                  }}
                />
              </>
            )}
          </div>
        </div>
        <div className="comment">
          {editing.active ? (
            <div>
              <textarea
                name="comment"
                onChange={(e) => {
                  handleOnChange(e);
                }}
                required
                value={editing.comment}
                placeholder="write your comment"
              />
              <button onClick={onSave} className="button" type="button">
                save
              </button>
              <button onClick={handleCancel} className="button" type="button">
                cancel
              </button>
            </div>
          ) : (
            comment
          )}
        </div>
      </div>
    </div>
  );
};

export default observer(Comments);

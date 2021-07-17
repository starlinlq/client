import { observer } from "mobx-react-lite";
import { Fragment } from "react";
import { useStore } from "../../app/stores/stores";
import CreateComment from "./CreateComment";
import { Comment } from "../../app/interfaces";

const Comments = ({ id, user_id, comment, user_name }: Comment) => {
  return (
    <Fragment key={id}>
      <p>{comment}</p>
    </Fragment>
  );
};

export default observer(Comments);

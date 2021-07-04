import { observer } from "mobx-react-lite";
import React, { Fragment } from "react";
import { useStore } from "../../app/stores/stores";
import CreateComment from "./CreateComment";
import DisplayComment from "./DisplayComment";
import { Comment } from "../../app/interfaces/";

const Comments = () => {
  const { post } = useStore();

  return (
    <>
      <CreateComment />
      {post.comments.map((data: any) => (
        <Fragment key={data.id}>
          <p>{data.comment}</p>
        </Fragment>
      ))}
    </>
  );
};

export default observer(Comments);

import { observer } from "mobx-react-lite";
import { Fragment } from "react";
import { useStore } from "../../app/stores/stores";
import CreateComment from "./CreateComment";

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

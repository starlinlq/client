import { observer } from "mobx-react-lite";
import { useEffect } from "react";
import { useParams } from "react-router-dom";
import { story, user } from "../../app/api/agent";
import { Story } from "../../app/interfaces";
import { useStore } from "../../app/stores/stores";
import Loading from "../../features/loader/Loading";
import Comments from "../comments/Comments";
import ReactHtmlParser from "react-html-parser";
import CreateComment from "../comments/CreateComment";
import { Comment } from "../../app/interfaces";

function SingleStory() {
  const { id } = useParams<{ id: string }>();
  const { post } = useStore();
  const { selectedStory, loading, comments } = post;

  useEffect(get_story, [id, post, selectedStory]);

  function get_story() {
    if (id && selectedStory.length !== 1) {
      post.show(id);
    }
  }

  if (loading) {
    return <Loading />;
  }
  return (
    <>
      {selectedStory.map((content: Story) => (
        <div key={content.title} className="singleStory_container">
          <div className="photo">
            <img src={content.photo_url} alt="photo_test" />
          </div>
          <div className="content">
            <h1 className="title">{content.title}</h1>
            <div className="story">{ReactHtmlParser(content.story)}</div>
          </div>
        </div>
      ))}
      <div className="comments">
        <CreateComment />
        {comments.map((data: Comment) => (
          <Comments
            key={data.user_id + data.user_name}
            comment={data.comment}
            user_id={data.user_id}
            user_name={data.user_name}
            id={data.id}
          />
        ))}
      </div>
    </>
  );
}

export default observer(SingleStory);

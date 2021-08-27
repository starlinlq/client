import { observer } from "mobx-react-lite";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Story } from "../../app/interfaces";
import { useStore } from "../../app/stores/stores";
import Loading from "../../features/loader/Loading";
import Comments from "../comments/Comments";
import ReactHtmlParser from "react-html-parser";
import CreateComment from "../comments/CreateComment";
import { Comment } from "../../app/interfaces";
import Author from "../author/Author";

function SingleStory() {
  const { id } = useParams<{ id: string }>();
  const { post, user } = useStore();
  const { selectedStory, loading, currentComments, comments, loadMorelogic } =
    post;
  const { isAuth } = user;
  const [loadIndex, setLoadIndex] = useState(15);

  useEffect(get_story, [id]);

  const handleLoadMore = () => {
    setLoadIndex(loadIndex + 5);
    loadMorelogic(loadIndex);
  };

  function get_story() {
    if (id) {
      post.show(id);
    }
  }

  if (loading) {
    return <Loading />;
  }
  return (
    <div>
      {loading ? (
        <Loading />
      ) : (
        <>
          {selectedStory.map((content: Story) => (
            <div key={content.title} className="singleStory_container">
              <div className="photo">
                <img src={content.photo_url} alt="photo_test" />
              </div>
              <div className="content">
                <h1 className="title">{content.title.toUpperCase()}</h1>
                <div>
                  <Author
                    name={content.user_name}
                    profile_photo={content.profile_photo}
                    id={content.user_id}
                  />
                </div>
                <div className="story">{ReactHtmlParser(content.story)}</div>
              </div>
            </div>
          ))}
          <div className="comments">
            {isAuth ? (
              <CreateComment />
            ) : (
              <div className="comment_login">
                Please
                <a href={`/login/${selectedStory[0] && selectedStory[0].id}`}>
                  Login
                </a>
                Or
                <a
                  href={`/register/${selectedStory[0] && selectedStory[0].id}`}
                >
                  Register
                </a>
                to share your thoughts
              </div>
            )}

            {currentComments.map((data: Comment) => (
              <Comments
                key={data.user_id + data.user_name + data.id}
                comment={data.comment}
                user_id={data.user_id}
                user_name={data.user_name}
                id={data.id}
              />
            ))}
          </div>
          <div className="loadMore">
            <button
              type="button"
              disabled={
                comments.length < 10 || loadIndex >= comments.length
                  ? true
                  : false
              }
              onClick={handleLoadMore}
            >
              {currentComments.length === 0
                ? "No comments"
                : comments.length < 10 || loadIndex >= comments.length
                ? "No more comments to display"
                : "Load More"}
            </button>
          </div>
        </>
      )}
    </div>
  );
}

export default observer(SingleStory);

import { observer } from "mobx-react-lite";
import { useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import { story, user } from "../../app/api/agent";
import { Story } from "../../app/interfaces";
import { useStore } from "../../app/stores/stores";
import Loading from "../../features/loader/Loading";
import Comments from "../comments/Comments";
import ReactHtmlParser from "react-html-parser";
import CreateComment from "../comments/CreateComment";
import { Comment } from "../../app/interfaces";
import Author from "../author/Author";
import Paginate from "../paginate/Paginate";

function SingleStory() {
  const { id } = useParams<{ id: string }>();
  const { post, user } = useStore();
  const { selectedStory, loading, comments } = post;
  const { isAuth } = user;

  useEffect(get_story, [id]);

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

            {comments.map((data: Comment) => (
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
            <p>Load More</p>
          </div>
        </>
      )}
    </div>
  );
}

export default observer(SingleStory);

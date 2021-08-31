import { observer } from "mobx-react-lite";
import { useEffect } from "react";
import { useParams } from "react-router-dom";
import { Story } from "../../app/interfaces";
import { useStore } from "../../app/stores/stores";
import Loading from "../../features/loader/Loading";
import Filter from "../filter/Filter";
import Paginate from "../paginate/Paginate";
import StoryCard from "../storyCard/StoryCard";

function DisplayStories() {
  const { id } = useParams<{ id: string }>();
  const { post } = useStore();
  const { story, loading } = post;

  useEffect(() => {
    if (story.length === 0 && id) {
      post.get(1, id);
    } else if (story.length === 0) {
      post.get(1, "all");
    }
  }, []);

  return (
    <div className="stories_container">
      <div className="filter box-shadow">
        <Filter id={id} />
      </div>
      {loading ? (
        <Loading />
      ) : (
        <div className="display_stories">
          {story.length === 0 ? (
            <h3>No stories available, please try another category</h3>
          ) : (
            story.map(
              ({
                story,
                title,
                user_name,
                id,
                photo_url,
                created_at,
                category_title,
                likes,
              }: Story) => (
                <StoryCard
                  likes={likes}
                  flex={true}
                  key={id}
                  date={created_at}
                  story={story}
                  title={title}
                  name={user_name}
                  id={id}
                  photo_url={photo_url}
                  category={category_title}
                />
              )
            )
          )}
        </div>
      )}
      <Paginate type="posts" />
    </div>
  );
}

export default observer(DisplayStories);

import { observer } from "mobx-react-lite";
import { useEffect } from "react";
import { Story } from "../../app/interfaces";
import { useStore } from "../../app/stores/stores";
import Loading from "../../features/loader/Loading";
import Filter from "../filter/Filter";
import StoryCard from "../storyCard/StoryCard";

function DisplayStories() {
  const { post } = useStore();
  const { story, loading } = post;

  useEffect(() => {
    if (story.length === 0) {
      post.get();
    }
  }, []);

  return (
    <div className="stories_container">
      <div className="filter box-shadow">
        <Filter />
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
                category,
                created_at,
              }: Story) => (
                <StoryCard
                  key={id}
                  date={created_at}
                  story={story}
                  title={title}
                  name={user_name}
                  id={id}
                  photo_url={photo_url}
                  category={category}
                />
              )
            )
          )}
        </div>
      )}
    </div>
  );
}

export default observer(DisplayStories);

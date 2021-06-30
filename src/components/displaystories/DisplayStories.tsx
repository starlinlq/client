import { observer } from "mobx-react-lite";
import React from "react";
import { useEffect } from "react";
import { agent } from "../../app/api/agent";
import { Story } from "../../app/interfaces";
import { useStore } from "../../app/stores/stores";
import Loading from "../../features/loader/Loading";
import StoryCard from "../storyCard/StoryCard";

function DisplayStories() {
  const { post } = useStore();
  const { story, loading } = post;

  useEffect(() => {
    if (story.length === 0) {
      post.get();
    }
  }, []);

  if (loading) {
    return <Loading />;
  }
  return (
    <div className="display_stories">
      {story.map(({ story, title, name, id, photo_url, category }: Story) => (
        <StoryCard
          key={id}
          story={story}
          title={title}
          name={name}
          id={id}
          photo_url={photo_url}
          category={category}
        />
      ))}
    </div>
  );
}

export default observer(DisplayStories);

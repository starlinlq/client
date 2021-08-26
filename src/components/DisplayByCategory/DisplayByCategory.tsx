import React, { useEffect } from "react";
import { useState } from "react";
import { agent } from "../../app/api/agent";
import { Story } from "../../app/interfaces";
import StoryCard from "../storyCard/StoryCard";
interface Props {
  category: string;
  itemToDisplay: number;
  flex?: boolean;
}
function DisplayByCategory({ category, itemToDisplay, flex }: Props) {
  const [stories, setStories] = useState<Story[]>([]);

  useEffect(handleUseEffect, []);

  function handleUseEffect() {
    agent.story
      .category(category, itemToDisplay)
      .then((response) => setStories(response));
  }
  console.log(stories);
  return (
    <section className="displayByCategory">
      <div className="categoryTitle">
        <h2>{category}</h2>
      </div>
      <div className={flex ? "container-row " : "container-column"}>
        {stories.map((story, index) => (
          <div className="story" key={story.id + index}>
            <StoryCard
              flex={flex}
              id={story.id}
              date={story.created_at}
              title={story.title}
              photo_url={story.photo_url}
              name={story.user_name}
              story={story.story}
              category={story.category_title}
            />
          </div>
        ))}
      </div>
    </section>
  );
}

export default DisplayByCategory;

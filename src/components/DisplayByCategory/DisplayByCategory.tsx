import React, { useEffect } from "react";
import { useState } from "react";
import { agent } from "../../app/api/agent";
import { Story } from "../../app/interfaces";
import StoryCard from "../storyCard/StoryCard";
import { BsChevronRight, BsChevronLeft } from "react-icons/bs";
import { useRef } from "react";
interface Props {
  category: string;
  itemToDisplay: number;
  flex?: boolean;
}
function DisplayByCategory({ category, itemToDisplay, flex }: Props) {
  const [stories, setStories] = useState<Story[]>([]);
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(handleUseEffect, []);

  function handleUseEffect() {
    agent.story
      .category(category, itemToDisplay)
      .then((response) => setStories(response));
  }

  function handleScroll(n: number) {
    if (scrollRef.current) {
      scrollRef.current.scrollBy({ left: n, behavior: "smooth" });
    }
  }

  return (
    <section className="displayByCategory">
      <div className="scroll_container">
        {!flex && (
          <>
            {" "}
            <div className="right_icon_container"></div>{" "}
            <BsChevronRight
              className="right_icon"
              onClick={() => handleScroll(1000)}
            />{" "}
          </>
        )}
        <div className="categoryTitle">
          <h2>{category}</h2>
        </div>
        <div
          className={flex ? "container-row " : "container-column"}
          ref={scrollRef}
        >
          {stories.map((story, index) => (
            <div className="story" key={story.id + index}>
              <StoryCard
                likes={story.likes}
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
        {!flex && (
          <>
            <div className="left_icon_container"></div>
            <BsChevronLeft
              className="left_icon"
              onClick={() => handleScroll(-1000)}
            />
          </>
        )}
      </div>
    </section>
  );
}

export default DisplayByCategory;

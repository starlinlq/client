import { observer } from "mobx-react-lite";
import React from "react";
import { useState } from "react";
import { useEffect } from "react";
import { useParams } from "react-router-dom";
import { Story } from "../../app/interfaces";
import { useStore } from "../../app/stores/stores";

function SingleStory() {
  const { id } = useParams<{ id: string }>();
  const { post } = useStore();
  const { story } = post;

  useEffect(get_story, [id]);

  function get_story() {
    if (id) {
      post.show(id);
    }
  }
  return (
    <>
      {story.map((content: Story) => (
        <div key={content.id} className="singleStory_container">
          <div className="photo">
            <img src={content.photo_url} alt="photo_test" />
          </div>
          <div className="content">
            <h1>{content.title}</h1>
            <p>{content.story}</p>
          </div>
        </div>
      ))}
    </>
  );
}

export default observer(SingleStory);

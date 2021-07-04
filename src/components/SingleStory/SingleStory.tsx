import { observer } from "mobx-react-lite";
import React from "react";
import { useState } from "react";
import { useEffect } from "react";
import { useParams } from "react-router-dom";
import { Story } from "../../app/interfaces";
import { useStore } from "../../app/stores/stores";
import Loading from "../../features/loader/Loading";
import Comments from "../comments/Comments";

function SingleStory() {
  const { id } = useParams<{ id: string }>();
  const { post } = useStore();
  const { selectedStory, loading } = post;

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
        <div key={content.id} className="singleStory_container">
          <div className="photo">
            <img src={content.photo_url} alt="photo_test" />
          </div>
          <div className="content">
            <h1>{content.title}</h1>
            <p>{content.story}</p>
          </div>
          <div className="comments">
            <Comments />
          </div>
        </div>
      ))}
    </>
  );
}

export default observer(SingleStory);

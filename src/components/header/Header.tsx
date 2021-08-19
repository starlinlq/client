import React, { useState } from "react";
import { useEffect } from "react";
import { agent } from "../../app/api/agent";
import { Story } from "../../app/interfaces";

export default function Header() {
  const [stories, setStories] = useState<Story[]>([]);
  const [current, setCurrent] = useState(0);

  useEffect(function () {
    agent.story
      .limit(3)
      .then((response) => setStories(response))
      .catch((error) => console.log(error));
      
  }, []);

  function handleHeader(number: number) {}

  return (
    <div className="header_container">
      <img
        src="https://res.cloudinary.com/starlinlq/image/upload/v1629267884/test/qfblep1ilnbo1wk16qen.jpg"
        alt="test"
      />
      <div className="description">
        <span>FEATURED STORIES</span>
        <h1>HAZY FULL MOON OF APPALACHIA</h1>
        <div className="author_info">
          <p>March 2nd 2020 </p>
          <a href={`/`}>by John Appleseed</a>
        </div>
        <p>
          Simply dummy text of the printing and typesetting industry. Lorem
          Ipsum has been the industry's standard dummy text ever since the
          1500s, when an unknown printer took a galley of type and scrambled it
          to make a type specimen book. It has survived not only five centuries,
          but also the leap into electronic typesetting, remaining essentially
          unchanged.
        </p>
        <a href={`/story/${1}`}>READ THE STORY</a>
      </div>
    </div>
  );
}

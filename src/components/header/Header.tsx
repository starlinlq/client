import React, { Fragment, useState } from "react";
import { useRef } from "react";
import { useEffect } from "react";
import { agent } from "../../app/api/agent";
import { Story } from "../../app/interfaces";

export default function Header() {
  const [stories, setStories] = useState<Story[]>([]);
  const [current, setCurrent] = useState<any>();
  const [active, setActive] = useState(0);
  const storiesRef = useRef(stories);
  storiesRef.current = stories;
  let number = 0;

  useEffect(function () {
    agent.story
      .limit(3)
      .then((response) => {
        setCurrent(response[0]);
        setStories(response);
      })
      .catch((error) => console.log(error));
    let interval = setInterval(handleInterval, 7000);
    return () => clearInterval(interval);
  }, []);

  let handleInterval = () => {
    number += 1;
    if (number === 3) {
      number = 0;
    }
    setCurrent(storiesRef.current[number]);
  };
  useEffect(() => {
    let index = storiesRef.current.findIndex(
      (element) => element.id === current.id
    );
    if (index !== -1) {
      setActive(index);
    }
  }, [current]);

  function handleHover(n: number) {
    setCurrent(storiesRef.current[n]);
  }

  return (
    <div className="header_container">
      {current && (
        <>
          <img src={current.photo_url} alt="test" className="animate" />
          <div className="description">
            <span>FEATURED STORIES</span>
            <h1>{current.title.toUpperCase()}</h1>
            <div className="author_info">
              <p>{current.created_at.slice(0, 10)} </p>
              <a href={`/`}>by {current.user_name}</a>
            </div>
            <p>
              Simply dummy text of the printing and typesetting industry. Lorem
              Ipsum has been the industry's standard dummy text ever since the
              1500s, when an unknown printer took a galley of type and scrambled
              it to make a type specimen book. It has survived not only five
              centuries, but also the leap into electronic typesetting,
              remaining essentially unchanged.
            </p>
            <a href={`/story/${current.id}`}>READ THE STORY</a>
          </div>
          <div className="dots">
            <div className="center">
              {stories.map((data, index) => (
                <div
                  key={index}
                  className="dot_container"
                  onClick={(e) => {
                    handleHover(index);
                  }}
                >
                  <div className={active === index ? "round " : ""}>
                    <div className="dot"></div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </>
      )}
    </div>
  );
}

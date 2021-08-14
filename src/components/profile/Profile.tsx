import { observer } from "mobx-react-lite";
import React, { useState } from "react";
import { Fragment } from "react";
import { useEffect } from "react";
import { useParams } from "react-router-dom";
import { history } from "../..";
import { useStore } from "../../app/stores/stores";
import StoryCard from "../storyCard/StoryCard";
import { BiEdit } from "react-icons/bi";
import useComponentVisible from "../../hooks/useComponentVisible";
import EditProfile from "../editprofile/EditProfile";

function Profile() {
  const { id } = useParams<{ id: string | undefined }>();
  const [active, setActive] = useState(false);
  const { user } = useStore();
  const { profile: p } = user;
  //visible
  const { visible, ref } = useComponentVisible(false);

  const handleEdit = () => {};

  const handleActive = () => {
    setActive(!active);
  };

  useEffect(() => {
    console.log(id);
    if (id) {
      user.loadUserStories(id);
      //getting user stories
    } else {
      history.push("/");
    }
  }, [id]);

  return (
    <div className="profile">
      <div>{active && <EditProfile setActive={setActive} />}</div>
      {p.map((data) => (
        <div className="container" key={data.id}>
          <div className="account">
            <img src={data.profile_pic_url} alt="profile_picture" />
            <div className="details">
              <div className="edit">
                {" "}
                <p>starlin</p>
                <div onClick={handleActive}>
                  {" "}
                  <BiEdit className="icon" onClick={handleEdit} />
                </div>
              </div>
              <span>{`From: ${data.city}`} </span>
              <div>
                <p>{data.about_me}</p>
              </div>
              <div className="followers">
                <span>followers</span>
                <span>following</span>
              </div>
            </div>
          </div>
          <div className="stories">
            <h1>starlin's stories</h1>
            <div className="content">
              {user.posts.map((data) => (
                <Fragment key={data.id}>
                  <StoryCard
                    date={data.created_at.slice(0, 10)}
                    name={data.name}
                    story={data.story}
                    id={data.id}
                    title={data.title}
                    category={data.category}
                    photo_url={data.photo_url}
                  />
                </Fragment>
              ))}
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}

export default observer(Profile);

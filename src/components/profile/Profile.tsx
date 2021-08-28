import { observer } from "mobx-react-lite";
import { useState } from "react";
import { Fragment } from "react";
import { useEffect } from "react";
import { useParams } from "react-router-dom";
import { history } from "../..";
import { useStore } from "../../app/stores/stores";
import StoryCard from "../storyCard/StoryCard";
import { BiEdit } from "react-icons/bi";
import EditProfile from "../editprofile/EditProfile";
import { Story } from "../../app/interfaces";

function Profile() {
  const { id } = useParams<{ id: string | undefined }>();
  const [active, setActive] = useState(false);
  const { user } = useStore();
  const { profile: p } = user;
  const [currentDisplay, setCurrentDisplay] = useState(18);
  const [userStories, setUserStories] = useState<Story[]>([]);

  const handleEdit = () => {};

  const handleLoadMore = () => {
    setCurrentDisplay(currentDisplay + 9);
    setUserStories(user.posts.slice(0, currentDisplay));
  };

  const handleActive = () => {
    setActive(!active);
  };

  useEffect(() => {
    if (id) {
      user.loadUserStories(parseInt(id));
      //getting user stories
    } else {
      history.push("/");
    }
  }, []);

  useEffect(
    function () {
      setUserStories(user.posts.slice(0, 9));
    },
    [user.posts]
  );

  return (
    <div className="profile">
      <div>{active && <EditProfile setActive={setActive} />}</div>
      {p.map((data) => (
        <div className="p_container" key={data.id}>
          <div className="account">
            <img src={data.profile_pic_url} alt="profile_picture" />
            <div className="details">
              <div className="edit">
                {" "}
                <p>{data.user_name}</p>
                <div onClick={handleActive}>
                  {" "}
                  <BiEdit className="icon" onClick={handleEdit} />
                </div>
              </div>
              <div className="followers">
                <span>0 followers</span>
                <span>{user.posts.length} stories</span>
              </div>
              <div className="about">
                <p>{data.about_me}</p>
              </div>
              <div className="location">
                <h4>Location</h4>
                <p>{data.city}</p>
              </div>
            </div>
          </div>
        </div>
      ))}
      <div className="stories">
        <p className="featured">Featured Stories</p>
        <div className="content">
          {user.posts.length > 0 ? (
            userStories.map((data) => (
              <Fragment key={data.id}>
                <StoryCard
                  likes={data.likes}
                  date={data.created_at.slice(0, 10)}
                  name={data.user_name}
                  story={data.story}
                  id={data.id}
                  title={data.title}
                  category={data.category_title}
                  photo_url={data.photo_url}
                />
              </Fragment>
            ))
          ) : (
            <div>
              <p style={{ color: "grey" }}>no stories to dislpay</p>{" "}
            </div>
          )}
          {}
        </div>
        <div className="loadMore">
          <button
            type="button"
            disabled={
              user.posts.length < 10 || currentDisplay >= user.posts.length
                ? true
                : false
            }
            onClick={handleLoadMore}
          >
            {userStories.length === 0
              ? ""
              : user.posts.length < 10 || currentDisplay >= user.posts.length
              ? "No more stories to display"
              : "Load More Stories"}
          </button>
        </div>
      </div>
    </div>
  );
}

export default observer(Profile);

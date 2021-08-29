import { observer } from "mobx-react-lite";
import { useState } from "react";
import { Fragment } from "react";
import { useEffect } from "react";
import { useParams } from "react-router-dom";
import { useStore } from "../../app/stores/stores";
import StoryCard from "../storyCard/StoryCard";
import { BiEdit } from "react-icons/bi";
import EditProfile from "../editprofile/EditProfile";
import { Profile as p, Story } from "../../app/interfaces";
import { agent } from "../../app/api/agent";

function Profile() {
  const [userData, setUserData] = useState<{
    posts: Story[];
    profile: p[];
  }>({ posts: [], profile: [] });
  const { id } = useParams<{ id: string }>();
  const [active, setActive] = useState(false);
  const { user, post } = useStore();

  const [currentDisplay, setCurrentDisplay] = useState(18);
  const [userStories, setUserStories] = useState<Story[]>([]);

  const handleEdit = () => {};

  const handleLoadMore = () => {
    setCurrentDisplay(currentDisplay + 9);
    setUserStories(userData.posts.slice(0, currentDisplay));
  };
  useEffect(
    function () {
      if (post.itemTodelete > 0) {
        const filtered = userData.posts.filter(
          (story) => story.id !== post.itemTodelete
        );
        setUserStories(filtered.slice(0, currentDisplay));
      }
    },
    [post.itemTodelete]
  );

  const handleActive = () => {
    setActive(!active);
  };

  useEffect(() => {
    let handleData = async () => {
      let data = await agent.user.loadProfile(parseInt(id));
      if (data) {
        setUserData(data);
      }
    };

    handleData();
  }, [id]);

  useEffect(
    function () {
      setUserStories(userData.posts.slice(0, 9));
    },
    [userData.posts]
  );

  return (
    <div className="profile">
      <div>{active && <EditProfile setActive={setActive} />}</div>
      {userData?.profile.map((data) => (
        <div className="p_container" key={data.id}>
          <div className="account">
            <img src={data.profile_pic_url} alt="profile_picture" />
            <div className="details">
              <div className="edit">
                {" "}
                <p>{data.user_name}</p>
                <div onClick={handleActive}>
                  {" "}
                  {user.id === userData.profile[0].user_id && (
                    <BiEdit className="icon" onClick={handleEdit} />
                  )}
                </div>
              </div>
              <div className="followers">
                <span>0 followers</span>
                <span>{userData.posts.length} stories</span>
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
          {userData.posts.length > 0 ? (
            userStories.map((data) => (
              <Fragment key={data.id}>
                <StoryCard
                  user_id={data.user_id}
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
              userData.posts.length < 10 ||
              currentDisplay >= userData.posts.length
                ? true
                : false
            }
            onClick={handleLoadMore}
          >
            {userStories.length === 0
              ? ""
              : userData.posts.length < 10 ||
                currentDisplay >= userData.posts.length
              ? "No more stories to display"
              : "Load More Stories"}
          </button>
        </div>
      </div>
    </div>
  );
}

export default observer(Profile);

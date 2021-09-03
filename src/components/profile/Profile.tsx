import { observer } from "mobx-react-lite";
import { useRef, useState } from "react";
import { Fragment } from "react";
import { useEffect } from "react";
import { useParams } from "react-router-dom";
import { useStore } from "../../app/stores/stores";
import StoryCard from "../storyCard/StoryCard";
import { BiEdit } from "react-icons/bi";
import EditProfile from "../editprofile/EditProfile";
import { Profile as p, Story } from "../../app/interfaces";
import { agent } from "../../app/api/agent";
import CreateStory from "../forms/CreateStory";
import Follow from "../follow/Follow";
import Follower from "../follower/Follower";
import { GiPhotoCamera } from "react-icons/gi";

type Edit = {
  story_id: number;
  story: string;
  title: string;
  category: string;
  active: boolean;
  photo_url: string;
  update: boolean;
};

function Profile() {
  const [userData, setUserData] = useState<{
    posts: Story[];
    profile: any[];
    followersCount: number;
    followingCount: number;
  }>({ posts: [], profile: [], followersCount: 0, followingCount: 0 });
  const { id } = useParams<{ id: string }>();
  const [active, setActive] = useState(false);

  const [displayFollow, setDisplayFollow] = useState({
    active: false,
    current: "",
  });
  const { user, post } = useStore();
  const [editData, setEditData] = useState<Edit>({
    story_id: 0,
    title: "",
    category: "",
    story: "",
    photo_url: "",
    active: false,
    update: false,
  });

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
  const handleCount = (n: number, type: string = "Followers") => {
    if (type === "Followers") {
      setUserData({ ...userData, followersCount: userData.followersCount + n });
    } else {
      setUserData({ ...userData, followingCount: userData.followingCount + n });
    }
  };

  useEffect(() => {
    let handleData = async () => {
      let data = await agent.user.loadProfile(parseInt(id));

      if (data) {
        setUserData(data);
        setUserStories(data.posts.slice(0, 9));
      }
    };

    handleData();
  }, [id]);

  const handleDisplayFollowers = (name: string) => {
    setDisplayFollow({ active: true, current: name });
  };

  return (
    <div className="profile">
      {displayFollow.active && (
        <Follower
          setActive={setDisplayFollow}
          id={parseInt(id)}
          current={displayFollow.current}
          handleCount={handleCount}
        />
      )}
      <div>
        {active && (
          <EditProfile setActive={setActive} photo_url={user.profile_pic} />
        )}
      </div>
      {userData?.profile.map((data) => (
        <div className="p_container" key={data.id}>
          <div className="account">
            <img src={data.profile_pic_url} alt="profile_picture" />
            <div className="details">
              <div className="edit">
                <p>{data.user_name}</p>
                {user.id === userData.profile[0].user_id && (
                  <button className="edit_button button" onClick={handleActive}>
                    Edit Profile
                  </button>
                )}
                {user.id !== userData.profile[0].user_id && (
                  <div className="follow_button">
                    <Follow id={data.user_id} handleCount={handleCount} />
                  </div>
                )}
              </div>
              <div className="followers_container">
                <div className="stories">
                  <span className="total">{userData.posts.length}</span>
                  <span>stories</span>
                </div>
                <div className="followers">
                  <span className="total">{userData.followersCount}</span>
                  <span onClick={() => handleDisplayFollowers("Followers")}>
                    Followers
                  </span>
                </div>
                <div className="following">
                  <span className="total">{userData.followingCount}</span>
                  <span onClick={() => handleDisplayFollowers("Following")}>
                    Following
                  </span>
                </div>
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
                  editData={setEditData}
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

      {editData.active && (
        <div className="edit_profile box-shadow">
          <CreateStory
            update={editData.update}
            editData={setEditData}
            title={editData.title}
            category={editData.category}
            story={editData.story}
            photo_url={editData.photo_url}
            story_id={editData.story_id}
          />
        </div>
      )}
    </div>
  );
}

export default observer(Profile);

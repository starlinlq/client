import React, { useState } from "react";
import { useEffect } from "react";
import { AiOutlineCloseCircle } from "react-icons/ai";
import { agent, user } from "../../app/api/agent";
import { Follower as Data } from "../../app/interfaces";
import Loading from "../../features/loader/Loading";
import Follow from "../follow/Follow";
import { observer } from "mobx-react-lite";
import { useStore } from "../../app/stores/stores";
import { Link } from "react-router-dom";
import { SearchCategory } from "semantic-ui-react";
type Props = {
  setActive: Function;
  id: number;
  current: string;
  handleCount: Function;
};

function Follower({ id, current, setActive, handleCount }: Props) {
  const [loading, setLoading] = useState(false);
  const [limit, setLimit] = useState(30);
  const [data, setData] = useState<any[]>([]);
  const { user } = useStore();

  const handleClick = () => {
    setActive({ active: false });
  };

  useEffect(function () {
    setLoading(true);
    let handleCall = async () => {
      try {
        let followers = await agent.user.followers(id, limit, current);
        setData(followers.data);
        setLoading(false);
      } catch (error) {
        console.log(error);
      }
    };

    handleCall();
  }, []);

  return (
    <div className="display_followers_container">
      <div className="display_followers box-shadow">
        <div className="type box-shadow">
          <p>{current}</p>{" "}
          <AiOutlineCloseCircle className="close_icon" onClick={handleClick} />
        </div>
        <div>
          {loading ? (
            <Loading />
          ) : (
            data.map((element, index) => (
              <div key={element + index} className="follower_data_container">
                <div>
                  <Link
                    to={`/profile/${element.id}`}
                    className="content"
                    onClick={handleClick}
                  >
                    <img
                      className="picture"
                      src={element.profile.profile_pic_url}
                      alt="profile"
                    />
                    <p className="user_name">{element.user_name}</p>
                  </Link>
                </div>

                {user.id !== element.id && (
                  <Follow
                    id={element.id}
                    profileId={id}
                    handleCount={handleCount}
                    current={current}
                  />
                )}
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
}
export default observer(Follower);

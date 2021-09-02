import React, { useEffect, useState } from "react";
import { useRef } from "react";
import { agent } from "../../app/api/agent";
import { useStore } from "../../app/stores/stores";
import { observer } from "mobx-react-lite";

type Props = {
  id: number;
  handleCount: Function;
  current?: string;
  profileId?: number;
};

function Follow({ id, handleCount, current, profileId }: Props) {
  const { user } = useStore();
  const ref = useRef<HTMLButtonElement>(null);
  const [followed, setFollowed] = useState(false);
  const [removed, setRemove] = useState(false);

  const handleMouseOver = () => {
    if (ref.current && followed) {
      ref.current.innerText = "Unfollow";
    } else if (
      ref.current &&
      current === "Followers" &&
      profileId === user.id
    ) {
      ref.current.innerText = `${removed ? "Removed" : "remove"}`;
    }
  };

  const handleMouseLeave = () => {
    if (ref.current && !followed) {
      ref.current.innerText = "Follow";
    } else if (ref.current && followed) {
      ref.current.innerText = "Following";
    }
  };

  useEffect(() => {
    let found = user.following.find((element) => element.id === id);
    if (found) {
      setFollowed(true);
    }
  }, [user.following, id]);

  const handleClick = async () => {
    if (id !== user.id && !followed) {
      await agent.user.follow(id);
      setFollowed(true);
      handleCount(1, current);
    } else if (
      id !== user.id &&
      current === "Followers" &&
      profileId === user.id
    ) {
      await agent.user.removeFollower(id);
      setRemove(true);
      handleCount(-1, current);
    } else if (followed && user.id !== id) {
      await agent.user.unfollow(id);
      handleCount(-1, current);
      setFollowed(false);
    }
  };
  return (
    <div className="follow_container">
      <button
        type="button"
        disabled={removed}
        ref={ref}
        onMouseOver={handleMouseOver}
        onMouseLeave={handleMouseLeave}
        onClick={handleClick}
      >
        {followed ? "Following" : "Follow"}
      </button>
    </div>
  );
}
export default observer(Follow);

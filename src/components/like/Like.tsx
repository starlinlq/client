import React, { useState } from "react";
import { useEffect } from "react";
import { IoIosHeartEmpty, IoIosHeart } from "react-icons/io";
import { useStore } from "../../app/stores/stores";
import { observer } from "mobx-react-lite";
import { agent } from "../../app/api/agent";

interface Props {
  story_id: number;
  likes: {
    user_id: number;
    post_id: number;
    created_at: string;
    id: number;
    updated_at: string;
  }[];
}

interface LikeData {
  id?: number;
  count: number;
  active: boolean;
  likes: {
    user_id: number;
    post_id: number;
    created_at: string;
    id: number;
    updated_at: string;
  }[];
}
function Like({ story_id, likes }: Props) {
  const { user, features } = useStore();

  const [likeData, setLikeData] = useState<LikeData>({
    likes: [],
    count: 0,
    active: false,
    id: 0,
  });

  const handleUseEffect = () => {
    let like = likes.find((element) => element.user_id === user.id);

    if (like) {
      setLikeData({ likes, count: likes.length, active: true, id: like.id });
    } else {
      setLikeData({ likes, count: likes.length, active: false });
    }
  };
  useEffect(handleUseEffect, [user.id, likes]);

  const handleLike = async () => {
    if (likeData.active && likeData.id && user.isAuth) {
      await agent.story.disLike(likeData.id);
      features.handlebookmark(story_id);
      let data = likeData.likes.filter(
        (element) => element.user_id !== user.id
      );
      setLikeData({ likes: data, count: data.length, active: false });
    } else if (user.isAuth) {
      let data = await agent.story.like(story_id);

      setLikeData({
        likes: [...likeData.likes, data],
        count: likeData.likes.length + 1,
        active: true,
        id: data.id,
      });
    }
  };

  return (
    <div className="like_container">
      {likeData.active ? (
        <IoIosHeart
          className={`${likeData.active && user.isAuth ? "liked" : "like"}`}
          onClick={handleLike}
        />
      ) : (
        <IoIosHeart
          className={`${likeData.active ? "liked" : "like"}`}
          onClick={handleLike}
        />
      )}

      <p>{likeData.count}</p>
      <p className={`${user.isAuth ? "isAuth" : "notAuth"}`}>
        Sign in to like the post
      </p>
    </div>
  );
}

export default observer(Like);

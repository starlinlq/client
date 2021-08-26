import React from "react";
import { IoIosHeartEmpty } from "react-icons/io";
import { useStore } from "../../app/stores/stores";

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
function Like() {
  const { user } = useStore();
  return (
    <div className="like_container">
      <IoIosHeartEmpty className="heart" />
      <p>10</p>
    </div>
  );
}

export default Like;

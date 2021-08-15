import { divide } from "lodash";
import React from "react";
import { Link } from "react-router-dom";
interface Props {
  name: string | undefined;
  profile_photo: string;
  id: string;
}
export default function Author({ name, profile_photo, id }: Props) {
  return (
    <div className="author">
      <Link to={`/profile/${id}`} className="content">
        <img src={profile_photo} alt="profile" />
        <p>{name?.toUpperCase()}</p>
      </Link>
    </div>
  );
}

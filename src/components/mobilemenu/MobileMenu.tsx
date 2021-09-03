import React from "react";
type Props = {
  active: boolean;
};
const MobileMenu = ({ active }: Props) => {
  return (
    <div className="mobile_menu">
      <a href="/">HOME</a>
      <a href="/create">CREATE STORY</a>
      <a href="/stories">STORIES</a>
      <a href="/top">TOP</a>
      <a href="/profile">PROFILE</a>
      <a href="/account">ACCOUNT</a>
    </div>
  );
};

export default MobileMenu;

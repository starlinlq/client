import React from "react";
import DisplayByCategory from "../DisplayByCategory/DisplayByCategory";
import Header from "../header/Header";
export default function Home() {
  return (
    <div className="home_container">
      <Header />
      <DisplayByCategory category="Universe" itemToDisplay={8} />
      <DisplayByCategory category="Nature" itemToDisplay={8} flex={true} />
      <DisplayByCategory category="Rebirth" itemToDisplay={8} />
    </div>
  );
}

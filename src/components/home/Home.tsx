import React from "react";
import DisplayByCategory from "../DisplayByCategory/DisplayByCategory";
import Header from "../header/Header";
export default function Home() {
  return (
    <div className="home_container">
      <Header />
      <DisplayByCategory category="Universe" itemToDisplay={20} />
      <DisplayByCategory category="Nature" itemToDisplay={6} flex={true} />
      <DisplayByCategory category="Rebirth" itemToDisplay={20} />
    </div>
  );
}

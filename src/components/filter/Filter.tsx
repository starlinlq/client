import { observable } from "mobx";
import React from "react";
import { BsFilter } from "react-icons/bs";
import { useStore } from "../../app/stores/stores";

function Filter() {
  const { post } = useStore();
  function handleCategory(e: React.ChangeEvent<HTMLSelectElement>) {
    const category = e.target.value;
    post.get(1, category);
  }

  return (
    <div className="filter_container">
      <BsFilter className="icon" />
      <select
        name="category"
        className="category"
        onChange={(e) => handleCategory(e)}
      >
        <option value="all">All</option>
        <option value="Nature">Nature</option>
        <option value="Adventure">Adventure</option>
        <option value="Comedy">Comedy</option>
        <option value="Rebirth">Rebirth</option>
        <option value="Universe">Universe</option>
        <option value="Family">Family</option>
      </select>
    </div>
  );
}
export default Filter;

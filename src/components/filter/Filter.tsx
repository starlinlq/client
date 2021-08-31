import { observable } from "mobx";
import React, { useState } from "react";
import { useEffect } from "react";
import { BsFilter } from "react-icons/bs";
import { useStore } from "../../app/stores/stores";
type Props = {
  id?: string;
};
function Filter({ id }: Props) {
  const { post } = useStore();
  const [options, setOptions] = useState([
    { option: "all" },
    { option: "Nature" },
    { option: "Adventure" },
    { option: "Comedy" },
    { option: "Rebirth" },
    { option: "Universe" },
    { option: "Family" },
  ]);
  function handleCategory(e: React.ChangeEvent<HTMLSelectElement>) {
    const category = e.target.value;
    post.get(1, category);
  }

  useEffect(() => {
    if (id) {
      let data = options.filter(
        (element: { option: string }) => element.option !== id
      );
      let newData = [{ option: id }, ...data];
      setOptions(newData);
    }
  }, [id]);

  return (
    <div className="filter_container">
      <BsFilter className="icon" />
      <p>CATEGORY : </p>
      <select
        name="category"
        className="category"
        onChange={(e) => handleCategory(e)}
      >
        {options.map((value) => (
          <>
            <option value={value.option}>{value.option}</option>
          </>
        ))}
      </select>
    </div>
  );
}
export default Filter;

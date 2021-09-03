import React, { useState } from "react";
import { useEffect } from "react";
import { BiSearch } from "react-icons/bi";
import { GiPhotoCamera } from "react-icons/gi";
import { agent } from "../../app/api/agent";
import { useStore } from "../../app/stores/stores";
import useDebouce from "../../hooks/useDebounce";

function Search() {
  const [selection, setSelection] = useState("story");
  const [value, setValue] = useState("");
  const debouncedValue = useDebouce(500, value);
  const { features } = useStore();

  const handleSelect = (e: any) => {
    setSelection(e.target.value);
  };
  const handleInput = (event: React.ChangeEvent<HTMLInputElement>) => {
    setValue(event.target.value);
  };
  useEffect(() => {
    const handleCall = async () => {
      if (debouncedValue.length > 2) {
        let result = await agent.features.search(debouncedValue);
        console.log(result!.data);
        if (result.data.length > 0) {
          features.setSearchData({
            data: result.data,
            type: selection,
            active: true,
          });
        } else {
          console.log("hey");
          features.setSearchData({
            data: [{ title: "No results" }],
            type: selection,
          });
        }
      }
    };
    handleCall();
  }, [debouncedValue]);
  return (
    <div className="search_container">
      <select name="select" id="" onChange={handleSelect}>
        <option value="story">STORY</option>
        <option value="user">USER</option>
      </select>{" "}
      <input
        type="text"
        className=""
        placeholder="Search"
        value={value}
        onChange={handleInput}
      />
    </div>
  );
}

export default Search;

import React, { useRef, useState } from "react";
import { useEffect } from "react";
import { BiSearch } from "react-icons/bi";
import { GiPhotoCamera } from "react-icons/gi";
import { agent } from "../../app/api/agent";
import { useStore } from "../../app/stores/stores";
import useDebouce from "../../hooks/useDebounce";
import { observer } from "mobx-react-lite";
import DisplaySearch from "../displaySearch/DisplaySearch";

function Search() {
  const [selection, setSelection] = useState("story");
  const [display, setDisplay] = useState(false);
  const { features } = useStore();
  const debouncedValue = useDebouce(500, features.searchQuery);
  const ref = useRef<HTMLDivElement>(null);
  const wrapperRef = useRef<HTMLDivElement>(null);

  const handleSelect = (e: any) => {
    setSelection(e.target.value);
  };
  const handleClickOutside = (e: any) => {
    if (ref.current && ref.current.contains(e.target)) {
      features.setSearchActive(true);
    } else {
      if (display && wrapperRef.current) {
        wrapperRef.current.classList.toggle("is-search-open");
        setDisplay(false);
      }
      features.setSearchQuery();
      features.setSearchActive();
    }
  };
  const handleInputClick = () => {};
  const handleInput = (event: React.ChangeEvent<HTMLInputElement>) => {
    features.setSearchQuery(event.target.value);
  };
  useEffect(() => {
    window.addEventListener("click", handleClickOutside);

    return () => {
      window.removeEventListener("click", handleClickOutside);
    };
  }, [display]);

  const handleOpenSearch = () => {
    if (wrapperRef.current && !display) {
      wrapperRef.current.classList.toggle("is-search-open");
      setDisplay(true);
    }
  };
  useEffect(() => {
    const handleCall = async () => {
      if (debouncedValue.length > 2) {
        if (selection === "story") {
          features.setLoading();
          let result = await agent.features.search(debouncedValue);
          if (result.data.length > 0 && selection === "story") {
            features.setSearchData({
              data: result.data,
              type: selection,
              active: true,
            });
          } else {
            features.setNotResults();
          }
        } else if (selection === "user") {
          features.setLoading();
          let result = await agent.user.search(debouncedValue);
          if (result.length > 0) {
            features.setSearchData({
              data: result,
              type: selection,
              active: true,
            });
          } else {
            features.setNotResults();
          }
        }
      }
    };
    handleCall();
  }, [debouncedValue]);
  return (
    <div className="search_container" onClick={handleInputClick} ref={ref}>
      <BiSearch className="search_icon" onClick={handleOpenSearch} />
      <div className="">
        {features.searchActive && (
          <div className="search_result_nav box-shadow">
            <DisplaySearch />
          </div>
        )}
        <div className="search_wrapper" ref={wrapperRef}>
          <select name="select" id="" onChange={handleSelect}>
            <option value="story">STORY</option>
            <option value="user">USER</option>
          </select>{" "}
          <input
            type="text"
            className=""
            placeholder="Search"
            value={features.searchQuery}
            onChange={handleInput}
          />
        </div>
      </div>
    </div>
  );
}

export default observer(Search);

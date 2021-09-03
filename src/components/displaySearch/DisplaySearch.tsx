import React from "react";
import { observer } from "mobx-react-lite";
import { useStore } from "../../app/stores/stores";
import { useRef } from "react";
import { useEffect } from "react";
function DisplaySearch() {
  const { features } = useStore();
  const ref = useRef<HTMLDivElement>(null);
  const handleClickOutside = (e: any) => {
    if (ref.current && !ref.current.contains(e.target)) {
      features.setSearchData({
        data: [],
        type: "",
        active: false,
      });
    }
  };
  useEffect(() => {
    window.addEventListener("click", handleClickOutside);

    return () => {
      window.removeEventListener("click", handleClickOutside);
    };
  }, []);

  return (
    <div className="dislpay_search_container" ref={ref}>
      <div>
        {features.searhResult.data.map((result, index) => (
          <div className="search_result_cont" key={result + index}>
            <img src={result.photo_url} alt="result" className="result_pic" />
            <div className="story_info">
              <a className="title" href={`story/${result.id}`}>
                {result.title}
              </a>
              <p className="result_author">by {result.user_name}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default observer(DisplaySearch);

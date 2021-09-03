import React, { useState } from "react";
import { observer } from "mobx-react-lite";
import { useStore } from "../../app/stores/stores";
import { useRef } from "react";
import { useEffect } from "react";
import Loading from "../../features/loader/Loading";
import { history } from "../..";
function DisplaySearch() {
  const { features } = useStore();

  const handleOnClick = (id: number, type = "") => {
    features.setSearchActive();
    features.setSearchQuery();
    if (type === "user") {
      history.push(`/profile/${id}`);
    } else {
      history.push(`/story/${id}`);
    }
  };

  console.log(features.noResults);

  return (
    <div className="dislpay_search_container">
      {features.loading ? (
        <Loading />
      ) : features.noResults ? (
        <div className="no_results">
          <p>No results. Please try another search</p>
        </div>
      ) : (
        <div>
          {features.searhResult.data.map((result, index) => {
            if (features.searhResult.type === "story")
              return (
                <div className="search_result_cont" key={result + index}>
                  <img
                    src={result.photo_url}
                    alt="result"
                    className="result_pic"
                  />
                  <div className="story_info">
                    <h4
                      style={{ cursor: "pointer" }}
                      onClick={() => handleOnClick(result.id, "story")}
                    >
                      {result.title}
                    </h4>
                    <p className="result_author">by {result.user_name}</p>
                  </div>
                </div>
              );
            if (features.searhResult.type === "user")
              return (
                <div className="search_result_cont" key={result + index}>
                  <img
                    src={result.profile_pic_url}
                    alt="result"
                    className="result_pic"
                  />
                  <div className="story_info">
                    <p
                      style={{ cursor: "pointer" }}
                      onClick={() => handleOnClick(result.user_id, "user")}
                    >
                      {result.user_name.toUpperCase()}
                    </p>
                  </div>
                </div>
              );
          })}
        </div>
      )}
    </div>
  );
}

export default observer(DisplaySearch);

import { isInteger } from "formik";
import React, { useState } from "react";
import { useEffect } from "react";
import { useHistory } from "react-router-dom";
import { array } from "yup/lib/locale";
import { useStore } from "../../app/stores/stores";
import { GrFormNext, GrFormPrevious } from "react-icons/gr";
import { PostStore } from "../../app/stores/postStore";

export default function Paginate() {
  const { post } = useStore();
  const [pages, setPages] = useState<number[]>([]);

  useEffect(
    function () {
      let array = new Array(5);
      let newArray = null;
      if (post.lastPage === 1) {
        newArray = array.fill(0, 0, 1);
        setPages(newArray);
      } else if (post.lastPage === 2) {
        newArray = array.fill(0, 0, 2);
        setPages(newArray);
      } else if (post.lastPage === 3) {
        newArray = array.fill(0, 0, 3);
        setPages(newArray);
      } else if (post.lastPage === 4) {
        newArray = array.fill(0, 0, 4);
        setPages(newArray);
      } else {
        newArray = array.fill(0, 0, 5);
        setPages(newArray);
      }
    },
    [post.lastPage]
  );

  function handlePage(page: number) {
    post.get(page);
  }

  const handlePrevious = () => {
    post.setPersistPage(-1);
  };

  const handleNext = () => {
    post.setPersistPage(1);
  };

  return (
    <div className="paginate_container ">
      <div className="pagination  box-shadow">
        <GrFormPrevious className="icon" onClick={handlePrevious} />
        {pages.map((x, index) => (
          <div
            className={
              post.currentPage === index + post.persistPage
                ? "current "
                : "circle"
            }
            key={index}
          >
            {" "}
            <span
              className="page "
              onClick={() => handlePage(index + post.persistPage)}
            >
              {index + post.persistPage}
            </span>
          </div>
        ))}
        <GrFormNext className="icon" onClick={handleNext} />
        <div className="totalPages">
          <p>Total {post.lastPage} Pages </p>
        </div>
      </div>
    </div>
  );
}

import { isInteger } from "formik";
import React, { Fragment, useState } from "react";
import { useEffect } from "react";
import { useHistory } from "react-router-dom";
import { array } from "yup/lib/locale";
import { useStore } from "../../app/stores/stores";
import { GrFormNext, GrFormPrevious } from "react-icons/gr";
import { PostStore } from "../../app/stores/postStore";
import { BsTypeH1 } from "react-icons/bs";

import { observer } from "mobx-react-lite";

function Paginate() {
  const { post } = useStore();
  const [pages, setPages] = useState<number[]>([]);

  useEffect(
    function () {
      let totalPages = range(1, 5);
      setPages(totalPages);
      console.log(totalPages);
    },
    [post.totalPages]
  );

  function handlePage(page: number) {
    post.get(page);
  }

  const range = (from: number, to: number, step: number = 1) => {
    let range = [];
    let i = from;
    while (i <= to) {
      range.push(i);
      i += step;
    }
    return range;
  };

  const handlePrevious = () => {
    post.paginateLogic(-1);
  };

  const handleNext = () => {
    post.paginateLogic(1);
  };

  return (
    <div className="paginate_container ">
      <div className="pagination  box-shadow">
        <GrFormPrevious className="icon" onClick={handlePrevious} />
        {pages.map((page, index) => (
          <>
            <div>
              <div
                className={
                  index + post.updatePages === post.currentPage
                    ? "current"
                    : "circle"
                }
              >
                <span
                  className="page "
                  onClick={() => handlePage(index + post.updatePages)}
                >
                  {index + post.updatePages}
                </span>
              </div>
            </div>
          </>
        ))}
        <GrFormNext className="icon" onClick={handleNext} />
        <div className="totalPages">
          <p>Total {post.totalPages} pages</p>
        </div>
      </div>
    </div>
  );
}

export default observer(Paginate);

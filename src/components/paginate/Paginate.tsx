import { useState } from "react";
import { useEffect } from "react";
import { useStore } from "../../app/stores/stores";
import { GrFormNext, GrFormPrevious } from "react-icons/gr";

import { observer } from "mobx-react-lite";

interface Props {
  type: string;
}

function Paginate({ type }: Props) {
  const { post } = useStore();
  const [pages, setPages] = useState<number[]>([]);
  const [pageJump, setPageJump] = useState<number>(1);

  useEffect(
    function () {
      let totalPages: number[] = [];
      if (post.totalPages < 5) {
        totalPages = range(1, post.totalPages);
      } else totalPages = range(1, 5);
      setPages(totalPages);
    },
    [post.totalPages]
  );

  function handlePage(page: number) {
    if (type === "posts") {
      post.get(page, post.selectedCategory);
    } else if (type === "commets") {
    }
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

  const handleJump = () => {
    if (pageJump !== post.currentPage && pageJump <= post.totalPages) {
      post.handlePageJump(pageJump);
    }
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
          <div key={index + page}>
            {post.totalPages > 5 ? (
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
            ) : (
              <div className={page === post.currentPage ? "current" : "circle"}>
                <span className="page " onClick={() => handlePage(page)}>
                  {page}
                </span>
              </div>
            )}
          </div>
        ))}
        <GrFormNext className="icon" onClick={handleNext} />
        <div className="totalPages">
          <p>Total {post.totalPages} pages</p>
        </div>
        <div className="jumpPage">
          <p>Go to Page</p>
          <input
            onChange={(e) => setPageJump(parseInt(e.target.value))}
            placeholder="12"
          />
          <button type="button" onClick={handleJump}>
            Jump
          </button>
        </div>
      </div>
    </div>
  );
}

export default observer(Paginate);

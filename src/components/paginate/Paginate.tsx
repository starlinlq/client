import React, { useState } from "react";
import { useEffect } from "react";
import { array } from "yup/lib/locale";
import { useStore } from "../../app/stores/stores";

export default function Paginate() {
  const { post } = useStore();
  const [pages, setPages] = useState<number[]>([]);
  const [currentPage, setCurrentPage] = useState(1);

  useEffect(
    function () {
      let array = new Array(post.lastPage);
      let newArray = array.fill(0, 0, array.length);
      setPages(newArray);
    },
    [post.lastPage]
  );
  function handlePage(page: number) {
    post.get(page);
    setCurrentPage(page);
  }
  console.log(currentPage);
  return (
    <div className="paginate_container ">
      <div className="pagination  box-shadow">
        {pages.map((x, index) => (
          <div
            className={currentPage === index + 1 ? "current " : "circle"}
            key={index}
          >
            {" "}
            <span className="page " onClick={() => handlePage(index + 1)}>
              {index + 1}
            </span>
          </div>
        ))}
        <div>Total {post.lastPage} Pages </div>
      </div>
    </div>
  );
}

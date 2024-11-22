import React, { useRef, useState, useEffect, Fragment } from "react";
import { GrLinkNext } from "react-icons/gr";
import { GrLinkPrevious } from "react-icons/gr";
export default function Paginacao({
  pageSizeTables,
  setPageSizeTables,
  tableType,
  data,
  pagesize = 20,
}) {
  let numeroTotal = data?.length || 1;
  let numeroTotalPaginas = Math.max(Math.ceil(numeroTotal / pagesize));

  const getCurrentPage = () => {
    const minKey = `table${tableType}Min`;
    const currentMin = pageSizeTables[minKey] || 1;
    const currentPage = Math.floor(currentMin / pagesize) + 1;
    return isNaN(currentPage) ? 1 : currentPage;

  };

  const [page, setPage] = useState(getCurrentPage());

  useEffect(() => {
    setPage(getCurrentPage());
  }, [pageSizeTables]);

  const handleNext = (pagesize) => {
    const minKey = `table${tableType}Min`;
    const maxKey = `table${tableType}Max`;


    
    setPageSizeTables((prevState) => ({
      ...prevState,
      [minKey]: prevState[minKey] + pagesize,
      [maxKey]: prevState[maxKey] + pagesize,
    }));
    setPage(page + 1);
  };

  console.log(page);

  const handlePrev = (pagesize) => {
    const minKey = `table${tableType}Min`;
    const maxKey = `table${tableType}Max`;

    if (page > 1) {
      setPageSizeTables((prevState) => ({
        ...prevState,
        [minKey]: prevState[minKey] - pagesize,
        [maxKey]: prevState[maxKey] - pagesize,
      }));
    }
    setPage(page + 1);
  };

  return (
    <>
      <br />
      <div className="flex justify-between ">
        <button
          disabled={page === 1 ? true : false}
          className="text-[30px] "
          onClick={() => handlePrev(pagesize)}
        >
          <GrLinkPrevious />
        </button>

        <p>{`${page} de ${numeroTotalPaginas}`}</p>
        <button
          disabled={page === numeroTotalPaginas ? true : false}
          className="text-[30px] "
          onClick={() => handleNext(pagesize)}
        >
          <GrLinkNext />
        </button>
      </div>
    </>
  );
}

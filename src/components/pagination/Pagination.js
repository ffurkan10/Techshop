import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchItem, setCurrentPage } from "../../features/ItemSlice";
import { GrNext, GrPrevious } from "react-icons/gr";

function Pagination() {
  const dispatch = useDispatch();
  const currentPage = useSelector((state) => state.data.currentPage);
  const totalPages = useSelector((state) => state.data.totalPages);
  const [page, setPage] = useState(currentPage); //sayfanın geçerli numarasının başlangıç değerini ayarlar.

  useEffect(() => {
    // currentPage değerinde bir değişiklik olduğunda, page değişkeninin değerini günceller.
    setPage(currentPage);
  }, [currentPage]);

  const handlePageChange = (page) => {
    // seçilen sayfanın numarasını ve verilerini günceller.
    setPage(page);
    dispatch(setCurrentPage(page));
    dispatch(fetchItem(page));
  };

  return (
    <div className="pagination">
      <button disabled={page === 0} onClick={() => handlePageChange(page - 1)}>
        <GrPrevious />
        <span>Previous</span>
      </button>
      <span>
        {page + 1} of {totalPages}
      </span>
      <button
        disabled={page === totalPages - 1}
        onClick={() => handlePageChange(page + 1)}
      >
        <span>Next</span>
        <GrNext />
      </button>
    </div>
  );
}

export default Pagination;

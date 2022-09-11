import { useEffect, useState } from "react";
import api from "../../api";
import ProductList from "./ProductList";
import Loader from "../Loader";
import ErrorMessage from "../ErrorMessage";
import PaginationControls from "../products/PaginationControls";
import styles from "./ProductPage.module.css";
const ProductPage = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);
  const [products, setProducts] = useState([]);
  const [limit, setLimit] = useState(10);
  const [page, setPage] = useState(1);
  const [selectValue, setSelectValue] = useState(limit);
  const [totalPages, setTotalPages] = useState(0);

  const handleSelect = (e) => {
    const value = e.target.value;
    setSelectValue(value);
    setLimit(value);
  };
  useEffect(() => {
    // We use AbortController (https://developer.mozilla.org/en-US/docs/Web/API/AbortController)
    // to clean up so that we don’t introduce a memory leak
    // (https://reactjs.org/docs/hooks-effect.html#effects-with-cleanup)
    const abortController = new AbortController();

    const fetchData = async () => {
      try {
        setLoading(true);
        setError(false);
        const result = await api.getProducts(page, limit);
        if (!result.ok) {
          throw new Error("API Error");
        }
        const data = await result.json();
        if (!abortController.signal.aborted) {
          setProducts(data.products);
          setTotalPages(data.totalPages);
        }
      } catch (error) {
        if (!abortController.signal.aborted) {
          setError(true);
        }
      } finally {
        if (!abortController.signal.aborted) {
          setLoading(false);
        }
      }
    };

    fetchData();

    return () => abortController.abort();
  }, [page, limit]);

  return (
    <main className={`${styles.mainLayout} ${styles.sectionPadding}`}>
      {loading && <Loader />}
      {error && <ErrorMessage message="Error fetching products" />}
      <div className="controls">
        <p className={styles.paragraph}>
          Products to display:{" "}
          <select
            className={styles.select}
            value={selectValue}
            onChange={handleSelect}
          >
            <option value="10">10</option>
            <option value="25">25</option>
            <option value="50">50</option>
            <option value="100">100</option>
          </select>
        </p>
      </div>
      <ProductList products={products} className={styles.mainContent} />
      <PaginationControls
        page={page}
        setPage={setPage}
        totalPages={totalPages}
      />
    </main>
  );
};

export default ProductPage;

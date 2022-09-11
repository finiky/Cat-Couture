import styles from "./PaginationControls.module.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faChevronLeft,
  faChevronRight,
} from "@fortawesome/free-solid-svg-icons";

const PaginationControls = ({ setPage, page, totalPages }) => {
  const prevDisabled = page > 1 ? false : true;
  const nextDisabled = page < totalPages ? false : true;
  const onPrev = () => {
    if (!prevDisabled) {
      setPage(page - 1);
    }
  };
  const onNext = () => {
    if (!nextDisabled) {
      setPage(page + 1);
    }
  };
  return (
    <div className={styles.container}>
      <div className={styles.controls}>
        <div>
          <button
            id="prevPage"
            className={styles.button}
            aria-label="Previous page"
            onClick={onPrev}
            disabled={prevDisabled}
          >
            <FontAwesomeIcon
              className={styles.icon}
              icon={faChevronLeft}
              size="2x"
            />
          </button>
        </div>
        <p className={styles.page}>
          Page{" "}
          <mark aria-label="highlight" className={styles.mark}>
            {page}
          </mark>{" "}
          of {totalPages}
        </p>
        <div>
          <button
            id="nextPage"
            className={styles.button}
            aria-label="Next page"
            onClick={onNext}
            disabled={nextDisabled}
          >
            <FontAwesomeIcon
              className={styles.icon}
              icon={faChevronRight}
              size="2x"
            />
          </button>
        </div>
      </div>
    </div>
  );
};

export default PaginationControls;

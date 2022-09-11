import styles from "./TableCell.module.css";

const TableCell = ({ children, className }) => {
  return (
    <td className={`${className || ""} ${styles.tableCell}`}>{children}</td>
  );
};

export default TableCell;

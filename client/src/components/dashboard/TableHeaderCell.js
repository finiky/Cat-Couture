import styles from "./TableHeaderCell.module.css";

const TableHeaderCell = ({ children, className }) => {
  return (
    <th className={`${styles.tableHeaderCell} ${className || ""}`}>
      {children}
    </th>
  );
};

export default TableHeaderCell;

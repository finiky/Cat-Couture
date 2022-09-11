import styles from "./DiscountBadge.module.css";

const DiscountBadge = ({ discountType, discountValue, className }) => {
  return (
    <div data-testid="badge">
      <p className={styles.discountBadge}>
        {discountType === "percentage off" && `${discountValue}% off`}{" "}
      </p>
      <p className={styles.discountBadge}>
        {discountType === "fixed amount off" && `$${discountValue} off`}
      </p>
    </div>
  );
};

export default DiscountBadge;

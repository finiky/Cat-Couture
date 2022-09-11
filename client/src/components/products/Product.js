import styles from "./Product.module.css";
import DiscountBadge from "./DiscountBadge";

const Product = ({
  name,
  description,
  price,
  imageName,
  imageDescription,
  discountType,
  discountValue,
}) => {
  return (
    <li className={styles.product}>
      <div className={styles.card}>
        <div>
          {discountValue && discountType && (
            <DiscountBadge
              className={styles.badge}
              discountValue={discountValue}
              discountType={discountType}
            />
          )}
          {imageName ? (
            <img
              src={`./img/${imageName}`}
              alt={imageDescription}
              className={styles.productImage}
            />
          ) : (
            <img
              src="./img/cat-photo-default.jpg"
              alt="Default product cat"
              className="product-image"
            />
          )}
        </div>
        <div className={styles.productInfo}>
          <h2>{name}</h2>
          <p className={styles.price}>Price {price}</p>
          <p data-testid="product-description">{description}</p>
          <button className={styles.button}>Add to Cart</button>
        </div>
      </div>
    </li>
  );
};

export default Product;

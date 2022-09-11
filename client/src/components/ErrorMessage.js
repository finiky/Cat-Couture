import styles from "./ErrorMessage.module.css";

const ErrorMessage = ({ message }) => {
  return <div className={styles.errorMessage}>Error: {message}</div>;
};

export default ErrorMessage;

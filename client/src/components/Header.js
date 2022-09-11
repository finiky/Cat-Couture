import styles from "./Header.module.css";
import { NavLink } from "react-router-dom";
import LoginButton from "./LoginButton";

const Header = () => {
  return (
    <>
      <header>
        <nav className={`${styles.nav} ${styles.pagePadding}`}>
          <div className={styles.menu}>
            <img src="./img/menu_black_24dp.svg" alt="menu" />
          </div>
          <ul className={styles.rightLinks}>
            <li className={styles.rightLinkItems}>
              <NavLink
                aria-label="pd"
                to="/"
                className={({ isActive }) =>
                  isActive ? `${styles.link} ${styles.activeLink}` : styles.link
                }
              >
                Products
              </NavLink>
            </li>
            <li className={styles.rightLinkItems}>
              <NavLink
                to="/dashboard"
                className={({ isActive }) =>
                  isActive ? `${styles.link} ${styles.activeLink}` : styles.link
                }
              >
                Dashboard
              </NavLink>
            </li>
            <li className={`${styles.navButton} ${styles.rightLinkItems}`}>
              <LoginButton />
            </li>
          </ul>
        </nav>
      </header>
      <header
        className={`${styles.header} ${styles.mainLayout} ${styles.sectionPadding}`}
      >
        <h1 className={styles.heading}>Cat Couture</h1>
      </header>
    </>
  );
};

export default Header;

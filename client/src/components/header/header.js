import { NavLink } from "react-router-dom";
import styles from "./header.module.css";

export const Header = () => {
  return (
    <div className={styles.header}>
      <div className={styles.menuItems}>
        <NavLink className={styles.link} to="/">
          Main
        </NavLink>
        <NavLink className={styles.link} to="/form">
          Form
        </NavLink>
        <NavLink className={styles.link} to="/login">
          Login
        </NavLink>
        <NavLink className={styles.link} to="/patient-data">
          Patient Data
        </NavLink>
      </div>
    </div>
  );
};

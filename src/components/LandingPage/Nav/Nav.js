import React from "react";
import { Link } from "react-router-dom";
import ROUTES from "../../../Routes/Routes";
import styles from "./Nav.module.scss";

const Nav = () => {
  return (
    <nav className={styles.nav}>
      <Link to={ROUTES.HOME}>Kokihop</Link>
      <ul className={styles.links}>
        <li>
          <Link to={ROUTES.LOGIN}>Logg inn</Link>
        </li>
      </ul>
    </nav>
  );
};

export default Nav;

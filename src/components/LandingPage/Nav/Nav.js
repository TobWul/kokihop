import React, { useContext } from "react";
import { Link } from "react-router-dom";
import { AuthContext } from "../../../context/authContext";
import { ROUTES } from "../../../Routes/Router";
import Button from "../../DS/Button/Button";
import styles from "./Nav.module.scss";

const Nav = () => {
  const { user, logout } = useContext(AuthContext);
  return (
    <nav className={styles.nav}>
      <Link className={styles.logo} to={ROUTES.HOME}>
        Kokihop
      </Link>
      <ul className={styles.links}>
        {user && (
          <li>
            <Button to={ROUTES.LIBRARY}>Biblioteket</Button>
          </li>
        )}
        <li>
          {!user ? (
            <Link to={ROUTES.LOGIN}>Logg inn</Link>
          ) : (
            <Button onClick={logout}>Logg ut</Button>
          )}
        </li>
      </ul>
    </nav>
  );
};

export default Nav;

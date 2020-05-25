import React from "react";
import { Link } from "react-router-dom";
import Button from "../Button/Button";
import styles from "./LandingPage.module.scss";

import landingPageImg from "../../assets/img/landingPage.png";

const Landing = () => {
  return (
    <div>
      <header className={styles.header}>
        <div className={styles.text}>
          <h1>Kokihop</h1>
          <p>
            An online personal recipe book based on the magazine cutout book my
            mom and grandmothers had throughout my childhood.
          </p>
          <Button to="/create-book">Create your book</Button>
          <br />
          <br />
          <Link to="bok/5eca7bca231fe800243a89fa">Gå til din bok</Link>
        </div>
        <img src={landingPageImg} alt="Kokihop, an online personal cookbook" />
      </header>
    </div>
  );
};

export default Landing;

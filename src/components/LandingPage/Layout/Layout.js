import React from "react";
import Footer from "../Footer/Footer";
import Nav from "../Nav/Nav";
import styles from "./Layout.module.scss";

const Layout = ({ children }) => {
  return (
    <>
      <Nav />
      <main className={styles.pageWrapper}>{children}</main>
      {/* <Footer /> */}
    </>
  );
};

export default Layout;

import React from "react";
import { Outlet } from "react-router";
import Navbar from "./Navbar";
import styles from "../styles/Layout.module.css";

const Layout = () => {
  return (
    <div className={styles.root}>
      <Navbar />
      <div className={styles.main}>
        <Outlet />
      </div>
    </div>
  );
};

export default Layout;

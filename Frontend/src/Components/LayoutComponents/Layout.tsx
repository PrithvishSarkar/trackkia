// import React from 'react'
import type React from "react";
import Navbar from "./Navigation.tsx";
import Footer from "./Footer.tsx";
import styles from "../cssModules/layout.module.css";

const Layout = ({ children }: { children: React.ReactNode }) => {
  return (
    <main>
      <Navbar />
      <section className={styles.bodyStyle}>
        {children}
      </section>
      <Footer />
    </main>
  );
};

export default Layout;

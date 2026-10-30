import Navbar from "./Navigation.tsx";
import Footer from "./Footer.tsx";
import styles from "@/Components/cssModules/layout.module.css";
import { Outlet } from "react-router";

const Layout = () => {
  return (
    <main>
      <Navbar />
      <section className={styles.bodyStyle}>
        <Outlet />
      </section>
      <Footer />
    </main>
  );
};

export default Layout;

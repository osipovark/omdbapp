import { Outlet } from "react-router-dom";

// import styles from "./Base.module.scss";

import Navigation from "../navigation/Navigation";
import Footer from "../footer/Footer";

function Base() {
  return (
    <>
      <Navigation />
      <main>
        <Outlet />
      </main>
      <Footer />
    </>
  );
}

export default Base;

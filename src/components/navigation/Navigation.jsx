import { useState } from "react";
import { Link, NavLink } from "react-router-dom";

import * as Icons from "@heroicons/react/24/outline";

import styles from "./Navigation.module.scss";

function Navigation() {
  const [isMenuBtnClicked, setIsMenuBtnClicked] = useState(false);

  const handleClick = () => {
    console.log(isMenuBtnClicked);
    setIsMenuBtnClicked(!isMenuBtnClicked);
  };

  return (
    <nav className={styles.nav}>
      <Link className={styles.logo}>OMDBapp</Link>
      <MenuBtn isActive={isMenuBtnClicked} handleClick={handleClick} />
      <ul
        className={`${styles.navList} ${isMenuBtnClicked ? styles.active : ""}`}
      >
        <li className={styles.navItem}>
          <NavLink className={styles.navLink} to="search">
            <span>search</span>
            <Icons.MagnifyingGlassIcon />
          </NavLink>
        </li>
        <li className={styles.navItem}>
          <NavLink className={styles.navLink} to="profile">
            <span>profile</span>
            <Icons.UserIcon />
          </NavLink>
        </li>
      </ul>
    </nav>
  );
}

function MenuBtn({ isActive, handleClick }) {
  return (
    <button
      className={`${styles.menuBtn} ${isActive ? styles.active : ""}`}
      onClick={handleClick}
    >
      <svg className={styles.hamburger} width="44" viewBox="0 0 100 100">
        <rect
          className={`${styles.line} ${styles.top}`}
          width="80"
          height="8"
          x="10"
          y="25"
          rx="5"
        ></rect>
        <rect
          className={`${styles.line} ${styles.middle}`}
          width="80"
          height="8"
          x="10"
          y="45"
          rx="5"
        ></rect>
        <rect
          className={`${styles.line} ${styles.bottom}`}
          width="80"
          height="8"
          x="10"
          y="65"
          rx="5"
        ></rect>
      </svg>
    </button>
  );
}

export default Navigation;

import { useState, useEffect } from "react";

import * as Icons from "@heroicons/react/24/outline";

import { useParamsReducer } from "../../hooks/useParamsReducer";

import MoviesList from "../../components/movies-list/MoviesList";

import styles from "./Search.module.scss";

const baseURL = "http://www.omdbapi.com/?apikey=";
const key = "ab7333ba";

function Search() {
  const [movies, setMovies] = useState([]);
  const [pageBtnsVisibility, setPageBtnsVisibility] = useState(false);
  const [searchParams, dispatch, totalResultsRef] = useParamsReducer();
  const paramsString = searchParams.toString();

  const isPaged = totalResultsRef.current > 10;

  useEffect(() => {
    console.log(paramsString);
    setMovies([]);

    const searchFilm = async () => {
      try {
        const response = await fetch(baseURL + key + `&${paramsString}`);
        const data = await response.json();
        if (data.Response === "True") {
          totalResultsRef.current = data.totalResults || null;
          setMovies(data.Search);
        } else {
          throw new Error(data.Error);
        }
      } catch (err) {
        console.warn(err.message);
      }
    };

    searchFilm();
  }, [paramsString, totalResultsRef]);

  return (
    <>
      <div className={`${styles.searchControls}`}>
        <input
          className={styles.searchStringInput}
          type="search"
          placeholder="Search film by it's title..."
          name="s"
          defaultValue={searchParams.get("s") || ""}
          onChange={(event) => {
            dispatch({
              type: "inputStringChange",
              payload: event.currentTarget.value,
            });
          }}
        />
        <button
          className={`
            ${styles.btn}
            ${styles.controlBtn}
            ${styles.pageBtnsBtn}
          `}
          disabled={!isPaged}
          tabIndex={`${!isPaged ? -1 : 0}`}
          onClick={() => setPageBtnsVisibility(!pageBtnsVisibility)}
        >
          <Icons.ArrowsRightLeftIcon />
        </button>
        <button
          className={`${styles.btn} ${styles.controlBtn} ${styles.advancedSearchBtn}`}
        >
          <Icons.AdjustmentsHorizontalIcon />
        </button>
      </div>
      <section className={styles.searchResults}>
        <MoviesList movies={movies} />
      </section>
      <div
        className={`${styles.pageBtns} ${
          isPaged && pageBtnsVisibility ? styles.active : ""
        }`}
      >
        <button
          className={`${styles.pageBtn} ${styles.btn}`}
          onClick={() => dispatch({ type: "prevPageBtnClick" })}
        >
          <Icons.ArrowLeftIcon />
        </button>
        <button
          className={`${styles.pageBtn} ${styles.btn}`}
          onClick={() => dispatch({ type: "nextPageBtnClick" })}
        >
          <Icons.ArrowRightIcon />
        </button>
      </div>
    </>
  );
}

export default Search;

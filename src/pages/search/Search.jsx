import { useEffect } from "react";

import { useParamsReducer } from "../../hooks/useParamsReducer";

import styles from "./Search.module.scss";

const baseURL = "http://www.omdbapi.com/?apikey=";
const key = "ab7333ba";

function Search() {
  const [searchParams, dispatch, totalResultsRef] = useParamsReducer();
  const paramsString = searchParams.toString();

  useEffect(() => {
    console.log(paramsString);

    const searchFilm = async () => {
      try {
        const response = await fetch(baseURL + key + `&${paramsString}`);
        console.log(response);
        const data = await response.json();
        if (data.Response === "True") {
          console.log(data);
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
    </>
  );
}

export default Search;

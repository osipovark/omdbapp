import { useState, useEffect } from "react";

import { useDebounce } from "../../hooks/useDebounce";

import styles from "./Search.module.scss";

const baseURL = "http://www.omdbapi.com/?apikey=";
const key = "ab7333ba";

function Search() {
  const [searchString, setSearchString] = useState("");
  const debouncedSearchString = useDebounce(searchString, 500);

  useEffect(() => {
    const searchFilm = async () => {
      const response = await fetch(
        baseURL + key + `&s=${debouncedSearchString}`
      );
      const data = await response.json();
      console.log(data);
    };

    searchFilm();
  }, [debouncedSearchString]);

  return (
    <>
      <input
        className={styles.input}
        type="text"
        placeholder="Search film by it's title..."
        value={searchString}
        onChange={(event) => setSearchString(event.target.value)}
      />
    </>
  );
}

export default Search;

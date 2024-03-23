import MovieItem from "../movie-item/MovieItem";

import styles from "./MoviesList.module.scss";

function MoviesList({ movies }) {
  return (
    <ul className={styles.moviesList}>
      {movies.map((movie) => (
        <MovieItem key={movie.imdbID} movie={movie} />
      ))}
    </ul>
  );
}

export default MoviesList;

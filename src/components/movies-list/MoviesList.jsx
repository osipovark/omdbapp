import styles from "./MoviesList.module.scss";

function MoviesList({ movies }) {
  return (
    <ul className={styles.moviesList}>
      {movies.map((movie) => (
        <li key={movie.imdbID}>{movie.Title}</li>
      ))}
    </ul>
  );
}

export default MoviesList;

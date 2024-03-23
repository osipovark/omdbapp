import styles from "./MovieItem.module.scss";

function MovieItem({ movie }) {
  const { Title: title, Poster: poster } = movie;

  return (
    <li className={styles.movieItem}>
      <img
        className={styles.poster}
        src={poster}
        alt={`poster of "${title}" movie`}
      />
      <h3 className={styles.title}>{title}</h3>
    </li>
  );
}

export default MovieItem;

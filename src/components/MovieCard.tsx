import { useNextMovie } from "../hooks/use-upcoming-movies";

export function MovieCard() {
  const { data: nextMovie } = useNextMovie();
  return (
    <>
      {nextMovie && (
        <div>
          <h1>Next Movie: {nextMovie.title}</h1>
          <p>Date: {new Date(nextMovie.date).toLocaleDateString()}</p>
          <a href={nextMovie.link}>Watch the movie</a>
          <img src={nextMovie.image} alt={nextMovie.title} />
        </div>
      )}
    </>
  );
}

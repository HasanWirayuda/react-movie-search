import { useState } from "react";
import { useEffect } from "react";
import "./App.css";
import { getMovieList, searchMovie } from "./api";

const App = () => {
  const [popularMovies, setPopularMovies] = useState([]);

  useEffect(() => {
    getMovieList().then((result) => {
      setPopularMovies(result);
    });
  }, []);

  const PopularMovieList = () => {
    return popularMovies.map((movie, i) => {
      return (
        <div className="movie-wrapper" key={i}>
          <div className="movie-title">{movie.title}</div>
          <img
            src={`${import.meta.env.VITE_BASEIMGURL}/${movie.poster_path}`}
            alt="Movie Poster"
            className="movie-image"
            width={300}
          />
          <div className="movie-date">release: {movie.release_date}</div>
          <div className="movie-rate">{movie.vote_average}</div>
        </div>
      );
    });
  };

  const search = async (q) => {
    if (q.length > 3) {
      const query = await searchMovie(q);
      setPopularMovies(query.results);
    }
  };

  return (
    <>
      <h1>React Movie Search</h1>
      <input
        type="text"
        placeholder="search movie..."
        className="movie-search"
        onChange={({ target }) => {
          search(target.value);
        }}
      />
      <div className="movie-container">
        <PopularMovieList />
      </div>
    </>
  );
};

export default App;

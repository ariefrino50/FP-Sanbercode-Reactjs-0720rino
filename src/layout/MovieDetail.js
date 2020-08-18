import React, { useState, useEffect } from "react";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link,
  useParams,
} from "react-router-dom";
import axios from "axios";

const MovieDetail = () => {
  let { id } = useParams();
  const [movie, setMovie] = useState(null);

  useEffect(() => {
    if (movie === null) {
      axios
        .get(`https://backendexample.sanbersy.com/api/movies/${id}`)
        .then((res) => {
          setMovie(res.data);
        });
        console.log(movie)
    }
  });
  return (
    <>
      {movie !== null && (
        <div className="content">
          <h1>{movie.title}</h1>
          <img src={movie.image_url} className="imageDetail"></img>
          <h2>Rating: {movie.rating}</h2>
          <h2>Genre: {movie.genre}</h2>
          <h2>Year: {movie.year}</h2>
          <h2>Description: </h2>
          <p>{movie.description}</p>

          <h2>Review:</h2>
          <p>{movie.review}</p>
        </div>
      )}
    </>
  );
};

export default MovieDetail;
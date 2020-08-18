import React, { useState, useEffect } from "react";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link,
  useParams,
} from "react-router-dom";
import axios from "axios";

const GameDetail = () => {
  let { id } = useParams();
  const [game, setGame] = useState(null);

  useEffect(() => {
    if (game === null) {
      axios
        .get(`https://backendexample.sanbersy.com/api/games/${id}`)
        .then((res) => {
          setGame(res.data);
        });
        console.log(game)
    }
  });
  return (
    <>
      {game !== null && (
        <div className="content">
          <h1>{game.title}</h1>
          <img src={game.image_url} className="imageDetail"></img>
          <h2>Genre: {game.genre}</h2>
          <h2>Platform: {game.platform}</h2>
          <h2>Release: {game.release}</h2>
        </div>
      )}
    </>
  );
};

export default GameDetail;
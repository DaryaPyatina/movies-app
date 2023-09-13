import { useEffect, useState } from "react";
import { MovieCard } from "../Movie-card/Movie-card";

import "./Movie-list-rated.css";
import { api } from "../../services";

export const MovieListRated = ({ tab }) => {
  const [cards, setCards] = useState([]);

  useEffect(() => {
    const fetchMoviesRated = async () => {
      const { data } = await api.get("/account/20383910/rated/movies");

      setCards(data.results);
    };
    fetchMoviesRated();
    return () => {
      setCards([]);
    };
  }, [tab]);

  return (
    <div className="list-rated">
      {cards.map((card) => {
        return <MovieCard key={card.id} data={card} />;
      })}
    </div>
  );
};

import axios from "axios";

const KEY =
  "eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI1M2UwMzZmMDE3NDhmYWNjODVjMTBkZWM2YTMxMzNhNiIsInN1YiI6IjY0ZjIwN2Q5NzdkMjNiMDBhZWJmOTk5ZiIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.C2bdlvgvmxdNE0wpB6xiJL944eHG7wIG45xZTAcrR68";

export const api = axios.create({
  baseURL: "https://api.themoviedb.org/3",
  headers: { Authorization: `Bearer ${KEY}` },
});

export const getMovies = async (input = "", page = 1) => {
  const { data } = await api.get(
    `/search/movie?query=${input || "a"}&page=${page}`
  );
  return data;
};

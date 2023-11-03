import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { fetchMovies } from "../redux/Actions";
import Loading from "./Loading";

const Card = () => {
  const dispatch = useDispatch();
  const { data: data } = useSelector((state) => state.movies);
  const { loading: loading, error: error } = useSelector((state) => state.loadingDanError);
  useEffect(() => {
    dispatch(fetchMovies());
  }, [dispatch]);

  if (loading) {
    return <Loading />;
  }

  if (error) {
    return <div>Error: {error.message}</div>;
  }

  return (
    <>
      {data.map((movie) => (
        <div className="col" key={movie.id}>
          <Link to={`/detail/${movie.id}`} className="card">
            <img src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`} className="card-img-top" alt={movie.title} />
            <div className="card-body mv-title d-flex  justify-content-center  align-items-center">
              <h5 className="card-title mv-body">{movie.title}</h5>
            </div>
          </Link>
        </div>
      ))}
    </>
  );
};

export default Card;

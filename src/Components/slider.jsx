import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { fetchMovies } from "../redux/Actions";
import Loading from "./Loading";

const Slider = () => {
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
      <div id="movieCarousel" className="carousel slide" data-bs-ride="carousel">
        <div className="carousel-indicators">
          {data.slice(0, 5).map((movie, index) => (
            <button key={movie.id} data-bs-target="#movieCarousel" data-bs-slide-to={index} className={index === 0 ? "active" : ""} aria-label={`Slide ${index + 1}`}></button>
          ))}
        </div>
        <div className="carousel-inner">
          {data.map((movie, index) => (
            <Link to={`/detail/${movie.id}`} key={movie.id} className={`carousel-item c-item p-0 carousel-item ${index === 0 ? "active" : ""}`} data-bs-interval="5000">
              <img src={`https://image.tmdb.org/t/p/original${movie.backdrop_path}`} className="d-block w-100 c-img" alt="..." />
              <div className="carousel-caption d-none d-md-flex flex-column justify-content-center c-content">
                <h1>{movie.title}</h1>
                <p className="">{movie.overview}</p>
                <button type="button" className="btn btn-danger">
                  Watch Trailer
                </button>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </>
  );
};

export default Slider;

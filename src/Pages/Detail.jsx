import React, { useEffect } from "react";
import { useParams } from "react-router-dom";
import Header from "../Components/header";
import { useDispatch, useSelector } from "react-redux";
import { getMovieDetails } from "../redux/Actions";
import Loading from "../Components/Loading";

const MovieDetail = () => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const { detail: data } = useSelector((state) => state.detail);
  const { loading: loading, error: error } = useSelector((state) => state.loadingDanError);

  useEffect(() => {
    dispatch(getMovieDetails(id));
  }, [dispatch, id]);

  if (loading) {
    return <Loading />;
  }

  if (error) {
    return <div>Error: {error.message}</div>;
  }

  return (
    <>
      <Header />
      <div>
        <div className={`carousel-item c-item p-0 carousel-item active`}>
          <img src={`https://image.tmdb.org/t/p/original${data?.backdrop_path}`} className="d-block w-100 c-img" alt="..." />
          <div className="carousel-caption d-none d-md-flex flex-column justify-content-center c-content">
            <h1>{data?.title}</h1>
            <p className="">{data?.overview}</p>
            <p>Genre : {data?.genres?.map((genre) => genre.name).join(", ")}</p>
            <p> Rating : {data?.vote_average}</p>
            <p> Release Date : {data?.release_date}</p>
            <button type="button" className="btn btn-danger">
              Watch Trailer
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default MovieDetail;

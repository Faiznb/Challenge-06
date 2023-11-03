import React, { useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import { getSearchResult } from "../redux/Actions";
import { useDispatch, useSelector } from "react-redux";
import Loading from "../Components/Loading";

const SearchResult = () => {
  const { query } = useParams();
  const dispatch = useDispatch();
  const { searchResult: results } = useSelector((state) => state.search);
  const { loading: loading, error: error } = useSelector((state) => state.loadingDanError);
  useEffect(() => {
    dispatch(getSearchResult(query));
  }, [dispatch, query]);

  if (loading) {
    return <Loading />;
  }

  if (error) {
    return <div>Error: {error.message}</div>;
  }

  return (
    <>
      <div className="d-flex justify-content-around  align-items-center mt-2">
        <h1 className="Hasil">Hasil Pencarian: {`${query}`}</h1>
        <Link to={"/"} className="btn btn-primary back">
          Kembali
        </Link>
      </div>
      <div className="container">
        <div className="row  row-cols-4">
          {results.map((movie) => (
            <div className="col">
              <Link to={`/detail/${movie.id}`} className="card" key={movie.id}>
                <div>
                  <img src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`} className="card-img-top" alt={movie.title} />
                  <div className="card-body mv-title d-flex  justify-content-center  align-items-center">
                    <h5 className="card-title mv-body">{movie.title}</h5>
                  </div>
                </div>
              </Link>
            </div>
          ))}
        </div>
      </div>
    </>
  );
};

export default SearchResult;

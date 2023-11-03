import React from "react";

const Loading = () => {
  return (
    <div className="container text-center loading d-flex justify-content-center align-items-center">
      <strong role="status" className="m-5">
        Loading...
      </strong>
      <div className="spinner-border" role="status">
        <span className="visually-hidden">Loading...</span>
      </div>
    </div>
  );
};

export default Loading;

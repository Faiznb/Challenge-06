import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getMe } from "../redux/Actions";

const User = () => {
  const dispatch = useDispatch();
  const { user: user } = useSelector((state) => state.auth);

  useEffect(() => {
    dispatch(getMe());
  }, [dispatch]);

  return <div className="p-3 text-danger fs-5">Welcome, {user}</div>;
};

export default User;

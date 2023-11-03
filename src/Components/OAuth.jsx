import React from "react";
import { useGoogleLogin } from "@react-oauth/google";
import { useNavigate } from "react-router-dom";
import { registerLoginWithGoogle } from "../redux/Actions";
import { useDispatch } from "react-redux";

function LoginOauth({ buttonText }) {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const loginWithGoogle = useGoogleLogin({
    onSuccess: (responseGoogle) => dispatch(registerLoginWithGoogle(responseGoogle.access_token, navigate)),
  });

  return (
    <button className="btn btn-primary" onClick={() => loginWithGoogle()}>
      {buttonText}
    </button>
  );
}

export default LoginOauth;

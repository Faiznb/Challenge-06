import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import LoginOauth from "../Components/OAuth";
import { useDispatch, useSelector } from "react-redux";
import { login } from "../redux/Actions";

const Login = () => {
  const dispatch = useDispatch();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { errorMessage: message } = useSelector((state) => state.auth);
  const navigate = useNavigate();

  const loginHandler = async (e) => {
    e.preventDefault();

    let data = JSON.stringify({
      email,
      password,
    });

    dispatch(login(data, navigate));
  };

  return (
    <div className="container" style={{ marginTop: "120px" }}>
      <div className="row justify-content-center">
        <div className="col-md-4">
          <div className="card border-0 rounded shadow-sm">
            <div className="card-body bg-dark text-light">
              <h4 className="fw-bold">HALAMAN LOGIN</h4>
              <hr />
              <form onSubmit={loginHandler}>
                <div className="mb-3">
                  <label className="form-label">ALAMAT EMAIL</label>
                  <input type="email" className="form-control" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="Masukkan Alamat Email" />
                </div>
                <div className="mb-3">
                  <label className="form-label">PASSWORD</label>
                  <input type="password" className="form-control" value={password} onChange={(e) => setPassword(e.target.value)} placeholder="Masukkan Password" />
                </div>
                {message.message && <div className="alert alert-danger">{message.message}</div>}
                <div className="d-grid gap-2">
                  <button type="submit" className="btn btn-primary">
                    LOGIN
                  </button>
                </div>
              </form>
              <p className="mt-3">
                Belum punya akun ?
                <Link to="/register" className="">
                  Klik Disini
                </Link>
                , untuk daftar
              </p>
              <div className="text-center">
                <LoginOauth buttonText="Login with Google" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;

import React, { useState } from "react";
import Swal from "sweetalert2";
import "./loginForm.css";
import { Navigate } from "react-router";
import { useNavigate } from "react-router";
async function loginUser(credentials) {
  return fetch("http://localhost:4000/auth/login", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(credentials),
  }).then((data) => data.json());
}

const LoginForm = ({ handleLogin }) => {
  const [identifier, setidentifier] = useState("");
  const [password, setPassword] = useState("");
  const [redirect, setRedirect] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await loginUser({ identifier, password });

      if ("token" in response) {
        Swal.fire({
          title:'Login Berhasil',
          icon:'success',
          timer:1000,
          showConfirmButton:false
        })
        console.log(response);
        localStorage.setItem("token", response.token);
        localStorage.setItem("user", JSON.stringify(response.user));

        setRedirect(true);
        // useNavigate('/');
        window.location.href = '/dashboard';
        // const navigate = useNavigate()
        // navigate('/')
        // <Navigate replace to="/" />;
        // Panggil fungsi handleLogin untuk menangani logika login di komponen induk
        // handleLogin();
      } else {
        console.log(response.message);
        Swal.fire({
          title:'Login Gagal',
          icon:'error',
          text:response.message,
          timer:2000,
          showConfirmButton:false
        })
      }
    } catch (error) {
      console.error("An error occurred during login:", error);
      // Tambahkan penanganan kesalahan sesuai kebutuhan
    }
  };

  const backgroundStyle = {
    position: "absolute",
    top: 0,
    left: 0,
    width: "100%",
    height: "100%",
    backgroundImage: `url('../bglogin.png')`,
    backgroundSize: "cover",
    filter: "blur(4px)",
  };
  const contentStyle = {
    position: "relative",
    minHeight: "100vh",
    display: "flex",
    // justifyContent: 'center',
    // alignItems: 'center',
    // textAlign: 'center',
    zIndex: 1,
  };

  if (redirect) {
    return <Navigate to ='/dashboard'/>;
  }
  return (
    <div>
      <div style={backgroundStyle}></div>
      <div className="Auth-form-container" style={contentStyle}>
        <form className="Auth-form" onSubmit={handleSubmit}>
          <div className="Auth-form-content">
            <h3 className="Auth-form-title">Login Sistem Peminjaman Ruang</h3>
            <div className="form-group mt-3">
              <label>Nama/NIM</label>
              <input
                type="text"
                name="identifier"
                onChange={(e) => setidentifier(e.target.value)}
                className="form-control mt-1"
                placeholder="Nama atau NIM"
              />
            </div>
            <div className="form-group mt-3">
              <label>Password</label>
              <input
              type ="password"
                name="password"
                placeholder="Password"
                onChange={(e) => setPassword(e.target.value)}
                className="form-control mt-1"
              />
            </div>
            <div className="d-grid d-flex gap-2 mt-3 mb-3 justify-content-center">
              <button type="submit" className="btn btn-primary w-50">
                Login
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};

export default LoginForm;

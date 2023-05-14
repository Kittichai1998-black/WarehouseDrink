import React, { useState, useEffect } from "react";
import { useNavigate } from 'react-router-dom';
import "../css/Authen.css";
import { useSelector, useDispatch } from "react-redux";
// import { useDispatch } from 'react-redux';
// import { setUserName } from "../store/actions"
import axios from "axios";
import Swal from "sweetalert2";

function Authentication() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [profileUser, setProfileUser] = useState();
  const [hidePass, setHidePass] = useState();

  const navigate = useNavigate();
  // const dispatch = useDispatch();
  async function login() {
    console.log(username, password);
    return await axios
      .post("http://localhost:3001/api/login", {
        username: username,
        password: password,
      })
      .then(function (response) {
        // debugger
        console.log(response);
        if (response.data.message !== "success") {
          return Swal.fire({
            title: "Error!",
            text: response.data.message,
            icon: "error",
            confirmButtonText: "OK",
          });
        }
        else {
          // dispatch(setUserName(response.data));
          // setProfileUser(response.data);
          localStorage.setItem("userName",response.data.result.Fullname)
          localStorage.setItem("isLoggedIn",true)
          navigate("/")
          // window.location.href = "/";
        }
      })
      .catch(function (error) {
        Swal.fire({
          title: "Error!",
          text: error,
          icon: "error",
          confirmButtonText: "OK",
        });
      });
  }

  const handleSubmit = async (event) => {
    event.preventDefault();
    const data = await login({
      username,
      password,
    });
  };

  return (
    <div className="Auth-form-container">
      <form className="Auth-form" onSubmit={handleSubmit}>
        <div className="Auth-form-content">
          <h3 className="Auth-form-title">WareHouseStockDrink</h3>
          <div className="form-group mt-1">
            <label style={{ textAlign: "left" }}>Username</label>
            <input
              type="username"
              className="form-control mt-1"
              placeholder="Username"
              onChange={(e) => setUsername(e.target.value)}
            />
          </div>
          <div className="form-group mt-3">
            <label>Password</label>
            <input
              type="password"
              className="form-control mt-1"
              placeholder="Password"
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
          <div className="d-grid gap-2 mt-3">
            {/* <a>
              <button type="button" className="Button-style">Login</button>
            </a> */}
            <button type="submit" className="Button-style">
              Login
            </button>
          </div>
          {/* <p className="text-center mt-2">
                  Forgot <a href="#">password?</a>
                </p> */}
        </div>
      </form>
    </div>
  );
}

export default Authentication;

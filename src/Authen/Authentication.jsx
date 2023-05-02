import React, { useState, useEffect } from "react";
import '../css/Authen.css'

function Authentication() {
  let [authMode, setAuthMode] = useState("signin")

  const changeAuthMode = () => {
    setAuthMode(authMode === "signin" ? "signup" : "signin")
  }

  return (
    <div className="Auth-form-container">
      <form className="Auth-form">
        <div className="Auth-form-content">
          <h3 className="Auth-form-title">WareHouseStockDrink</h3>
          <div className="form-group mt-1">
            <label style={{ textAlign: "left" }}>Username</label>
            <input
              type="email"
              className="form-control mt-1"
              placeholder="Username"
            />
          </div>
          <div className="form-group mt-3">
            <label>Password</label>
            <input
              type="password"
              className="form-control mt-1"
              placeholder="Password"
            />
          </div>
          <div className="d-grid gap-2 mt-3">
            <a href="/">
              <button type="button" className="Button-style">Login</button>
            </a>
            {/* <button type="submit" className="Button-style">
                    Login
                  </button> */}
          </div>
          {/* <p className="text-center mt-2">
                  Forgot <a href="#">password?</a>
                </p> */}
        </div>
      </form>
    </div>
  )
}

export default Authentication;
import React from "react";
// import { useSelector } from 'react-redux';

function Navbar() {
  // const fullname = useSelector(state => state.user.fullname);
  const userName = localStorage.getItem("userName")
  function Logout() {
    localStorage.clear();
  }
  return (
    <div>
      <nav className="navbar justify-content-between">
        <a className="navbar-logo" href="/">
          {/* <img src="/docs/4.0/assets/brand/bootstrap-solid.svg" width="30" height="30" className="d-inline-block align-top" alt=""> */}
          WareHouseStockDrink
        </a>
        <form className="form-inline">
          <span style={{paddingRight:"14px"}}>ผู้ใช้ : {userName}</span>
          <button className="btn btn-outline-danger my-2 my-sm-0" onClick={e => Logout()}>logout</button>
        </form>
      </nav>
    </div>
  );
}

export default Navbar;

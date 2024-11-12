import React, { useRef } from "react";
import { TieredMenu } from "primereact/tieredmenu";
import { Menubar } from "primereact/menubar";
import { useNavigate } from "react-router-dom";

function Navbar() {
  const navigate = useNavigate();
  const userName = localStorage.getItem("userName");

  function NevigateToStock() {
    navigate("/mainstore");
    localStorage.setItem("mainPage", "stock");
  }

  function NevigateToWarehouse() {
    navigate("/mainwarehouse");
    localStorage.setItem("mainPage", "warehouse");
  }

  function Logout() {
    // localStorage.removeItem("token");
    localStorage.clear();
    window.location.reload();
  }

  const menu = useRef(null);
  const items = [
    {
      label: "Products",
      icon: "pi pi-home",
      command: () => {
        NevigateToWarehouse();
      },
    },
    {
      label: "Stock",
      icon: "pi pi-box",
      command: () => {
        NevigateToStock();
      },
    },
  ];

  const itemsUser = [
    {
      label: <span style={{ paddingRight: "1rem" }}>{userName}</span>,
      icon: "pi pi-user",
    },
    {
      label: "Logout",
      icon: "pi pi-sign-out",
      command: (e) => {
        Logout();
      },
    },
  ];

  const start = (
    <a
      className="navbar-logo"
      style={{ color: "#95BDFF", paddingRight: "20px" }}
      href="/"
    >
      {/* <img src="/docs/4.0/assets/brand/bootstrap-solid.svg" width="30" height="30" className="d-inline-block align-top" alt=""> */}
      WareHouse
    </a>
  );
  const end = (
    <div className="flex align-items-center gap-2">
      <TieredMenu model={itemsUser} popup ref={menu} breakpoint="767px" />
      <i
        className="pi pi-user"
        style={{ fontSize: "1.5rem", color: "#708090" }}
        onClick={(e) => menu.current.toggle(e)}
      ></i>
    </div>
  );

  return (
    <div>
      <Menubar model={items} start={start} end={end} />
    </div>
  );
}

export default Navbar;

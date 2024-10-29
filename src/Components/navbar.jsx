import React, { useRef } from "react";
import { Button } from "primereact/button";
import { TieredMenu } from "primereact/tieredmenu";
import { Menubar } from "primereact/menubar";
import { InputText } from "primereact/inputtext";
import { Badge } from "primereact/badge";
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
    localStorage.clear();
    window.location.reload();
  }

  const menu = useRef(null);
  const items = [
    {
      label: "Warehouse",
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
    // <div>
    //   <nav className="navbar justify-content-between">
    //     <a className="navbar-logo" href="/">
    //       {/* <img src="/docs/4.0/assets/brand/bootstrap-solid.svg" width="30" height="30" className="d-inline-block align-top" alt=""> */}
    //       WareHouseStockDrink
    //     </a>
    //     <form className="nav-user">
    //       <span style={{ paddingRight: "1rem" }}>ผู้ใช้ : {userName}</span>
    //       <button
    //         className="btn btn-outline-danger my- my-sm-0"
    //         style={{ marginRight: "1rem" }}
    //         onClick={(e) => Logout()}
    //       >
    //         logout
    //       </button>
    //     </form>
    //     <div className="flex justify-content-end flex-wrap">
    //       <div class="flex align-items-center justify-content-center w-4rem h-4rem bg-primary font-bold border-round m-2">
    //         <TieredMenu model={items} popup ref={menu} breakpoint="767px" />
    //         <Button label="Show" onClick={(e) => menu.current.toggle(e)} />
    //       </div>
    //     </div>
    //   </nav>
    // </div>
  );
}

export default Navbar;

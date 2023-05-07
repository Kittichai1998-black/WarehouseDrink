import { useState } from "react";
import { Link } from "react-router-dom";
import Navbar from "../../Components/navbar";
import "../../css/home.css";
// import '../index.css/'
import WarehouseStock from "../../assets/imgs/Warehouse-1.png";
import ProductStock from "../../assets/imgs/ProductStock.png";

import OverViewIcon from "../../assets/icons/overview-icon.png";
import AddStockIcon from "../../assets/icons/addstock-icon.png";
import CheckStockIcon from "../../assets/icons/checkstock-icon.png";
import SettingIcon from "../../assets/icons/setting-icon.png";

function MainStore() {
  const [count, setCount] = useState(0);

  return (
    <div className="background-main3">
      <header>
        <section>
          <div className="contaier text-center">
            <div style={{ margin: "8%" }}>
              <div className="row">
                <div className="col-sm-4">
                  <div style={{margin:"38px"}}>
                    <h1
                      className="card-title"
                      style={{ color: "#FC4F00", fontSize: "50px" }}
                    >
                      Store Stock
                    </h1>
                    <p
                      style={{
                        backgroundColor: "#FC4F00",
                        borderRadius: "24px",
                        border: "2px solid #fff",
                        color: "#fff",
                        fontSize: "36px",
                      }}
                    >
                      Stock Status
                    </p>
                  </div>
                </div>
                <div className="col-sm-4">
                  <a style={{ textDecoration: "none" }}>
                    <div className="hover01">
                      <figure>
                        <div style={{ paddingLeft: "30px" }}>
                          <img src={ProductStock} className="img-store" />
                        </div>
                      </figure>
                    </div>
                  </a>
                </div>
                <div className="col-sm-4"></div>
              </div>
            </div>
          </div>
        </section>
      </header>

      <footer>
        <div className="tabmenu">
          <div className="row">
            <div className="col-sm-3 rowbox-items">
              <div className="border-items">
                <a
                  href="/overview"
                  className="highlight"
                  style={{ textDecoration: "none" }}
                >
                  <img src={OverViewIcon} className="img-menu" />
                </a>
              </div>
              {/* <h4 style={{ color: '#65647C', textDecoration: 'none' }}>Overview</h4> */}
            </div>
            <div className="col-sm-3 rowbox-items">
              <div className="border-items">
                <a href="/addstock" style={{ textDecoration: "none" }}>
                  <img src={AddStockIcon} className="img-menu" />
                  {/* <h4 style={{ color: '#65647C' }}>Add Stock</h4> */}
                </a>
              </div>
            </div>
            <div className="col-sm-3 rowbox-items">
              <div className="border-items">
                <a href="/checkstock" style={{ textDecoration: "none" }}>
                  <img src={CheckStockIcon} className="img-menu" />
                  {/* <h4 style={{ color: '#65647C' }}>Check Stock</h4> */}
                </a>
              </div>
            </div>
            <div className="col-sm-3 rowbox-items">
              <div className="border-items">
                <a href="/setting" style={{ textDecoration: "none" }}>
                  <img src={SettingIcon} className="img-menu" />
                  {/* <h4 style={{ color: '#65647C' }}>Setting</h4> */}
                </a>
              </div>
            </div>
          </div>
        </div>
      </footer>
      {/* <footer>
          <h6>
            &copy; 2023
          </h6>
        </footer> */}
    </div>
  );
}

export default MainStore;

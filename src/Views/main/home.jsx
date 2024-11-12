import { useState, useEffect} from "react";
import {useNavigate} from "react-router-dom";
import "../../css/home.css";
import WarehouseStock from "../../assets/imgs/Warehouse-1.png";
import ProductStock from "../../assets/imgs/ProductStock.png";
import OverViewIcon from "../../assets/icons/overview-icon.png";
import AddStockIcon from "../../assets/icons/addstock-icon.png";
import CheckStockIcon from "../../assets/icons/checkstock-icon.png";
import SettingIcon from "../../assets/icons/setting-icon.png";

function Home() {
  const [countProduct, setCountProduct] = useState([]);
  const navigate = useNavigate();

  function NevigateToOverview() {
    navigate('/overview');
    // localStorage.setItem("mainPage","warehouse");
  }

  function NevigateToStock() {
    navigate('/addstock');
    // localStorage.setItem("mainPage","stock");
  }

  function NevigateToCheckStock() {
    navigate('/checkstock');
    // localStorage.setItem("mainPage","stock");
  }

  function NevigateToWarehouse() {
    navigate('/mainwarehouse');
    // localStorage.setItem("mainPage","warehouse");
  }

  function NevigateToSetting() {
    navigate('/setting');
  }

  useEffect(() => {
  }, []);

  return (
    <div className="background-main1">
      <header>
          <section>
            <div className="contaier text-center">
              <div className="row">
                <div className="col-sm-6">
                  <div className="header-text">
                    {/* <h1 className="card-title" style={{ color: "#fff" }}>
                      Warehouse
                    </h1> */}
                    <p
                      style={{
                        backgroundColor: "#379237",
                        borderRadius: "24px",
                        border:"2px solid #fff",
                        color: "#fff",
                        fontSize: "30px",
                      }}
                    >
                      Warehouse
                    </p>
                    <a style={{ textDecoration: "none" }} onClick={NevigateToWarehouse}>
                      <div className="hover01">
                        <figure>
                          <div>
                            <img
                              src={WarehouseStock}
                              className="img-warehouse"
                            />
                          </div>
                        </figure>
                      </div>
                    </a>
                  </div>
                </div>
                <div className="col-sm-6">
                  <div className="header-text">
                    {/* <h1 className="card-title color-stock">
                      Store Stock
                    </h1> */}
                    <p
                      style={{
                        backgroundColor: "#FC4F00",
                        borderRadius: "24px",
                        border:"2px solid #fff",
                        color: "#fff",
                        fontSize: "30px",
                      }}
                    >
                      Store Stock
                    </p>

                    <a style={{ textDecoration: "none" }} onClick={NevigateToStock}>
                      <div className="hover01">
                        <figure>
                          <img src={ProductStock} className="img-store" />
                        </figure>
                      </div>
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </section>
      </header>

      <footer>
        <div className="tabmenu-main">
          <div className="row">
            <div className="col-sm-3 rowbox-items">
              <div className="border-items">
                <a
                
                  className="highlight"
                  style={{ textDecoration: "none" }}
                  onClick={NevigateToOverview}
                >
                  <img src={OverViewIcon} className="img-menu" />
                </a>
              </div>
              {/* <h4 style={{ color: '#65647C', textDecoration: 'none' }}>Overview</h4> */}
            </div>
            <div className="col-sm-3 rowbox-items">
              <div className="border-items">
                <a style={{ textDecoration: "none" }} onClick={NevigateToStock}>
                  <img src={AddStockIcon} className="img-menu" />
                  {/* <h4 style={{ color: '#65647C' }}>Add Stock</h4> */}
                </a>
              </div>
            </div>
            <div className="col-sm-3 rowbox-items">
              <div className="border-items">
                <a style={{ textDecoration: "none" }} onClick={NevigateToCheckStock}>
                  <img src={CheckStockIcon} className="img-menu" />
                  {/* <h4 style={{ color: '#65647C' }}>Check Stock</h4> */}
                </a>
              </div>
            </div>
            <div className="col-sm-3 rowbox-items">
              <div className="border-items">
                <a style={{ textDecoration: "none" }} onClick={NevigateToSetting}>
                  <img src={SettingIcon} className="img-menu" />
                  {/* <h4 style={{ color: '#65647C' }}>Setting</h4> */}
                </a>
              </div>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}

export default Home;

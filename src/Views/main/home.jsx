import { useState, useEffect} from "react";
import { Link } from "react-router-dom";
import Navbar from "../../Components/navbar";
import { httpClient } from "../../axios/HttpClient.jsx"
import "../../css/home.css";
// import '../index.css/'
import WarehouseStock from "../../assets/imgs/Warehouse-1.png";
import ProductStock from "../../assets/imgs/ProductStock.png";

import OverViewIcon from "../../assets/icons/overview-disable-icon.png";
import AddStockIcon from "../../assets/icons/addstock-disable-icon.png";
import CheckStockIcon from "../../assets/icons/checkstock-disable-icon.png";
import SettingIcon from "../../assets/icons/setting-disable-icon.png";

function Home() {
  const [count, setCount] = useState(0);
  const [countProduct, setCountProduct] = useState([]);

  const getProduct = async () => {
    const response = await httpClient.get("/api/stock");
    const dataArray = Object.values(response.data.result); // แปลงข้อมูลเป็นอาร์เรย์
    setCountProduct(response.data.result);
  };

  const dataArray = Object.values(countProduct); // แปลงข้อมูลเป็นอาร์เรย์
  const itemsWithLowStock = dataArray.filter((item) => item.UnitsInStock < 10);

  useEffect(() => {
    getProduct();
  }, []);

  return (
    <div className="background-main1">
      <header>
          <section>
            <div className="contaier text-center">
              <div className="row">
                <div className="col-sm-6">
                  <div className="header-text">
                    <h1 className="card-title" style={{ color: "#fff" }}>
                      Warehouse Center
                    </h1>
                    <p
                      style={{
                        backgroundColor: "#379237",
                        borderRadius: "24px",
                        border:"2px solid #fff",
                        color: "#fff",
                        fontSize: "30px",
                      }}
                    >
                      Stock Status
                    </p>
                    <a href="/mainwarehouse" style={{ textDecoration: "none" }} onClick={() => localStorage.setItem("mainPage","warehouse")}>
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
                    <h1 className="card-title color-stock">
                      Store Stock
                    </h1>
                    <p
                      style={{
                        backgroundColor: "#FC4F00",
                        borderRadius: "24px",
                        border:"2px solid #fff",
                        color: "#fff",
                        fontSize: "30px",
                      }}
                    >
                      Need Order {itemsWithLowStock.length} items
                    </p>

                    <a href="/mainstore" style={{ textDecoration: "none" }} onClick={() => localStorage.setItem("mainPage","stock")}>
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
        <div className="tabmenu">
          <div className="row">
            <div className="col-sm-3 rowbox-items">
              <div className="border-items">
                <img
                  src={OverViewIcon}
                  className="img-menu"
                />
              </div>
              {/* <h4 style={{ color: '#65647C', textDecoration: 'none' }}>Overview</h4> */}
            </div>
            <div className="col-sm-3 rowbox-items">
              <div className="border-items">
                <img
                  src={AddStockIcon}
                  className="img-menu"
                />
              </div>
            </div>
            <div className="col-sm-3 rowbox-items">
              <div className="border-items">
                <img
                  src={CheckStockIcon}
                  className="img-menu"
                />
              </div>
            </div>
            <div className="col-sm-3 rowbox-items">
              <div className="border-items">
                <img
                  src={SettingIcon}
                  className="img-menu"
                />
              </div>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}

export default Home;

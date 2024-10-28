import { useState, useEffect} from "react";
import { httpClient } from "../../axios/HttpClient.jsx"
import "../../css/home.css";
// import '../index.css/'
import WarehouseStock from "../../assets/imgs/Warehouse-1.png";
import ProductStock from "../../assets/imgs/ProductStock.png";
// import OverViewIcon from "../../assets/icons/overview-disable-icon.png";
// import AddStockIcon from "../../assets/icons/addstock-disable-icon.png";
// import CheckStockIcon from "../../assets/icons/checkstock-disable-icon.png";
// import SettingIcon from "../../assets/icons/setting-disable-icon.png";
import OverViewIcon from "../../assets/icons/overview-icon.png";
import AddStockIcon from "../../assets/icons/addstock-icon.png";
import CheckStockIcon from "../../assets/icons/checkstock-icon.png";
import SettingIcon from "../../assets/icons/setting-icon.png";

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

      {/* <footer>
        <div className="tabmenu-main">
          <div className="row">
            <div className="col-sm-3 rowbox-items">
              <div className="border-items">
                <img
                  src={OverViewIcon}
                  className="img-menu"
                />
              </div> 
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
      </footer> */}
      <footer>
        <div className="tabmenu-main">
          <div className="row">
            <div className="col-sm-3 rowbox-items">
              <div className="border-items">
                <a
                  href="/mainwarehouse"
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
                <a href="/mainstore" style={{ textDecoration: "none" }}>
                  <img src={AddStockIcon} className="img-menu" />
                  {/* <h4 style={{ color: '#65647C' }}>Add Stock</h4> */}
                </a>
              </div>
            </div>
            <div className="col-sm-3 rowbox-items">
              <div className="border-items">
                <a href="/mainstore" style={{ textDecoration: "none" }}>
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
    </div>
  );
}

export default Home;

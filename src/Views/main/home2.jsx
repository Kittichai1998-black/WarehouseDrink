import { useState, useEffect } from "react";
import { httpClient } from "../../axios/HttpClient.jsx";
import { useNavigate } from "react-router-dom";
import { Button } from "primereact/button";
import { Carousel } from "primereact/carousel";
import { Tag } from "primereact/tag";
import { TabMenu } from "primereact/tabmenu";
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

import "primereact/resources/themes/lara-light-indigo/theme.css";
import "primereact/resources/primereact.min.css";
import "primeicons/primeicons.css";

function Home() {
  const [count, setCount] = useState(0);
  const [countProduct, setCountProduct] = useState([]);
  const navigate = useNavigate();

  // const getProduct = async () => {
  //   const response = await httpClient.get("/api/stock");
  //   const dataArray = Object.values(response.data.result); // แปลงข้อมูลเป็นอาร์เรย์
  //   setCountProduct(response.data.result);
  // };

  function NevigateToOverview() {
    navigate("/overview");
    // localStorage.setItem("mainPage","warehouse");
  }

  function NevigateToStock() {
    navigate("/mainstore");
    localStorage.setItem("mainPage", "stock");
  }

  function NevigateToCheckStock() {
    navigate("/checkstock");
    localStorage.setItem("mainPage", "stock");
  }

  function NevigateToWarehouse() {
    navigate("/mainwarehouse");
    localStorage.setItem("mainPage", "warehouse");
  }

  function NevigateToSetting() {
    navigate("/setting");
  }

  const listImage = [
    { image: WarehouseStock, url: NevigateToWarehouse },
    { image: ProductStock, url: NevigateToStock },
  ];

  const getStatusWh = (product) => {
    switch (product.inventoryStatus) {
      case "INSTOCK":
        return "success";

      case "LOWSTOCK":
        return "warning";

      case "OUTOFSTOCK":
        return "danger";

      default:
        return null;
    }
  };

  const typeWarehouseTemplate = (listImage) => {
    // debugger;
    return (
      <div>
        <div className="surface-border border-round m-1 text-center py-5 px-3">
          <div className="mb-3 pt-5">
            <div className="hover01">
              <figure>
                <img
                  src={`${listImage.image}`}
                  className="img-warehouse"
                  onClick={listImage.url}
                />
              </figure>
            </div>
          </div>
          {/* <div>
          <Tag
            value={product.inventoryStatus}
            severity={getSeverity(product)}
          ></Tag>
        </div> */}
        </div>
      </div>
    );
  };

  const itemsTabsMenu = [
    {
      label: "Overview",
      icon: "pi pi-home",
      command: () => {
        NevigateToOverview();
      },
    },
    {
      label: "Add Stock",
      icon: "pi pi-cart-plus",
      command: () => {
        NevigateToStock();
      },
    },
    {
      label: "Check Stock",
      icon: "pi pi-check-circle",
      command: () => {
        NevigateToCheckStock();
      },
    },
    {
      label: "Setting",
      icon: "pi pi-sliders-h",
      command: () => {
        NevigateToSetting();
      },
    },
  ];

  return (
    <div className="background-main1">
      <div className="flex justify-content-center">
        <Carousel
          value={listImage}
          itemTemplate={typeWarehouseTemplate}
          page={0}
        />
      </div>

      <div className="flex md:justify-content-start justify-content-center flex-wrap">
        <div style={{ position: "fixed", bottom: 0, width: "100%" }}>
          <TabMenu model={itemsTabsMenu} />
        </div>
      </div>
    </div>
  );
}

export default Home;

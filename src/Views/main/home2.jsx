import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Carousel } from "primereact/carousel";
import { TabMenu } from "primereact/tabmenu";
import "../../css/home.css";

import WarehouseStock from "../../assets/imgs/Warehouse-1.png";
import ProductStock from "../../assets/imgs/ProductStock.png";

import "primereact/resources/themes/lara-light-indigo/theme.css";
import "primereact/resources/primereact.min.css";
import "primeicons/primeicons.css";

function Home() {
  const navigate = useNavigate();

  function NevigateToOverview() {
    navigate("/overview");
    // localStorage.setItem("mainPage","warehouse");
  }

  function NevigateToStock() {
    navigate("/addstock");
    // localStorage.setItem("mainPage", "stock");
  }

  function NevigateToCheckStock() {
    navigate("/checkstock");
    // localStorage.setItem("mainPage", "stock");
  }

  function NevigateToWarehouse() {
    navigate("/mainwarehouse");
    // localStorage.setItem("mainPage", "warehouse");
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

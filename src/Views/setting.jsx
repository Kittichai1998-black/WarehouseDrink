import React, { useState } from "react";
import { Tree } from "primereact/tree";
import "primereact/resources/primereact.min.css";
import "primereact/resources/themes/saga-blue/theme.css";
import "primeicons/primeicons.css";
import "primeflex/primeflex.css";
import Users from "./form/settingview/setting-users";
import Role from "./form/settingview/setting-role";
import Products from "./form/settingview/setting-products";
import Warehouse from "./form/settingview/setting-warehouse";
import Category from "./form/settingview/setting-category";

function Setting2() {
  const [activePage, setActivePage] = useState("overview");

  const nodes = [
    { key: "users", label: "Users", icon: "pi pi-user-edit" },
    { key: "roles", label: "Roles", icon: "pi pi-verified" },
    { key: "products", label: "Products", icon: "pi pi-shopping-cart" },
    { key: "category", label: "Category", icon: "pi pi-sitemap" },
    { key: "warehouse", label: "Warehouse", icon: "pi pi-home" },
  ];

  const handleMenuSelect = (event) => {
    setActivePage(event.node.key);
  };

  const renderActivePage = () => {
    switch (activePage) {
      case "users":
        return <Users />;
      case "roles":
        return <Role />;
      case "products":
        return <Products />;
      case "warehouse":
        return <Warehouse />;
      case "category":
        return <Category />;
      default:
        return <Users />;
    }
  };

  return (
    <div className="grid">
      <div className="sm:col-12 md:col-2 lg:col-2 xl:col-2">
        <div className="mx-3 mt-3 text-center p-3 border-round-sm bg-white font-bold">
          <SidebarMenu nodes={nodes} onSelect={handleMenuSelect} />
        </div>
      </div>
      <div className="sm:col-12 md:col-10 lg:col-10 xl:col-10">
        <div className="mx-3 mt-3 text-center p-3 border-round-sm bg-white font-bold">
          <div className="flex align-items-center border-bottom-1 surface-border surface-overlay w-full">
            <p className="w-2 text-left font-bold text-blue-300 mr-3 text-4xl w-10">
              Setting
            </p>
          </div>
          {renderActivePage()}
        </div>
      </div>
    </div>
  );
}

function SidebarMenu({ nodes, onSelect }) {
  return (
    <Tree
      value={nodes}
      selectionMode="single"
      onSelect={onSelect}
      className="p-m-2"
    />
  );
}

export default Setting2;

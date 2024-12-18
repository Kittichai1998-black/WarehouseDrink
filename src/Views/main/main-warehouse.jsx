import React, { useState } from "react";
import { Tree } from "primereact/tree";
import "primereact/resources/primereact.min.css";
import "primereact/resources/themes/saga-blue/theme.css";
import "primeicons/primeicons.css";
import "primeflex/primeflex.css";
import Receive from "../Receive";

function MainWarehouse2() {
  const [activePage, setActivePage] = useState("warehouse");

  const nodes = [
    { key: "receive", label: "Receive", icon: "pi pi-table" },
  ];

  const handleMenuSelect = (event) => {
    setActivePage(event.node.key);
  };

  const renderActivePage = () => {
    switch (activePage) {
      case "receive":
        return <Receive />;
      default:
        return <Receive />;
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
              Receive
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

export default MainWarehouse2;

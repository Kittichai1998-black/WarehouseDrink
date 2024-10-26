import React, { useState } from "react";
import { Tree } from "primereact/tree";
import "primereact/resources/primereact.min.css";
import "primereact/resources/themes/saga-blue/theme.css";
import "primeicons/primeicons.css";
import "primeflex/primeflex.css";
import { Card } from "primereact/card";
import Overview from "../overview";
import AddStock from "../addstock";
import CheckStock from "../checkstock";

function MainWarehouse2() {
  const [activePage, setActivePage] = useState("overview"); // สร้าง state สำหรับเพจที่แสดง

  const nodes = [
    { key: "overview", label: "Overview", icon: "pi pi-table" },
    { key: "addstock", label: "Add Stock", icon: "pi pi-file-edit" },
    { key: "checkstock", label: "Check Stock", icon: "pi pi-check-square" },
  ];

  // ฟังก์ชันจัดการเมื่อเลือกเมนู
  const handleMenuSelect = (event) => {
    setActivePage(event.node.key); // อัปเดต activePage ตามเมนูที่เลือก
  };

  // ฟังก์ชันแสดงเนื้อหาตาม activePage
  const renderActivePage = () => {
    switch (activePage) {
      case "overview":
        return <Overview />;
      case "addstock":
        return <AddStock />;
      case "checkstock":
        return <CheckStock />;
      default:
        return <Overview />;
    }
  };

  return (
    <div class="grid">
      <div class="sm:col-12 md:col-2 lg:col-2 xl:col-2">
        <div class="mx-3 mt-3 text-center p-3 border-round-sm bg-white font-bold">
          <SidebarMenu nodes={nodes} onSelect={handleMenuSelect} />
        </div>
      </div>
      <div class="sm:col-12 md:col-10 lg:col-10 xl:col-10">
        <div class="mx-3 mt-3 text-center p-3 border-round-sm bg-white font-bold">
          <div class="flex align-items-center border-bottom-1 surface-border surface-overlay w-full">
            <p class="w-2 text-left font-bold text-blue-300 mr-3 text-4xl w-10">Warehouse</p>
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
      onSelect={onSelect} // เรียกฟังก์ชันเมื่อมีการเลือกเมนู
      className="p-m-2"
    />
  );
}

export default MainWarehouse2;

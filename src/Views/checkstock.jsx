import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { DataTable } from "primereact/datatable";
import { FilterMatchMode, FilterOperator } from "primereact/api";
import { Column } from "primereact/column";
import { Button } from "primereact/button";
import { Dialog } from "primereact/dialog";
import { Dropdown } from "primereact/dropdown";
import { Tag } from "primereact/tag";
import { InputText } from "primereact/inputtext";

import { httpClient } from "../axios/HttpClient.jsx";
import FormEditStock from "./form/edit-stock.jsx";
import dayjs from "dayjs";

import "../css/table.css";

// import TopBarOverview from "../assets/imgs/topbar/topbar-overview.png";

export default function CheckStock() {
  const navigate = useNavigate();
  const mainPage = localStorage.getItem("mainPage");
  const [product, setProduct] = useState([]);
  const [sortedProducts, setSortedProducts] = useState([]);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [selectedTopping, setSelectedTopping] = useState(null);
  const [globalFilterValue, setGlobalFilterValue] = useState("");
  const [countItem, setCountItem] = useState(0);
  const [Item, setItem] = useState("");
  const [visible, setVisible] = useState(false);
  const [editForm, setEditForm] = useState(false);
  const [metaKey, setMetaKey] = useState(true);
  const [selectedStatus, setSelectedStatus] = useState("instock");
  const [sortOption, setSortOption] = useState("");
  const [filters, setFilters] = useState({
    global: { value: null, matchMode: FilterMatchMode.CONTAINS },
  });

  const getProduct = async () => {
    const response = await httpClient.get("/api/products");
    setProduct(response.data.result);
    setSortedProducts(response.data.result);
    // console.log(response.data.result);
  };

  const products = Object.values(product).map((item) => ({
    productId: item.productId,
    productName: item.productName,
    categoryId: item.categoryId,
    stockInWarehouse: item.stockInWarehouse,
    stockInStore: item.stockInStore,
    description: item.description,
    reorderPoint: item.reorderPoint,
    expirationDate: item.expirationDate,
    reserved: item.reserved,
  }));
  

  const rowClass = (data) => {
    return {
      "bg-red-400": data.UnitsInStock < 10,
    };
  };

  const onGlobalFilterChange = (event) => {
    const value = event.target.value;
    let _filters = { ...filters };

    _filters["global"].value = value;
    setFilters(_filters);
  };

  const statusStock = [
    { label: "In Stock", value: "instock" },
    { label: "Low Stock", value: "lowstock" },
    { label: "Out Of Stock", value: "outofstock" },
  ];

  const sortProducts = (option) => {
    let sorted = [...products];
    switch (option) {
      case "lowstock":
        sorted = sorted.filter(product => product.stockInStore <= product.reorderPoint);
        break;
      case "outofstock":
        sorted = sorted.filter(product => product.stockInStore === 0);
        break;
      case "all":
      default:
        sorted = products; // แสดงทั้งหมด
        break;
    }
    setSortedProducts(sorted);
  };

  // ฟังก์ชันเรียกเมื่อเลือกค่าใน Dropdown
  const onSortChange = (e) => {
    setSortOption(e.value);
    sortProducts(e.value);
  };

  const renderHeader = () => {
    const value = filters["global"] ? filters["global"].value : "";

    return (
      <div className="flex justify-content-between">
        <span className="p-input-icon-left">
          <i className="pi pi-search" />
          <InputText
            type="search"
            value={value || ""}
            onChange={(e) => onGlobalFilterChange(e)}
            placeholder="Search"
          />
        </span>
      </div>
    );
  };

  const formatDate = (date) => {
    return dayjs(date).format("DD-MM-YYYY");
  };

  const statusBodyTemplate = (product) => {
    if (product.stockInStore <= product.reorderPoint) {
      return <Tag value="lowstock" severity={getSeverity("lowstock")}></Tag>;
    }
    if (product.stockInStore == 0) {
      return (
        <Tag value="outofstock" severity={getSeverity("outofstock")}></Tag>
      );
    } else {
      return <Tag value="instock" severity={getSeverity("instock")}></Tag>;
    }
  };

  const getSeverity = (product) => {
    switch (product.status) {
      case "instock":
        return "success";

      case "lowstock":
        return "warning";

      case "outofstock":
        return "danger";

      default:
        return null;
    }
  };

  const convertlabelCategory = (item) => {
    switch (item.categoryId) {
      case 1:
        return "วัตถุดิบ";

      case 2:
        return "บรรจุภัณฑ์";

      case 3:
        return "ท็อปปิ้ง";

      default:
        return null;
    }
  };

  const header = renderHeader();

  useEffect(() => {
    getProduct();
    debugger
  }, []);

  return (
    <div className="layout-page">
      {/* <div className="align-items-left">
            <Button
              label="Back"
              icon="pi pi-angle-left"
              severity="info"
              size="small"
              onClick={() => navigate("/mainwarehouse")}
            />
          </div> */}
      <div className="row justify-content-center gap-4">
        <div className="flex justify-content-start">
          <p className="pr-4">สถานะ Stock :</p>
          <Dropdown
                value={sortOption} 
                options={statusStock} 
                onChange={onSortChange} 
                placeholder="Select Stock Status" 
          />
        </div>
        <div className="col-sm-12">
          <DataTable
            header={header}
            filters={filters}
            onFilter={(e) => setFilters(e.filters)}
            value={products}
            // sortOrder={sortOrder}
            showGridlines
            stripedRows
            sortField="ProductID"
            scrollable
            scrollHeight="auto"
            size="small"
            rowClassName={rowClass}
            selection={selectedProduct}
            onSelectionChange={(e) => setSelectedProduct(e.value)}
            selectionMode="single"
            dataKey="ProductID"
            metaKeySelection={metaKey}
            rowHover
            paginator
            rows={5}
            // rowsPerPageOptions={[5, 10, 25]}
            // tableStyle={{
            //   minWidth: "50rem",
            //   minHeight: 400,
            // }}
            paginatorTemplate="RowsPerPageDropdown FirstPageLink PrevPageLink CurrentPageReport NextPageLink LastPageLink"
            currentPageReportTemplate="{first} to {last} of {totalRecords}"
          >
            <Column
              header="No."
              headerStyle={{ width: "3%" }}
              body={(data, options) => options.rowIndex + 1}
            ></Column>
            <Column
              header="Status"
              body={statusBodyTemplate}
              headerStyle={{ width: "5%" }}
            ></Column>
            <Column
              field="productId"
              header="ProductID"
              sortable
              style={{ width: "20%" }}
            ></Column>
            <Column
              field="productName"
              header="Ingredient"
              sortable
              style={{ width: "30%" }}
            ></Column>
            <Column
              field="description"
              header="Description"
              sortable
              style={{ width: "30%" }}
            ></Column>
            <Column
              field="categoryId"
              header="Category"
              sortable
              body={(data, options) => convertlabelCategory(data)}
              style={{ width: "30%" }}
            ></Column>
            <Column
              field="stockInStore"
              header="StockInStore"
              sortable
              style={{ width: "25%" }}
            ></Column>
            <Column
              field="reorderPoint"
              header="ReorderPoint"
              sortable
              style={{ width: "20%" }}
            ></Column>
            <Column
              field="expirationDate"
              header="ExpirationDate"
              sortable
              body={(data, options) => formatDate(data.expirationDate)}
              style={{ width: "25%" }}
            ></Column>
            <Column
              field="lastUpdated"
              header="LastUpdate"
              sortable
              body={(data, options) => formatDate(data.lastUpdated)}
              style={{ width: "25%" }}
            ></Column>
            {/* <Column
              headerStyle={{ width: "4rem" }}
              body={(data) => actionEdit(data)}
            ></Column> */}
          </DataTable>
        </div>
      </div>
    </div>
  );
}

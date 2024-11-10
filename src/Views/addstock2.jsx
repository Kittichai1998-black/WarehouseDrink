import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { DataTable } from "primereact/datatable";
import { FilterMatchMode, FilterOperator } from "primereact/api";
import { Column } from "primereact/column";
import { Button } from "primereact/button";
import { Dialog } from "primereact/dialog";
import { InputText } from "primereact/inputtext";

import { httpClient } from "../axios/HttpClient.jsx";
import IssueProductForm from "./form/issue-product.jsx";
import dayjs from "dayjs";

import "../css/table.css";

// import TopBarOverview from "../assets/imgs/topbar/topbar-overview.png";

export default function AddStock() {
  const navigate = useNavigate();
  const mainPage = localStorage.getItem("mainPage");
  const [product, setProduct] = useState([]);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [selectedTopping, setSelectedTopping] = useState(null);
  const [globalFilterValue, setGlobalFilterValue] = useState("");
  const [countItem, setCountItem] = useState(0);
  const [Item, setItem] = useState("");
  const [visible, setVisible] = useState(false);
  const [editForm, setEditForm] = useState(false);
  const [metaKey, setMetaKey] = useState(true);
  const [filters, setFilters] = useState({
    global: { value: null, matchMode: FilterMatchMode.CONTAINS },
  });

  const onGlobalFilterChange = (event) => {
    const value = event.target.value;
    let _filters = { ...filters };

    _filters["global"].value = value;
    setFilters(_filters);
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

  function labelItemName(data) {
    setVisible(true);
    setEditForm(true);
    setItem(data);
  }

  const formatDate = (date) => {
    return dayjs(date).format("DD-MM-YYYY");
  };

  // function actionAdd() {
  //   setEditForm(false);
  //   setVisible(true);
  // }

  const actionEdit = (data) => {
    return (
      <Button
        icon="pi pi-plus"
        severity="primary"
        aria-label="Add"
        size="small"
        onClick={() => labelItemName(data)}
      />
    );
  };

  const handleToggle = (status) => {
    setVisible(status); //ปิด - เปิด dialog
  };

  const header = renderHeader();

  useEffect(() => {
    const getProduct = async () => {
      try {
        const response = await httpClient.get("/api/productController/product");
        const products = response.data.result || response.data;
        const formattedProduct = products.filter(
          (prod) => prod.isActive === "A"
        );
        setProduct(formattedProduct);
      } catch (error) {
        console.error("Error fetching products:", error);
      }
    };

    getProduct();
  }, []);

  return (
    <div className="layout-page">
      {/* <div className="pb-3 flex justify-content-start">
        <Button
          label="Add Stock"
          icon="pi pi-plus"
          severity="info"
          raised
          onClick={actionAdd}
        />
      </div> */}
      <div className="row justify-content-center gap-4">
        <div className="card col-sm-12">
          <p className="w-2 text-left font-bold text-blue-300 mr-3 text-4xl w-10">
            Add Stock
          </p>
          <DataTable
            header={header}
            filters={filters}
            onFilter={(e) => setFilters(e.filters)}
            value={product}
            showGridlines
            stripedRows
            sortField="ProductID"
            scrollable
            scrollHeight="auto"
            size="small"
            selection={selectedProduct}
            // onSelectionChange={(e) => setSelectedProduct(e.value)}
            selectionMode="single"
            // dataKey="ProductID"
            // metaKeySelection={metaKey}
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
              headerStyle={{ width: "4rem" }}
              body={(data) => actionEdit(data)}
            ></Column>
            <Column
              field="productName"
              header="ProductName"
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
              field="stockInStore"
              header="StockInStore"
              sortable
              style={{ width: "25%" }}
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
          </DataTable>
        </div>
      </div>
      <Dialog
        header="Add Stock"
        visible={visible}
        onHide={() => setVisible(false)}
        style={{ width: "25vw" }}
        breakpoints={{ "960px": "75vw", "641px": "100vw" }}
        // footer={footerContent}
      >
        <div>
          <IssueProductForm onToggle={handleToggle} items={Item} />
        </div>
      </Dialog>
    </div>
  );
}

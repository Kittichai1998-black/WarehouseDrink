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
// import FormEditStock from "./form/edit-stock.jsx";
import dayjs from "dayjs";

import "../css/table.css";

// import TopBarOverview from "../assets/imgs/topbar/topbar-overview.png";

export default function CheckStock() {
  const [product, setProduct] = useState([]);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [sortOption, setSortOption] = useState("");
  const [filters, setFilters] = useState({
    global: { value: null, matchMode: FilterMatchMode.CONTAINS },
  });

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
    { label: "All", value: "all" },
  ];

  const onSortChange = (e) => {
    // debugger
    setSortOption(e.value);
    // sortProducts(e.value);
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

  const actionEdit = (data) => {
    return (
      <div className="flex gap-1">
        <Button
          icon="pi pi-list"
          severity="info"
          aria-label="History"
          size="small"
          // onClick={() => labelItemName(data)}
        />
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
    } if (product.stockInStore >= product.reorderPoint) {
      return <Tag value="instock" severity={getSeverity("instock")}></Tag>;
    }
  };

  const getSeverity = (product) => {
    switch (product) {
      case "instock":
        return "primary";

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
    const getProduct = async () => {
      try {
        const response = await httpClient.get("/api/productController/product/"+ sortOption);
        const products = response.data.result || response.data;
        setProduct(products);
      } catch (error) {
        console.error("Error fetching products:", error);
      }
    };

    getProduct();
  }, [sortOption]);

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
        <div className="card col-sm-12">
          <p className="w-2 text-left font-bold text-blue-300 mr-3 text-4xl w-10">
            Check Stock
          </p>
          {/* <div className="flex justify-content-start"> */}
          <div className="p-inputgroup w-full md:w-20rem">
            <p className="pr-4">สถานะ Stock :</p>
            <Dropdown
              value={sortOption}
              options={statusStock}
              onChange={onSortChange}
              placeholder="Select Stock Status"
            />
          </div>
          <div className="pt-4">
            <DataTable
              header={header}
              filters={filters}
              onFilter={(e) => setFilters(e.filters)}
              value={product}
              // sortOrder={sortOrder}
              showGridlines
              stripedRows
              sortField="ProductID"
              scrollable
              scrollHeight="auto"
              size="small"
              // rowClassName={rowClass}
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
                header="Status"
                body={statusBodyTemplate}
                headerStyle={{ width: "5%" }}
              ></Column>
              {/* <Column
                field="productId"
                header="ProductID"
                sortable
                style={{ width: "20%" }}
              ></Column> */}
                 <Column
              headerStyle={{ width: "10rem" }}
              body={(data) => actionEdit(data)}
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
    </div>
  );
}

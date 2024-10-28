import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { DataTable } from "primereact/datatable";
import { FilterMatchMode, FilterOperator } from "primereact/api";
import { Column } from "primereact/column";
import { Button } from "primereact/button";
import { Dialog } from "primereact/dialog";
import { InputText } from "primereact/inputtext";

import { httpClient } from "../axios/HttpClient.jsx";
import FormAddProducts from "./form/add-products.jsx";
import FormEditProducts from "./form/edit-products.jsx";
import dayjs from "dayjs";

import "../css/table.css";

// import TopBarOverview from "../assets/imgs/topbar/topbar-overview.png";

export default function AddProducts() {
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

  const getProduct = async () => {
    const response = await httpClient.get("/api/products");
    setProduct(response.data.result);
    console.log(response);
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

  // const updateProduct = async () => {
  //   // console.log(Item)
  //   Swal.fire({
  //     title: "Are you sure?",
  //     customClass: { container: "my-sweetalert-container-class" },
  //     icon: "warning",
  //     showCancelButton: true,
  //     confirmButtonColor: "#3085d6",
  //     cancelButtonColor: "#d33",
  //     confirmButtonText: "Yes",
  //   }).then((result) => {
  //     if (result.isConfirmed) {
  //       axios
  //         .put("/api/" + mainPage + "/addstock", {
  //           ID: Item.ID,
  //           UnitsInStock: countItem,
  //           UpdateBy: updateBy,
  //         })
  //         .then((res) => {
  //           if (res.data.message !== "success") {
  //             Swal.fire(res.data.message, "Error");
  //             setVisible(false);
  //             getProduct();
  //           } else {
  //             Swal.fire("Update Success", "success");
  //             setVisible(false);
  //             getProduct();
  //           }
  //         });
  //     }
  //   });
  // };

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

  const actionEdit = (data) => {
    return (
      <Button
        icon="pi pi-pencil"
        severity="warning"
        aria-label="Add"
        size="small"
        onClick={() => labelItemName(data)}
      />
    );
  };

  const handleToggle = (status) => {
    setVisible(status); //ปิด - เปิด dialog
  };

  // const footerContent = (
  //   <div>
  //     <Button
  //       label="Save"
  //       icon="pi pi-check"
  //       severity="info"
  //       size="small"
  //       onClick={() => updateProduct()}
  //     />
  //          <Button
  //       label="Cancel"
  //       icon="pi pi-times"
  //       severity="danger"
  //       size="small"
  //       onClick={() => setVisible(false)}
  //     />
  //   </div>
  // );

  const header = renderHeader();

  useEffect(() => {
    getProduct();
  }, []);

  return (
    <div className="layout-page">
      {/* <div className="card"> */}
      {/* <div className="align-items-left">
            <Button
              label="Back"
              icon="pi pi-angle-left"
              severity="info"
              size="small"
              onClick={() => navigate("/mainwarehouse")}
            />
          </div> */}
      {/* <div style={{ paddingTop: "16px" }}> */}
      {/* <Card> */}
      {/* <p className="w-2 text-left font-bold text-black-alpha-60 mr-3 text-3xl w-10">
        AddProducts
      </p> */}
      <div className="pb-3 flex justify-content-start">
        <Button
          label="Add"
          icon="pi pi-plus"
          severity="info"
          raised
          onClick={() => setVisible(true)}
        />
      </div>

      <div className="row justify-content-center gap-4">
        <div className="col-sm-12">
          <DataTable
            header={header}
            filters={filters}
            onFilter={(e) => setFilters(e.filters)}
            value={products}
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
              field="stockInWarehouse"
              header="StockInWarehouse"
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
            <Column
              headerStyle={{ width: "4rem" }}
              body={(data) => actionEdit(data)}
            ></Column>
          </DataTable>
        </div>
      </div>
      <Dialog
        header={editForm ? "Edit Product" : "Add Product"}
        visible={visible}
        onHide={() => setVisible(false)}
        style={{ width: "50vw" }}
        breakpoints={{ "960px": "75vw", "641px": "100vw" }}
        // footer={footerContent}
      >
        <div>
          {editForm ? (
            <FormEditProducts onToggle={handleToggle} items={Item} />
          ) : (
            <FormAddProducts onToggle={handleToggle} />
          )}
        </div>
      </Dialog>
    </div>
  );
}

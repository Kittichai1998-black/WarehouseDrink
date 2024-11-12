import React, { useState, useEffect } from "react";
import { DataTable } from "primereact/datatable";
import { FilterMatchMode, FilterOperator } from "primereact/api";
import { Column } from "primereact/column";
import { Button } from "primereact/button";
import { Dialog } from "primereact/dialog";
import { InputText } from "primereact/inputtext";

import { httpClient } from "../../../axios/HttpClient.jsx";
import AddProductForm from "../add-products.jsx";
import EditProductForm from "../edit-products.jsx";
import dayjs from "dayjs";
import Swal from "sweetalert2";

import "../../../css/table.css";

export default function SettingProducts() {
  const [product, setProduct] = useState([]);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [Item, setItem] = useState("");
  const [visible, setVisible] = useState(false);
  const [editForm, setEditForm] = useState(false);
  // const [metaKey, setMetaKey] = useState(true);
  const [filters, setFilters] = useState({
    global: { value: null, matchMode: FilterMatchMode.CONTAINS },
  });

  const permission = localStorage.getItem("Permission");

  const getProduct = async () => {
    try {
      const response = await httpClient.get("/api/productController/product");
      const products = response.data.result || response.data;
      const formattedProducts = products.filter(
        (pros) => pros.isActive === "A"
      );
      setProduct(formattedProducts);
    } catch (error) {
      console.error("Error fetching products:", error);
    }
  };

  const refreshData = () => {
    getProduct();
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

  function actionAdd() {
    setEditForm(false);
    setVisible(true);
  }

  const actionEdit = (data) => {
    return (
      <>
        {!permission.isEdit ? (
          <div className="flex gap-2">
            <Button
              icon="pi pi-pencil"
              severity="warning"
              aria-label="Add"
              size="small"
              onClick={() => labelItemName(data)}
            />
            <Button
              icon="pi pi-trash"
              severity="danger"
              aria-label="Delete"
              size="small"
              onClick={() => confirmDelete(data)}
            />
          </div>
        ) : (
          <></>
        )}
      </>
    );
  };

  const confirmDelete = async (data) => {
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes",
    }).then((result) => {
      if (result.isConfirmed) {
        httpClient.delete("/api/productController/product", data);

        Swal.fire({
          title: "Deleted!",
          text: "Your file has been deleted.",
          icon: "success",
        });
      }
    });
  };

  const handleToggle = (status) => {
    setVisible(status);
  };

  const header = renderHeader();

  useEffect(() => {
    getProduct();
  }, []);

  return (
    <div className="layout-page">
      <div className="pb-3 flex justify-content-start">
        {!permission.isEdit ? (
          <Button
            label="Add"
            icon="pi pi-plus"
            severity="info"
            raised
            onClick={actionAdd}
          />
        ) : (
          <></>
        )}
      </div>
      <div className="row justify-content-center gap-4">
        <div className="card col-sm-12">
          <p className="w-2 text-left font-bold text-blue-300 mr-3 text-4xl w-10">
            Product
          </p>
          <DataTable
            header={header}
            filters={filters}
            onFilter={(e) => setFilters(e.filters)}
            value={product}
            showGridlines
            stripedRows
            // sortField="productId"
            scrollable
            scrollHeight="auto"
            size="small"
            // rowClassName={rowClass}
            selection={selectedProduct}
            onSelectionChange={(e) => setSelectedProduct(e.value)}
            selectionMode="single"
            // dataKey="ProductID"
            // metaKeySelection={metaKey}
            rowHover
            paginator
            rows={5}
            rowsPerPageOptions={[5, 10]}
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
              headerStyle={{ width: "10rem" }}
              body={(data) => actionEdit(data)}
            ></Column>
            {/* <Column
              field="productId"
              header="ProductID"
              sortable
              style={{ width: "20%" }}
            ></Column> */}
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
            <EditProductForm
              onToggle={handleToggle}
              items={Item}
              onSave={refreshData}
            />
          ) : (
            <AddProductForm onToggle={handleToggle} onSave={refreshData} />
          )}
        </div>
      </Dialog>
    </div>
  );
}

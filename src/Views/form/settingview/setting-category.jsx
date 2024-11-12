import React, { useState, useEffect } from "react";
import { DataTable } from "primereact/datatable";
import { FilterMatchMode, FilterOperator } from "primereact/api";
import { Column } from "primereact/column";
import { Button } from "primereact/button";
import { Dialog } from "primereact/dialog";
import { InputText } from "primereact/inputtext";

import { httpClient } from "../../../axios/HttpClient.jsx";
import AddCategoryForm from "../add-category.jsx";
import EditCategoryForm from "../edit-category.jsx";
import dayjs from "dayjs";
import Swal from "sweetalert2";

import "../../../css/table.css";

export default function SettingCategory() {
  const [category, setCategory] = useState([]);
  const [Item, setItem] = useState("");
  const [visible, setVisible] = useState(false);
  const [editForm, setEditForm] = useState(false);
  // const [metaKey, setMetaKey] = useState(true);
  const [filters, setFilters] = useState({
    global: { value: null, matchMode: FilterMatchMode.CONTAINS },
  });

  const permission = localStorage.getItem("Permission");

  const getCategory = async () => {
    try {
      const response = await httpClient.get("/api/settingController/category");
      const categories = response.data.result || response.data;
      const formattedCategories = categories.filter(
        (cat) => cat.isActive === "A"
      );
      setCategory(formattedCategories);
    } catch (error) {
      console.error("Error fetching categories:", error);
    }
  };

  const refreshData = () => {
    getCategory();
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
        httpClient.delete("/api/settingController/category", data);

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
    getCategory();
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
            Category
          </p>
          <DataTable
            header={header}
            filters={filters}
            onFilter={(e) => setFilters(e.filters)}
            value={category}
            showGridlines
            stripedRows
            sortField="categoryId"
            scrollable
            scrollHeight="auto"
            size="small"
            // selection={selectedProduct}
            // onSelectionChange={(e) => setSelectedProduct(e.value)}
            selectionMode="single"
            dataKey="categoryId"
            // metaKeySelection={metaKey}
            rowHover
            paginator
            rows={5}
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
            {/* <Column
              field="categoryId"
              header="CategoryID"
              sortable
              style={{ width: "20%" }}
            ></Column> */}
            <Column
              field="categoryName"
              header="CategoryName"
              sortable
              style={{ width: "30%" }}
            ></Column>
            <Column
              field="createDate"
              header="CreateDate"
              body={(data, options) => formatDate(data.createDate)}
              sortable
              style={{ width: "30%" }}
            ></Column>
            <Column
              field="lastUpdated"
              header="LastUpdate"
              body={(data, options) => formatDate(data.lastUpdated)}
              sortable
              style={{ width: "25%" }}
            ></Column>
          </DataTable>
        </div>
      </div>
      <Dialog
        header={editForm ? "Edit Category" : "Add Category"}
        visible={visible}
        onHide={() => setVisible(false)}
        style={{ width: "26vw" }}
        breakpoints={{ "960px": "75vw", "641px": "100vw" }}
        // footer={footerContent}
      >
        <div>
          {editForm ? (
            <EditCategoryForm
              onToggle={handleToggle}
              items={Item}
              onSave={refreshData}
            />
          ) : (
            <AddCategoryForm onToggle={handleToggle} onSave={refreshData} />
          )}
        </div>
      </Dialog>
    </div>
  );
}

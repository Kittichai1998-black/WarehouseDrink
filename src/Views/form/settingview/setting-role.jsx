import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { DataTable } from "primereact/datatable";
import { FilterMatchMode, FilterOperator } from "primereact/api";
import { Column } from "primereact/column";
import { Button } from "primereact/button";
import { Dialog } from "primereact/dialog";
import { InputText } from "primereact/inputtext";
import AddRoleForm from "../add-role.jsx";
import EditRoleForm from "../edit-role.jsx";

import Swal from "sweetalert2";

import { httpClient } from "../../../axios/HttpClient.jsx";
import dayjs from "dayjs";

import "../../../css/table.css";

// import TopBarOverview from "../assets/imgs/topbar/topbar-overview.png";

export default function SettingRole() {
  // const navigate = useNavigate();
  const [role, setRole] = useState([]);
  const [Item, setItem] = useState("");
  const [visible, setVisible] = useState(false);
  const [editForm, setEditForm] = useState(false);
  // const [metaKey, setMetaKey] = useState(true);
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
  
  function actionAdd() {
    setEditForm(false);
    setVisible(true);
  }
  
  const actionEdit = (data) => {
    return (
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
          onClick={confirmDelete}
        />
      </div>
    );
  };

  const confirmDelete = async() => {
    Swal.fire({
    title: "Are you sure?",
    text: "You won't be able to revert this!",
    icon: "warning",
    showCancelButton: true,
    confirmButtonColor: "#3085d6",
    cancelButtonColor: "#d33",
    confirmButtonText: "Yes"
  }).then((result) => {
    if (result.isConfirmed) {
      // const deleteProduct = await httpClient.delete(`/api/productController/product/${data.productId}`);
      Swal.fire({
        title: "Deleted!",
        text: "Your file has been deleted.",
        icon: "success"
      });
    }
  });
  }

  const handleToggle = (status) => {
    setVisible(status);
  };

  const header = renderHeader();

  useEffect(() => {
    const getRole = async () => {
      const response = await httpClient.get("/api/settingController/role");
      setRole(response.data.result);
      console.log(response);
    };
    getRole();
  }, []);

  return (
    <div className="layout-page">
      <div className="pb-3 flex justify-content-start">
        <Button
          label="Add"
          icon="pi pi-plus"
          severity="info"
          raised
          onClick={actionAdd}
        />
      </div>
      <div className="row justify-content-center gap-4">
        <div className="card col-sm-12">
          <p className="w-2 text-left font-bold text-blue-300 mr-3 text-4xl w-10">
            Role
          </p>
          <DataTable
            header={header}
            filters={filters}
            onFilter={(e) => setFilters(e.filters)}
            value={role}
            showGridlines
            stripedRows
            sortField="RoleId"
            scrollable
            scrollHeight="auto"
            size="small"
            selectionMode="single"
            dataKey="roleId"
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
              field="roleId"
              header="RoleID"
              sortable
              style={{ width: "20%" }}
            ></Column>
            <Column
              field="roleName"
              header="RoleName"
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
        header={editForm ? "Edit Role" : "Add Role"}
        visible={visible}
        onHide={() => setVisible(false)}
        style={{ width: "50vw" }}
        breakpoints={{ "960px": "75vw", "641px": "100vw" }}
        // footer={footerContent}
      >
        <div>
        {editForm ? (
            <EditRoleForm onToggle={handleToggle} items={Item} />
          ) : (
            <AddRoleForm onToggle={handleToggle} />
          )}
        </div>
      </Dialog>
    </div>
  );
}

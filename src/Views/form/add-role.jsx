import React, { useEffect, useState } from "react";
import { InputText } from "primereact/inputtext";
import { Checkbox } from "primereact/checkbox";
import { Button } from "primereact/button";
import { useForm, Controller } from "react-hook-form";
import { httpClient } from "../../axios/HttpClient.jsx";
import Swal from "sweetalert2";
import "primereact/resources/themes/lara-light-indigo/theme.css";
import "primereact/resources/primereact.min.css";
import "primeicons/primeicons.css";

export default function AddCategoryForm({ onToggle, onSave}) {
  const [loading, setLoading] = useState(false);
  const {
    control,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm({ 
    defaultValues: {
      isEdit: false,
      isReceive: false,
      isIssue: false
    },
  });

  const [isToggled, setIsToggled] = useState(false);

  const onSubmit = async (data) => {
    console.log(data);
    try {
      setLoading(true);
      const response = await httpClient.post(
        "/api/settingController/role",
        data
      );
      console.log("Response:", response.data);

      Swal.fire({
        icon: "success",
        title: "บันทึกสำเร็จ!",
        text: "บันทึกเรียบร้อยแล้ว",
        customClass: { container: "my-sweetalert-container-class" },
      });

      const newStatus = false; //ปิด Dialog
      setIsToggled(newStatus);
      onToggle(newStatus);
      if (onSave) onSave();

      reset();
    } catch (error) {
      console.error("Error:", error);

      Swal.fire({
        icon: "error",
        title: "เกิดข้อผิดพลาด!",
        text: "ไม่สามารถบันทึกข้อมูลได้",
        customClass: { container: "my-sweetalert-container-class" },
      });
    } finally {
      setLoading(false);
    }
  };

  const [selectedRoleItems, setSelectedRoleItems] = useState([]);

  const onRoleChange = (e) => {
    let _selectedRoleItems = [...selectedRoleItems];

    if (e.checked) _selectedRoleItems.push(e.value);
    else
      _selectedRoleItems.splice(
        _selectedRoleItems.indexOf(e.value),
        1
      );

    setSelectedRoleItems(_selectedRoleItems);
    console.log(selectedRoleItems);
  };

  return (
    <div className="card flex justify-content-center">
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="grid">
          {/* categoryName */}
          <div className="sm:col-12 md:col-12 lg:col-12">
            <label htmlFor="roleName">ชื่อสิทธิ์</label>
          </div>
          <div className="sm:col-12 md:col-12 lg:col-12">
            <Controller
              name="roleName"
              control={control}
              rules={{
                required: " กรุณาระบุ ชื่อสิทธิ์ เช่น Admin, User, etc.",
              }}
              //   disabled={true}
              render={({ field }) => <InputText id="roleName" {...field} />}
            />
            {errors.roleName && (
              <small className="p-error">{errors.roleName.message}</small>
            )}
          </div>
          <div className="sm:col-12 md:col-12 lg:col-12">
            <label htmlFor="roleName">สิทธิ์การเข้าถึง</label>
          </div>
          <div className="sm:col-12 md:col-12 lg:col-12">
            <Controller
              name="isEdit"
              control={control}
              render={({ field }) => (
                <div className="flex flex-column gap-3">
                  <div className="flex align-items-center">
                    <Checkbox
                      inputId="isEdit"
                      name="isEdit"
                      value="isEdit"
                      onChange={(e) => {
                        field.onChange(e.checked);
                        onRoleChange(e);
                      }}
                      checked={field.value}
                    />
                    <label htmlFor="isEdit" className="ml-2">
                      แก้ไขข้อมูล
                    </label>
                  </div>
                </div>
              )}
            />
            {errors.categoryName && (
              <small className="p-error">{errors.roleName.message}</small>
            )}
            <></>
          </div>
          <div className="sm:col-12 md:col-12 lg:col-12">
            <Controller
              name="isReceive"
              control={control}
              render={({ field }) => (
                <div className="flex flex-column gap-3">
                  <div className="flex align-items-center">
                    <Checkbox
                      inputId="isReceive"
                      name="isReceive"
                      value="isReceive"
                      onChange={(e) => {
                        field.onChange(e.checked);
                        onRoleChange(e);
                      }}
                      checked={field.value}
                    />
                    <label htmlFor="isReceive" className="ml-2">
                      รับเข้าสินค้า
                    </label>
                  </div>
                </div>
              )}
            />
            {errors.categoryName && (
              <small className="p-error">{errors.roleName.message}</small>
            )}
            <></>
          </div>
          <div className="sm:col-12 md:col-12 lg:col-12">
            <Controller
              name="isIssue"
              control={control}
              render={({ field }) => (
                <div className="flex flex-column gap-3">
                  <div className="flex align-items-center">
                    <Checkbox
                      inputId="isIssue"
                      name="isIssue"
                      value="isIssue"
                      onChange={(e) => {
                        field.onChange(e.checked);
                        onRoleChange(e);
                      }}
                      checked={field.value}
                    />
                    <label htmlFor="isIssue" className="ml-2">
                      เบิกสินค้า
                    </label>
                  </div>
                </div>
              )}
            />
            {errors.categoryName && (
              <small className="p-error">{errors.roleName.message}</small>
            )}
            <></>
          </div>
        </div>
        {/* ปุ่มบันทึก */}
        <div className="col-12">
          <Button
            type="submit"
            label="บันทึก"
            icon="pi pi-check"
            className="mt-2"
            loading={loading}
          />
        </div>
      </form>
    </div>
  );
}

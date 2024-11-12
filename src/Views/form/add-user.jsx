import React, { useEffect, useState } from "react";
import { InputText } from "primereact/inputtext";
import { Button } from "primereact/button";
import { Dropdown } from "primereact/dropdown";
import { useForm, Controller } from "react-hook-form";
import { httpClient } from "../../axios/HttpClient.jsx";
import Swal from "sweetalert2";
import { Password } from "primereact/password";
import "primereact/resources/themes/lara-light-indigo/theme.css";
import "primereact/resources/primereact.min.css";
import "primeicons/primeicons.css";

export default function AddUserForm({ onToggle, onSave }) {
  const [loading, setLoading] = useState(false);
  const {
    control,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm();

  const [isToggled, setIsToggled] = useState(false);
  const [roleItems, setRoleItems] = useState([]);

  const onSubmit = async (data) => {
    console.log(data);
    try {
      setLoading(true);
      const response = await httpClient.post(
        "/api/logincontroller/register",
        data
      );
      console.log("Response:", response.data);

      Swal.fire({
        icon: "success",
        title: "บันทึกสำเร็จ!",
        text: "ข้อมูลผู้ใช้ถูกบันทึกเรียบร้อยแล้ว",
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

  useEffect(() => {
    const getRole = async () => {
      try {
        const response = await httpClient.get("/api/settingController/role");
        const roles = response.data.result || response.data;
        const formattedRoles = roles
          .filter((role) => role.isActive === "A")
          .map((role) => ({
            label: role.roleName,
            value: role.roleId,
          }));
        setRoleItems(formattedRoles);
      } catch (error) {
        console.error("Error fetching roles:", error);
      }
    };
    getRole();
  }, []);

  return (
    <div className="card flex justify-content-center">
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="grid">
          {/* username */}
          <div className="sm:col-12 md:col-12 lg:col-12">
            <label htmlFor="username">username</label>
          </div>
          <div className="sm:col-12 md:col-12 lg:col-12">
            <Controller
              name="username"
              control={control}
              rules={{ required: " กรุณาระบุ username" }}
              //   disabled={true}
              render={({ field }) => <InputText id="username" {...field} />}
            />
            {errors.username && (
              <small className="p-error">{errors.username.message}</small>
            )}
          </div>

          {/* password */}
          <div className="sm:col-12 md:col-12 lg:col-12">
            <label htmlFor="password">password</label>
          </div>
          <div className="sm:col-12 md:col-12 lg:col-12">
            <Controller
              name="password"
              control={control}
              rules={{ required: " กรุณาระบุ password" }}
              render={({ field }) => (
                <Password id="password" toggleMask {...field} />
              )}
            />
            {errors.username && (
              <small className="p-error">{errors.password.message}</small>
            )}
          </div>

          {/* ชื่อผู้ใช้งาน */}
          <div className="sm:col-12 md:col-12 lg:col-12">
            <label htmlFor="fullname">ชื่อผู้ใช้งาน</label>
          </div>
          <div className="sm:col-12 md:col-12 lg:col-12">
            <Controller
              name="fullName"
              control={control}
              rules={{ required: " กรุณาระบุชื่อผู้ใช้งาน" }}
              render={({ field }) => <InputText id="fullName" {...field} />}
            />
            {errors.fullName && (
              <small className="p-error">{errors.fullName.message}</small>
            )}
          </div>

          {/* Role */}
          <div className="sm:col-12 md:col-12 lg:col-12">
            <label htmlFor="category">Role</label>
          </div>
          <div className="sm:col-12 md:col-12 lg:col-12">
            <Controller
              name="roleId"
              control={control}
              rules={{ required: " กรุณาเลือกสิทธิ์ผู้ใช้งาน" }}
              render={({ field }) => (
                <Dropdown
                  id="roleId"
                  options={roleItems}
                  optionLabel="label"
                  optionValue="value"
                  placeholder="เลือกสิทธิ์ผู้ใช้งาน"
                  {...field}
                />
              )}
            />
            {errors.roleId && (
              <small className="p-error">{errors.roleId.message}</small>
            )}
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

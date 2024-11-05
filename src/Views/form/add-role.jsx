import React, { useEffect, useState } from "react";
import { InputText } from "primereact/inputtext";
import { Calendar } from "primereact/calendar";
import { InputNumber } from "primereact/inputnumber";
import { Button } from "primereact/button";
import { Dropdown } from "primereact/dropdown";
import { useForm, Controller } from "react-hook-form";
import { httpClient } from "../../axios/HttpClient.jsx";
import Swal from "sweetalert2";
import { Password } from "primereact/password";
import "primereact/resources/themes/lara-light-indigo/theme.css";
import "primereact/resources/primereact.min.css";
import "primeicons/primeicons.css";

export default function AddRoleForm({ onToggle }) {
  const [loading, setLoading] = useState(false);
  const {
    control,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm();

  const [submitted, setSubmitted] = useState(false);
  const [value, setValue] = useState("");
  const [isToggled, setIsToggled] = useState(false);
  const [roleItems, setRoleItems] = useState([]);

  const onSubmit = async (data) => {
    console.log(data);
    try {
      setLoading(true);
      const response = await httpClient.post(
        "/api/settingController/category",
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
  }, []);

  return (
    <div className="card flex justify-content-center">
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="grid">
          {/* roleName */}
          {/* <div className="sm:col-12 md:col-12 lg:col-12">
            <label htmlFor="roleName">สิทธิ์การใช้งาน</label>
          </div>
          <div className="sm:col-12 md:col-12 lg:col-12">
            <Controller
              name="roleName"
              control={control}
              rules={{ required: " กรุณาระบุ roleName" }}
              //   disabled={true}
              render={({ field }) => <InputText id="roleName" {...field} />}
            />
            {errors.roleName && (
              <small className="p-error">{errors.roleName.message}</small>
            )}
          </div> */}
        </div>
        {/* ปุ่มบันทึก */}
        {/* <div className="col-12">
          <Button
            type="submit"
            label="บันทึก"
            icon="pi pi-check"
            className="mt-2"
            loading={loading}
          />
        </div> */}
      </form>
    </div>
  );
}

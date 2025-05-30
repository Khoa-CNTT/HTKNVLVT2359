import React from "react";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import {
  checkUserEmail,
  checkUserPhoneService,
  createNewUser,
  handleLoginService,
} from "../../service/userService";
import { useFetchAllcode } from "../../util/fetch";
import Otp from "./Otp";
import handleValidate from "../../util/Validation";
import { Link } from "react-router-dom";

const Register = () => {
  const [inputValues, setInputValues] = useState({
    phonenumber: "",
    firstName: "",
    lastName: "",
    password: "",
    isOpen: false,
    dataUser: {},
    roleCode: "",
    email: "",
    againPass: "",
    genderCode: "",
  });
  let { data: dataRole } = useFetchAllcode("ROLE");
  let { data: dataGender } = useFetchAllcode("GENDER");

  if (dataRole && dataRole.length > 0) {
    dataRole = dataRole.filter(
      (item) => item.code !== "ADMIN" && item.code !== "COMPANY"
    );
  }
  if (
    dataGender &&
    dataGender.length > 0 &&
    inputValues.genderCode === "" &&
    dataRole &&
    dataRole.length > 0 &&
    inputValues.roleCode === ""
  ) {
    setInputValues({
      ...inputValues,
      ["genderCode"]: dataGender[0].code,
      ["roleCode"]: dataRole[0].code,
    });
  }

  const handleOnChange = (event) => {
    const { name, value } = event.target;
    setInputValues({ ...inputValues, [name]: value });
  };

  let handleLogin = async (phonenumber, password) => {
    let res = await handleLoginService({
      phonenumber: phonenumber,
      password: password,
    });

    if (res && res.errCode === 0) {
      localStorage.setItem("userData", JSON.stringify(res.user));
      localStorage.setItem("token_user", res.token);
      if (res.user.roleCode === "ADMIN" || res.user.roleCode === "EMPLOYER") {
        window.location.href = "/admin/";
      } else {
        window.location.href = "/";
      }
    } else {
      toast.error(res.errMessage);
    }
  };

  let handleOpenVerifyOTP = async () => {
    let checkPhonenumber = handleValidate(inputValues.phonenumber, "phone");
    let checkPassword = handleValidate(inputValues.password, "password");
    let checkFirstName = handleValidate(inputValues.firstName, "isEmpty");
    let checkLastName = handleValidate(inputValues.lastName, "isEmpty");
    let checkEmail = handleValidate(inputValues.email, "email");

    let res = await checkUserPhoneService(inputValues.phonenumber);
    let emailCheck = await checkUserEmail(inputValues.email);

    console.log("Email check : " , emailCheck)

    if (!(checkFirstName === true)) {
      toast.error(checkFirstName);
      return;
    } else if (!(checkLastName === true)) {
      toast.error(checkLastName);
      return;
    } else if (!(checkPhonenumber === true)) {
      toast.error(checkPhonenumber);
      return;
    } else if ( !(checkEmail === true) ) {
      toast.error(checkEmail);
      return;
    } else if ( !(checkPassword === true) ) {
      toast.error(checkPassword);
      return;
    } else if (inputValues.againPass !== inputValues.password) {
      toast.error("Mật khẩu nhập lại không trùng khớp !");
      return;
    } else if (res) {
      toast.error("Số điện thoại đã tồn tại !");
      return;
    } else if (emailCheck === true) {
      toast.error("Email đã tồn tại !");
      return;
    } else {
      setInputValues({
        ...inputValues,
        ["dataUser"]: {
          phonenumber: inputValues.phonenumber,
          firstName: inputValues.firstName,
          lastName: inputValues.lastName,
          password: inputValues.password,
          roleCode: inputValues.roleCode,
          email: inputValues.email,
          genderCode : inputValues.genderCode
        },
        ["isOpen"]: true,
      });
    }
  };

  return (
    <>
      {inputValues.isOpen === false && (
        <div className="container-scroller">
          <div className="container-fluid page-body-wrapper full-page-wrapper">
            <div
              style={{ padding: "60px 0px" }}
              className="content-wrapper d-flex align-items-center auth px-0"
            >
              <div className="row w-100 mx-0">
                <div className="col-lg-4 mx-auto">
                  <div
                    style={{
                      display: "flex",
                      justifyContent: "center",
                      gap: "30px",
                    }}
                  >
                    <div>
                      <div className="brand-logo">
                        <img src="/assets/img/logo/logo.png" alt="logo" />
                      </div>
                      <h4>Bạn là ứng viên mới?</h4>
                      <h6 className="font-weight-light">
                        Đăng ký dễ dàng chỉ vài bước đơn giản
                      </h6>
                      <form className="pt-3" style={{ width: "379px" }}>
                        <div className="form-group">
                          <input
                            style={{
                              borderRadius: "30px",
                              backgroundColor: "white",
                            }}
                            type="text"
                            value={inputValues.firstName}
                            name="firstName"
                            onChange={(event) => handleOnChange(event)}
                            className="form-control form-control-lg"
                            id="exampleInputUsername1"
                            placeholder="Họ"
                          />
                        </div>
                        <div className="form-group">
                          <input
                            style={{
                              borderRadius: "30px",
                              backgroundColor: "white",
                            }}
                            type="text"
                            value={inputValues.lastName}
                            name="lastName"
                            onChange={(event) => handleOnChange(event)}
                            className="form-control form-control-lg"
                            id="exampleInputUsername1"
                            placeholder="Tên"
                          />
                        </div>
                        <div className="form-group">
                          <input
                            style={{
                              borderRadius: "30px",
                              backgroundColor: "white",
                            }}
                            type="number"
                            value={inputValues.phonenumber}
                            name="phonenumber"
                            onChange={(event) => handleOnChange(event)}
                            className="form-control form-control-lg"
                            id="exampleInputEmail1"
                            placeholder="Số điện thoại"
                          />
                        </div>
                        <div className="form-group">
                          <input
                            style={{
                              borderRadius: "30px",
                              backgroundColor: "white",
                            }}
                            type="text"
                            value={inputValues.email}
                            name="email"
                            onChange={(event) => handleOnChange(event)}
                            className="form-control form-control-lg"
                            placeholder="Email"
                          />
                        </div>
                        <div className="form-group">
                          <input
                            style={{
                              borderRadius: "30px",
                              backgroundColor: "white",
                            }}
                            type="password"
                            value={inputValues.password}
                            name="password"
                            onChange={(event) => handleOnChange(event)}
                            className="form-control form-control-lg"
                            id="exampleInputPassword1"
                            placeholder="Mật khẩu"
                          />
                        </div>
                        <div className="form-group">
                          <input
                            style={{
                              borderRadius: "30px",
                              backgroundColor: "white",
                            }}
                            type="password"
                            value={inputValues.againPass}
                            name="againPass"
                            onChange={(event) => handleOnChange(event)}
                            className="form-control form-control-lg"
                            placeholder="Nhập lại mật khẩu"
                          />
                        </div>
                        <div className="form-group">
                          <select
                            style={{
                              color: "black",
                              borderRadius: "30px",
                              backgroundColor: "white",
                            }}
                            className="form-control"
                            value={inputValues.roleCode}
                            name="roleCode"
                            onChange={(event) => handleOnChange(event)}
                          >
                            {dataRole &&
                              dataRole.length > 0 &&
                              dataRole.map((item, index) => {
                                if (
                                  item.code !== "ADMIN" &&
                                  item.code !== "COMPANY"
                                ) {
                                  return (
                                    <option key={index} value={item.code}>
                                      {item.value}
                                    </option>
                                  );
                                }
                              })}
                          </select>
                        </div>
                        <div className="form-group">
                          <select
                            style={{
                              color: "black",
                              borderRadius: "30px",
                              backgroundColor: "white",
                            }}
                            className="form-control"
                            value={inputValues.genderCode}
                            name="genderCode"
                            onChange={(event) => handleOnChange(event)}
                          >
                            {dataGender &&
                              dataGender.length > 0 &&
                              dataGender.map((item, index) => {
                                return (
                                  <option key={index} value={item.code}>
                                    {item.value}
                                  </option>
                                );
                              })}
                          </select>
                        </div>
                        <div className="mt-3">
                          <a
                            style={{
                              backgroundColor: "rgb(250 166 26)",
                              border: "1px solid rgb(250 166 26)",
                            }}
                            onClick={handleOpenVerifyOTP}
                            className="btn1 btn1-block btn1-primary1 btn1-lg font-weight-medium auth-form-btn1"
                          >
                            Đăng ký
                          </a>
                        </div>
                        <div className="text-center mt-4 font-weight-light">
                          Bạn đã có tài khoản rồi?{" "}
                          <Link to="/login" className="text-primary">
                            Đăng nhập ngay
                          </Link>
                        </div>
                      </form>
                    </div>
                    <img
                      style={{ width: "130%", borderRadius: "30px" }}
                      src="/assets/img/logo/job.jpg"
                      alt="job"
                    />
                  </div>
                </div>
              </div>
            </div>
            {/* content-wrapper ends */}
          </div>
          {/* page-body-wrapper ends */}
        </div>
      )}

      {inputValues.isOpen === true && (
        <div className="container-scroller" style={{ padding: "20px" }}>
          <Otp dataUser={inputValues.dataUser} />
        </div>
      )}
    </>
  );
};

export default Register;

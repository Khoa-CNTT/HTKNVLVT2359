import React, { useEffect, useState } from "react";
import "./Otp.scss";
import { toast } from "react-toastify";
import {
  createNewUser,
  handleLoginService,
  otpEmail,
} from "../../service/userService";
const Otp = (props) => {
  const [dataUser, setdataUser] = useState({});
  const [otpnumber, setotpnumber] = useState(1);
  const [inputValues, setInputValues] = useState({
    so1: "",
    so2: "",
    so3: "",
    so4: "",
    so5: "",
    so6: "",
  });

  useEffect(() => {
    if (props.dataUser) {
      let fetchOtp = async () => {
        await onSignInSubmit(false);
      };
      fetchOtp();
    }
  }, [props.dataUser]);

  const handleOnChange = (event) => {
    const { name, value } = event.target;
    setInputValues({ ...inputValues, [name]: value });
  };

  let configureCaptcha = () => {};

  let onSignInSubmit = async (isResend) => {
    try {
      let email = props.dataUser.email;
      if (email) {
        let data = await otpEmail(email);
        setotpnumber(data.otp);
      }
    } catch (error) {}
  };

  let submitOTP = async () => {
    const code = +(
      inputValues.so1 +
      inputValues.so2 +
      inputValues.so3 +
      inputValues.so4 +
      inputValues.so5 +
      inputValues.so6
    );

    if (otpnumber == code) {
      // User signed in successfully.
      toast.success("Đã xác tài khoản Email thành công");
      let createUser = async () => {
        let res = await createNewUser({
          password: props.dataUser.password,
          firstName: props.dataUser.firstName,
          lastName: props.dataUser.lastName,
          phonenumber: props.dataUser.phonenumber,
          genderCode : props.dataUser.genderCode,
          roleCode: props.dataUser.roleCode,
          email: props.dataUser.email,
          image:
            "https://res.cloudinary.com/bingo2706/image/upload/v1642521841/dev_setups/l60Hf_blyqhb.png",
        });
        if (res && res.errCode === 0) {
          toast.success("Tạo tài khoản thành công");
          handleLogin(props.dataUser.phonenumber, props.dataUser.password);
        } else {
          toast.error(res.errMessage);
        }
      };
      createUser();
    } else {
      toast.error("Mã OTP không đúng !");
    }

    // ...
  };
  let resendOTP = async () => {
    await onSignInSubmit(true);
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
  return (
    <>
      <div className="container d-flex justify-content-center align-items-center container_Otp">
        <div style={{width : '500px'}} className="card text-center">
          <div style={{width : '100%' , marginBottom : '15px',backgroundColor : '#f4f2f5'}} className="card-header p-5">
            <img src="/assets/img/logo/logo.png" />
            <h3 style={{ color: "black" , fontWeight : 'bold' , marginTop : '25px' }} className="mb-2">
              XÁC THỰC OTP
            </h3>
            <div style={{fontSize : '18px' , color : 'black'}}>
              <small>
                mã đã được gửi tới email{" "}
                {props.dataUser && props.dataUser.email}
              </small>
            </div>
          </div>
          <div className="input-container d-flex flex-row justify-content-center mt-2">
            <input
              style={{width : '70px' , height : '50px'}}  
              value={inputValues.so1}
              name="so1"
              onChange={(event) => handleOnChange(event)}
              type="text"
              className="m-1 text-center form-control rounded"
              maxLength={1}
            />
            <input
              style={{width : '70px' , height : '50px'}}  
              value={inputValues.so2}
              name="so2"
              onChange={(event) => handleOnChange(event)}
              type="text"
              className="m-1 text-center form-control rounded"
              maxLength={1}
            />
            <input
              style={{width : '70px' , height : '50px'}}  
              value={inputValues.so3}
              name="so3"
              onChange={(event) => handleOnChange(event)}
              type="text"
              className="m-1 text-center form-control rounded"
              maxLength={1}
            />
            <input
              style={{width : '70px' , height : '50px'}}  
              value={inputValues.so4}
              name="so4"
              onChange={(event) => handleOnChange(event)}
              type="text"
              className="m-1 text-center form-control rounded"
              maxLength={1}
            />
            <input
              style={{width : '70px' , height : '50px'}}  
              value={inputValues.so5}
              name="so5"
              onChange={(event) => handleOnChange(event)}
              type="text"
              className="m-1 text-center form-control rounded"
              maxLength={1}
            />
            <input
              style={{width : '70px' , height : '50px'}}  
              value={inputValues.so6}
              name="so6"
              onChange={(event) => handleOnChange(event)}
              type="text"
              className="m-1 text-center form-control rounded"
              maxLength={1}
            />
          </div>
          <div style={{marginTop : '13px'}}>
            <small style={{fontWeight : 'bold' , fontSize : '13px'}} >
              bạn không nhận được Otp ?
              <a
                onClick={() => resendOTP()}
                style={{ color: "#3366FF" }}
                className="text-decoration-none ml-2"
              >
                Gửi lại
              </a>
            </small>
          </div>
          <div className="mt-3 mb-5">
            <div id="sign-in-button"></div>
            <button
              style={{backgroundColor : 'rgb(250 166 26)'}}
              onClick={() => submitOTP()}
              className="btn btn-success px-4 verify-btn"
            >
              Xác thực
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default Otp;

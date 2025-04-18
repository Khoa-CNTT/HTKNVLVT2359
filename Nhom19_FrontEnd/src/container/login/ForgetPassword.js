import React from 'react'
import { useEffect, useState } from 'react';
import { toast } from 'react-toastify';
import { checkUserPhoneService, changePasswordByphone, handleLoginService } from '../../service/userService';
import OtpForgetPassword from './OtpForgetPassword';
import { Link } from 'react-router-dom';
import handleValidate from '../../util/Validation';
const ForgetPassword = () => {
    const [inputValidates, setValidates] = useState({
        phonenumber: true, newPassword: true, confirmPassword: true
    })
    const [inputValues, setInputValues] = useState({
        phonenumber: '', isOpen: false, isSuccess: false, newPassword: '', confirmPassword: '',
    });

    const handleOnChange = event => {
        const { name, value } = event.target;
        setInputValues({ ...inputValues, [name]: value });

    };

    let handleOpenVerifyOTP = async () => {
        let checkPhone = handleValidate(inputValues.phonenumber, "phone")
        if (!(checkPhone === true)) {
            setValidates({
                ...inputValidates,
                phonenumber: checkPhone
            })
            return
        }
        let res = await checkUserPhoneService(inputValues.phonenumber)
        if (res === true) {
            setInputValues({ ...inputValues, ["isOpen"]: true })
        } else {
            setValidates({
                ...inputValidates,
                phonenumber: true
            })
            toast.error("Số điện thoại không tồn tại!")
        }

    }
    const recieveVerify = (success) => {
        setInputValues({ ...inputValues, ["isOpen"]: false, ["isSuccess"]: true })
    }
    let handleLogin = async (phonenumber, password) => {

        let res = await handleLoginService({
            phonenumber: phonenumber,
            password: password
        })

        if (res && res.errCode === 0) {
            localStorage.setItem("userData", JSON.stringify(res.user))
            if (res.user.roleCode === "ADMIN" || res.user.roleCode === "EMPLOYER") {
                window.location.href = "/admin/"
            }
            else {
                window.location.href = "/"
            }
        }
        else {
            toast.error(res.errMessage)
        }
    }
    let handleForgetPassword = async () => {
        let checkNewPass = handleValidate(inputValues.newPassword, "password")
        if (!(checkNewPass === true)) {
            setValidates({
                ...inputValidates,
                newPassword: checkNewPass
            })
            if (inputValues.confirmPassword !== inputValues.newPassword) {
                setValidates({
                    ...inputValidates,
                    confirmPassword: "Mật khẩu nhập lại không trùng"
                })
                return
            }
            return
        }
        let res = await changePasswordByphone({

            phonenumber: inputValues.phonenumber,
            password: inputValues.newPassword,
        })
        if (res && res.errCode === 0) {
            toast.success("Đổi mật khẩu thành công")
            handleLogin(inputValues.phonenumber, inputValues.newPassword)
        } else {
            toast.error(res.errMessage)
        }

    }
    return (
        <>
            {inputValues.isOpen === false &&
                <div className="container-scroller">
                    <div className="container-fluid page-body-wrapper full-page-wrapper">
                        <div className="content-wrapper d-flex align-items-center auth px-0">
                            <div className="row w-100 mx-0">
                                <div className="col-lg-4 mx-auto">
                                    <div style={{borderRadius:'30px'}} className="auth-form-light text-left py-5 px-4 px-sm-5">
                                        <div className="brand-logo">
                                            <img src="/assets/img/logo/logo.png" alt="logo" />
                                        </div>
                                        <h4>Quên mật khẩu?</h4>
                                        <h6 className="font-weight-light">Đừng lo! Khôi phục trong vài giây</h6>
                                        <form className="pt-3">

                                            {inputValues.isSuccess === true &&
                                                <>
                                                    <div className="form-group">
                                                        <input style={{borderRadius:'40px'}} type="password" value={inputValues.newPassword} name="newPassword" onChange={(event) => handleOnChange(event)} className="form-control form-control-lg" id="exampleInputPassword1" placeholder="Mật khẩu mới" />
                                                        {inputValidates.newPassword && <p style={{ color: 'red' }}>{inputValidates.newPassword}</p>}
                                                    </div>
                                                    <div className="form-group">
                                                        <input style={{borderRadius:'40px'}} type="password" value={inputValues.confirmPassword} name="confirmPassword" onChange={(event) => handleOnChange(event)} className="form-control form-control-lg" id="exampleInputPassword1" placeholder="Xác nhận mật khẩu" />
                                                        {inputValidates.confirmPassword && <p style={{ color: 'red' }}>{inputValidates.confirmPassword}</p>}
                                                    </div>
                                                    <div className="mt-3">
                                                        <a style={{ border : '1px solid rgb(250 166 26)' , backgroundColor : 'rgb(250 166 26)'}} onClick={() => handleForgetPassword()} className="btn1 btn1-block btn1-primary1 btn1-lg font-weight-medium auth-form-btn1" >Xác nhận</a>
                                                    </div>
                                                </>
                                            }
                                            {inputValues.isSuccess === false &&
                                                <>
                                                    <div className="form-group">
                                                        <input style={{borderRadius:'40px'}} type="number" value={inputValues.phonenumber} name="phonenumber" onChange={(event) => handleOnChange(event)} className="form-control form-control-lg" id="exampleInputEmail1" placeholder="Số điện thoại" />
                                                        {inputValidates.phonenumber && <p style={{ color: 'red' }}>{inputValidates.phonenumber}</p>}
                                                    </div>
                                                    <div className="mt-3">
                                                        <a style={{ border : '1px solid rgb(250 166 26)' , backgroundColor : 'rgb(250 166 26)'}} onClick={() => handleOpenVerifyOTP()} className="btn1 btn1-block btn1-primary1 btn1-lg font-weight-medium auth-form-btn1" >Xác nhận</a>
                                                    </div>
                                                </>
                                            }
                                            <div className="text-center mt-4 font-weight-light">
                                                Chưa có tài khoản? <Link to="/register" className="text-primary">Đăng ký</Link>
                                                <br></br>
                                                <br></br>
                                                Đã có tài khoản? <Link to="/login" className="text-primary">Đăng nhập</Link>
                                            </div>
                                        </form>
                                    </div>
                                </div>
                            </div>
                        </div>
                        {/* content-wrapper ends */}
                    </div>
                    {/* page-body-wrapper ends */}
                </div>
            }
            {inputValues.isOpen === true &&
                <OtpForgetPassword dataUser={inputValues.phonenumber} recieveVerify={recieveVerify} />
            }
        </>
    )
}

export default ForgetPassword

import React from "react";
import { useEffect, useState } from "react";
import {
  getPackageById,
  createPackagePost,
  updatePackagePost,
} from "../../../service/userService";
import { toast } from "react-toastify";
import { useHistory, useParams } from "react-router-dom";
import { Spinner, Modal } from "reactstrap";
import "../../../components/modal/modal.css";
const AddpackagePost = ({
  style = { padding: "30px", borderRadius: "30px" },
}) => {
  const [isActionADD, setisActionADD] = useState(true);
  const [isLoading, setIsLoading] = useState(false);

  const { id } = useParams();

  const [inputValues, setInputValues] = useState({
    value: "",
    price: "",
    isHot: 0,
    name: "",
  });

  const [toggle, setToggle] = useState(false);

  useEffect(() => {
    if (id) {
      let fetchDetailPackagePost = async () => {
        setisActionADD(false);
        let res = await getPackageById(id);
        if (res && res.errCode === 0) {
          setInputValues({
            ...inputValues,
            ["value"]: res.data.value,
            ["id"]: res.data.id,
            ["price"]: res.data.price,
            ["name"]: res.data.name,
          });
        }
      };
      fetchDetailPackagePost();
    }
  }, []);

  const handleOnChange = (event) => {
    const { name, value } = event.target;
    setInputValues({ ...inputValues, [name]: value });
  };
  let handleSavePackagePost = async () => {
    setIsLoading(true);
    if (isActionADD === true) {
      let res = await createPackagePost({
        value: inputValues.value,
        isHot: inputValues.isHot,
        name: inputValues.name,
        price: inputValues.price,
      });
      setTimeout(() => {
        setIsLoading(false);
        if (res && res.errCode === 0) {
          toast.success(res.errMessage);
          setInputValues({
            ...inputValues,
            ["value"]: "",
            ["code"]: "",
            price: "",
            name: "",
          });
        } else if (res && res.errCode === 2) {
          toast.error(res.errMessage);
        } else toast.error(res.errMessage);
      }, 1000);
    } else {
      let res = await updatePackagePost({
        value: inputValues.value,
        name: inputValues.name,
        isHot: inputValues.isHot,
        price: inputValues.price,
        id: id,
      });
      setTimeout(() => {
        setIsLoading(false);
        if (res && res.errCode === 0) {
          toast.success(res.errMessage);
        } else if (res && res.errCode === 2) {
          toast.error(res.errMessage);
        } else toast.error(res.errMessage);
      }, 500);
    }
  };

  const handleToggle = () => {
    setToggle(true);
  };

  const handleToggleClose = () => {
    setToggle(false);
  };

  const history = useHistory();
  return (
    <div className="">
      <div className="col-12 grid-margin">
        <div style={style} className="card">
          <div className="card-body">
            {isActionADD === false && (

            <div
              onClick={() => history.goBack()}
              className="mb-2 hover-pointer"
              style={{
                backgroundColor: "rgb(250 166 26)",
                border: "1px solid rgb(250 166 26)",
                marginBottom: "20px",
                marginLeft: "940px",
                fontSize: "18px",
                textAlign : 'center',
                padding : '8px',
                borderRadius : '15px'
              }}
            >
              X
            </div>
            )}
            <h4 className="card-title">
              <i>
                {isActionADD === true
                  ? "Thêm mới gói bài viết"
                  : "Cập nhật gói bài viết"}
              </i>
            </h4>
            <br></br>
            {toggle == false && isActionADD === true && (
              <button
                style={{
                  backgroundColor: "rgb(250 166 26)",
                  border: "1px solid rgb(250 166 26)",
                  marginBottom: "20px",
                }}
                type="button"
                className="btn1 btn1-primary1 btn1-icon-text"
                onClick={() => handleToggle()}
              >
                <i class="ti-file btn1-icon-prepend"></i>
                Thêm Mới
              </button>
            )}
            {toggle && isActionADD === true && (
              <button
                style={{
                  backgroundColor: "rgb(250 166 26)",
                  border: "1px solid rgb(250 166 26)",
                  marginBottom: "20px",
                  marginLeft: "900px",
                  fontSize: "18px",
                }}
                type="button"
                className="btn1 btn1-primary1 btn1-icon-text"
                onClick={() => handleToggleClose()}
              >
                X
              </button>
            )}
            {toggle && isActionADD == true && (
              <form className="form-sample">
                <div className="row">
                  <div className="col-md-8">
                    <div className="form-group row">
                      <label className="col-sm-3 col-form-label">
                        Tên gói bài viết
                      </label>
                      <div className="col-sm-8">
                        <input
                          style={{ borderRadius: "30px" }}
                          type="text"
                          value={inputValues.name}
                          name="name"
                          onChange={(event) => handleOnChange(event)}
                          className="form-control"
                        />
                      </div>
                    </div>
                  </div>
                </div>
                <div className="row">
                  <div className="col-md-8">
                    <div className="form-group row">
                      <label className="col-sm-3 col-form-label">Giá trị</label>
                      <div className="col-sm-3">
                        <input
                          style={{ borderRadius: "30px" }}
                          type="number"
                          value={inputValues.value}
                          name="value"
                          onChange={(event) => handleOnChange(event)}
                          className="form-control"
                        />
                      </div>
                    </div>
                  </div>
                </div>
                <div className="row">
                  <div className="col-md-8">
                    <div className="form-group row">
                      <label className="col-sm-3 col-form-label">
                        {"Giá tiền (VNĐ)"}
                      </label>
                      <div className="col-sm-3">
                        <input
                          style={{ borderRadius: "30px" }}
                          type="number"
                          value={inputValues.price}
                          name="price"
                          onChange={(event) => handleOnChange(event)}
                          className="form-control"
                        />
                      </div>
                    </div>
                  </div>
                </div>
                <div className="row">
                  <div className="col-md-8">
                    <div className="form-group row">
                      <label className="col-sm-3 col-form-label">
                        Loại bài viết
                      </label>
                      <div className="col-sm-5">
                        <select
                          style={{ color: "black", borderRadius: "30px" }}
                          className="form-control"
                          value={inputValues.isHot}
                          name="isHot"
                          onChange={(event) => handleOnChange(event)}
                        >
                          <option value={0}>Bình thường</option>
                          <option value={1}>Nổi bật</option>
                        </select>
                      </div>
                    </div>
                  </div>
                </div>
                <button
                  style={{
                    backgroundColor: "rgb(250 166 26)",
                    border: "1px solid rgb(250 166 26)",
                  }}
                  type="button"
                  className="btn1 btn1-primary1 btn1-icon-text"
                  onClick={() => handleSavePackagePost()}
                >
                  <i class="ti-file btn1-icon-prepend"></i>
                  {isActionADD === true ? "Thêm mới gói bài viết" : "Cập nhật"}
                </button>
              </form>
            )}
            {isActionADD == false && (
              <form className="form-sample">
                <div className="row">
                  <div className="col-md-8">
                    <div className="form-group row">
                      <label className="col-sm-3 col-form-label">
                        Tên gói bài viết
                      </label>
                      <div className="col-sm-8">
                        <input
                          style={{ borderRadius: "30px" }}
                          type="text"
                          value={inputValues.name}
                          name="name"
                          onChange={(event) => handleOnChange(event)}
                          className="form-control"
                        />
                      </div>
                    </div>
                  </div>
                </div>
                <div className="row">
                  <div className="col-md-8">
                    <div className="form-group row">
                      <label className="col-sm-3 col-form-label">Giá trị</label>
                      <div className="col-sm-3">
                        <input
                          style={{ borderRadius: "30px" }}
                          type="number"
                          value={inputValues.value}
                          name="value"
                          onChange={(event) => handleOnChange(event)}
                          className="form-control"
                        />
                      </div>
                    </div>
                  </div>
                </div>
                <div className="row">
                  <div className="col-md-8">
                    <div className="form-group row">
                      <label className="col-sm-3 col-form-label">
                        {"Giá tiền (VNĐ)"}
                      </label>
                      <div className="col-sm-3">
                        <input
                          style={{ borderRadius: "30px" }}
                          type="number"
                          value={(inputValues.price * 1000000).toLocaleString("vi-VN")}
                          name="price"
                          onChange={(event) => handleOnChange(event)}
                          className="form-control"
                        />
                      </div>
                    </div>
                  </div>
                </div>
                <div className="row">
                  <div className="col-md-8">
                    <div className="form-group row">
                      <label className="col-sm-3 col-form-label">
                        Loại bài viết
                      </label>
                      <div className="col-sm-5">
                        <select
                          style={{ color: "black", borderRadius: "30px" }}
                          className="form-control"
                          value={inputValues.isHot}
                          name="isHot"
                          onChange={(event) => handleOnChange(event)}
                        >
                          <option value={0}>Bình thường</option>
                          <option value={1}>Nổi bật</option>
                        </select>
                      </div>
                    </div>
                  </div>
                </div>
                <button
                  style={{
                    backgroundColor: "rgb(250 166 26)",
                    border: "1px solid rgb(250 166 26)",
                  }}
                  type="button"
                  className="btn1 btn1-primary1 btn1-icon-text"
                  onClick={() => handleSavePackagePost()}
                >
                  <i class="ti-file btn1-icon-prepend"></i>
                  {isActionADD === true ? "Thêm mới gói bài viết" : "Cập nhật"}
                </button>
              </form>
            )}
          </div>
        </div>
      </div>
      {isLoading && (
        <Modal isOpen="true" centered contentClassName="closeBorder">
          <div
            style={{
              position: "absolute",
              right: "50%",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <Spinner animation="border"></Spinner>
          </div>
        </Modal>
      )}
    </div>
  );
};

export default AddpackagePost;

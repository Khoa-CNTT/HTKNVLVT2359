import React from "react";
import { useEffect, useState } from "react";
import {
  createAllCodeService,
  getDetailAllcodeByCode,
  UpdateAllcodeService,
} from "../../../service/userService";
import { toast } from "react-toastify";
import { useHistory, useParams } from "react-router-dom";
import { Spinner, Modal } from "reactstrap";
import "../../../components/modal/modal.css";
import CommonUtils from "../../../util/CommonUtils";

const AddWorkType = ({ style = { padding: "30px", borderRadius: "30px" } }) => {
  const [isActionADD, setisActionADD] = useState(true);

  const [isLoading, setIsLoading] = useState(false);

  const { id } = useParams();

  const [inputValues, setInputValues] = useState({
    value: "",
    code: "",
  });

  const [toggle, setToggle] = useState(false);

  useEffect(() => {
    if (id) {
      let fetchDetailWorkType = async () => {
        setisActionADD(false);
        let allcode = await getDetailAllcodeByCode(id);
        if (allcode && allcode.errCode === 0) {
          setInputValues({
            ...inputValues,
            ["value"]: allcode.data.value,
            ["code"]: allcode.data.code,
          });
        }
      };
      fetchDetailWorkType();
    }
  }, []);

  // useEffect(() => {
  //   const delayDebounceFn = setTimeout(() => {
  //     setInputValues({
  //       ...inputValues,
  //       value: CommonUtils.removeSpace(inputValues.value),
  //     });
  //   }, 50);

  //   return () => clearTimeout(delayDebounceFn);
  // }, [inputValues.value]);

  const handleOnChange = (event) => {
    const { name, value } = event.target;
    if (name === "value") {
      setInputValues({
        ...inputValues,
        value: value,
        code: isActionADD ? CommonUtils.replaceCode(value) : inputValues.code,
      });
    } else {
      setInputValues({ ...inputValues, [name]: value });
    }
  };

  let handleSaveWorkType = async () => {
    setIsLoading(true);
    if (isActionADD === true) {
      let res = await createAllCodeService({
        value: CommonUtils.removeSpace(inputValues.value),
        code: inputValues.code,
        type: "WORKTYPE",
      });
      setTimeout(() => {
        setIsLoading(false);
        if (res && res.errCode === 0) {
          toast.success("Thêm hình thức thành công");
          setInputValues({
            ...inputValues,
            ["value"]: "",
            ["code"]: "",
          });
        } else if (res && res.errCode === 2) {
          toast.error(res.errMessage);
        } else toast.error("Thêm hình thức thất bại");
      }, 50);
    } else {
      let res = await UpdateAllcodeService({
        value: CommonUtils.removeSpace(inputValues.value),
        code: id,
      });
      setTimeout(() => {
        setIsLoading(false);
        if (res && res.errCode === 0) {
          toast.success("Cập nhật hình thức thành công");
        } else if (res && res.errCode === 2) {
          toast.error(res.errMessage);
        } else toast.error("Cập nhật hình thức thất bại");
      }, 50);
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
                  ? "Thêm mới hình thức làm việc"
                  : "Cập nhật hình thức làm việc"}
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
                        Tên hình thức làm việc
                      </label>
                      <div className="col-sm-9">
                        <input
                          style={{ borderRadius: "30px" }}
                          type="text"
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
                      <label className="col-sm-3 col-form-label">Mã code</label>
                      <div className="col-sm-9">
                        <input
                          style={{ borderRadius: "30px" }}
                          type="text"
                          disabled={true}
                          value={inputValues.code}
                          name="code"
                          onChange={(event) => handleOnChange(event)}
                          className="form-control"
                        />
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
                  onClick={() => handleSaveWorkType()}
                >
                  <i class="ti-file btn1-icon-prepend"></i>
                  {isActionADD === true
                    ? "Thêm hình thức làm việc"
                    : "Cập nhật "}
                </button>
              </form>
            )}
            {isActionADD == false && (
              <form className="form-sample">
                <div className="row">
                  <div className="col-md-8">
                    <div className="form-group row">
                      <label className="col-sm-3 col-form-label">
                        Tên hình thức làm việc
                      </label>
                      <div className="col-sm-9">
                        <input
                          style={{ borderRadius: "30px" }}
                          type="text"
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
                      <label className="col-sm-3 col-form-label">Mã code</label>
                      <div className="col-sm-9">
                        <input
                          style={{ borderRadius: "30px" }}
                          type="text"
                          disabled={true}
                          value={inputValues.code}
                          name="code"
                          onChange={(event) => handleOnChange(event)}
                          className="form-control"
                        />
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
                  onClick={() => handleSaveWorkType()}
                >
                  <i class="ti-file btn1-icon-prepend"></i>
                  {isActionADD === true
                    ? "Thêm hình thức làm việc"
                    : "Cập nhật "}
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

export default AddWorkType;

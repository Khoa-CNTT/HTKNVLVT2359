import React from "react";
import { useEffect, useState } from "react";
import moment from "moment";
import ReactPaginate from "react-paginate";
import { Link, useParams } from "react-router-dom";
import { toast } from "react-toastify";
import Lightbox from "react-image-lightbox";
import "react-image-lightbox/style.css";
import { Input, Modal } from "antd";
import { Spinner } from "reactstrap";
import { ExclamationCircleOutlined } from "@ant-design/icons";

import {
  DeleteAllcodeService,
  getListAllCodeService,
  getDetailAllcodeByCode,
  createAllCodeService,
  UpdateAllcodeService,
} from "../../../service/userService";
import { PAGINATION } from "../../../util/constant";
import CommonUtils from "../../../util/CommonUtils";
const { confirm } = Modal;

const ManageJobType = () => {
  const [isActionADD, setisActionADD] = useState(true);
  const [isLoading, setIsLoading] = useState(false);
  const [dataJobType, setdataJobType] = useState([]);
  const [count, setCount] = useState("");
  const [numberPage, setnumberPage] = useState("");
  const [imgPreview, setimgPreview] = useState("");
  const [isOpen, setisOpen] = useState(false);
  const [search, setSearch] = useState("");
  const { code } = useParams();
  const [toggle, setToggle] = useState(false);
  const [isTrash, setIsTrash] = useState(false);
  const [dataTrashDelete, setDataTrashDelete] = useState([]);

  const [inputValues, setInputValues] = useState({
    value: "",
    code: "",
    image: "",
    imageReview: "",
    isOpen: false,
  });

  useEffect(() => {
    if (code) {
      let fetchDetailJobType = async () => {
        setisActionADD(false);
        let allcode = await getDetailAllcodeByCode(code);
        if (allcode && allcode.errCode === 0) {
          setInputValues({
            ...inputValues,
            ["value"]: allcode.data.value,
            ["code"]: allcode.data.code,
            ["image"]: allcode.data.image,
            ["imageReview"]: allcode.data.image,
          });
        }
      };
      fetchDetailJobType();
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

  let handleOnChangeImage = async (event) => {
    let data = event.target.files;
    let file = data[0];
    if (file) {
      let base64 = await CommonUtils.getBase64(file);
      let objectUrl = URL.createObjectURL(file);

      setInputValues({
        ...inputValues,
        ["image"]: base64,
        ["imageReview"]: objectUrl,
      });
    }
  };

  let openPreviewImageAdd = () => {
    if (!inputValues.imageReview) return;

    setInputValues({ ...inputValues, ["isOpen"]: true });
  };

  let handleSaveJobType = async () => {
    setIsLoading(true);
    if (isActionADD === true) {
      let res = await createAllCodeService({
        value: CommonUtils.removeSpace(inputValues.value),
        code: inputValues.code,
        type: "JOBTYPE",
        image: inputValues.image,
      });
      setTimeout(async () => {
        setIsLoading(false);
        if (res && res.errCode === 0) {
          toast.success("Thêm loại công việc thành công");
          let arrData = await getListAllCodeService({
            type: "JOBTYPE",
            limit: PAGINATION.pagerow,
            offset: numberPage * PAGINATION.pagerow,
            search: CommonUtils.removeSpace(search),
          });
          if (arrData && arrData.errCode === 0) {
            setdataJobType(arrData.data);
            setCount(Math.ceil(arrData.count / PAGINATION.pagerow));
          }
          setInputValues({
            ...inputValues,
            ["value"]: "",
            ["code"]: "",
            ["image"]: "",
            ["imageReview"]: "",
          });
        } else if (res && res.errCode === 2) {
          toast.error(res.errMessage);
        } else toast.error("Thêm loại công việc thất bại");
      }, 50);
    } else {
      let res = await UpdateAllcodeService({
        value: CommonUtils.removeSpace(inputValues.value),
        code: code,
        image: inputValues.image,
      });
      setTimeout(() => {
        setIsLoading(false);
        if (res && res.errCode === 0) {
          toast.success("Cập nhật loại công việc thành công");
        } else if (res && res.errCode === 2) {
          toast.error(res.errMessage);
        } else toast.error("Cập nhật loại công việc thất bại");
      }, 50);
    }
  };

  useEffect(() => {
    try {
      let trashDatadelete = JSON.parse(
        localStorage.getItem("TrashDelete_JobType")
      );
      if (trashDatadelete) {
        setDataTrashDelete(trashDatadelete);
      }
      let fetchData = async () => {
        let arrData = await getListAllCodeService({
          type: "JOBTYPE",
          limit: PAGINATION.pagerow,
          offset: 0,
          search: CommonUtils.removeSpace(search),
        });
        if (arrData && arrData.errCode === 0) {
          setnumberPage(0);
          setdataJobType(arrData.data);
          setCount(Math.ceil(arrData.count / PAGINATION.pagerow));
        }
      };
      fetchData();
    } catch (error) {
      console.log(error);
    }
  }, [search]);

  let openPreviewImage = (url) => {
    setimgPreview(url);
    setisOpen(true);
  };

  let handleDeleteJobType = async (id) => {
    let res = await DeleteAllcodeService(id);
    if (res && res.errCode === 0) {
      toast.success(res.errMessage);
      let arrData = await getListAllCodeService({
        type: "JOBTYPE",
        limit: PAGINATION.pagerow,
        offset: numberPage * PAGINATION.pagerow,
        search: CommonUtils.removeSpace(search),
      });
      if (arrData && arrData.errCode === 0) {
        setdataJobType(arrData.data);
        setCount(Math.ceil(arrData.count / PAGINATION.pagerow));
      }
    } else toast.error(res.errMessage);
    let dataRestorenew = dataTrashDelete.filter((value) => value.code != id);
    localStorage.setItem("TrashDelete_JobType", JSON.stringify(dataRestorenew));
    setDataTrashDelete(dataRestorenew);
  };

  let handleTransfromTrash = (id) => {
    let dataDelete = dataJobType.filter((value) => value.code == id);
    let trashDatadelete = JSON.parse(
      localStorage.getItem("TrashDelete_JobType")
    );
    if (trashDatadelete) {
      trashDatadelete.push(dataDelete[0]);
      localStorage.setItem(
        "TrashDelete_JobType",
        JSON.stringify(trashDatadelete)
      );
      setDataTrashDelete(trashDatadelete);
    } else {
      localStorage.setItem("TrashDelete_JobType", JSON.stringify(dataDelete));
      setDataTrashDelete(dataDelete);
    }
    setTimeout(() => {
      toast.success("Đã chuyển vào thùng rác");
    }, 1500);
  };

  let handleRestoreTrash = (id) => {
    let dataRestorenew = dataTrashDelete.filter((value) => value.code != id);
    localStorage.setItem("TrashDelete_JobType", JSON.stringify(dataRestorenew));
    setDataTrashDelete(dataRestorenew);
    setTimeout(() => {
      toast.success("Đã phục hồi về ban đầu");
    }, 1500);
    // Reload trang hiện tại
  };

  let handleChangePage = async (number) => {
    setnumberPage(number.selected);
    let arrData = await getListAllCodeService({
      type: "JOBTYPE",
      limit: PAGINATION.pagerow,
      offset: number.selected * PAGINATION.pagerow,
      search: CommonUtils.removeSpace(search),
    });
    if (arrData && arrData.errCode === 0) {
      setdataJobType(arrData.data);
    }
  };
  const handleSearch = (value) => {
    setSearch(value);
  };
  const confirmDelete = (id) => {
    confirm({
      title: "Bạn chắc chắn xóa",
      icon: <ExclamationCircleOutlined />,
      onOk() {
        handleDeleteJobType(id);
      },

      onCancel() {},
    });
  };

  const confirmTrash = (id) => {
    confirm({
      title: "Chuyển vào thùng rác",
      icon: <ExclamationCircleOutlined />,
      onOk() {
        handleTransfromTrash(id);
      },

      onCancel() {},
    });
  };

  const confirmRestore = (id) => {
    confirm({
      title: "Phục hồi về ban đầu",
      icon: <ExclamationCircleOutlined />,
      onOk() {
        handleRestoreTrash(id);
      },

      onCancel() {},
    });
  };

  const handleToggle = () => {
    setToggle(true);
  };

  const handleToggleClose = () => {
    setToggle(false);
  };

  const handleOpenIsTrash = () => {
    setIsTrash(true);
  };

  const handleCloseIsTrash = () => {
    setIsTrash(false);
  };

  return (
    <div>
      <div className="col-12 grid-margin">
        <div style={{ borderRadius: "30px" }} className="card">
          <div className="card-body">
            <div
              style={{
                padding: "30px 30px 30px",
                borderRadius: "30px",
                backgroundColor: "#f4f2f5",
              }}
            >
              <h4 className="card-title">
                <i>
                  {isActionADD === true
                    ? "Thêm mới loại công việc"
                    : "Cập nhật loại công việc"}
                </i>
              </h4>
              <br></br>
              {toggle == false && (
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
              {toggle && (
                <button
                  style={{
                    backgroundColor: "rgb(250 166 26)",
                    border: "1px solid rgb(250 166 26)",
                    marginBottom: "20px",
                    marginLeft: "940px",
                    fontSize: "18px",
                  }}
                  type="button"
                  className="btn1 btn1-primary1 btn1-icon-text"
                  onClick={() => handleToggleClose()}
                >
                  X
                </button>
              )}
              {toggle && (
                <form className="form-sample">
                  <div className="row">
                    <div className="col-md-8">
                      <div className="form-group row">
                        <label className="col-sm-3 col-form-label">
                          Tên loại công việc
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
                        <label className="col-sm-3 col-form-label">
                          Mã code
                        </label>
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
                  <div className="row">
                    <div className="col-md-8">
                      <div className="form-group row">
                        <label className="col-sm-3 col-form-label">
                          Hình ảnh
                        </label>
                        <div className="col-sm-9">
                          <input
                            style={{ borderRadius: "30px" }}
                            onChange={(event) => handleOnChangeImage(event)}
                            accept="image/*"
                            type="file"
                            className="form-control form-file"
                          />
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="row">
                    <div className="col-md-8">
                      <div className="form-group row">
                        <label className="col-sm-3 col-form-label">
                          Hình ảnh hiển thị
                        </label>
                        <div className="col-sm-9">
                          <div
                            style={{
                              backgroundImage: `url(${inputValues.imageReview})`,
                              borderRadius: "30px",
                              border: "1px solid black",
                            }}
                            onClick={() => openPreviewImageAdd()}
                            className="box-img-preview"
                          ></div>
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
                    onClick={() => handleSaveJobType()}
                  >
                    <i class="ti-file btn1-icon-prepend"></i>
                    Thêm Loại Công Việc
                  </button>
                </form>
              )}
            </div>
            {isTrash == false && (
              <div style={{ padding: "30px 30px 0px" }}>
                <h4 className="card-title">Danh sách loại công việc</h4>
                <Input.Search
                  onSearch={handleSearch}
                  className="mt-5 mb-5"
                  placeholder="Nhập tên công việc"
                  allowClear
                  enterButton="Tìm kiếm"
                ></Input.Search>
                <button
                  onClick={handleOpenIsTrash}
                  style={{
                    marginBottom: "10px",
                    border: "none",
                    background: "none",
                    backgroundColor: "rgb(250 166 26)",
                    padding: "5px",
                    borderRadius: "6px",
                  }}
                >
                  Thùng Rác ({dataTrashDelete.length})
                </button>
                <div
                  style={{ marginBottom: "30px" }}
                  className="table-responsive pt-2"
                >
                  <table className="table table-bordered">
                    <thead>
                      <tr>
                        <th>STT</th>
                        <th>Tên công việc</th>
                        <th>Mã code</th>
                        <th>Hình ảnh</th>
                        <th>Thao tác</th>
                      </tr>
                    </thead>
                    <tbody>
                      {dataJobType &&
                        dataJobType.length > 0 &&
                        dataJobType
                          .filter(
                            (jobSkill) =>
                              !dataTrashDelete.some(
                                (trash) => trash.code === jobSkill.code
                              )
                          )
                          .map((item, index) => {
                            return (
                              <tr key={index}>
                                <td>
                                  {index + 1 + numberPage * PAGINATION.pagerow}
                                </td>
                                <td>{item.value}</td>
                                <td>{item.code}</td>
                                <td style={{ width: "30%" }}>
                                  <div
                                    onClick={() => openPreviewImage(item.image)}
                                    className="box-img-preview"
                                    style={{
                                      backgroundImage: `url(${item.image})`,
                                      width: "100%",
                                    }}
                                  ></div>
                                </td>
                                <td style={{ textAlign: "center" }}>
                                  <Link
                                    style={{ color: "#4B49AC" }}
                                    to={`/admin/edit-job-type/${item.code}/`}
                                  >
                                    <span
                                      style={{
                                        padding: "10px",
                                        borderRadius: "10px",
                                        backgroundColor: "#57B657",
                                        color: "white",
                                      }}
                                    >
                                      Sửa
                                    </span>
                                  </Link>
                                  &nbsp; &nbsp;
                                  <a
                                    style={{ color: "#4B49AC" }}
                                    href="#"
                                    onClick={(event) => confirmTrash(item.code)}
                                  >
                                    <span
                                      style={{
                                        padding: "10px",
                                        borderRadius: "10px",
                                        backgroundColor: "#FF4747",
                                        color: "white",
                                      }}
                                    >
                                      Xóa
                                    </span>
                                  </a>
                                </td>
                              </tr>
                            );
                          })}
                    </tbody>
                  </table>
                  {dataJobType && dataJobType.length == 0 && (
                    <div style={{ textAlign: "center" }}>Không có dữ liệu</div>
                  )}
                </div>
                <ReactPaginate
                  forcePage={numberPage}
                  previousLabel={"Quay lại"}
                  nextLabel={"Tiếp"}
                  breakLabel={"..."}
                  pageCount={count}
                  marginPagesDisplayed={3}
                  containerClassName={"pagination justify-content-center pb-3"}
                  pageClassName={"page-item"}
                  pageLinkClassName={"page-link"}
                  previousLinkClassName={"page-link"}
                  previousClassName={"page-item"}
                  nextClassName={"page-item"}
                  nextLinkClassName={"page-link"}
                  breakLinkClassName={"page-link"}
                  breakClassName={"page-item"}
                  activeClassName={"active"}
                  onPageChange={handleChangePage}
                />
              </div>
            )}
            {isTrash && (
              <div style={{ padding: "30px" }}>
                <h4 className="card-title">Thùng rác loại công việc</h4>
                <button
                  onClick={handleCloseIsTrash}
                  style={{
                    marginBottom: "10px",
                    border: "none",
                    background: "none",
                    backgroundColor: "rgb(250 166 26)",
                    padding: "5px",
                    borderRadius: "6px",
                  }}
                >
                  Quay Lại
                </button>
                <div className="table-responsive pt-2">
                  <table className="table table-bordered">
                    <thead>
                      <tr>
                        <th>STT</th>
                        <th>Tên công việc</th>
                        <th>Mã code</th>
                        <th>Hình ảnh</th>
                        <th>Thao tác</th>
                      </tr>
                    </thead>
                    <tbody>
                      {dataTrashDelete &&
                        dataTrashDelete.length > 0 &&
                        dataTrashDelete.map((item, index) => {
                          return (
                            <tr key={index}>
                              <td>{index + 1}</td>
                              <td>{item.value}</td>
                              <td>{item.code}</td>
                              <td style={{ width: "30%" }}>
                                <div
                                  onClick={() => openPreviewImage(item.image)}
                                  className="box-img-preview"
                                  style={{
                                    backgroundImage: `url(${item.image})`,
                                    width: "100%",
                                  }}
                                ></div>
                              </td>
                              <td style={{ textAlign: "center" }}>
                                <a
                                  style={{ color: "#4B49AC" }}
                                  onClick={(event) => confirmRestore(item.code)}
                                >
                                  <span
                                    style={{
                                      padding: "10px",
                                      borderRadius: "10px",
                                      backgroundColor: "#57B657",
                                      color: "white",
                                    }}
                                  >
                                    Phục hồi
                                  </span>
                                </a>
                                &nbsp; &nbsp;
                                <a
                                  style={{ color: "#4B49AC" }}
                                  href="#"
                                  onClick={(event) => confirmDelete(item.code)}
                                >
                                  <span
                                    style={{
                                      padding: "10px",
                                      borderRadius: "10px",
                                      backgroundColor: "#FF4747",
                                      color: "white",
                                    }}
                                  >
                                    Xóa
                                  </span>
                                </a>
                              </td>
                            </tr>
                          );
                        })}
                    </tbody>
                  </table>
                  {dataTrashDelete && dataTrashDelete.length == 0 && (
                    <div style={{ textAlign: "center" }}>Không có dữ liệu</div>
                  )}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
      {isOpen === true && (
        <Lightbox
          mainSrc={imgPreview}
          onCloseRequest={() => setisOpen(false)}
        />
      )}
      {inputValues.isOpen === true && (
        <Lightbox
          mainSrc={inputValues.imageReview}
          onCloseRequest={() =>
            setInputValues({ ...inputValues, ["isOpen"]: false })
          }
        />
      )}
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

export default ManageJobType;

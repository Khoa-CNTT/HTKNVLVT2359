import React from "react";
import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { toast } from "react-toastify";
import ReactPaginate from "react-paginate";
import { Input, Modal, Row, Col, Select } from "antd";
import { ExclamationCircleOutlined } from "@ant-design/icons";
import "react-image-lightbox/style.css";

import {
  DeleteSkillService,
  getListSkill,
  createSkilleService,
  getDetailSkillById,
  UpdateSkillService,
} from "../../../service/userService";
import { PAGINATION } from "../../../util/constant";
import CommonUtils from "../../../util/CommonUtils";
import { useFetchAllcode } from "../../../util/fetch";
const { confirm } = Modal;

const ManageJobSkill = () => {
  const [dataJobSkill, setdataJobSkill] = useState([]);
  const [count, setCount] = useState("");
  const [numberPage, setnumberPage] = useState("");
  const [search, setSearch] = useState("");
  const [categoryJobCode, setCategoryJobCode] = useState("");
  const [isActionADD, setisActionADD] = useState(true);
  const [isLoading, setIsLoading] = useState(false);
  const { code } = useParams();
  const [toggle, setToggle] = useState(false);
  const [isTrash, setIsTrash] = useState(false);
  const [dataTrashDelete, setDataTrashDelete] = useState([]);

  useEffect(() => {
    try {
      let trashDatadelete = JSON.parse(
        localStorage.getItem("TrashDelete_JobSkill")
      );

      if (trashDatadelete) {
        setDataTrashDelete(trashDatadelete);
      }
      let fetchData = async () => {
        let arrData = await getListSkill({
          categoryJobCode: categoryJobCode,
          limit: PAGINATION.pagerow,
          offset: 0,
          search: CommonUtils.removeSpace(search),
        });
        console.log("Data : ", arrData);
        if (arrData && arrData.errCode === 0) {
          setnumberPage(0);
          setdataJobSkill(arrData.data);
          setCount(Math.ceil(arrData.count / PAGINATION.pagerow));
        }
      };
      fetchData();
    } catch (error) {
      console.log(error);
    }
  }, [search, categoryJobCode]);

  let { data: listCategoryJobCode } = useFetchAllcode("JOBTYPE");
  listCategoryJobCode = listCategoryJobCode.map((item) => ({
    value: item.code,
    label: item.value,
  }));
  listCategoryJobCode.unshift({
    value: "",
    label: "Tất cả",
  });

  let handleDeleteJobSkill = async (id) => {
    let res = await DeleteSkillService(id);
    if (res && res.errCode === 0) {
      toast.success(res.errMessage);
      let arrData = await getListSkill({
        categoryJobCode: "",
        limit: PAGINATION.pagerow,
        offset: numberPage * PAGINATION.pagerow,
        search: CommonUtils.removeSpace(search),
      });
      if (arrData && arrData.errCode === 0) {
        setdataJobSkill(arrData.data);
        setCount(Math.ceil(arrData.count / PAGINATION.pagerow));
      }
    } else toast.error(res.errMessage);
    let dataRestorenew = dataTrashDelete.filter((value) => value.id != id);
    localStorage.setItem(
      "TrashDelete_JobSkill",
      JSON.stringify(dataRestorenew)
    );
    setDataTrashDelete(dataRestorenew);
  };

  let handleTransfromTrash = (id) => {
    let dataDelete = dataJobSkill.filter((value) => value.id == id);
    let trashDatadelete = JSON.parse(
      localStorage.getItem("TrashDelete_JobSkill")
    );
    if (trashDatadelete) {
      trashDatadelete.push(dataDelete[0]);
      localStorage.setItem(
        "TrashDelete_JobSkill",
        JSON.stringify(trashDatadelete)
      );
      setDataTrashDelete(trashDatadelete);
    } else {
      localStorage.setItem("TrashDelete_JobSkill", JSON.stringify(dataDelete));
      setDataTrashDelete(dataDelete);
    }
    setTimeout(() => {
      toast.success("Đã chuyển vào thùng rác");
    }, 1500);
    // Reload trang hiện tại
  };

  let handleRestoreTrash = (id) => {
    let dataRestorenew = dataTrashDelete.filter((value) => value.id != id);
    localStorage.setItem(
      "TrashDelete_JobSkill",
      JSON.stringify(dataRestorenew)
    );
    setDataTrashDelete(dataRestorenew);
    setTimeout(() => {
      toast.success("Đã phục hồi về ban đầu");
    }, 1500);
    // Reload trang hiện tại
  };

  let handleChangePage = async (number) => {
    setnumberPage(number.selected);
    let arrData = await getListSkill({
      categoryJobCode: categoryJobCode,
      limit: PAGINATION.pagerow,
      offset: number.selected * PAGINATION.pagerow,
      search: CommonUtils.removeSpace(search),
    });
    if (arrData && arrData.errCode === 0) {
      setdataJobSkill(arrData.data);
    }
  };

  let handleOnChangeCategoryJobCode = async (value) => {
    setCategoryJobCode(value);
  };

  const handleSearch = (value) => {
    setSearch(value);
  };

  const confirmDelete = (id) => {
    confirm({
      title: "Bạn có chắc muốn xóa kĩ năng này?",
      icon: <ExclamationCircleOutlined />,
      onOk() {
        handleDeleteJobSkill(id);
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

  const [inputValues, setInputValues] = useState({
    name: "",
    categoryJobCode: "",
    id: "",
  });

  let fetchDetailJobType = async (code) => {
    setisActionADD(false);
    let skill = await getDetailSkillById(code);
    if (skill && skill.errCode === 0) {
      setInputValues({
        ...inputValues,
        ["name"]: skill.data.name,
        ["id"]: skill.data.id,
        ["categoryJobCode"]: skill.data.categoryJobCode,
      });
    }
  };

  let { data: listCategoryJobCodeAdd } = useFetchAllcode("JOBTYPE");
  listCategoryJobCodeAdd = listCategoryJobCodeAdd.map((item) => ({
    value: item.code,
    label: item.value,
  }));

  useEffect(() => {
    if (code) {
      fetchDetailJobType(code);
    }
  }, []);

  const handleOnChange = (event) => {
    const { name, value } = event.target;
    setInputValues({ ...inputValues, [name]: value });
  };

  let handleOnChangeCategoryJobCodeAdd = async (value) => {
    setInputValues({
      ...inputValues,
      categoryJobCode: value,
    });
  };

  let handleSaveJobSkill = async () => {
    setIsLoading(true);
    if (isActionADD === true) {
      let res = await createSkilleService({
        name: inputValues.name,
        categoryJobCode: inputValues.categoryJobCode,
      });
      setTimeout( async () => {
        setIsLoading(false);
        if (res && res.errCode === 0) {
          toast.success("Thêm kĩ năng thành công");
          let arrData = await getListSkill({
            categoryJobCode: "",
            limit: PAGINATION.pagerow,
            offset: numberPage * PAGINATION.pagerow,
            search: CommonUtils.removeSpace(search),
          });
          if (arrData && arrData.errCode === 0) {
            setdataJobSkill(arrData.data);
            setCount(Math.ceil(arrData.count / PAGINATION.pagerow));
          }
          setInputValues({
            ...inputValues,
            ["name"]: "",
            ["categoryJobCode"]: "",
          });
        } else if (res && res.errCode === 2) {
          toast.error(res.errMessage);
        } else toast.error("Thêm kĩ năng thất bại");
      }, 50);
    } else {
      let res = await UpdateSkillService({
        name: inputValues.name,
        id: code,
        categoryJobCode: inputValues.categoryJobCode,
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
                    ? "Thêm mới loại kĩ năng"
                    : "Cập nhật loại kĩ năng"}
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
                          Tên kĩ năng
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
                  <Row>
                    <Col xs={4} xxl={4}>
                      <label className="mr-2">Lĩnh vực</label>
                    </Col>
                    <Col style={{ marginLeft: "8px" }} xs={12} xxl={12}>
                      <Select
                        style={{ width: "84%", borderRadius: "30px" }}
                        onChange={(value) =>
                          handleOnChangeCategoryJobCodeAdd(value)
                        }
                        value={inputValues.categoryJobCode}
                        size="default"
                        options={
                          listCategoryJobCodeAdd ? listCategoryJobCodeAdd : []
                        }
                      ></Select>
                    </Col>
                  </Row>

                  <button
                    style={{
                      backgroundColor: "rgb(250 166 26)",
                      border: "1px solid rgb(250 166 26)",
                      marginTop: "40px",
                    }}
                    type="button"
                    className="btn1 btn1-primary1 btn1-icon-text"
                    onClick={() => handleSaveJobSkill()}
                  >
                    <i class="ti-file btn1-icon-prepend"></i>
                    Thêm Kĩ Năng
                  </button>
                </form>
              )}
            </div>
            {isTrash == false && (
              <div style={{ padding: "30px 30px 0px" }}>
                <h4 className="card-title">
                  <i>Danh sách các kĩ năng</i>
                </h4>
                <Row justify="space-around" className="mt-5 mb-5">
                  <Col xs={12} xxl={12}>
                    <Input.Search
                      onSearch={handleSearch}
                      placeholder="Nhập tên kĩ năng "
                      allowClear
                      enterButton="Tìm kiếm"
                    ></Input.Search>
                    <button
                      onClick={handleOpenIsTrash}
                      style={{
                        marginTop: "20px",
                        border: "none",
                        background: "none",
                        backgroundColor: "rgb(250 166 26)",
                        padding: "5px",
                        borderRadius: "6px",
                      }}
                    >
                      Thùng Rác ({dataTrashDelete.length})
                    </button>
                  </Col>
                  <Col xs={8} xxl={8}>
                    <label className="mr-2">Loại lĩnh vực : </label>
                    <Select
                      onChange={(value) => handleOnChangeCategoryJobCode(value)}
                      defaultValue={listCategoryJobCode[0]}
                      style={{ width: "50%" }}
                      size="default"
                      options={listCategoryJobCode ? listCategoryJobCode : []}
                    ></Select>
                  </Col>
                </Row>
                <div
                  style={{ marginBottom: "30px" }}
                  className="table-responsive pt-2"
                >
                  <table className="table table-bordered">
                    <thead>
                      <tr>
                        <th>STT</th>
                        <th>Tên kỹ năng</th>
                        <th>Lĩnh vực</th>
                        <th>Thao tác</th>
                      </tr>
                    </thead>
                    <tbody>
                      {dataJobSkill &&
                        dataJobSkill.length > 0 &&
                        dataJobSkill
                          .filter(
                            (jobSkill) =>
                              !dataTrashDelete.some(
                                (trash) => trash.id === jobSkill.id
                              )
                          )
                          .map((item, index) => {
                            return (
                              <tr key={index}>
                                <td>
                                  {index + 1 + numberPage * PAGINATION.pagerow}
                                </td>
                                <td>{item.name}</td>
                                <td>{item.jobTypeSkillData.value}</td>
                                <td style={{ textAlign: "center" }}>
                                  <Link
                                    style={{ color: "#4B49AC" }}
                                    to={`/admin/edit-job-skill/${item.id}/`}
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
                                    onClick={(event) => confirmTrash(item.id)}
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
                  {dataJobSkill && dataJobSkill.length == 0 && (
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
                <h4 className="card-title">
                  <i>Thùng rác các kĩ năng</i>
                </h4>
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
                        <th>Tên kỹ năng</th>
                        <th>Lĩnh vực</th>
                        <th>Thao tác</th>
                      </tr>
                    </thead>
                    <tbody>
                      {dataTrashDelete &&
                        dataTrashDelete.length > 0 &&
                        dataTrashDelete.map((item, index) => {
                          return (
                            <tr key={index}>
                              <td>
                                {index + 1}
                              </td>
                              <td>{item.name}</td>
                              <td>{item.jobTypeSkillData.value}</td>
                              <td style={{ textAlign: "center" }}>
                                <a
                                  style={{ color: "#4B49AC" }}
                                  onClick={(event) => confirmRestore(item.id)}
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
                                  onClick={(event) => confirmDelete(item.id)}
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
    </div>
  );
};

export default ManageJobSkill;

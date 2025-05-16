import React from "react";
import { useEffect, useState } from "react";
import {
  DeleteAllcodeService,
  getListAllCodeService,
} from "../../../service/userService";
import moment from "moment";
import { PAGINATION } from "../../../util/constant";
import ReactPaginate from "react-paginate";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";
import CommonUtils from "../../../util/CommonUtils";
import { Input, Modal } from "antd";
import { ExclamationCircleOutlined } from "@ant-design/icons";
import AddJobLevel from "./AddJobLevel";
const { confirm } = Modal;

const ManageJobLevel = () => {
  const [dataJobLevel, setdataJobLevel] = useState([]);
  const [count, setCount] = useState("");
  const [numberPage, setnumberPage] = useState("");
  const [search, setSearch] = useState("");
  const [isTrash, setIsTrash] = useState(false);
  const [dataTrashDelete, setDataTrashDelete] = useState([]);

  useEffect(() => {
    try {
      let trashDatadelete = JSON.parse(
        localStorage.getItem("TrashDelete_JobLevel")
      );

      if (trashDatadelete) {
        setDataTrashDelete(trashDatadelete);
      }
      let fetchData = async () => {
        let arrData = await getListAllCodeService({
          type: "JOBLEVEL",
          limit: PAGINATION.pagerow,
          offset: 0,
          search: CommonUtils.removeSpace(search),
        });
        if (arrData && arrData.errCode === 0) {
          setnumberPage(0);
          setdataJobLevel(arrData.data);
          setCount(Math.ceil(arrData.count / PAGINATION.pagerow));
        }
      };
      fetchData();
    } catch (error) {
      console.log(error);
    }
  }, [search]);

  let handleDeleteJobLevel = async (code) => {
    let res = await DeleteAllcodeService(code);
    if (res && res.errCode === 0) {
      toast.success(res.errMessage);
      let arrData = await getListAllCodeService({
        type: "JOBLEVEL",
        limit: PAGINATION.pagerow,
        offset: numberPage * PAGINATION.pagerow,
        search: CommonUtils.removeSpace(search),
      });
      if (arrData && arrData.errCode === 0) {
        setdataJobLevel(arrData.data);
        setCount(Math.ceil(arrData.count / PAGINATION.pagerow));
      }
    } else toast.error(res.errMessage);
    let dataRestorenew = dataTrashDelete.filter((value) => value.code != code);
    localStorage.setItem(
      "TrashDelete_JobLevel",
      JSON.stringify(dataRestorenew)
    );
    setDataTrashDelete(dataRestorenew);
  };

  let handleTransfromTrash = (id) => {
    let dataDelete = dataJobLevel.filter((value) => value.code == id);
    let trashDatadelete = JSON.parse(
      localStorage.getItem("TrashDelete_JobLevel")
    );
    if (trashDatadelete) {
      trashDatadelete.push(dataDelete[0]);
      localStorage.setItem(
        "TrashDelete_JobLevel",
        JSON.stringify(trashDatadelete)
      );
      setDataTrashDelete(trashDatadelete);
    } else {
      localStorage.setItem("TrashDelete_JobLevel", JSON.stringify(dataDelete));
      setDataTrashDelete(dataDelete);
    }
    setTimeout(() => {
      toast.success("Đã chuyển vào thùng rác");
    }, 1500);
    // Reload trang hiện tại
  };

  let handleRestoreTrash = (id) => {
    let dataRestorenew = dataTrashDelete.filter((value) => value.code != id);
    localStorage.setItem(
      "TrashDelete_JobLevel",
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
    let arrData = await getListAllCodeService({
      type: "JOBLEVEL",
      limit: PAGINATION.pagerow,
      offset: number.selected * PAGINATION.pagerow,
      search: CommonUtils.removeSpace(search),
    });
    if (arrData && arrData.errCode === 0) {
      setdataJobLevel(arrData.data);
    }
  };

  const handleSearch = (value) => {
    setSearch(value);
  };

  const confirmDelete = (id) => {
    confirm({
      title: "Bạn có chắc muốn xóa trình độ này này?",
      icon: <ExclamationCircleOutlined />,
      onOk() {
        handleDeleteJobLevel(id);
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
            <AddJobLevel
              style={{
                padding: "10px",
                borderRadius: "30px",
                backgroundColor: "#f4f2f5",
              }}
            />
            {isTrash == false && (
              <div style={{ padding: " 0px 30px 0px" }}>
                <h4 className="card-title">
                  <i>Danh sách các cấp bậc</i>
                </h4>
                <Input.Search
                  onSearch={handleSearch}
                  className="mt-5 mb-5"
                  placeholder="Nhập tên cấp bậc"
                  allowClear
                  enterButton="Tìm kiếm"
                ></Input.Search>
                <button
                  onClick={handleOpenIsTrash}
                  style={{
                    marginTop: "20px",
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
                <div className="table-responsive pt-2">
                  <table
                    style={{ marginBottom: "30px" }}
                    className="table table-bordered"
                  >
                    <thead>
                      <tr>
                        <th>STT</th>
                        <th>Tên cấp bậc</th>
                        <th>Mã code</th>

                        <th>Thao tác</th>
                      </tr>
                    </thead>
                    <tbody>
                      {dataJobLevel &&
                        dataJobLevel.length > 0 &&
                        dataJobLevel
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
                                <td style={{ textAlign: "center" }}>
                                  <Link
                                    style={{ color: "#4B49AC" }}
                                    to={`/admin/edit-job-level/${item.code}/`}
                                  >
                                    <span className="btn_update">Sửa</span>
                                  </Link>
                                  &nbsp; &nbsp;
                                  <a
                                    style={{ color: "#4B49AC" }}
                                    href="#"
                                    onClick={(event) => confirmTrash(item.code)}
                                  >
                                    <span className="btn_delete">Xóa</span>
                                  </a>
                                </td>
                              </tr>
                            );
                          })}
                    </tbody>
                  </table>
                  {dataJobLevel && dataJobLevel.length == 0 && (
                    <div style={{ textAlign: "center" }}>Không có dữ liệu</div>
                  )}
                  <ReactPaginate
                    forcePage={numberPage}
                    previousLabel={"Quay lại"}
                    nextLabel={"Tiếp"}
                    breakLabel={"..."}
                    pageCount={count}
                    marginPagesDisplayed={3}
                    containerClassName={
                      "pagination justify-content-center pb-3"
                    }
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
              </div>
            )}
            {isTrash && (
              <div style={{ padding: " 0px 30px 30px" }}>
                <h4 className="card-title">
                  <i>Thùng rác các cấp bậc</i>
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
                        <th>Tên cấp bậc</th>
                        <th>Mã code</th>

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
                              <td>{item.value}</td>
                              <td>{item.code}</td>
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
                                  <span className="btn_delete">Xóa</span>
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

export default ManageJobLevel;

import React from "react";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import { Input } from "antd";
import ReactPaginate from "react-paginate";
import { Link, useParams } from "react-router-dom";
import moment from "moment";
import { Spinner, Modal } from "reactstrap";

import {
  getAllUsers,
  BanUserService,
  UnbanUserService,
  createNewUser,
  getDetailUserById,
  UpdateUserService,
} from "../../../service/userService";
import { PAGINATION } from "../../../util/constant";
import CommonUtils from "../../../util/CommonUtils";
import { useFetchAllcode } from "../../../util/fetch";
import DatePicker from "../../../components/input/DatePicker";

const ManageUser = () => {
  const userAdd = JSON.parse(localStorage.getItem("userData"));
  const [birthday, setbirthday] = useState("");
  const [isChangeDate, setisChangeDate] = useState(false);
  const [isActionADD, setisActionADD] = useState(true);
  const [isLoading, setIsLoading] = useState(false);
  const { id } = useParams();
  const [user, setUser] = useState({});
  const [dataUser, setdataUser] = useState([]);
  const [count, setCount] = useState("");
  const [numberPage, setnumberPage] = useState(0);
  const [search, setSearch] = useState("");
  const [total, setTotal] = useState(0);

  const [inputValues, setInputValues] = useState({
    email: "",
    firstName: "",
    lastName: "",
    address: "",
    phonenumber: "",
    genderCode: "",
    roleCode: "",
    id: "",
    dob: "",
    image: "",
  });
  let setStateUser = (data) => {
    setInputValues({
      ...inputValues,
      ["firstName"]: data.userAccountData.firstName,
      ["lastName"]: data.userAccountData.lastName,
      ["address"]: data.userAccountData.address,
      ["phonenumber"]: data.phonenumber,
      ["genderCode"]: data.userAccountData.genderCode,
      ["roleCode"]: data.roleData.code,
      ["id"]: data.userAccountData.id,
      ["dob"]: data.userAccountData.dob,
    });
    document.querySelector('[name="genderCode"]').value =
      data.userAccountData.genderCode;
    document.querySelector('[name="roleCode"]').value = data.roleData.code;
    setbirthday(
      data.userAccountData.dob
        ? moment
            .unix(+data.userAccountData.dob / 1000)
            .locale("vi")
            .format("DD/MM/YYYY")
        : null
    );
  };
  useEffect(() => {
    if (id) {
      let fetchUser = async () => {
        setisActionADD(false);
        let user = await getDetailUserById(id);
        if (user && user.errCode === 0) {
          setStateUser(user.data);
        }
      };
      fetchUser();
    }
  }, []);

  let { data: dataGender } = useFetchAllcode("GENDER");
  let { data: dataRole } = useFetchAllcode("ROLE");
  if (dataRole && dataRole.length > 0) {
    if (userAdd.roleCode === "COMPANY")
      dataRole = dataRole.filter(
        (item) => item.code !== "ADMIN" && item.code !== "CANDIDATE"
      );
    else if (userAdd.roleCode === "ADMIN" && isActionADD === true) {
      dataRole = dataRole.filter((item) => item.code !== "COMPANY");
    }
  }
  if (
    dataGender &&
    dataGender.length > 0 &&
    inputValues.genderCode === "" &&
    dataRole &&
    dataRole.length > 0 &&
    inputValues.roleCode === "" &&
    isActionADD
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

  let handleOnChangeDatePicker = (date) => {
    setbirthday(date[0]);
    setisChangeDate(true);
  };
  let handleSaveUser = async () => {
    setIsLoading(true);
    if (isActionADD === true) {
      let params = {
        email: inputValues.email,
        firstName: inputValues.firstName,
        lastName: inputValues.lastName,
        address: inputValues.address,
        roleCode: inputValues.roleCode,
        genderCode: inputValues.genderCode,
        phonenumber: inputValues.phonenumber,
        image:
          "https://res.cloudinary.com/bingo2706/image/upload/v1642521841/dev_setups/l60Hf_blyqhb.png",
        dob: new Date(birthday).getTime(),
      };
      if (userAdd.roleCode === "COMPANY") {
        params.companyId = userAdd.companyId;
      }
      let res = await createNewUser(params);
      setTimeout(() => {
        setIsLoading(false);
        if (res && res.errCode === 0) {
          toast.success("Thêm mới user thành công");
          setInputValues({
            ...inputValues,
            ["firstName"]: "",
            ["lastName"]: "",
            ["address"]: "",
            ["phonenumber"]: "",
            ["genderCode"]: "",
            ["roleCode"]: "",
            ["image"]: "",
            ["password"]: "",
          });
          setbirthday("");
        } else {
          toast.error(res.errMessage);
        }
      }, 1000);
    } else {
      let res = await UpdateUserService({
        id: inputValues.id,
        firstName: inputValues.firstName,
        lastName: inputValues.lastName,
        address: inputValues.address,
        roleCode: inputValues.roleCode,
        genderCode: inputValues.genderCode,
        dob:
          isChangeDate === false
            ? inputValues.dob
            : new Date(birthday).getTime(),
      });
      setTimeout(() => {
        setIsLoading(false);
        if (res && res.errCode === 0) {
          toast.success("Cập nhật người dùng thành công");
        } else {
          toast.error(res.errMessage);
        }
      }, 1000);
    }
  };

  let fetchAllUser = async () => {
    const userData = JSON.parse(localStorage.getItem("userData"));
    setUser(userData);

    let res = await getAllUsers({
      limit: PAGINATION.pagerow,
      offset: 0,
      search: CommonUtils.removeSpace(search),
    });
    if (res && res.errCode === 0) {
      setnumberPage(0);
      setdataUser(res.data);
      setCount(Math.ceil(res.count / PAGINATION.pagerow));
      setTotal(res.count);
    }
  };
  useEffect(async () => {
    await fetchAllUser();
  }, [search]);
  let handleChangePage = async (number) => {
    setnumberPage(number.selected);
    let arrData = await getAllUsers({
      limit: PAGINATION.pagerow,
      offset: number.selected * PAGINATION.pagerow,
      search: CommonUtils.removeSpace(search),
    });
    if (arrData && arrData.errCode === 0) {
      setdataUser(arrData.data);
      setTotal(arrData.count);
    }
  };
  let handlebanUser = async (event, item) => {
    event.preventDefault();
    let res = {};
    if (item.statusCode == "S1") {
      res = await BanUserService(item.userAccountData.id);
    } else {
      res = await UnbanUserService(item.userAccountData.id);
    }
    if (res && res.errCode === 0) {
      toast.success(res.errMessage);
      let user = await getAllUsers({
        limit: PAGINATION.pagerow,
        offset: numberPage * PAGINATION.pagerow,
      });
      if (user && user.errCode === 0) {
        setdataUser(user.data);
        setTotal(user.count);
        setCount(Math.ceil(user.count / PAGINATION.pagerow));
      }
    } else {
      toast.error(res.errMessage);
    }
  };
  const handleSearch = (value) => {
    setSearch(value);
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
                    ? "Thêm mới người dùng"
                    : "Cập nhật người dùng"}
                </i>
              </h4>
              <br></br>
              <form className="form-sample">
                <div className="row">
                  <div className="col-md-6">
                    <div className="form-group row">
                      <label className="col-sm-3 col-form-label">Họ</label>
                      <div className="col-sm-9">
                        <input
                          style={{ borderRadius: "30px" }}
                          type="text"
                          value={inputValues.firstName}
                          name="firstName"
                          onChange={(event) => handleOnChange(event)}
                          className="form-control"
                        />
                      </div>
                    </div>
                  </div>
                  <div className="col-md-6">
                    <div className="form-group row">
                      <label className="col-sm-3 col-form-label">Tên</label>
                      <div className="col-sm-9">
                        <input
                          style={{ borderRadius: "30px" }}
                          type="text"
                          value={inputValues.lastName}
                          name="lastName"
                          onChange={(event) => handleOnChange(event)}
                          className="form-control"
                        />
                      </div>
                    </div>
                  </div>
                </div>
                <div className="row">
                  <div className="col-md-6">
                    <div className="form-group row">
                      <label className="col-sm-3 col-form-label">Email</label>
                      <div className="col-sm-9">
                        <input
                          style={{ borderRadius: "30px" }}
                          type="email"
                          value={inputValues.email}
                          disabled={isActionADD === true ? false : true}
                          name="email"
                          onChange={(event) => handleOnChange(event)}
                          className="form-control"
                        />
                      </div>
                    </div>
                  </div>
                  <div className="col-md-6">
                    <div className="form-group row">
                      <label className="col-sm-3 col-form-label">
                        Số điện thoại
                      </label>
                      <div className="col-sm-9">
                        <input
                          style={{ borderRadius: "30px" }}
                          type="number"
                          value={inputValues.phonenumber}
                          disabled={isActionADD === true ? false : true}
                          name="phonenumber"
                          onChange={(event) => handleOnChange(event)}
                          className="form-control"
                        />
                      </div>
                    </div>
                  </div>
                </div>
                <div className="row">
                  <div className="col-md-6">
                    <div className="form-group row">
                      <label className="col-sm-3 col-form-label">
                        Giới tính
                      </label>
                      <div className="col-sm-9">
                        <select
                          style={{ color: "black", borderRadius: "30px" }}
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
                    </div>
                  </div>
                  <div className="col-md-6">
                    <div className="form-group row">
                      <label className="col-sm-3 col-form-label">
                        Ngày sinh
                      </label>
                      <div className="col-sm-9">
                        <DatePicker
                          style={{ borderRadius: "30px" }}
                          className="form-control"
                          onChange={handleOnChangeDatePicker}
                          value={birthday}
                        />
                      </div>
                    </div>
                  </div>
                </div>

                <div className="row">
                  <div className="col-md-6">
                    <div className="form-group row">
                      <label className="col-sm-3 col-form-label">Địa chỉ</label>
                      <div className="col-sm-9">
                        <input
                          style={{ borderRadius: "30px" }}
                          type="text"
                          value={inputValues.address}
                          name="address"
                          onChange={(event) => handleOnChange(event)}
                          className="form-control"
                        />
                      </div>
                    </div>
                  </div>
                  <div className="col-md-6">
                    <div className="form-group row">
                      <label className="col-sm-3 col-form-label">Quyền</label>
                      <div className="col-sm-9">
                        <select
                          style={{ color: "black", borderRadius: "30px" }}
                          className="form-control"
                          value={inputValues.roleCode}
                          name="roleCode"
                          onChange={(event) => handleOnChange(event)}
                        >
                          {dataRole &&
                            dataRole.length > 0 &&
                            dataRole.map((item, index) => {
                              return (
                                <option key={index} value={item.code}>
                                  {item.value}
                                </option>
                              );
                            })}
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
                  onClick={() => handleSaveUser()}
                  className="btn1 btn1-primary1 btn1-icon-text"
                >
                  <i class="ti-file btn1-icon-prepend"></i>
                  Thêm Người Dùng
                </button>
              </form>
            </div>
            <div style={{ padding: "30px 30px 30px" }}>
              <h4 className="card-title">
                <i>Danh sách người dùng</i>
              </h4>
              <Input.Search
                onSearch={handleSearch}
                className="mt-5 mb-5"
                placeholder="Nhập tên hoặc số điện thoại"
                allowClear
                enterButton="Tìm kiếm"
              ></Input.Search>
              <div>
                <b>
                  <i>Số lượng người dùng:</i>
                </b>{" "}
                {total}
              </div>

              <div className="table-responsive pt-2">
                <table className="table table-bordered">
                  <thead>
                    <tr>
                      <th>STT</th>
                      <th>Họ và Tên</th>
                      <th>Số điện thoại</th>
                      <th>Giới tính</th>
                      <th>Ngày sinh</th>
                      <th>Quyền</th>
                      <th>Trạng thái</th>
                      <th>Thao tác</th>
                    </tr>
                  </thead>
                  <tbody>
                    {dataUser &&
                      dataUser.length > 0 &&
                      dataUser.map((item, index) => {
                        let date = item.userAccountData.dob
                          ? moment
                              .unix(item.userAccountData.dob / 1000)
                              .format("DD/MM/YYYY")
                          : "Không có thông tin";
                        return (
                          <tr key={index}>
                            <td>
                              {index + 1 + numberPage * PAGINATION.pagerow}
                            </td>
                            <td>{`${item.userAccountData.firstName} ${item.userAccountData.lastName}`}</td>
                            <td>{item.phonenumber}</td>
                            <td>{item.userAccountData.genderData.value}</td>
                            <td>{date}</td>
                            <td>{item.roleData.value}</td>
                            <td>
                              <label
                                className={
                                  item.statusCode === "S1"
                                    ? "badge badge-success"
                                    : "badge badge-danger"
                                }
                              >
                                {item.statusAccountData.value}
                              </label>
                            </td>
                            <td>
                              <Link
                                style={{ color: "#4B49AC" }}
                                to={`/admin/edit-user/${item.userAccountData.id}/`}
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
                              {user.id != item.id && (
                                <a
                                  style={{ color: "#4B49AC" }}
                                  href="#"
                                  onClick={(event) =>
                                    handlebanUser(event, item)
                                  }
                                >
                                  <span
                                    style={{
                                      padding: "10px",
                                      borderRadius: "10px",
                                      backgroundColor: "#FF4747",
                                      color: "white",
                                    }}
                                  >
                                    {" "}
                                    {item.statusCode === "S1"
                                      ? "Chặn"
                                      : "Kích hoạt"}
                                  </span>
                                </a>
                              )}
                            </td>
                          </tr>
                        );
                      })}
                  </tbody>
                </table>
                {dataUser && dataUser.length == 0 && (
                  <div style={{ textAlign: "center" }}>Không có dữ liệu</div>
                )}
              </div>
            </div>
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

export default ManageUser;

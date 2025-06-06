import React from "react";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import ReactPaginate from "react-paginate";
import { DatePicker } from "antd";
import moment from "moment";

import {
  getStatisticalTypePost,
  getStatisticalPackagePost,
  getStatisticalPackageCv,
  getAllUsers,
  getAllCandidate,
  getAllUserCompany,
} from "../../service/userService";
import { getStatisticalCv } from "../../service/cvService";
import { PAGINATION } from "../../util/constant";
import CommonUtils from "../../util/CommonUtils";

const Home = () => {
  const { RangePicker } = DatePicker;
  const today = new Date();
  const yyyy = today.getFullYear();
  let mm = today.getMonth() + 1; // Months start at 0!
  let dd = today.getDate();
  if (dd < 10) dd = "0" + dd;
  if (mm < 10) mm = "0" + mm;
  const formattedToday = yyyy + "-" + mm + "-" + dd;
  const [user, setUser] = useState({});
  const [dataUserCom, setDataUserCom] = useState([]);
  const [dataUserCan, setDataUserCan] = useState([]);
  const [dataStatisticalTypePost, setDataStatisticalTypePost] = useState([]);
  const [dataStatisticalPackagePost, setDataStatisticalPackagePost] = useState(
    []
  );
  const [dataStatisticalPackageCv, setDataStatisticalPackageCv] = useState([]);
  const [dataSum, setDataSum] = useState(0);
  const [dataSumCv, setDataSumCv] = useState(0);
  const [formDatePost, setFormDatePost] = useState(formattedToday);
  const [formDateCv, setFormDateCv] = useState(formattedToday);
  const [toDatePost, setToDatePost] = useState(formattedToday);
  const [toDateCv, setToDateCv] = useState(formattedToday);

  const [dataCv, setDataCv] = useState([]);
  const [count, setCount] = useState("");
  const [countCv, setCountCv] = useState("");
  const [countCompany, setCountCompany] = useState("");
  const [countCandidate, setCountCandidate] = useState("");
  const [totalCom, setTotalCom] = useState(0);
  const [totalCan, setTotalCan] = useState(0);

  const [numberPage, setnumberPage] = useState("");
  const [numberPageCv, setnumberPageCv] = useState("");
  const [numberPageCom, setnumberPageCom] = useState("");
  const [numberPageCan, setnumberPageCan] = useState("");

  let sendParams = {
    limit: PAGINATION.pagerow,
    offset: 0,
    fromDate: formattedToday,
    toDate: formattedToday,
    companyId: user.companyId,
  };

  let fetchAllUser = async () => {
    let resCandidate = await getAllCandidate({
      limit: 4,
      offset: 0,
      role: "CANDIDATE",
    });

    let resCompany = await getAllUserCompany({
      limit: 4,
      offset: 0,
      role: "COMPANY",
    });

    if (resCandidate && resCandidate.errCode === 0 && resCompany && resCompany.errCode === 0) {
      setDataUserCan(resCandidate.data);
      setDataUserCom(resCompany.data);
      setCountCompany(Math.ceil(resCompany.count / 4));
      setCountCandidate(Math.ceil(resCandidate.count / 4));
      setTotalCom(resCompany.count);
      setTotalCan(resCandidate.count);
    }

  };

  let getStatistical = async (fromDate, toDate, type = "packageCv") => {
    let arrData = [];
    if (type === "packagePost") {
      setFormDatePost(fromDate);
      arrData = await getStatisticalPackagePost({
        fromDate,
        toDate,
        limit: PAGINATION.pagerow,
        offset: 0,
      });
      if (arrData && arrData.errCode === 0) {
        setDataStatisticalPackagePost(arrData.data);
        setDataSum(arrData.sum);
        setCount(Math.ceil(arrData.count / PAGINATION.pagerow));
      }
    } else {
      setFormDateCv(fromDate);
      arrData = await getStatisticalPackageCv({
        fromDate,
        toDate,
        limit: PAGINATION.pagerow,
        offset: 0,
      });
      if (arrData && arrData.errCode === 0) {
        setDataStatisticalPackageCv(arrData.data);
        setDataSumCv(arrData.sum);
        setCountCv(Math.ceil(arrData.count / PAGINATION.pagerow));
      }
    }
  };

  let onDatePicker = async (values, type = "") => {
    let fromDate = formattedToday;
    let toDate = formattedToday;
    if (values) {
      fromDate = values[0].format("YYYY-MM-DD");
      toDate = values[1].format("YYYY-MM-DD");
    }
    if (user.roleCode !== "ADMIN") {
      let arrData = await getStatisticalCv({
        ...sendParams,
        fromDate,
        toDate,
        offset: 0,
      });
      if (arrData && arrData.errCode === 0) {
        setDataCv(arrData.data);
        setCount(Math.ceil(arrData.count / PAGINATION.pagerow));
      }
    } else {
      getStatistical(fromDate, toDate, type);
    }
  };

  let getStatisticalChangePage = async (type, number) => {
    let arrData = [];
    if (type === "packagePost") {
      setnumberPage(number.selected);
      arrData = await getStatisticalPackagePost({
        fromDate: formattedToday,
        toDate: formattedToday,
        limit: PAGINATION.pagerow,
        offset: number.selected * PAGINATION.pagerow,
      });
      if (arrData && arrData.errCode === 0) {
        setDataStatisticalPackagePost(arrData.data);
        setDataSum(arrData.sum);
        setCount(Math.ceil(arrData.count / PAGINATION.pagerow));
      }
    } else if (type === "Company") {
      setnumberPageCom(number.selected);
      console.log("Number : " , number.selected)
      let arrData = await getAllUserCompany({
        limit: 4,
        offset: number.selected * 4,
        role: "COMPANY",
      });
      if (arrData && arrData.errCode === 0) {
        setDataUserCom(arrData.data);
        setCountCompany(Math.ceil(arrData.count / 4));
      }
    } else if (type === "Candidate") {

      setnumberPageCan(number.selected);
      let arrData = await getAllCandidate({
        limit: 4,
        offset: number.selected * 4,
        role: "CANDIDATE",
      });
      if (arrData && arrData.errCode === 0) {
        setDataUserCan(arrData.data);
        setCountCandidate(Math.ceil(arrData.count / 4));
      }
    } else {
      setnumberPageCv(number.selected);
      arrData = await getStatisticalPackageCv({
        fromDate: formattedToday,
        toDate: formattedToday,
        limit: PAGINATION.pagerow,
        offset: number.selected * PAGINATION.pagerow,
      });
      if (arrData && arrData.errCode === 0) {
        setDataStatisticalPackageCv(arrData.data);
        setDataSumCv(arrData.sum);
        setCountCv(Math.ceil(arrData.count / PAGINATION.pagerow));
      }
    }
  };

  let handleChangePage = async (number, type = "") => {
    if (user.roleCode !== "ADMIN") {
      setnumberPage(number.selected);
      let arrData = await getStatisticalCv({
        ...sendParams,
        limit: PAGINATION.pagerow,
        offset: number.selected * PAGINATION.pagerow,
      });
      if (arrData && arrData.errCode === 0) {
        setDataCv(arrData.data);
      }
    } else {
      getStatisticalChangePage(type, number);
    }
  };

  let handleOnClickExport = async (type) => {
    let res = [];
    if (type === "packagePost") {
      res = await getStatisticalPackagePost({
        fromDate: formDatePost,
        toDate: toDatePost,
        limit: "",
        offset: "",
      });
    } else {
      res = await getStatisticalPackageCv({
        fromDate: formDateCv,
        toDate: toDateCv,
        limit: "",
        offset: "",
      });
    }
    if (res.errCode === 0) {
      let formatData = res.data.map((item) => {
        let obj = {
          "Mã gói": item.id,
          "Tên gói": item.name,
          "Loại gói": item.isHot === 1 ? "Loại nổi bật" : "Loại bình thường",
          "Số lượng": +item.count,
          Tổng: +item.total + "VNĐ",
        };
        if (type !== "packagePost") delete obj["Loại gói"];
        return obj;
      });
      if (type === "packagePost") {
        await CommonUtils.exportExcel(
          formatData,
          "Statistical Package Post",
          "Statistical Package Post"
        );
      } else {
        await CommonUtils.exportExcel(
          formatData,
          "Statistical Package Candiate",
          "Statistical Package Candiate"
        );
      }
    }
  };

  const getData = async (limit) => {
    let res = await getStatisticalTypePost(limit);
    let other = res.totalPost;
    let otherPercent = 100;
    let color = ["red", "yellow", "green", "blue", "orange"];
    if (res.errCode === 0) {
      let newdata = res.data.map((item, index) => {
        other -= item.amount;
        otherPercent -=
          Math.round((item.amount / res.totalPost) * 100 * 100) / 100;
        return {
          title: item.postDetailData.jobTypePostData.value,
          value: Math.round((item.amount / res.totalPost) * 100 * 100) / 100,
          color: color[index],
          amount: item.amount,
        };
      });
      if (other > 0) {
        newdata.push({
          title: "Lĩnh vực khác",
          value: Math.round(otherPercent * 100) / 100,
          color: color[4],
          amount: other,
        });
      }
      setDataStatisticalTypePost(newdata);
    } else toast.error(res.message);
  };

  useEffect(async () => {
    const userData = JSON.parse(localStorage.getItem("userData"));
    setUser(userData);
    getData(4);
  }, []);

  useEffect(() => {
    try {
      let fetchData = async () => {
        const userData = JSON.parse(localStorage.getItem("userData"));
        if (userData.roleCode !== "ADMIN") {
          let arrData = await getStatisticalCv({
            ...sendParams,
            companyId: userData.companyId,
          });
          if (arrData && arrData.errCode === 0) {
            setDataCv(arrData.data);
            setCount(Math.ceil(arrData.count / PAGINATION.pagerow));
          }
        } else {
          getStatistical(formattedToday, formattedToday, "packagePost");
          getStatistical(formattedToday, formattedToday, "packageCv");
          fetchAllUser();
        }
      };
      fetchData();
    } catch (error) {
      console.log(error);
    }
  }, []);

  return (
    <>
      <div style={{ marginLeft: "15px" }} className="row">
        <div className="col-md-12 grid-margin">
          <div className="row">
            <div className="col-12 col-xl-8 mb-4 mb-xl-0">
              <h3 className="font-weight-bold">
                Xin chào {user.firstName + " " + user.lastName}
              </h3>
              <h3
                style={{ textTransform: "uppercase" }}
                className="font-weight-normal mb-0"
              >
                Thống Kê Số Lượng Bài Đăng Từng Lĩnh Vực
              </h3>
            </div>
          </div>
        </div>
      </div>
      <div style={{ marginLeft: "15px", marginBottom: "10px" }} className="row">
        <div className="col-md-4">
          {dataStatisticalTypePost.map((item, index) => {
            return (
              <div
                style={{
                  display: "flex",
                  gap: "15px",
                  alignItems: "center",
                  marginBottom: "10px",
                }}
              >
                <div
                  style={{
                    width: "50px",
                    backgroundColor: item.color,
                    height: "20px",
                  }}
                ></div>
                <span>
                  {item.title}: {item.amount} bài
                </span>
              </div>
            );
          })}
        </div>
        {/* <div style={{ width: "300px", height: "300px"}} className="col-md-8">
                    <PieChart
                        label={({ x, y, dx, dy, dataEntry }) => (
                            <text
                                x={x - 5}
                                y={y}
                                dx={dx}
                                dy={dy}
                                dominant-baseline="central"
                                text-anchor="center"
                                style={{ fontSize: '4px' }}
                            >
                                {`${dataEntry.value}%`}

                            </text>
                        )}
                        data={dataStatisticalTypePost}

                    />;
                </div> */}
      </div>
      {user.companyId && (
        <div className="col-12 grid-margin">
          <div
            style={{ padding: "20px", borderRadius: "30px" }}
            className="card"
          >
            <div className="card-body">
              <h4 className="card-title">
                <i>Bảng thống kê số lượng bài đăng của công ty</i>
              </h4>
              <RangePicker
                style={{ borderRadius: "30px" }}
                onChange={(values) => onDatePicker(values)}
              ></RangePicker>
              <div className="table-responsive pt-2">
                <table className="table table-bordered">
                  <thead>
                    <tr>
                      <th>STT</th>
                      <th>Tên bài viết</th>
                      <th>Mã bài viết</th>
                      <th>Người viết</th>
                      <th>Số lượng CV</th>
                    </tr>
                  </thead>
                  <tbody>
                    {dataCv &&
                      dataCv.length > 0 &&
                      dataCv.map((item, index) => {
                        return (
                          <tr key={index}>
                            <td>
                              {index + 1 + numberPage * PAGINATION.pagerow}
                            </td>
                            <td>{item.postDetailData.name}</td>
                            <td>{item.id}</td>
                            <td>
                              {item.userPostData.firstName +
                                " " +
                                item.userPostData.lastName}
                            </td>
                            <td>{item.total}</td>
                          </tr>
                        );
                      })}
                  </tbody>
                </table>
                {dataCv && dataCv.length == 0 && (
                  <div style={{ textAlign: "center" }}>Không có dữ liệu</div>
                )}
              </div>
            </div>
            <ReactPaginate
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
              onPageChange={(number) => handleChangePage(number)}
            />
          </div>
        </div>
      )}
      {user.roleCode === "ADMIN" && (
        <>
          <div className="col-12 grid-margin">
            <div
              style={{ padding: "30px", borderRadius: "30px" }}
              className="card"
            >
              <div className="card-body">
                <h4 className="card-title">
                  <i>Bảng thống kê doanh thu các gói bài đăng</i>
                </h4>
                <button
                  style={{ float: "right", borderRadius: "30px" }}
                  onClick={() => handleOnClickExport("packagePost")}
                >
                  Xuất excel <i class="fa-solid fa-file-excel"></i>
                </button>
                <RangePicker
                  style={{ borderRadius: "30px" }}
                  onChange={(values) => onDatePicker(values, "packagePost")}
                  format={"DD/MM/YYYY"}
                ></RangePicker>

                <div
                  style={{ marginTop: "20px" }}
                  className="table-responsive pt-2"
                >
                  <table className="table table-bordered">
                    <thead>
                      <tr>
                        <th>STT</th>
                        <th>Tên gói</th>
                        <th>Mã gói</th>
                        <th>Loại gói</th>
                        <th>Số lượng đã bán</th>
                        <th>Doanh thu</th>
                      </tr>
                    </thead>
                    <tbody>
                      {dataStatisticalPackagePost &&
                        dataStatisticalPackagePost.length > 0 &&
                        dataStatisticalPackagePost.map((item, index) => {
                          return (
                            <tr key={index}>
                              <td>
                                {index + 1 + numberPage * PAGINATION.pagerow}
                              </td>
                              <td>{item.name}</td>
                              <td>{item.id}</td>
                              <td>
                                {item.isHot == 0
                                  ? "Loại bình thường"
                                  : "Loại nổi bật"}
                              </td>
                              <td>{item.count}</td>
                              <td style={{ textAlign: "right" }}>
                                {(item.total * 1000000).toLocaleString("vi-VN")}{" "}
                                VNĐ
                              </td>
                            </tr>
                          );
                        })}
                    </tbody>
                  </table>
                  {dataStatisticalPackagePost &&
                    dataStatisticalPackagePost.length == 0 && (
                      <div style={{ textAlign: "center" }}>
                        Không có dữ liệu
                      </div>
                    )}
                </div>
              </div>
              {dataStatisticalPackagePost &&
                dataStatisticalPackagePost.length > 0 && (
                  <div
                    class="mr-4"
                    style={{ display: "flex", justifyContent: "end" }}
                  >
                    <b>Tổng doanh thu : &nbsp;</b>
                    {(dataSum * 1000000).toLocaleString("vi-VN")} VNĐ
                  </div>
                )}
              <ReactPaginate
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
                onPageChange={(number) =>
                  handleChangePage(number, "packagePost")
                }
              />
            </div>
          </div>
          <div className="col-12 grid-margin">
            <div
              style={{ padding: "30px", borderRadius: "30px" }}
              className="card"
            >
              <div className="card-body">
                <h4 className="card-title">
                  <i>Bảng thống kê doanh thu các gói mua lượt xem ứng viên</i>
                </h4>
                <button
                  style={{ float: "right", borderRadius: "30px" }}
                  onClick={() => handleOnClickExport("packageCv")}
                >
                  Xuất excel <i class="fa-solid fa-file-excel"></i>
                </button>
                <RangePicker
                  style={{ borderRadius: "30px" }}
                  onChange={(values) => onDatePicker(values, "packageCv")}
                  format={"DD/MM/YYYY"}
                ></RangePicker>

                <div
                  style={{ marginTop: "20px" }}
                  className="table-responsive pt-2"
                >
                  <table className="table table-bordered">
                    <thead>
                      <tr>
                        <th>STT</th>
                        <th>Tên gói</th>
                        <th>Mã gói</th>
                        <th>Số lượng đã bán</th>
                        <th>Doanh thu</th>
                      </tr>
                    </thead>
                    <tbody>
                      {dataStatisticalPackageCv &&
                        dataStatisticalPackageCv.length > 0 &&
                        dataStatisticalPackageCv.map((item, index) => {
                          return (
                            <tr key={index}>
                              <td>
                                {index + 1 + numberPageCv * PAGINATION.pagerow}
                              </td>
                              <td>{item.name}</td>
                              <td>{item.id}</td>
                              <td>{item.count}</td>
                              <td style={{ textAlign: "right" }}>
                                {(item.total * 1000000).toLocaleString("vi-VN")}{" "}
                                VNĐ
                              </td>
                            </tr>
                          );
                        })}
                    </tbody>
                  </table>
                  {dataStatisticalPackageCv &&
                    dataStatisticalPackageCv.length == 0 && (
                      <div style={{ textAlign: "center" }}>
                        Không có dữ liệu
                      </div>
                    )}
                </div>
              </div>
              {dataStatisticalPackageCv &&
                dataStatisticalPackageCv.length > 0 && (
                  <div
                    class="mr-4"
                    style={{ display: "flex", justifyContent: "end" }}
                  >
                    <b>Tổng doanh thu : &nbsp;</b>
                    {(dataSumCv * 1000000).toLocaleString("vi-VN")} VNĐ
                  </div>
                )}
              <ReactPaginate
                previousLabel={"Quay lại"}
                nextLabel={"Tiếp"}
                breakLabel={"..."}
                pageCount={countCv}
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
                onPageChange={(number) => handleChangePage(number, "packageCv")}
              />
            </div>
          </div>
          <div className="col-12 grid-margin">
            <div
              style={{ padding: "30px", borderRadius: "30px" }}
              className="card"
            >
              <div className="card-body">
                <h4 className="card-title">
                  <i>Bảng thống kê danh sách ứng viên</i>
                </h4>
                <div>
                <b>
                  <i>Số lượng ứng viên :</i>
                </b>{" "}
                {totalCan}
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
                      </tr>
                    </thead>
                    <tbody>
                      {dataUserCan &&
                        dataUserCan.length > 0 &&
                        dataUserCan.map((item, index) => {
                          let date = item.userAccountData.dob
                            ? moment
                                .unix(item.userAccountData.dob / 1000)
                                .format("DD/MM/YYYY")
                            : "Không có thông tin";
                          return (
                            <>
                              {item.id != 71 && (
                                <tr key={index}>
                                  <>
                                    <td>
                                      {index + 1 + numberPageCan * PAGINATION.pagerow}
                                    </td>
                                    <td>{`${item.userAccountData.firstName} ${item.userAccountData.lastName}`}</td>
                                    <td>{item.phonenumber}</td>
                                    <td>
                                      {item.userAccountData.genderData.value}
                                    </td>
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
                                  </>
                                </tr>
                              )}
                            </>
                          );
                        })}
                    </tbody>
                  </table>
                  {dataUserCan && dataUserCan.length == 0 && (
                    <div style={{ textAlign: "center" }}>Không có dữ liệu</div>
                  )}
                </div>
              </div>
              <ReactPaginate
                previousLabel={"Quay lại"}
                nextLabel={"Tiếp"}
                breakLabel={"..."}
                pageCount={countCandidate}
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
                onPageChange={(number) => handleChangePage(number, "Candidate")}
              />
            </div>
          </div>
          <div className="col-12 grid-margin">
            <div
              style={{ padding: "30px", borderRadius: "30px" }}
              className="card"
            >
              <div className="card-body">
                <h4 className="card-title">
                  <i>Bảng thống kê danh sách công ty</i>
                </h4>
                <div>
                <b>
                  <i>Số lượng công ty :</i>
                </b>{" "}
                {totalCom}
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
                      </tr>
                    </thead>
                    <tbody>
                      {dataUserCom &&
                        dataUserCom.length > 0 &&
                        dataUserCom.map((item, index) => {
                          let date = item.userAccountData.dob
                            ? moment
                                .unix(item.userAccountData.dob / 1000)
                                .format("DD/MM/YYYY")
                            : "Không có thông tin";
                          return (
                            <>
                              {item.id != 71 && (
                                <tr key={index}>
                                  <>
                                    <td>
                                      {index +
                                        1 +
                                        numberPageCom * PAGINATION.pagerow}
                                    </td>
                                    <td>{`${item.userAccountData.firstName} ${item.userAccountData.lastName}`}</td>
                                    <td>{item.phonenumber}</td>
                                    <td>
                                      {item.userAccountData.genderData.value}
                                    </td>
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
                                  </>
                                </tr>
                              )}
                            </>
                          );
                        })}
                    </tbody>
                  </table>
                  {dataUserCom && dataUserCom.length == 0 && (
                    <div style={{ textAlign: "center" }}>Không có dữ liệu</div>
                  )}
                </div>
              </div>
              <ReactPaginate
                previousLabel={"Quay lại"}
                nextLabel={"Tiếp"}
                breakLabel={"..."}
                pageCount={countCompany}
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
                onPageChange={(number) => handleChangePage(number, "Company")}
              />
            </div>
          </div>
        </>
      )}
    </>
  );
};

export default Home;

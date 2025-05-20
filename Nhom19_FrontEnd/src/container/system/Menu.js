import React from "react";
import { Link } from "react-router-dom";
import { useEffect, useState } from "react";

const Menu = () => {
  const [user, setUser] = useState({});
  useEffect(() => {
    const userData = JSON.parse(localStorage.getItem("userData"));
    setUser(userData);
  }, []);

  return (
    <nav
      style={{ backgroundColor: "#e2ebf8", width: "278px" }}
      className="sidebar sidebar-offcanvas"
      id="sidebar"
    >
      <ul className="nav">
        {user && user.roleCode === "ADMIN" && (
          <li className="nav-item relative">
            <a
              className="nav-link"
              data-toggle="collapse"
              href="#admin"
              aria-expanded="false"
              aria-controls="auth"
            >
              <Link className="nav-link_active" to="/admin/">
                <i className="icon-grid menu-icon" />
                <span
                  style={{ fontSize: "16px", marginTop: "5px" }}
                  className="menu-title"
                >
                  Thống Kê
                </span>
              </Link>
            </a>
            <div className="collapse" id="admin"></div>
          </li>
        )}
        {user && user.roleCode === "COMPANY" && (
          <li className="nav-item relative">
            <a
              className="nav-link"
              data-toggle="collapse"
              href="#admin"
              aria-expanded="false"
              aria-controls="auth"
            >
              <Link className="nav-link_active" to="/admin/">
                <i className="icon-grid menu-icon" />
                <span
                  style={{ fontSize: "16px", marginTop: "5px" }}
                  className="menu-title"
                >
                  Thống kê số lượng bài đăng
                </span>
              </Link>
            </a>
            <div className="collapse" id="admin"></div>
          </li>
        )}
        {user && user.roleCode === "ADMIN" && (
          <>
            {/* <li className="nav-item relative">
              <a
                className="nav-link"
                data-toggle="collapse"
                href="#chart"
                aria-expanded="false"
                aria-controls="chart"
              >
                <i className="icon-head menu-icon" />
                <span className="menu-title">Đồ thị</span>
                <i className="menu-arrow" />
              </a>
              <div className="collapse" id="chart">
                <ul className="nav flex-column sub-menu">
                  <li className="nav-item relative">
                    {" "}
                    <Link className="nav-link" to="/admin/sum-by-year-post/">
                      {" "}
                      Đồ thị doanh thu gói bài viết{" "}
                    </Link>
                  </li>
                  <li className="nav-item relative">
                    {" "}
                    <Link className="nav-link" to="/admin/sum-by-year-cv/">
                      {" "}
                      Đồ thị doanh thu gói xem ứng viên{" "}
                    </Link>
                  </li>
                </ul>
              </div>
            </li> */}
            {/* Quản Lý Người Dùng */}
            <li className="nav-item relative">
              <a
                className="nav-link"
                data-toggle="collapse"
                href="#auth"
                aria-expanded="false"
                aria-controls="auth"
              >
                <i className="icon-head menu-icon" />
                <Link className="nav-link_active" to="/admin/list-user/">
                  <span
                    style={{ fontSize: "16px", marginTop: "4px" }}
                    className="menu-title"
                  >
                    Quản lý người dùng
                  </span>
                </Link>
                {/* <i className="menu-arrow" /> */}
              </a>
              <div className="collapse" id="auth">
                {/* <ul className="nav flex-column sub-menu">
                  <li className="nav-item relative">
                    {" "}
                    <Link className="nav-link" to="/admin/list-user/">
                      {" "}
                      Danh sách người dùng{" "}
                    </Link>
                  </li>
                  <li className="nav-item relative">
                    {" "}
                    <Link className="nav-link" to="/admin/add-user/">
                      {" "}
                      Thêm người dùng{" "}
                    </Link>
                  </li>
                </ul> */}
              </div>
            </li>
            {/* Quản Lý Loại Công Việc */}
            <li className="nav-item relative">
              <a
                className="nav-link"
                data-toggle="collapse"
                href="#jobtype"
                aria-expanded="false"
                aria-controls="jobtype"
              >
                <i className="far fa-building menu-icon"></i>
                <Link className="nav-link_active" to="/admin/list-job-type/">
                  <span
                    style={{ fontSize: "16px", marginLeft: "4px" }}
                    className="menu-title"
                  >
                    Quản lý loại công việc
                  </span>
                </Link>

                {/* <i className="menu-arrow" /> */}
              </a>
              <div className="collapse" id="jobtype">
                {/* <ul className="nav flex-column sub-menu">
                  <li className="nav-item relative">
                    {" "}
                    <Link className="nav-link" to="/admin/list-job-type/">
                      Danh sách loại công việc
                    </Link>
                  </li>
                  <li className="nav-item relative">
                    {" "}
                    <Link className="nav-link" to="/admin/add-job-type/">
                      Thêm loại công việc
                    </Link>
                  </li>
                </ul> */}
              </div>
            </li>
            {/* Quản Lý Kĩ Năng */}
            <li className="nav-item relative">
              <a
                className="nav-link"
                data-toggle="collapse"
                href="#jobskill"
                aria-expanded="false"
                aria-controls="jobskill"
              >
                <i className="far fa-building menu-icon"></i>
                <Link className="nav-link_active" to="/admin/list-job-skill/">
                  <span
                    style={{ fontSize: "16px", marginLeft: "4px" }}
                    className="menu-title"
                  >
                    Quản lý kĩ năng
                  </span>
                </Link>
                {/* <i className="menu-arrow" /> */}
              </a>
              <div className="collapse" id="jobskill">
                {/* <ul className="nav flex-column sub-menu">
                  <li className="nav-item relative">
                    {" "}
                    <Link className="nav-link" to="/admin/list-job-skill/">
                      Danh sách các kĩ năng
                    </Link>
                  </li>
                  <li className="nav-item relative">
                    {" "}
                    <Link className="nav-link" to="/admin/add-job-skill/">
                      Thêm kĩ năng
                    </Link>
                  </li>
                </ul> */}
              </div>
            </li>
            {/* Quản Lý Cấp Bậc */}
            <li className="nav-item relative">
              <a
                className="nav-link"
                data-toggle="collapse"
                href="#joblevel"
                aria-expanded="false"
                aria-controls="joblevel"
              >
                <i className="fas fa-level-up-alt menu-icon"></i>
                <Link className="nav-link_active" to="/admin/list-job-level/">
                  <span style={{ fontSize: "16px", marginLeft: "4px" }} className="menu-title">Quản lý cấp bậc</span>
                </Link>
                {/* <i className="menu-arrow" /> */}
              </a>
              <div className="collapse" id="joblevel">
                {/* <ul className="nav flex-column sub-menu">
                  <li className="nav-item relative">
                    {" "}
                    <Link className="nav-link" to="/admin/list-job-level/">
                      Danh sách cấp bậc
                    </Link>
                  </li>
                  <li className="nav-item relative">
                    {" "}
                    <Link className="nav-link" to="/admin/add-job-level/">
                      Thêm cấp bậc
                    </Link>
                  </li>
                </ul> */}
              </div>
            </li>
            {/* Quản Lý Hình Thức Làm Việc */}
            <li className="nav-item relative">
              <a
                className="nav-link"
                data-toggle="collapse"
                href="#worktype"
                aria-expanded="false"
                aria-controls="worktype"
              >
                <i className="fas fa-briefcase menu-icon"></i>
                <Link className="nav-link_active" to="/admin/list-work-type/">
                  <span style={{ fontSize: "16px"}} className="menu-title">Quản lý hình thức làm việc</span>
                </Link>
                {/* <i className="menu-arrow" /> */}
              </a>
              <div className="collapse" id="worktype">
                {/* <ul className="nav flex-column sub-menu">
                  <li className="nav-item relative">
                    {" "}
                    <Link className="nav-link" to="/admin/list-work-type/">
                      Danh sách hình thức
                    </Link>
                  </li>
                  <li className="nav-item relative">
                    {" "}
                    <Link className="nav-link" to="/admin/add-work-type/">
                      Thêm hình thức
                    </Link>
                  </li>
                </ul> */}
              </div>
            </li>
            {/* Quản Lý Khoản Lương */}
            <li className="nav-item relative">
              <a
                className="nav-link"
                data-toggle="collapse"
                href="#salarytype"
                aria-expanded="false"
                aria-controls="salarytype"
              >
                <i className="fas fa-money-check-alt menu-icon"></i>
                <Link className="nav-link_active" to="/admin/list-salary-type/">
                  <span style={{ fontSize: "16px"}} className="menu-title">Quản lý khoảng lương</span>
                </Link>
                {/* <i className="menu-arrow" /> */}
              </a>
              <div className="collapse" id="salarytype">
                {/* <ul className="nav flex-column sub-menu">
                  <li className="nav-item relative">
                    {" "}
                    <Link className="nav-link" to="/admin/list-salary-type/">
                      Danh sách khoảng lương
                    </Link>
                  </li>
                  <li className="nav-item relative">
                    {" "}
                    <Link className="nav-link" to="/admin/add-salary-type/">
                      Thêm khoảng lương
                    </Link>
                  </li>
                </ul> */}
              </div>
            </li>
            {/* Quản Lý Năm Kinh Nghiệm Làm Việc */}
            <li className="nav-item relative">
              <a
                className="nav-link"
                data-toggle="collapse"
                href="#exptype"
                aria-expanded="false"
                aria-controls="exptype"
              >
                <i className="far fa-clock menu-icon"></i>
                <Link className="nav-link_active" to="/admin/list-exp-type/">
                  <span style={{ fontSize: "16px" , marginLeft : '2px'}} className="menu-title">Quản lý năm kinh nghiệm</span>
                </Link>
                {/* <i className="menu-arrow" /> */}
              </a>
              <div className="collapse" id="exptype">
                {/* <ul className="nav flex-column sub-menu">
                  <li className="nav-item relative">
                    {" "}
                    <Link className="nav-link" to="/admin/list-exp-type/">
                      Danh sách kinh nghiệm
                    </Link>
                  </li>
                  <li className="nav-item relative">
                    {" "}
                    <Link className="nav-link" to="/admin/add-exp-type/">
                      Thêm kinh nghiệm
                    </Link>
                  </li>
                </ul> */}
              </div>
            </li>
            {/* Quản Lý Các Gói Bài Đăng */}
            <li className="nav-item relative">
              <a
                className="nav-link"
                data-toggle="collapse"
                href="#packagepost"
                aria-expanded="false"
                aria-controls="packagepost"
              >
                <i class="fa-solid fa-cube menu-icon"></i>
                <Link className="nav-link_active" to="/admin/list-package-post/">
                  <span style={{fontSize : '16px' , marginLeft : '3px'}} className="menu-title">Quản lý các gói bài đăng</span>
                </Link>
                {/* <i className="menu-arrow" /> */}
              </a>
              <div className="collapse" id="packagepost">
                {/* <ul className="nav flex-column sub-menu">
                  <li className="nav-item relative">
                    {" "}
                    <Link className="nav-link" to="/admin/list-package-post/">
                      Danh sách các gói bài đăng
                    </Link>
                  </li>
                  <li className="nav-item relative">
                    {" "}
                    <Link className="nav-link" to="/admin/add-package-post/">
                      Thêm gói bài đăng
                    </Link>
                  </li>
                </ul> */}
              </div>
            </li>
            {/* Quản Lý Các Gói Xem Ứng Viên */}
            <li className="nav-item relative">
              <a
                className="nav-link"
                data-toggle="collapse"
                href="#packagecv"
                aria-expanded="false"
                aria-controls="packagecv"
              >
                <i class="fa-solid fa-cube menu-icon"></i>
                <Link className="nav-link_active" to="/admin/list-package-cv/">
                  <span style={{fontSize : '16px' , marginLeft : '3px'}} className="menu-title">Quản lý các gói xem CV</span>
                </Link>
                {/* <i className="menu-arrow" /> */}
              </a>
              <div className="collapse" id="packagecv">
                {/* <ul className="nav flex-column sub-menu">
                  <li className="nav-item relative">
                    {" "}
                    <Link className="nav-link" to="/admin/list-package-cv/">
                      Danh sách các gói tìm ứng viên
                    </Link>
                  </li>
                  <li className="nav-item relative">
                    {" "}
                    <Link className="nav-link" to="/admin/add-package-cv/">
                      Thêm gói tìm ứng viên
                    </Link>
                  </li>
                </ul> */}
              </div>
            </li>
            {/* Quản Lý Công Ty */}
            <li className="nav-item relative">
              <a
                className="nav-link"
                data-toggle="collapse"
                href="#company"
                aria-expanded="false"
                aria-controls="company"
              >
                <i class="fa-solid fa-clipboard menu-icon"></i>
                <Link className="nav-link_active" to="/admin/list-company-admin/">
                  <span style={{fontSize : '16px' , marginLeft : '7px'}} className="menu-title">Quản lý các công ty</span>
                </Link>
                {/* <i className="menu-arrow" /> */}
              </a>
              <div className="collapse" id="company">
                {/* <ul className="nav flex-column sub-menu">
                  <li className="nav-item relative">
                    {" "}
                    <Link className="nav-link" to="/admin/list-company-admin/">
                      Danh sách các công ty
                    </Link>
                  </li>
                </ul> */}
              </div>
            </li>
            {/* Quản Lý Bài Đăng */}
            <li className="nav-item relative">
              <a
                className="nav-link"
                data-toggle="collapse"
                href="#post"
                aria-expanded="false"
                aria-controls="post"
              >
                <i class="fa-solid fa-clipboard menu-icon"></i>
                <Link className="nav-link_active" to="/admin/list-post-admin/">
                  <span style={{fontSize : '16px' , marginLeft : '7px'}} className="menu-title">Quản lý bài đăng</span>
                </Link>
                {/* <i className="menu-arrow" /> */}
              </a>
              <div className="collapse" id="post">
                {/* <ul className="nav flex-column sub-menu">
                  <li className="nav-item relative">
                    {" "}
                    <Link className="nav-link" to="/admin/list-post-admin/">
                      Danh sách bài đăng
                    </Link>
                  </li>
                </ul> */}
              </div>
            </li>
          </>
        )}
        {user && user.roleCode === "COMPANY" && (
          <>
            <li className="nav-item relative">
              <a
                className="nav-link"
                data-toggle="collapse"
                href="#company"
                aria-expanded="false"
                aria-controls="company"
              >
                <i class="fa-solid fa-clipboard menu-icon"></i>
                <Link className="nav-link_active" to="/admin/edit-company/">
                  <span
                    style={{ fontSize: "16px", marginLeft: "3px" }}
                    className="menu-title"
                  >
                    Cập nhật công ty
                  </span>
                </Link>
              </a>
              {/* <div className="collapse" id="company">
                <ul className="nav flex-column sub-menu">
                  <li className="nav-item relative">
                    {" "}
                    <Link className="nav-link" to="/admin/edit-company/">
                      Quản lý công ty
                    </Link>
                  </li>
                  <li className="nav-item relative">
                    {" "}
                    <Link className="nav-link" to="/admin/recruitment/">
                      Tuyển dụng vào công ty
                    </Link>
                  </li>
                  <li className="nav-item relative">
                    {" "}
                    <Link className="nav-link" to="/admin/list-employer/">
                      Danh sách nhân viên
                    </Link>
                  </li>
                  <li className="nav-item relative">
                    {" "}
                    <Link className="nav-link" to="/admin/add-user/">
                      Thêm nhân viên
                    </Link>
                  </li>
                </ul>
              </div> */}
            </li>
            <li className="nav-item relative">
              <a
                className="nav-link"
                data-toggle="collapse"
                href="#post"
                aria-expanded="false"
                aria-controls="post"
              >
                <i class="fa-solid fa-clipboard menu-icon"></i>
                <span
                  style={{ fontSize: "16px", marginLeft: "3px" }}
                  className="menu-title"
                >
                  Quản lý bài đăng
                </span>
                <i className="menu-arrow" />
              </a>
              <div className="collapse" id="post">
                <ul className="nav flex-column sub-menu">
                  <li className="nav-item relative">
                    {" "}
                    <Link className="nav-link" to="/admin/add-post/">
                      Tạo mới bài đăng
                    </Link>
                  </li>
                  <li className="nav-item relative">
                    {" "}
                    <Link className="nav-link" to="/admin/list-post/">
                      Danh sách bài đăng
                    </Link>
                  </li>
                  <li className="nav-item relative">
                    {" "}
                    <Link className="nav-link" to="/admin/buy-post/">
                      Mua thêm lượt đăng bài
                    </Link>
                  </li>
                </ul>
              </div>
            </li>
            <li className="nav-item relative">
              <a
                className="nav-link"
                data-toggle="collapse"
                href="#findCandiate"
                aria-expanded="false"
                aria-controls="findCandiate"
              >
                <i className="icon-head menu-icon"></i>
                <span
                  style={{ fontSize: "16px", marginTop: "5px" }}
                  className="menu-title"
                >
                  Tìm kiếm ứng viên
                </span>
                <i className="menu-arrow" />
              </a>
              <div className="collapse" id="findCandiate">
                <ul className="nav flex-column sub-menu">
                  <li className="nav-item relative">
                    {" "}
                    <Link className="nav-link" to="/admin/buy-cv/">
                      Mua lượt xem cv ứng viên
                    </Link>
                  </li>
                  <li className="nav-item relative">
                    {" "}
                    <Link className="nav-link" to="/admin/list-candiate/">
                      Danh sách ứng viên
                    </Link>
                  </li>
                </ul>
              </div>
            </li>
            <li className="nav-item relative">
              <a
                className="nav-link"
                data-toggle="collapse"
                href="#historyTrade"
                aria-expanded="false"
                aria-controls="historyTrade"
              >
                <i className="fas fa-money-check-alt menu-icon"></i>
                <span style={{ fontSize: "16px" }} className="menu-title">
                  Lịch sử giao dịch
                </span>
                <i className="menu-arrow" />
              </a>
              <div className="collapse" id="historyTrade">
                <ul className="nav flex-column sub-menu">
                  <li className="nav-item relative">
                    {" "}
                    <Link className="nav-link" to="/admin/history-post/">
                      Lịch sử gói bài đăng
                    </Link>
                  </li>
                  <li className="nav-item relative">
                    {" "}
                    <Link className="nav-link" to="/admin/history-cv/">
                      Lịch sử gói xem ứng viên
                    </Link>
                  </li>
                </ul>
              </div>
            </li>
          </>
        )}

        {user && user.roleCode === "EMPLOYER" && (
          <>
            {!user.companyId && (
              <li className="nav-item relative">
                <a
                  className="nav-link"
                  data-toggle="collapse"
                  href="#company"
                  aria-expanded="false"
                  aria-controls="company"
                >
                  <i className="far fa-clock menu-icon"></i>
                  <Link className="nav-link_active" to="/admin/add-company/">
                    <span style={{ fontSize: "16px" }} className="menu-title">
                      Tạo mới công ty
                    </span>
                  </Link>
                  {/* <i className="menu-arrow" /> */}
                </a>
                {/* <div className="collapse" id="company">
                  <ul className="nav flex-column sub-menu">
                    <li className="nav-item relative">
                      {" "}
                      <Link className="nav-link" to="/admin/add-company/">
                        Tạo mới công ty
                      </Link>
                    </li>
                  </ul>
                </div> */}
              </li>
            )}
            {/* {user.companyId && (
              <li className="nav-item relative">
                <a
                  className="nav-link"
                  data-toggle="collapse"
                  href="#post"
                  aria-expanded="false"
                  aria-controls="post"
                >
                  <i className="far fa-clock menu-icon"></i>
                  <span className="menu-title">Quản lý bài đăng</span>
                  <i className="menu-arrow" />
                </a>
                <div className="collapse" id="post">
                  <ul className="nav flex-column sub-menu">
                    <li className="nav-item relative">
                      {" "}
                      <Link className="nav-link" to="/admin/add-post/">
                        Tạo mới bài đăng
                      </Link>
                    </li>
                    <li className="nav-item relative">
                      {" "}
                      <Link className="nav-link" to="/admin/list-post/">
                        Danh sách bài đăng
                      </Link>
                    </li>
                  </ul>
                </div>
              </li>
            )}
            {user.companyId && (
              <li className="nav-item relative">
                <a
                  className="nav-link"
                  data-toggle="collapse"
                  href="#post"
                  aria-expanded="false"
                  aria-controls="post"
                >
                  <i class="icon-head menu-icon"></i>
                  <span className="menu-title">Tìm kiếm ứng viên</span>
                  <i className="menu-arrow" />
                </a>
                <div className="collapse" id="post">
                  <ul className="nav flex-column sub-menu">
                    <li className="nav-item relative">
                      {" "}
                      <Link className="nav-link" to="/admin/list-candiate/">
                        Danh sách ứng viên
                      </Link>
                    </li>
                  </ul>
                </div>
              </li>
            )} */}
          </>
        )}
      </ul>
    </nav>
  );
};

export default Menu;

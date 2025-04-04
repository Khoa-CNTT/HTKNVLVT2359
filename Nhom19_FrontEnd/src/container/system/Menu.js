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
                                    style={{
                                        fontSize: "16px",
                                        marginTop: "5px",
                                    }}
                                    className="menu-title"
                                >
                                    Trang chủ
                                </span>
                            </Link>
                        </a>
                        <div className="collapse" id="admin"></div>
                    </li>
                )}
                {user && user.roleCode === "ADMIN" && (
                    <>
                        <li className="nav-item relative">
                            <a
                                className="nav-link"
                                data-toggle="collapse"
                                href="#auth"
                                aria-expanded="false"
                                aria-controls="auth"
                            >
                                <i className="icon-head menu-icon" />
                                <Link
                                    className="nav-link_active"
                                    to="/admin/list-user/"
                                >
                                    <span
                                        style={{
                                            fontSize: "16px",
                                            marginTop: "4px",
                                        }}
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
                        <li className="nav-item relative">
                            <a
                                className="nav-link"
                                data-toggle="collapse"
                                href="#company"
                                aria-expanded="false"
                                aria-controls="company"
                            >
                                <i class="fa-solid fa-clipboard menu-icon"></i>
                                <Link
                                    className="nav-link_active"
                                    to="/admin/list-company-admin/"
                                >
                                    <span
                                        style={{
                                            fontSize: "16px",
                                            marginLeft: "7px",
                                        }}
                                        className="menu-title"
                                    >
                                        Quản lý các công ty
                                    </span>
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
                        <li className="nav-item relative">
                            <a
                                className="nav-link"
                                data-toggle="collapse"
                                href="#jobtype"
                                aria-expanded="false"
                                aria-controls="jobtype"
                            >
                                <i className="far fa-building menu-icon"></i>
                                <Link
                                    className="nav-link_active"
                                    to="/admin/list-job-type/"
                                >
                                    <span
                                        style={{
                                            fontSize: "16px",
                                            marginLeft: "4px",
                                        }}
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
                        <li className="nav-item relative">
                            <a
                                className="nav-link"
                                data-toggle="collapse"
                                href="#jobskill"
                                aria-expanded="false"
                                aria-controls="jobskill"
                            >
                                <i className="far fa-building menu-icon"></i>
                                <Link
                                    className="nav-link_active"
                                    to="/admin/list-job-skill/"
                                >
                                    <span
                                        style={{
                                            fontSize: "16px",
                                            marginLeft: "4px",
                                        }}
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
                                <Link
                                    className="nav-link_active"
                                    to="/admin/list-salary-type/"
                                >
                                    <span
                                        style={{ fontSize: "16px" }}
                                        className="menu-title"
                                    >
                                        Quản lý khoảng lương
                                    </span>
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
                                <Link
                                    className="nav-link_active"
                                    to="/admin/list-exp-type/"
                                >
                                    <span
                                        style={{
                                            fontSize: "16px",
                                            marginLeft: "2px",
                                        }}
                                        className="menu-title"
                                    >
                                        Quản lý năm kinh nghiệm
                                    </span>
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
                    </>
                )}
            </ul>
        </nav>
    );
};

export default Menu;

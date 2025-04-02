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
            </ul>
        </nav>
    );
};

export default Menu;

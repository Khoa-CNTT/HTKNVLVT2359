import React from 'react'
import { useEffect, useState } from 'react';
import { Link, NavLink } from 'react-router-dom'
import { toast } from 'react-toastify';
import './header.scss';

const Header = () => {
    const [user, setUser] = useState({})
    useEffect(() => {
        const userData = JSON.parse(localStorage.getItem('userData'));
        // if (userData && userData.roleCode !== 'CANDIDATE')
        // {
        //     toast.error("Vai trò của bạn không làm việc ở đây")
        //     setTimeout(() => {
        //         window.location.href = "/admin"
        //     }, 1000);
        // }
        setUser(userData)
    }, [])
    let handleLogout = () => {
        console.log("hello")
        localStorage.removeItem("userData");
        localStorage.removeItem("token_user")
        window.location.href = "/login"
    }

    let scrollHeader = () => {
        window.addEventListener("scroll", function () {
            var header = document.querySelector(".header-area");
            if (header) {
                header.classList.toggle("sticky", window.scrollY > 0)
            }
        })
    }
    scrollHeader()

    return (
        <>
            <header style={{position : 'sticky' , top : '0px' , zIndex : 100 , backgroundColor : '#f4f2f5'}} >
                {/* <!-- Header Start --> */}
                <div className="header-area header-transparrent">
                    <div className="headder-top header-sticky">
                        <div className="container">
                            <div style={{width:'1155px'}} className="row align-items-center">
                                <div className="col-lg-3 col-md-2">
                                    {/* <!-- Logo --> */}
                                    <div className="logo" style={{ zIndex: 1 }}>
                                        <NavLink to="/"><img style={{width : '100%'}} src="/assets/img/logo/logo.png" alt="" /></NavLink>
                                    </div>
                                </div>
                                <div className="col-lg-9 col-md-9">
                                    <div className="menu-wrapper">
                                        {/* <!-- Main-menu --> */}
                                        <div className="main-menu">
                                            <nav className="d-none d-lg-block">
                                                <ul id="navigation">
                                                    <li ><NavLink to="/" isActive={() => window.scrollTo(0, 0)}>Trang chủ</NavLink></li>
                                                    <li ><NavLink to="/job" isActive={() => window.scrollTo(0, 0)}>Việc làm </NavLink></li>
                                                    <li ><NavLink to="/company" isActive={() => window.scrollTo(0, 0)}>Công ty </NavLink></li>
                                                    <li ><NavLink to="/about" isActive={() => window.scrollTo(0, 0)}>Giới thiệu</NavLink></li>
                                                    <li ><a href="https://www.topcv.vn/mau-cv" target='_blank' isActive={() => window.scrollTo(0, 0)}>Tạo CV</a></li>
                                                    {/* <li><NavLink to="/contact" >Contact</NavLink></li> */}
                                                </ul>
                                            </nav>
                                        </div>
                                        {/* <!-- Header-btn --> */}
                                        <div class="header-btn d-none f-right d-lg-block">
                                            {user ?
                                                <ul className="navbar-nav navbar-nav-right">
                                                    <li className="nav-item nav-profile dropdown">
                                                        <a style={{padding : '13px' , backgroundColor : '#e2ebf8'}}  className="nav-link box-header-profile" href="#" data-toggle="dropdown" id="profileDropdown">
                                                            <img style={{ objectFit: 'cover', width: '30px', height: '30px', borderRadius: '50%' }} src={user.image} alt="profile" />
                                                            <span style={{fontSize : '17px' , fontWeight : 'bold'}} className='header-name-user'>{user.firstName + " " + user.lastName}</span>
                                                        </a>
                                                        <div style={{padding : '10px' , backgroundColor : '#e2ebf8'}} className="dropdown-menu dropdown-menu-right navbar-dropdown" aria-labelledby="profileDropdown">
                                                            <Link to='/candidate/info' className="dropdown-item">
                                                                <i className="far fa-user text-primary" />
                                                                <i>Thông tin</i>
                                                            </Link>
                                                            <Link to='/candidate/usersetting' className="dropdown-item">
                                                                <i className="far fa-solid fa-bars text-primary" />
                                                                <i>Cài đặt nâng cao</i>
                                                            </Link>
                                                            <Link to="/candidate/cv-post/" className="dropdown-item">
                                                                <i className="far fa-file-word text-primary"></i>
                                                                <i>Công việc đã nộp</i>
                                                            </Link>
                                                            <Link to='/candidate/changepassword/' className="dropdown-item">
                                                                <i className="ti-settings text-primary" />
                                                                <i>Đổi mật khẩu</i>
                                                            </Link>
                                                            <a onClick={() => handleLogout()} className="dropdown-item">
                                <i className="ti-power-off text-primary" />
                                <i>Đăng xuất</i>
                            </a>
                                                        </div>
                                                    </li>
                                                </ul>
                                                :
                                                <>
                                                    <Link to={'/register'}>
                                                        <div class="btn head-btn1" style={{borderRadius:'22px' , backgroundColor : 'rgb(250 166 26)' , border : '1px solid rgb(250 166 26)'}} >Đăng Ký </div>
                                                    </Link>
                                                    <Link to={'/login'}>
                                                    <div class="btn head-btn2" style={{borderRadius:'22px' ,border : '1px solid rgb(250 166 26)'}} >Đăng Nhập </div>
                                                    </Link>
                                                </>
                                            }


                                        </div>
                                    </div>
                                </div>
                                {/* <!-- Mobile Menu --> */}
                                <div className="col-12">
                                    <div className="mobile_menu d-block d-lg-none"></div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                {/* <!-- Header End --> */}
            </header >

        </>
    )
}

export default Header

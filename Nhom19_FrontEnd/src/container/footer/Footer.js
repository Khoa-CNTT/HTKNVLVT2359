import React from "react";

const Footer = () => {
    return (
        <>
            <footer>
                {/* <!-- Footer Start--> */}

                {/* <!-- footer-bottom area --> */}
                <div
                    className="footer-bottom-area footer-bg"
                    style={{ backgroundColor: "rgb(250 166 26)" }}
                >
                    <div className="container">
                        <div
                            className="footer-border"
                            style={{ border: "1px solid rgb(250 166 26)" }}
                        >
                            <div className="row d-flex justify-content-between align-items-center">
                                <div className="col-xl-10 col-lg-10 ">
                                    <div className="footer-copy-right">
                                        <p style={{ color: "black" }}>
                                            <b>
                                                <i>
                                                    FINDJOBS FIND YOUR DREAM JOB
                                                </i>
                                            </b>
                                        </p>
                                    </div>
                                </div>
                                <div className="col-xl-2 col-lg-2">
                                    <div className="footer-social f-right">
                                        <a href="#">
                                            <i className="fab fa-facebook-f"></i>
                                        </a>
                                        <a href="#">
                                            <i className="fab fa-twitter"></i>
                                        </a>
                                        <a href="#">
                                            <i className="fas fa-globe"></i>
                                        </a>
                                        <a href="#">
                                            <i className="fab fa-behance"></i>
                                        </a>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </footer>
        </>
    );
};

export default Footer;

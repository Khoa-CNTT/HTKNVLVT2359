import React from 'react'

const Footer = () => {
    return (
        <>
            <footer>
                {/* <!-- Footer Start--> */}

                {/* <!-- footer-bottom area --> */}
                <div className="footer-bottom-area footer-bg" style={{backgroundColor:'rgb(250 166 26)'}} >
                    <div className="container">
                        <div className="footer-border" style={{border: '1px solid rgb(250 166 26)'}} >
                            <div className="row d-flex justify-content-between align-items-center">
                                <div className="col-xl-10 col-lg-10 ">
                                    <div className="footer-copy-right">
                                        <p style={{color : 'black'}} >
                                            Bản quyền &copy;<script>document.write(new Date().getFullYear());</script> từ <a style={{color:'black'}} href="https://www.facebook.com/buithinhbui201203" target="_blank">Nhóm 9 Khóa Luận Tốt Nghiệp 2025 DTU</a>
                                        </p>
                                    </div>
                                </div>
                                <div className="col-xl-2 col-lg-2">
                                    <div className="footer-social f-right">
                                        <a href="#"><i className="fab fa-facebook-f"></i></a>
                                        <a href="#"><i className="fab fa-twitter"></i></a>
                                        <a href="#"><i className="fas fa-globe"></i></a>
                                        <a href="#"><i className="fab fa-behance"></i></a>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

            </footer>
        </>
    )
}

export default Footer

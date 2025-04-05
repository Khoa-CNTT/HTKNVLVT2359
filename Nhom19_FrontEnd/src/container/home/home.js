import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import Categories from '../../components/home/Categories'
import FeatureJobs from '../../components/home/FeaturesJobs'
import { getListPostService } from '../../service/userService'
const Home = () => {
    const [dataFeature, setDataFeature] = useState([])
    const [dataHot,setDateHot] = useState([])
    let loadPost = async (limit, offset) => {
        let arrData = await getListPostService({
            limit: limit,
            offset: offset,
            categoryJobCode: '',
            addressCode: '',
            salaryJobCode: '',
            categoryJoblevelCode: '',
            categoryWorktypeCode: '',
            experienceJobCode: '',
            sortName: false
        })
        let arrData2 = await getListPostService({
            limit: limit,
            offset: offset,
            categoryJobCode: '',
            addressCode: '',
            salaryJobCode: '',
            categoryJoblevelCode: '',
            categoryWorktypeCode: '',
            experienceJobCode: '',
            sortName: false,
            isHot: 1
        })
        if (arrData && arrData.errCode === 0) {
            setDataFeature(arrData.data)
        }
        if (arrData2 && arrData2.errCode === 0) {
            setDateHot(arrData2.data)
        }
    }
    useEffect(() => {
        let fetchPost = async () => {
            await loadPost(6, 0)
        }
        fetchPost()
    }, [])
    return (
        <>
            {/* <div id="preloader-active">
        <div class="preloader d-flex align-items-center justify-content-center">
            <div class="preloader-inner position-relative">
                <div class="preloader-circle"></div>
                <div class="preloader-img pere-text">
                    <img src="assets/img/logo/logo.png" alt="" />
                </div>
            </div>
        </div>
    </div> */}
            {/* <!-- Preloader Start --> */}

            <main>
                {/* <!-- slider Area Start--> */}
                <div class="slider-area ">
                    {/* <!-- Mobile Menu --> */}
                    <div class="slider-active">
                        <div class="single-slider slider-height d-flex align-items-center"
                            style={{
                                backgroundImage: `url("./assets/img/hero/h1_hero.avif")`
                            }}>
                            <div class="container">
                                <div class="row">
                                    <div class="col-xl-6 col-lg-9 col-md-10">
                                        <div class="hero__caption">
                                            <h1><i>Cơ hội ứng tuyển việc làm với đãi ngộ hấp dẫn</i></h1>
                                        </div>
                                    </div>
                                </div>
                                {/* <!-- Search Box --> */}

                            </div>
                        </div>
                    </div>
                </div>
                {/* <!-- slider Area End-->
        <!-- Our Services Start --> */}
                <div style={{ margin : '100px 0px' , padding:'80px' , backgroundColor : 'rgba(226, 235, 248)'}} class="our-services section-pad-t30">
                    <div class="container">
                        {/* <!-- Section Tittle --> */}
                        <div class="row">
                            <div class="col-lg-12">
                                <div class="section-tittle text-center">
                                    <span>Lĩnh vực công việc nổi bật</span>
                                    <h2><i>Danh mục nghề nghiệp</i>  </h2>
                                </div>
                            </div>
                        </div>
                        <Categories />
                        {/* <!-- More Btn -->
                <!-- Section Button --> */}

                    </div>
                </div>
                {/* <!-- Our Services End -->
        <!-- Online CV Area Start --> */}
                {/* <div class="online-cv cv-bg section-overly pt-90 pb-120" style={{
                    backgroundImage: `url("assets/img/gallery/cv_bg.jpg")`
                }}>
                    <div class="container">
                        <div class="row justify-content-center">
                            <div class="col-xl-10">
                                <div class="cv-caption text-center">
                                    <p class="pera1">Nhiều công việc đang chờ bạn</p>
                                    <p class="pera2"> Bạn đã hứng thú đã tìm việc chưa ?</p>
                                    <Link to='/job' class="border-btn2 border-btn4">Tìm việc ngay</Link>
                                </div>
                            </div>
                        </div>
                    </div>
                </div> */}
                {/* <!-- Online CV Area End-->
        <!-- Featured_job_start --> */}
                <section style={{paddingTop:'0px'}} class="featured-job-area feature-padding">
                    <div class="container">
                        {/* <!-- Section Tittle --> */}
                        <div class="row">
                            <div class="col-lg-12">
                                <div class="section-tittle text-center">
                                    <h2><i>Công việc nổi bật</i></h2>
                                </div>
                            </div>
                        </div>
                        <FeatureJobs dataFeature={dataHot} />
                    </div>
                </section>
                <section style={{paddingTop:'0px'}} class="featured-job-area feature-padding">
                    <div class="container">
                        {/* <!-- Section Tittle --> */}
                        <div class="row">
                            <div class="col-lg-12">
                                <div class="section-tittle text-center">
                                    <h2><i>Công việc mới đăng</i></h2>
                                </div>
                            </div>
                        </div>
                        <FeatureJobs dataFeature={dataFeature} />
                    </div>
                </section>
                {/* <!-- Featured_job_end -->
        <!-- How  Apply Process Start--> */}
                <div class="apply-process-area apply-bg pt-150 pb-150" style={{
                    backgroundImage: `url("assets/img/gallery/job.avif")`
                }}>
                    <div class="container">
                        {/* <!-- Section Tittle --> */}
                        <div class="row">
                            <div class="col-lg-12">
                                <div class="section-tittle white-text text-center">
                                    <span style={{color:'white'}} >Quy trình tuyển dụng</span>
                                    <h2 style={{color:'white',fontSize:'40px',fontWeight:'bold'}} ><i>Quy trình tuyển dụng nhân sự tại FindJob được thực hiện qua 6 bước sau:</i></h2>
                                </div>
                            </div>
                        </div>
                        {/* <!-- Apply Process Caption --> */}
                        <div class="row">
                            <div class="col-lg-4 col-md-6">
                                <div style={{backgroundColor : '#f4f2f5' , borderRadius : '30px'}}  class="single-process text-center mb-30">
                                    {/* <div class="process-ion">
                                        <span style={{color : 'black'}} class="flaticon-search"></span>
                                    </div> */}
                                    <img style={{width:'100px' , height:'100px'}} src='/assets/img/icon/icon1.png' alt='icon1' />
                                    <div style={{marginTop:'20px'}} class="process-cap">
                                        <h5 style={{color : 'black'}} >1. Nộp CV</h5>
                                    </div>
                                </div>
                            </div>
                            <div class="col-lg-4 col-md-6">
                            <div style={{backgroundColor : '#f4f2f5' , borderRadius : '30px'}}  class="single-process text-center mb-30">
                                    {/* <div class="process-ion">
                                        <span style={{color : 'black'}} class="flaticon-search"></span>
                                    </div> */}
                                    <img style={{width:'100px' , height:'100px'}} src='/assets/img/icon/icon2.png' alt='icon2' />
                                    <div style={{marginTop:'20px'}} class="process-cap">
                                        <h5 style={{color : 'black'}} >2. Tiếp Nhận CV</h5>
                                    </div>
                                </div>
                            </div>
                            <div class="col-lg-4 col-md-6">
                            <div style={{backgroundColor : '#f4f2f5' , borderRadius : '30px'}}  class="single-process text-center mb-30">
                                    {/* <div class="process-ion">
                                        <span style={{color : 'black'}} class="flaticon-search"></span>
                                    </div> */}
                                    <img style={{width:'100px' , height:'100px'}} src='/assets/img/icon/icon3.png' alt='icon3' />
                                    <div style={{marginTop:'20px'}} class="process-cap">
                                        <h5 style={{color : 'black'}} >3. Làm Bài Test Online</h5>
                                    </div>
                                </div>
                            </div>
                            <div class="col-lg-4 col-md-6">
                            <div style={{backgroundColor : '#f4f2f5' , borderRadius : '30px'}}  class="single-process text-center mb-30">
                                    {/* <div class="process-ion">
                                        <span style={{color : 'black'}} class="flaticon-search"></span>
                                    </div> */}
                                    <img style={{width:'100px' , height:'100px'}} src='/assets/img/icon/icon4.png' alt='icon3' />
                                    <div style={{marginTop:'20px'}} class="process-cap">
                                        <h5 style={{color : 'black'}} >4. Tham Gia Phỏng Vấn</h5>
                                    </div>
                                </div>
                            </div>
                            <div class="col-lg-4 col-md-6">
                            <div style={{backgroundColor : '#f4f2f5' , borderRadius : '30px'}}  class="single-process text-center mb-30">
                                    {/* <div class="process-ion">
                                        <span style={{color : 'black'}} class="flaticon-search"></span>
                                    </div> */}
                                    <img style={{width:'100px' , height:'100px'}} src='/assets/img/icon/icon5.png' alt='icon3' />
                                    <div style={{marginTop:'20px'}} class="process-cap">
                                        <h5 style={{color : 'black'}} >5. Bổ Sung Hồ Sơ</h5>
                                    </div>
                                </div>
                            </div>
                            <div class="col-lg-4 col-md-6">
                            <div style={{backgroundColor : '#f4f2f5' , borderRadius : '30px'}}  class="single-process text-center mb-30">
                                    {/* <div class="process-ion">
                                        <span style={{color : 'black'}} class="flaticon-search"></span>
                                    </div> */}
                                    <img style={{width:'100px' , height:'100px'}} src='/assets/img/icon/icon6.png' alt='icon3' />
                                    <div style={{marginTop:'20px'}} class="process-cap">
                                        <h5 style={{color : 'black'}} >6. Thông Báo Kết Quả</h5>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </main>
        </>
    )
}

export default Home

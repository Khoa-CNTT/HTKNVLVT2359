import React from "react";
import { Link } from "react-router-dom";
const About = () => {
  return (
    <>
      {/* <div id="preloader-active">
        <div class="preloader d-flex align-items-center justify-content-center">
            <div class="preloader-inner position-relative">
                <div class="preloader-circle"></div>
                <div class="preloader-img pere-text">
                    <img src="assets/img/logo/logo.png" alt="">
                </div>
            </div>
        </div>
    </div> */}

      <main>
        {/* <!-- Hero Area Start--> */}
        <div class="slider-area ">
          <div
            class="single-slider section-overly slider-height2 d-flex align-items-center"
            style={{
              backgroundImage: `url("assets/img/hero/about.jpg")`,
            }}
          >
            <div class="container">
              <div class="row">
                <div class="col-xl-12">
                  <div class="hero-cap text-center">
                    <h2>Thông Tin Về Chúng Tôi</h2>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        {/* <!-- Hero Area End --> */}
        {/* <!-- Support Company Start--> */}
        <div style={{padding : '80px'}}>
          <h3 style={{ fontWeight: "bold" }}>
            Cơ hội ứng tuyển việc làm với đãi ngộ hấp dẫn tại các công ty hàng
            đầu
          </h3>
          <p>
            Trước sự phát triển vượt bậc của nền kinh tế, rất nhiều ngành nghề
            trở nên khan hiếm nhân lực hoặc thiếu nhân lực giỏi. Vì vậy, hầu hết
            các trường Đại học đều liên kết với các công ty, doanh nghiệp, cơ
            quan để tạo cơ hội cho các bạn sinh viên được học tập, rèn luyện bản
            thân và làm quen với môi trường làm việc từ sớm. Trong danh sách
            việc làm trên đây, FindJob mang đến cho bạn những cơ hội việc làm
            tại những môi trường làm việc năng động, chuyên nghiệp.
          </p>
          <h3 style={{ fontWeight: "bold" }}>
            Vậy tại sao nên tìm việc làm tại FindJob?
          </h3>
          <div style={{display : 'flex' , gap : '60px' ,  marginTop : '80px'}}>
            <img
              style={{ width: "50%" }}
              src="/assets/img/logo/logo.png"
              alt="logo"
            />
            <div>
                <h4 style={{fontWeight : 'bold'}} ><i>Việc làm Chất lượng</i></h4>
                <ul>
                    <li> - Hàng ngàn tin tuyển dụng chất lượng cao được cập nhật thường xuyên để đáp ứng nhu cầu tìm việc của ứng viên.</li>
                    <li> - Hệ thống thông minh tự động gợi ý các công việc phù hợp theo CV của bạn.</li>
                </ul>
                <h4 style={{fontWeight : 'bold'}}><i>Công cụ viết CV đẹp Miễn phí</i></h4>
                <ul>
                    <li> - Nhiều mẫu CV đẹp, phù hợp nhu cầu ứng tuyển các vị trí khác nhau.</li>
                    <li> - Tương tác trực quan, dễ dàng chỉnh sửa thông tin, tạo CV online nhanh chóng trong vòng 5 phút.</li>
                </ul>
                <h4 style={{fontWeight : 'bold'}}><i>Hỗ trợ Người tìm việc</i></h4>
                <ul>
                    <li> - Nhà tuyển dụng chủ động tìm kiếm và liên hệ với bạn qua hệ thống kết nối ứng viên thông minh.</li>
                    <li> - Báo cáo chi tiết Nhà tuyển dụng đã xem CV và gửi offer tới bạn.</li>
                </ul>
            </div>
          </div>
        </div>
      </main>
    </>
  );
};

export default About;

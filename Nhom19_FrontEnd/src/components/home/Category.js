import React from "react";
import { NavLink } from "react-router-dom";

const Category = (props) => {
  return (
    <>
      <div class="col-xl-3 col-lg-3 col-md-4 col-sm-6">
        <div
          style={{
            borderRadius: "30px",
            height: "300px",
            backgroundColor: "white",
          }}
          class="single-services text-center mb-30"
        >
          <div class="services-ion">
            <img
              style={{ width: "175px", height: "100px", borderRadius: "40px" }}
              src={props.data.postDetailData.jobTypePostData.image}
            ></img>
          </div>
          <div style={{ marginTop: "20px" }} class="services-cap">
            <h5>
              <NavLink to="/job">
                {props.data.postDetailData.jobTypePostData.value}
              </NavLink>
            </h5>
            <span style={{ fontSize: "15px" }}>
              {props.data.amount} Bài Đăng
            </span>
          </div>
        </div>
      </div>
    </>
  );
};

export default Category;

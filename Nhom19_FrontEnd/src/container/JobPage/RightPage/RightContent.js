import React from "react";
import { Link } from "react-router-dom";
import { Input } from "antd";

import Job from "../../../components/Job/Job";
const RightContent = (props) => {
  return (
    <>
      {/* <!-- Featured_job_start --> */}
      <section class="featured-job-area">
        <div class="container">
          {/* <!-- Count of Job list Start --> */}
          <div class="row">
            <div class="col-lg-12">
              <div class="count-job mb-35">
                <span>
                  <i>{props.count} công việc được tìm thấy</i>
                </span>
                <Input.Search
                  style={{marginLeft:'60px'}}
                  onSearch={props.handleSearch}
                  className="mt-5"
                  placeholder="Nhập tên bài đăng"
                  allowClear
                  enterButton="Tìm kiếm"
                ></Input.Search>

                {/* <!-- Select job items start --> */}
                {/* <div class="select-job-items">
                                                <span>Sort by</span>
                                                <select name="select">
                                                    <option value="">None</option>
                                                    <option value="">job list</option>
                                                    <option value="">job list</option>
                                                    <option value="">job list</option>
                                                </select>
                                            </div> */}
                {/* <!--  Select job items End--> */}
              </div>
            </div>
          </div>
          <div style={{ width : '850px' , display:'flex',flexWrap:'wrap',justifyContent:'space-between'}}>
            {props.post.map((data, index) => {
              return (
                <Link to={`/detail-job/${data.id}`}>
                  <div
                    style={{
                      width: "412px",
                      height: "166.45px",
                      backgroundColor: "white",
                      borderRadius: "30px",
                      marginTop : '55px'
                    }}
                    class="single-job-items mb-30"
                  >
                    <Job key={data.id} data={data} />
                  </div>
                </Link>
              );
            })}
          </div>

          {/* <div class="single-job-items mb-30">
                                   <Job />
                                </div>
                               
                                <div class="single-job-items mb-30">

                                     <Job />
                                </div>
                              
                                <div class="single-job-items mb-30">
                                    <Job />

                                </div>
                               
                                
                                <div class="single-job-items mb-30"> 
                                      <Job />
                                </div>
                                
                                <div class="single-job-items mb-30">                                
                                     <Job /> 
                                </div>  */}
        </div>
      </section>
      {/* <!-- Featured_job_end --> */}
    </>
  );
};

export default RightContent;

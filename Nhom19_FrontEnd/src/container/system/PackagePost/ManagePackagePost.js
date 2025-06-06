import React from "react";
import { useEffect, useState } from "react";
import moment from "moment";
import ReactPaginate from "react-paginate";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";
import { Input } from "antd";

import {
  getAllPackage,
  setActiveTypePackage,
} from "../../../service/userService";
import { PAGINATION } from "../../../util/constant";
import CommonUtils from "../../../util/CommonUtils";
import AddpackagePost from "./AddPackagePost";

const ManagePackagePost = () => {
  const [dataPackagePost, setDataPackagePost] = useState([]);
  const [count, setCount] = useState("");
  const [numberPage, setnumberPage] = useState("");
  const [search, setSearch] = useState("");

  useEffect(() => {
    try {
      let fetchData = async () => {
        let arrData = await getAllPackage({
          limit: PAGINATION.pagerow,
          offset: 0,
          search: CommonUtils.removeSpace(search),
        });
        if (arrData && arrData.errCode === 0) {
          setDataPackagePost(arrData.data);
          setnumberPage(0);
          setCount(Math.ceil(arrData.count / PAGINATION.pagerow));
        }
      };
      fetchData();
    } catch (error) {
      console.log(error);
    }
  }, [search]);
  let hanndleSetActivePackage = async (event, id, isActive) => {
    event.preventDefault();
    let res = await setActiveTypePackage({
      id: id,
      isActive: isActive,
    });
    if (res && res.errCode === 0) {
      toast.success(res.errMessage);
      let arrData = await getAllPackage({
        limit: PAGINATION.pagerow,
        offset: numberPage * PAGINATION.pagerow,
        search: CommonUtils.removeSpace(search),
      });
      if (arrData && arrData.errCode === 0) {
        setDataPackagePost(arrData.data);
        setCount(Math.ceil(arrData.count / PAGINATION.pagerow));
      }
    } else toast.error(res.errMessage);
  };
  let handleChangePage = async (number) => {
    setnumberPage(number.selected);
    let arrData = await getAllPackage({
      limit: PAGINATION.pagerow,
      offset: number.selected * PAGINATION.pagerow,
      search: CommonUtils.removeSpace(search),
    });
    if (arrData && arrData.errCode === 0) {
      setDataPackagePost(arrData.data);
    }
  };
  const handleSearch = (value) => {
    setSearch(value);
  };
  return (
    <div>
      <div className="col-12 grid-margin">
        <div style={{ borderRadius: "30px" }} className="card">
          <div className="card-body">
            <AddpackagePost
              style={{
                padding: "10px",
                borderRadius: "30px",
                backgroundColor: "#f4f2f5",
              }}
            />
            <div style={{padding : '10px 30px 30px'}} >
              <h4 className="card-title">
                <i>Danh sách các gói bài đăng</i>
              </h4>
              <Input.Search
                onSearch={handleSearch}
                className="mt-5 mb-5"
                placeholder="Nhập tên gói bài đăng"
                allowClear
                enterButton="Tìm kiếm"
              ></Input.Search>
              <div className="table-responsive pt-2">
                <table className="table table-bordered">
                  <thead>
                    <tr>
                      <th>STT</th>
                      <th>Tên gói</th>
                      <th>Giá trị</th>
                      <th>Giá tiền</th>
                      <th>Loại</th>
                      <th>Trạng thái</th>
                      <th>Thao tác</th>
                    </tr>
                  </thead>
                  <tbody>
                    {dataPackagePost &&
                      dataPackagePost.length > 0 &&
                      dataPackagePost.map((item, index) => {
                        return (
                          <tr key={index}>
                            <td>
                              {index + 1 + numberPage * PAGINATION.pagerow}
                            </td>
                            <td>{item.name}</td>
                            <td style={{ textAlign: "right" }}>{item.value}</td>
                            <td style={{ textAlign: "right" }}>
                              {(item.price*1000000).toLocaleString('vi-VN')} VNĐ
                            </td>
                            <td>
                              {item.isHot == 0
                                ? "Gói bình thường"
                                : "Gói nổi bật"}
                            </td>
                            <td>
                              {item.isActive == 0
                                ? "Dừng kinh doanh"
                                : "Đang kinh doanh"}
                            </td>
                            <td style={{textAlign : 'center'}} >
                              <Link
                                style={{ color: "#4B49AC" }}
                                to={`/admin/edit-package-post/${item.id}/`}
                              >
                                <span className="btn_update" >Sửa</span>
                                
                              </Link>
                              &nbsp; &nbsp;
                              {item.isActive == 1 ? (
                                <>
                                  <a
                                    className="btn_delete"
                                    href="#"
                                    onClick={(event) =>
                                      hanndleSetActivePackage(event, item.id, 0)
                                    }
                                  >
                                    Dừng kinh doanh
                                  </a>
                                </>
                              ) : (
                                <>
                                  <a
                                    className="btn_update"
                                    href="#"
                                    onClick={(event) =>
                                      hanndleSetActivePackage(event, item.id, 1)
                                    }
                                  >
                                    Mở kinh doanh
                                  </a>
                                </>
                              )}
                            </td>
                          </tr>
                        );
                      })}
                  </tbody>
                </table>
                {dataPackagePost && dataPackagePost.length == 0 && (
                  <div style={{ textAlign: "center" }}>Không có dữ liệu</div>
                )}
              </div>
            </div>
          </div>
          <ReactPaginate
            forcePage={numberPage}
            previousLabel={"Quay lại"}
            nextLabel={"Tiếp"}
            breakLabel={"..."}
            pageCount={count}
            marginPagesDisplayed={3}
            containerClassName={"pagination justify-content-center pb-3"}
            pageClassName={"page-item"}
            pageLinkClassName={"page-link"}
            previousLinkClassName={"page-link"}
            previousClassName={"page-item"}
            nextClassName={"page-item"}
            nextLinkClassName={"page-link"}
            breakLinkClassName={"page-link"}
            breakClassName={"page-item"}
            activeClassName={"active"}
            onPageChange={handleChangePage}
          />
        </div>
      </div>
    </div>
  );
};

export default ManagePackagePost;

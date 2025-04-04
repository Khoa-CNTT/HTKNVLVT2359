import React from "react";
import { useEffect, useState } from "react";
import {
  DeleteAllcodeService,
  getListAllCodeService,
} from "../../../service/userService";
import moment from "moment";
import { PAGINATION } from "../../../util/constant";
import ReactPaginate from "react-paginate";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";
import CommonUtils from "../../../util/CommonUtils";
import { Input, Modal } from "antd";
import { ExclamationCircleOutlined } from "@ant-design/icons";
import AddWorkType from "./AddWorkType";
const { confirm } = Modal;

const ManageWorkType = () => {
  const [dataWorkType, setdataWorkType] = useState([]);
  const [count, setCount] = useState("");
  const [numberPage, setnumberPage] = useState("");
  const [search, setSearch] = useState("");

  useEffect(() => {
    try {
      let fetchData = async () => {
        let arrData = await getListAllCodeService({
          type: "WORKTYPE",
          limit: PAGINATION.pagerow,
          offset: 0,
          search: CommonUtils.removeSpace(search),
        });
        if (arrData && arrData.errCode === 0) {
          setdataWorkType(arrData.data);
          setnumberPage(0);
          setCount(Math.ceil(arrData.count / PAGINATION.pagerow));
        }
      };
      fetchData();
    } catch (error) {
      console.log(error);
    }
  }, [search]);
  let handleDeleteWorkType = async (code) => {
    let res = await DeleteAllcodeService(code);
    if (res && res.errCode === 0) {
      toast.success(res.errMessage);
      let arrData = await getListAllCodeService({
        type: "WORKTYPE",
        limit: PAGINATION.pagerow,
        offset: numberPage * PAGINATION.pagerow,
        search: CommonUtils.removeSpace(search),
      });
      if (arrData && arrData.errCode === 0) {
        setdataWorkType(arrData.data);
        setCount(Math.ceil(arrData.count / PAGINATION.pagerow));
      }
    } else toast.error(res.errMessage);
  };
  let handleChangePage = async (number) => {
    setnumberPage(number.selected);
    let arrData = await getListAllCodeService({
      type: "WORKTYPE",
      limit: PAGINATION.pagerow,
      offset: number.selected * PAGINATION.pagerow,
      search: CommonUtils.removeSpace(search),
    });
    if (arrData && arrData.errCode === 0) {
      setdataWorkType(arrData.data);
    }
  };
  const handleSearch = (value) => {
    setSearch(value);
  };
  const confirmDelete = (id) => {
    confirm({
      title: "Bạn có chắc muốn xóa hình thức làm việc này?",
      icon: <ExclamationCircleOutlined />,
      onOk() {
        handleDeleteWorkType(id);
      },

      onCancel() {},
    });
  };
  return (
    <div>
      <div className="col-12 grid-margin">
        <div style={{ borderRadius: "30px" }} className="card">
          <div className="card-body">
            <AddWorkType
              style={{
                padding: "10px",
                borderRadius: "30px",
                backgroundColor: "#f4f2f5",
              }}
            />
            <div style={{padding : '10px 30px 30px'}} >
              <h4 className="card-title"><i>Danh sách hình thức làm việc</i></h4>
              <Input.Search
                onSearch={handleSearch}
                className="mt-5 mb-5"
                placeholder="Nhập tên hình thức"
                allowClear
                enterButton="Tìm kiếm"
              ></Input.Search>
              <div className="table-responsive pt-2">
                <table className="table table-bordered">
                  <thead>
                    <tr>
                      <th>STT</th>
                      <th>Tên hình thức làm việc</th>
                      <th>Mã code</th>

                      <th>Thao tác</th>
                    </tr>
                  </thead>
                  <tbody>
                    {dataWorkType &&
                      dataWorkType.length > 0 &&
                      dataWorkType.map((item, index) => {
                        return (
                          <tr key={index}>
                            <td>
                              {index + 1 + numberPage * PAGINATION.pagerow}
                            </td>
                            <td>{item.value}</td>
                            <td>{item.code}</td>
                            <td style={{textAlign : 'center'}} >
                              <Link
                                style={{ color: "#4B49AC" }}
                                to={`/admin/edit-work-type/${item.code}/`}
                              >
                                <span className="btn_update" >
                                    Sửa
                                </span>
                              </Link>
                              &nbsp; &nbsp;
                              <a
                                style={{ color: "#4B49AC" }}
                                href="#"
                                onClick={(event) => confirmDelete(item.code)}
                              >
                                <span className="btn_delete" >
                                    Xóa
                                </span>
                              </a>
                            </td>
                          </tr>
                        );
                      })}
                  </tbody>
                </table>
                {dataWorkType && dataWorkType.length == 0 && (
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

export default ManageWorkType;

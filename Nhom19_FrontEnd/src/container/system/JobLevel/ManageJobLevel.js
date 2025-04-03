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
import AddJobLevel from "./AddJobLevel";
const { confirm } = Modal;

const ManageJobLevel = () => {
  const [dataJobLevel, setdataJobLevel] = useState([]);
  const [count, setCount] = useState("");
  const [numberPage, setnumberPage] = useState("");
  const [search, setSearch] = useState("");

  useEffect(() => {
    try {
      let fetchData = async () => {
        let arrData = await getListAllCodeService({
          type: "JOBLEVEL",
          limit: PAGINATION.pagerow,
          offset: 0,
          search: CommonUtils.removeSpace(search),
        });
        if (arrData && arrData.errCode === 0) {
          setnumberPage(0);
          setdataJobLevel(arrData.data);
          setCount(Math.ceil(arrData.count / PAGINATION.pagerow));
        }
      };
      fetchData();
    } catch (error) {
      console.log(error);
    }
  }, [search]);
  let handleDeleteJobLevel = async (code) => {
    let res = await DeleteAllcodeService(code);
    if (res && res.errCode === 0) {
      toast.success(res.errMessage);
      let arrData = await getListAllCodeService({
        type: "JOBLEVEL",
        limit: PAGINATION.pagerow,
        offset: numberPage * PAGINATION.pagerow,
        search: CommonUtils.removeSpace(search),
      });
      if (arrData && arrData.errCode === 0) {
        setdataJobLevel(arrData.data);
        setCount(Math.ceil(arrData.count / PAGINATION.pagerow));
      }
    } else toast.error(res.errMessage);
  };
  let handleChangePage = async (number) => {
    setnumberPage(number.selected);
    let arrData = await getListAllCodeService({
      type: "JOBLEVEL",
      limit: PAGINATION.pagerow,
      offset: number.selected * PAGINATION.pagerow,
      search: CommonUtils.removeSpace(search),
    });
    if (arrData && arrData.errCode === 0) {
      setdataJobLevel(arrData.data);
    }
  };
  const handleSearch = (value) => {
    setSearch(value);
  };
  const confirmDelete = (id) => {
    confirm({
      title: "Bạn có chắc muốn xóa trình độ này này?",
      icon: <ExclamationCircleOutlined />,
      onOk() {
        handleDeleteJobLevel(id);
      },

      onCancel() {},
    });
  };
  return (
    <div>
      <div className="col-12 grid-margin">
        <div style={{ borderRadius: "30px" }} className="card">
          <div className="card-body">
            <AddJobLevel
              style={{
                padding: "10px",
                borderRadius: "30px",
                backgroundColor: "#f4f2f5",
              }}
            />
            <div style={{padding : ' 0px 30px 30px'}} >
              <h4 className="card-title"><i>Danh sách cấp bậc</i></h4>
              <Input.Search
                onSearch={handleSearch}
                className="mt-5 mb-5"
                placeholder="Nhập tên cấp bậc"
                allowClear
                enterButton="Tìm kiếm"
              ></Input.Search>
              <div className="table-responsive pt-2">
                <table className="table table-bordered">
                  <thead>
                    <tr>
                      <th>STT</th>
                      <th>Tên cấp bậc</th>
                      <th>Mã code</th>

                      <th>Thao tác</th>
                    </tr>
                  </thead>
                  <tbody>
                    {dataJobLevel &&
                      dataJobLevel.length > 0 &&
                      dataJobLevel.map((item, index) => {
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
                                to={`/admin/edit-job-level/${item.code}/`}
                              >
                                <span className="btn_update" >Sửa</span>
                                
                              </Link>
                              &nbsp; &nbsp;
                              <a
                                style={{ color: "#4B49AC" }}
                                href="#"
                                onClick={(event) => confirmDelete(item.code)}
                              >
                                <span className="btn_delete" >Xóa</span>
                                
                              </a>
                            </td>
                          </tr>
                        );
                      })}
                  </tbody>
                </table>
                {dataJobLevel && dataJobLevel.length == 0 && (
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

export default ManageJobLevel;

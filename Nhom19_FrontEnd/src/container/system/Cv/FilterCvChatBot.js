import React from "react";
import { useEffect, useState } from "react";
import { getFilterCv } from "../../../service/cvService";
import { ExclamationCircleOutlined } from "@ant-design/icons";
import { useHistory } from "react-router-dom";
import { Modal } from "antd";

const { confirm } = Modal;

const FilterCvChatBot = ({ data }) => {
  const [dataCv, setdataCv] = useState([]);
  const [isHiddenPercent, setIsHiddenPercent] = useState(true);
  let history = useHistory();
  const confirmSeeCandiate = (id) => {
    confirm({
      title: "Khi xem bạn sẽ mất 1 lần xem thông tin ứng viên",
      icon: <ExclamationCircleOutlined />,
      onOk() {
        history.push(`/admin/candiate/${id}/`);
      },
      onCancel() {},
    });
  };
  let fetchData = async () => {
    let arrData = await getFilterCv({
      limit: 3,
      offset: 0,
      categoryJobCode: data.categoryJobCode,
      experienceJobCode: data.experienceJobCode,
      salaryCode: data.salaryCode,
      provinceCode: data.provinceCode,
      listSkills: data.listSkills,
      otherSkills: data.otherSkills,
    });
    if (arrData && arrData.errCode === 0) {
      setdataCv(arrData.data);
      setIsHiddenPercent(arrData.isHiddenPercent);
    }
  };

  useEffect(() => {
    try {
      fetchData();
    } catch (error) {
      console.log(error);
    }
  }, []);

  return (
    <div>
      <div className="table-responsive pt-2">
        <table className="table table-bordered">
          <thead>
            <tr>
              <th>STT</th>
              <th>Tên ứng viên</th>
              <th>Lĩnh vực</th>
              {!isHiddenPercent && (
                <>
                  <th>Tỉ lệ phù hợp</th>
                  <th>Đánh giá</th>
                </>
              )}
              <th>Thao tác</th>
            </tr>
          </thead>
          <tbody>
            {dataCv &&
              dataCv.length > 0 &&
              dataCv.map((item, index) => {
                return (
                  <tr key={index}>
                    <td>{index + 1}</td>
                    <td>
                      {item.userSettingData.firstName +
                        " " +
                        item.userSettingData.lastName}
                    </td>
                    <td>{item.jobTypeSettingData.value}</td>
                    {!isHiddenPercent && (
                      <>
                        <td>{item.file}</td>
                        <td>
                          <label
                            className={
                              +item.file.split("%")[0] >= 70
                                ? "badge badge-success"
                                : +item.file.split("%")[0] > 30
                                ? "badge badge-warning"
                                : "badge badge-danger"
                            }
                          >
                            {+item.file.split("%")[0] >= 70
                              ? "Tốt"
                              : +item.file.split("%")[0] > 30
                              ? "Tạm chấp nhận"
                              : "Tệ"}
                          </label>
                        </td>
                      </>
                    )}
                    <td
                      style={{
                        textAlign: "center",
                      }}
                    >
                      <span
                        style={{
                          cursor: "pointer",
                          padding: "10px",
                          borderRadius: "10px",
                          backgroundColor: "#57B657",
                          color: "white",
                        }}
                        onClick={() => confirmSeeCandiate(item.userId)}
                      >
                        Xem chi tiết ứng viên
                      </span>
                      &nbsp; &nbsp;
                    </td>
                  </tr>
                );
              })}
          </tbody>
        </table>
        {dataCv && dataCv.length == 0 && (
          <div style={{ textAlign: "center" }}>Không có dữ liệu</div>
        )}
      </div>
    </div>
  );
};

export default FilterCvChatBot;

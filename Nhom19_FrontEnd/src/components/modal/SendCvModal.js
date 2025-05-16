import React, { useEffect, useState } from "react";
import { toast } from "react-toastify";
import {
  Modal,
  ModalHeader,
  ModalFooter,
  ModalBody,
  Button,
  Spinner,
} from "reactstrap";
import { Select } from "antd";

import { createNewCv } from "../../service/cvService";
import {
  getDetailUserById,
  getAllSkillByJobCode,
  getDetailAllcodeByCode
} from "../../service/userService";
import { useFetchAllcode } from "../../util/fetch";
import CommonUtils from "../../util/CommonUtils";
import "./modal.css";
function SendCvModal(props) {
  const userData = JSON.parse(localStorage.getItem("userData"));
  const [isLoading, setIsLoading] = useState(false);
  const [inputValue, setInputValue] = useState({
    userId: "",
    postId: "",
    file: "",
    description: "",
    linkFile: "",
    linkFileUser: "",
    fileUser: "",
  });
  const [typeCv, setTypeCv] = useState("pcCv");
  const [listSkills, setListSkills] = useState([]);
  const [inputValues, setInputValues] = useState({
    jobType: "",
    salary: "",
    skills: [],
  });

  let getFileCv = async (id) => {
    let res = await getDetailUserById(id);
    setInputValue({
      ...inputValue,
      ["userId"]: id,
      ["postId"]: props.postId,
      ["linkFileUser"]: res.data.userAccountData.userSettingData.file
        ? URL.createObjectURL(
            dataURLtoFile(
              res.data.userAccountData.userSettingData.file,
              "yourCV"
            )
          )
        : "",
      ["fileUser"]: res.data.userAccountData.userSettingData.file
        ? res.data.userAccountData.userSettingData.file
        : "",
    });
  };

  const handleChangeValue = async (value, detail) => {
    if (Array.isArray(detail)) {
      setInputValues({
        ...inputValues,
        skills: detail
      });
      console.log("List : " , inputValues.skills)
    } else {
      if (detail.type === "jobType") {
        let res = await getAllSkillByJobCode(value);
        let listSkills = res.data.map((item) => ({
          label: item.name,
          value: item.id,
        }));
        setListSkills(listSkills);
        setInputValues({
          ...inputValues,
          [detail.type]: value,
          skills: [],
        });
      } else {
        setInputValues({
          ...inputValues,
          [detail.type]: value,
        });
      }
    }
  };

  let { data: dataSalary } = useFetchAllcode("SALARYTYPE");
  let { data: dataJobType } = useFetchAllcode("JOBTYPE");

  dataSalary = dataSalary.map((item) => ({
    value: item.code,
    label: item.value,
    type: "salary",
  }));

  dataJobType = dataJobType.map((item) => ({
    value: item.code,
    label: item.value,
    type: "jobType",
  }));

  useEffect(() => {
    if (userData) getFileCv(userData.id);
  }, []);

  const handleChange = (event) => {
    const { name, value } = event.target;
    setInputValue({
      ...inputValue,
      [name]: value,
    });
  };

  const radioOnChange = (e) => {
    const { value } = e.target;
    if (value === "userCv" && !inputValue.linkFileUser) {
      toast.error("Hiện chưa đăng CV online cho chúng tôi");
    } else {
      setTypeCv(value);
    }
  };

  let dataURLtoFile = (dataurl, filename) => {
    var arr = dataurl.split(","),
      mime = arr[0].match(/:(.*?);/)[1],
      bstr = atob(arr[1]),
      n = bstr.length,
      u8arr = new Uint8Array(n);

    while (n--) {
      u8arr[n] = bstr.charCodeAt(n);
    }

    return new File([u8arr], filename, { type: mime });
  };

  const handleOnChangeFile = async (event) => {
    let data = event.target.files;
    let file = data[0];
    if (file) {
      if (file.size > 2097152) {
        toast.error("File của bạn quá lớn. Chỉ gửi file dưới 2MB");
        return;
      }
      let base64 = await CommonUtils.getBase64(file);
      setInputValue({
        ...inputValue,
        ["file"]: base64,
        ["linkFile"]: URL.createObjectURL(file),
      });
    }
  };

  const handleSendCV = async () => {
    const code = await getDetailAllcodeByCode(inputValues.jobType)
    let cvSend = "";
    if (typeCv === "userCv") {
      cvSend = inputValue.fileUser;
    } else {
      cvSend = inputValue.file;
    }
    let kq = await createNewCv({
      userId: inputValue.userId,
      file: cvSend,
      postId: inputValue.postId,
      description: `Giới Thiệu Bản Thân : ${inputValue.description} ; Lĩnh Vực : ${code.data.value} ; Mức Lương : ${inputValues.salary} ; Kỹ Năng : ${JSON.stringify(inputValues.skills.map(item => item.label))}`,
    });
    setTimeout(function () {
      setIsLoading(false);
      if (kq.errCode === 0) {
        setInputValue({
          ...inputValue,
          ["file"]: "",
          ["description"]: "",
          ["linkFile"]: "",
        });
        toast.success("Đã gửi thành công");
        props.onHide();
      } else toast.error("Gửi thất bại");
    }, 1000);
  };
  return (
    <div>
      <Modal
        isOpen={props.isOpen}
        className={"booking-modal-container custom-modal"}
        size="md"
        centered
        style={{ maxWidth: "1000px", width: "90%" }}
      >
        <div
          style={{
            display: "flex",
            gap: "30px",
            alignItems: "center",
            padding: "50px",
          }}
        >
          <div style={{ width: "380px", flex: "1" }}>
            <p
              style={{
                fontSize: "20px",
                fontWeight: "bold",
                marginBottom: "0px",
              }}
              className="text-center"
            >
              NỘP CV CỦA BẠN CHO NHÀ TUYỂN DỤNG
            </p>
            <ModalBody>
              <p
                style={{
                  fontSize: "15px",
                  fontWeight: "bold",
                  marginBottom: "0px",
                }}
              >
                Nhập lời giới thiệu gửi đến nhà tuyển dụng
              </p>
              <div>
                <textarea
                  placeholder="Giới thiệu sơ lược về bản thân để tăng sự yêu thích đối với nhà tuyển dụng"
                  name="description"
                  className="mt-2"
                  style={{ width: "100%" }}
                  rows="5"
                  onChange={(event) => handleChange(event)}
                ></textarea>
                <div
                  className="d-flex"
                  style={{ justifyContent: "space-between" }}
                >
                  <div>
                    <input
                      onChange={radioOnChange}
                      type="radio"
                      checked={typeCv === "pcCv"}
                      value="pcCv"
                      name="typeCV"
                    ></input>
                    <label className="ml-2">Tự chọn CV</label>
                  </div>
                  <div>
                    <input
                      onChange={radioOnChange}
                      type="radio"
                      checked={typeCv === "userCv"}
                      value="userCv"
                      name="typeCV"
                    ></input>
                    <label className="ml-2">CV online</label>
                  </div>
                </div>
                {typeCv === "pcCv" && (
                  <input
                    type="file"
                    className="mt-2"
                    accept=".pdf"
                    onChange={(event) => handleOnChangeFile(event)}
                  ></input>
                )}
                {typeCv === "pcCv" && inputValue.linkFile && (
                  <div>
                    <a
                      href={inputValue.linkFile}
                      style={{ color: "blue" }}
                      target="_blank"
                    >
                      Nhấn vào đây để xem lại CV của bạn{" "}
                    </a>
                  </div>
                )}
                {typeCv === "userCv" && inputValue.linkFileUser && (
                  <div>
                    <a
                      href={inputValue.linkFileUser}
                      style={{ color: "blue" }}
                      target="_blank"
                    >
                      Nhấn vào đây để xem lại CV của bạn{" "}
                    </a>
                  </div>
                )}
              </div>
            </ModalBody>
            <ModalFooter style={{ justifyContent: "space-around" }}>
              <Button
                style={{
                  borderRadius: "35px",
                  backgroundColor: "rgb(250 166 26)",
                }}
                className="me-5"
                onClick={() => handleSendCV()}
              >
                Gửi hồ sơ
              </Button>

              <Button
                style={{
                  borderRadius: "35px",
                  backgroundColor: "rgb(250 166 26)",
                }}
                onClick={() => {
                  setInputValue({
                    ...inputValue,
                    ["file"]: "",
                    ["description"]: "",
                    ["linkFile"]: "",
                  });
                  props.onHide();
                }}
              >
                Hủy
              </Button>
            </ModalFooter>

            {isLoading && (
              <Modal isOpen="true" centered contentClassName="closeBorder">
                <div
                  style={{
                    position: "absolute",
                    right: "50%",
                    justifyContent: "center",
                    alignItems: "center",
                  }}
                >
                  <Spinner animation="border"></Spinner>
                </div>
              </Modal>
            )}
          </div>
          <form style={{ width: "330px" }} className="form-sample">
            <div style={{ height: "65px" }} className="row">
              <div className="col-md-6">
                <div style={{display : 'block'}} className="form-group row">
                  <label style={{marginLeft : '15px'}} >Lĩnh vực</label>
                  <div style={{marginLeft : '14px'}}>
                    <Select
                      style={{
                        width: "calc(200% - 26px)",
                      }}
                      placeholder="Chọn lĩnh vực"
                      onChange={handleChangeValue}
                      options={dataJobType}
                      value={inputValues.jobType}
                      filterOption={(input, option) =>
                        (option?.label ?? "")
                          .toLowerCase()
                          .includes(input.toLowerCase())
                      }
                      showSearch
                    ></Select>
                  </div>
                </div>
              </div>
            </div>
            <div style={{ marginTop : '10px'  , height: "65px" }} className="row">
              <div className="col-md-6">
                <div style={{display : 'block'}} className="form-group row">
                  <label style={{marginLeft : '15px'}} >Mức lương</label>
                  <div style={{marginLeft : '14px'}}>
                    <Select
                      style={{
                        width: "calc(200% - 26px)",
                      }}
                      placeholder="Chọn mức lương"
                      onChange={handleChangeValue}
                      options={dataSalary}
                      value={inputValues.salary}
                      filterOption={(input, option) =>
                        (option?.label ?? "")
                          .toLowerCase()
                          .includes(input.toLowerCase())
                      }
                      showSearch
                    ></Select>
                  </div>
                </div>
              </div>
            </div>
            <div className="row">
              <div className="col-md-12">
                <div className="form-group row">
                  <label className="col-sm-3 col-form-label">Kĩ năng</label>
                  <div
                    className="col-sm-9 mt-3"
                    style={{ marginLeft: "-136px" }}
                  >
                    <Select
                      disabled={!inputValues.jobType}
                      mode="multiple"
                      style={{
                        marginTop: "30px",
                        marginLeft: "46px",
                        width: "calc(100% + 67px)",
                      }}
                      placeholder="Chọn kĩ năng của bạn"
                      onChange={handleChangeValue}
                      options={listSkills}
                      value={inputValues.skills}
                      filterOption={(input, option) =>
                        (option?.label ?? "")
                          .toLowerCase()
                          .includes(input.toLowerCase())
                      }
                      showSearch
                    ></Select>
                  </div>
                </div>
              </div>
            </div>
          </form>
        </div>
      </Modal>
    </div>
  );
}

export default SendCvModal;

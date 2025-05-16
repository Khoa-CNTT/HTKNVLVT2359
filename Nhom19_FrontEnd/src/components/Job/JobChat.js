import React, { useState } from "react";
import { toast } from "react-toastify";
import { useHistory } from "react-router-dom";

import CommonUtils from "../../util/CommonUtils";
import SendCvModal from "../../components/modal/SendCvModal";
import { Link } from "react-router-dom";

const JobChat = (props) => {
  const [isActiveModal, setAcitveModal] = useState(false);
  const history = useHistory();

  const handleOpenModal = () => {
    if (props.data.timeEnd && CommonUtils.formatDate(props.data.timeEnd) > 0) {
      const userData = JSON.parse(localStorage.getItem("userData"));
      if (userData) setAcitveModal(true);
      else {
        toast.error("Xin hãy đăng nhập để có thể thực hiện nộp CV");
        setTimeout(() => {
          localStorage.setItem("lastUrl", window.location.href);
          history.push("/login");
        }, 1000);
      }
    } else toast.error("Hạn ứng tuyển đã hết");
  };

  return (
    <>
      <div style={{ flexWrap: "nowrap", marginTop: "14px" }} class="job-items">
        <Link to={`/detail-job/${props.data.id}`}>
          <div class="company-img">
            <a href="#">
              <img
                src={props.data.userPostData.userCompanyData.thumbnail}
                alt=""
                style={{ width: "65px", height: "65px" }}
              />
            </a>
          </div>
        </Link>
        <div class="job-tittle job-tittle2">
          <Link to={`/detail-job/${props.data.id}`}>
            <h5 style={{ fontSize: "14px" }}>
              {props.data.postDetailData.name}
            </h5>        
          </Link>
          <div
            style={{
              borderRadius: "22px",
              backgroundColor: "rgb(250 166 26)",
              border: "1px solid rgb(250 166 26)",
              padding: "6px",
              color: "white",
              textAlign: "center",
              fontSize: "12px",
              cursor : 'pointer'
            }}
            onClick={() => handleOpenModal()}
          >
            Ứng Tuyển Ngay
          </div>
        </div>
      </div>
      {/* <div class="items-link items-link2 f-right">
                <a className='my-font' href="job_details.html">{props.data.postDetailData.workTypePostData.value}</a>
                <span style={{ position: 'absolute', right: '70px' }}>{handleSplitTime(props.data.timePost)}</span>
            </div> */}
      <SendCvModal
        isOpen={isActiveModal}
        onHide={() => setAcitveModal(false)}
        postId={props.data.id}
      />
    </>
  );
};

export default JobChat;

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
import { banPostService } from "../../service/userService";
import "./modal.css";
function NoteModal(props) {
  const userData = JSON.parse(localStorage.getItem("userData"));
  const [isLoading, setIsLoading] = useState(false);
  const [inputValue, setInputValue] = useState({
    note: "",
  });
  const handleChange = (event) => {
    const { name, value } = event.target;
    setInputValue({
      ...inputValue,
      [name]: value,
    });
  };
  const handlePost = () => {
    setIsLoading(true);
    props.handleFunc(props.id, inputValue.note);
    setIsLoading(false);
    props.onHide();
  };
  return (
    <div>
      <Modal
        isOpen={props.isOpen}
        className={"booking-modal-container"}
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
            <p style={{fontSize : '20px' , fontWeight : 'bold' , marginBottom : '0px'}} className="text-center">Hãy gửi lời nhắn đến nhà tuyển dụng</p>
            <ModalBody>
              <div>
                <textarea
                  placeholder="Giải thích lý do cho nhà tuyển dụng"
                  name="note"
                  className="mt-2"
                  style={{ width: "100%" }}
                  rows="5"
                  onChange={(event) => handleChange(event)}
                ></textarea>
              </div>
            </ModalBody>
            <ModalFooter style={{ justifyContent: "space-around" }}>
              <Button style={{borderRadius : '35px' , backgroundColor : 'rgb(250 166 26)'}} className="me-5" onClick={() => handlePost()}>
                Gửi Lời Nhắn
              </Button>

              <Button
                onClick={() => {
                  props.onHide();
                }}
                style={{borderRadius : '35px' , backgroundColor : 'rgb(250 166 26)'}}
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
          <img width={'360px'} height={'180px'} src="/assets/img/logo/logo.png" />
        </div>
      </Modal>
    </div>
  );
}

export default NoteModal;

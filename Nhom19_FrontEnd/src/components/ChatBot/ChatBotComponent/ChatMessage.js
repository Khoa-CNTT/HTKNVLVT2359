import React from "react";
import ChatbotIcon from "./ChatBotIcon";
import { Link } from "react-router-dom/cjs/react-router-dom.min";
import JobChat from "../../Job/JobChat";

const ChatMessage = ({ chat }) => {
  return (
      <div
        className={`message ${chat.role === "model" ? "bot" : "user"}-message`}
      >
        {chat.role === "model" && <ChatbotIcon />}
        <div style={{ marginBottom: "0px" }} className="message-text">
          {chat.text}
          {chat.data && chat.data.map((item, index) => {
              return (
                  <div
                    style={{
                      width: "300px",
                      height: "166.45px",
                      backgroundColor: "white",
                      borderRadius: "30px",
                      marginTop : '55px'
                    }}
                    class="single-job-items mb-30"
                  >
                    <JobChat key={item.id} data={item} />
                  </div>
              );
            })}
        </div>
      </div>
    )
};

export default ChatMessage;

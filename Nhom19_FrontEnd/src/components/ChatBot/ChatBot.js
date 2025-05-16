import React, { useEffect, useRef, useState } from "react";

import ChatbotIcon from "./ChatBotComponent/ChatBotIcon";
import "./ChatBot.css";
import ChatForm from "./ChatBotComponent/ChatForm";
import ChatMessage from "./ChatBotComponent/ChatMessage";
import { getListPostService } from "../../service/userService";

var data = [];

const ChatBot = ({ showChatBot }) => {
  const [chatHistory, setChatHistory] = useState([]);
  const [user, setUser] = useState({});
  const chatBodyRef = useRef();

  const generateBotResponse = async (history) => {
    const updateHistory = (text) => {
      setChatHistory((prev) => [
        ...prev.filter((msg) => msg.text !== "Chờ tôi một lát ..."),
        { role: "model", text },
      ]);
    };

    history = history.map(({ role, text }) => ({ role, parts: [{ text }] }));

    let size = history.length;

    const requestOptions = {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ contents: history[size - 1] }),
    };

    try {
      const response = await fetch(
        "https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent?key=AIzaSyB_a_5ZcgTuuvHfiD3lBX2Jx_nWW3NXSKI",
        requestOptions
      );
      const data = await response.json();
      if (!response.ok)
        throw new Error(data.error.message || "something went wrong!");

      const apiResponseText = data.candidates[0].content.parts[0].text
        .replace(/\*\*(.*?)\*\*/g, "$1")
        .trim();
      updateHistory(apiResponseText);
    } catch (error) {
      console.log(error);
    }
  };

  const generateSystemResponse = async (history) => {
    const updateHistory = (text) => {
      console.log("Data Last : ", data);
      if (
        text == "JindJobs xin được phép phản hồi lại bạn các công việc sau :"
      ) {
        setChatHistory((prev) => [
          ...prev.filter((msg) => msg.text !== "Chờ tôi một lát ..."),
          { role: "model", text, data },
        ]);
      } else {
        setChatHistory((prev) => [
          ...prev.filter((msg) => msg.text !== "Chờ tôi một lát ..."),
          { role: "model", text },
        ]);
      }
    };

    let size = history.length;

    const aiText = history[size - 1].text;

    console.log("text : ", aiText);

    var apiResponseText = ``;

    if (
      aiText.toUpperCase().includes("CHÀO") ||
      aiText.toUpperCase().includes("HI") ||
      aiText.toUpperCase().includes("HELLO")
    ) {
      if (user) {
        apiResponseText = `Xin chào ${
          user.firstName + " " + user.lastName
        } \n FindJobs Có Thể Giúp Gì Cho Bạn`;
      } else {
        apiResponseText = `Oh ! JindJobs nhận thấy bạn chưa đăng nhập \n Hãy đăng nhập để cùng FindJobs tìm kiếm công việc yêu thích nhé`;
      }
    }

    if (
      aiText.toUpperCase().includes("VIỆC") ||
      aiText.toUpperCase().includes("NGHỀ") ||
      aiText.toUpperCase().includes("LĨNH VỰC") ||
      aiText.toUpperCase().includes("NGÀNH") ||
      aiText.toUpperCase().includes("THÔNG TIN")
    ) {
      if (user) {
        if (
          aiText.toUpperCase().includes("CÔNG NGHỆ THÔNG TIN") ||
          aiText.toUpperCase().includes("IT")
        ) {
          let params = {
            limit: 3,
            offset: 0,
            categoryJobCode: "cong-nghe-thong-tin",
            addressCode: "",
            salaryJobCode: [],
            categoryJoblevelCode: [],
            categoryWorktypeCode: [],
            experienceJobCode: [],
            search: "",
          };
          let arrData = await getListPostService(params);
          data = arrData.data;
          apiResponseText = `JindJobs xin được phép phản hồi lại bạn các công việc sau :`;
        } else if (
          aiText.toUpperCase().includes("BẤT ĐỘNG SẢN") ||
          aiText.toUpperCase().includes("BĐS") ||
          aiText.toUpperCase().includes("ĐẤT")
        ) {
          let params = {
            limit: 3,
            offset: 0,
            categoryJobCode: "bat-dong-san",
            addressCode: "",
            salaryJobCode: [],
            categoryJoblevelCode: [],
            categoryWorktypeCode: [],
            experienceJobCode: [],
            search: "",
          };
          let arrData = await getListPostService(params);
          console.log("Arr BĐS : ", arrData);
          data = arrData.data;
          apiResponseText = `JindJobs xin được phép phản hồi lại bạn các công việc sau :`;
        }else if (
          aiText.toUpperCase().includes("GIÁO VIÊN") ||
          aiText.toUpperCase().includes("DẠY HỌC") 
        ) {
          let params = {
            limit: 3,
            offset: 0,
            categoryJobCode: "giao-vien",
            addressCode: "",
            salaryJobCode: [],
            categoryJoblevelCode: [],
            categoryWorktypeCode: [],
            experienceJobCode: [],
            search: "",
          };
          let arrData = await getListPostService(params);
          console.log("Arr BĐS : ", arrData);
          data = arrData.data;
          apiResponseText = `JindJobs xin được phép phản hồi lại bạn các công việc sau :`;
        } else {
          let params = {
            limit: 3,
            offset: 0,
            categoryJobCode: "",
            addressCode: "",
            salaryJobCode: [],
            categoryJoblevelCode: [],
            categoryWorktypeCode: [],
            experienceJobCode: [],
            search: "",
          };
          let arrData = await getListPostService(params);
          console.log("Arr : ", arrData);
          data = arrData.data;
          apiResponseText = `JindJobs xin được phép phản hồi lại bạn các công việc sau :`;
        }
      } else {
        apiResponseText = `Oh ! JindJobs nhận thấy bạn chưa đăng nhập \n Hãy đăng nhập để cùng FindJobs tìm kiếm công việc yêu thích nhé`;
      }
    }
    setTimeout(() => {
      updateHistory(apiResponseText);
    }, 2000);
  };

  useEffect(() => {
    const userData = JSON.parse(localStorage.getItem("userData"));
    setUser(userData);
  }, []);

  useEffect(() => {
    chatBodyRef.current.scrollTo({
      top: chatBodyRef.current.scrollHeight,
      behavior: "smooth",
    });
    console.log("History : ", chatHistory);
  }, [chatHistory]);

  return (
    <div className={`chatbot-container ${showChatBot ? "show-chatbot" : ""}`}>
      <div className="chatbot-popup">
        {/* ChatBot Header */}
        <div className="chat-header">
          <div className="header-info">
            <ChatbotIcon />
            <h3 style={{ marginBottom: "0px", fontWeight: "bold" }}>
              FindJobs
            </h3>
          </div>
          <button className="material-symbols-rounded">
            keyboard_arrow_down
          </button>
        </div>
        {/* ChatBot Body */}
        <div ref={chatBodyRef} className="chat-body">
          <div className="message bot-message">
            <ChatbotIcon />
            <div style={{ marginBottom: "0px" }} className="message-text">
              FindJobs xin kính chào ! <br /> Tôi có thể giúp gì được cho bạn ?
            </div>
          </div>
          {chatHistory.map((chat, index) => (
            <ChatMessage key={index} chat={chat} />
          ))}
        </div>
        {/* ChatBot Footer */}
        <div className="chat-footer">
          <ChatForm
            chatHistory={chatHistory}
            setChatHistory={setChatHistory}
            generateBotResponse={generateBotResponse}
            generateSystemResponse={generateSystemResponse}
          />
        </div>
      </div>
    </div>
  );
};

export default ChatBot;

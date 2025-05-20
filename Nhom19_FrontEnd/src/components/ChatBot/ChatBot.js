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
      if (
        text == "JindJobs xin được phép phản hồi lại bạn các công việc sau :"
      ) {
        setChatHistory((prev) => [
          ...prev.filter((msg) => msg.text !== "Chờ tôi một lát ..."),
          { role: "model", text, data, roleCode: "Candidate" },
        ]);
      } else if (
        text ==
        "JindJobs xin được phép phản hồi lại công ty các công ứng viên sau :"
      ) {
        setChatHistory((prev) => [
          ...prev.filter((msg) => msg.text !== "Chờ tôi một lát ..."),
          { role: "model", text, data, roleCode: "Company" },
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

    if (user.roleCode === "CANDIDATE") {
      if (
        aiText.toUpperCase().includes("VIỆC") ||
        aiText.toUpperCase().includes("NGHỀ") ||
        aiText.toUpperCase().includes("LĨNH VỰC") ||
        aiText.toUpperCase().includes("NGÀNH") ||
        aiText.toUpperCase().includes("THÔNG TIN") ||
        aiText.toUpperCase().includes("CÁC") ||
        aiText.toUpperCase().includes("TÌM KIẾM")
      ) {
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
        } else if (aiText.toUpperCase().includes("ỨNG VIÊN")) {
          apiResponseText = `Chỉ có quyền Công Ty mới được phép tìm kiếm ứng viên`;
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
        } else if (
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
        } else if (
          aiText.toUpperCase().includes("DIGITAL") ||
          aiText.toUpperCase().includes("MARKETING")
        ) {
          let params = {
            limit: 3,
            offset: 0,
            categoryJobCode: "digitalmarketing",
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
          aiText.toUpperCase().includes("KINH TẾ") ||
          aiText.toUpperCase().includes("QUẢN TRỊ KINH DOANH")
        ) {
          let params = {
            limit: 3,
            offset: 0,
            categoryJobCode: "kinh-te",
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
        } else if (aiText.toUpperCase().includes("LUẬT")) {
          let params = {
            limit: 3,
            offset: 0,
            categoryJobCode: "luat",
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
        } else if (aiText.toUpperCase().includes("QUẢN LÝ NHÂN SỰ")) {
          let params = {
            limit: 3,
            offset: 0,
            categoryJobCode: "quan-ly-nhan-su",
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
          aiText.toUpperCase().includes("TRUYỀN THÔNG") ||
          aiText.toUpperCase().includes("BÁO CHÍ")
        ) {
          let params = {
            limit: 3,
            offset: 0,
            categoryJobCode: "truyen-thong",
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
        } else if (aiText.toUpperCase().includes("ĐÀ NẴNG")) {
          let params = {
            limit: 3,
            offset: 0,
            categoryJobCode: "",
            addressCode: "Đà Nẵng",
            salaryJobCode: [],
            categoryJoblevelCode: [],
            categoryWorktypeCode: [],
            experienceJobCode: [],
            search: "",
          };
          let arrData = await getListPostService(params);
          data = arrData.data;
          apiResponseText = `JindJobs xin được phép phản hồi lại bạn các công việc sau :`;
        } else if (aiText.toUpperCase().includes("Hà Nội")) {
          let params = {
            limit: 3,
            offset: 0,
            categoryJobCode: "",
            addressCode: "Hà Nội",
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
          aiText.toUpperCase().includes("HCM") ||
          aiText.toUpperCase().includes("SÀI GÒN") ||
          aiText.toUpperCase().includes("HỒ CHÍ MINH")
        ) {
          let params = {
            limit: 3,
            offset: 0,
            categoryJobCode: "",
            addressCode: "TP HCM",
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
          aiText.toUpperCase().includes("3 TRIỆU") ||
          aiText.toUpperCase().includes("BA TRIỆU") ||
          aiText.toUpperCase().includes("4 TRIỆU") ||
          aiText.toUpperCase().includes("BỐN TRIỆU") ||
          aiText.toUpperCase().includes("5 TRIỆU") ||
          aiText.toUpperCase().includes("NĂM TRIỆU")
        ) {
          let params = {
            limit: 3,
            offset: 0,
            categoryJobCode: "",
            addressCode: "",
            salaryJobCode: ["3-5tr"],
            categoryJoblevelCode: [],
            categoryWorktypeCode: [],
            experienceJobCode: [],
            search: "",
          };
          let arrData = await getListPostService(params);
          data = arrData.data;
          apiResponseText = `JindJobs xin được phép phản hồi lại bạn các công việc sau :`;
        } else if (
          aiText.toUpperCase().includes("10 TRIỆU") ||
          aiText.toUpperCase().includes("MƯỜI TRIỆU") ||
          aiText.toUpperCase().includes("11 TRIỆU") ||
          aiText.toUpperCase().includes("MƯỜI MỘT TRIỆU") ||
          aiText.toUpperCase().includes("12 TRIỆU") ||
          aiText.toUpperCase().includes("MƯỜI HAI TRIỆU") ||
          aiText.toUpperCase().includes("13 TRIỆU") ||
          aiText.toUpperCase().includes("MƯỜI BA TRIỆU") ||
          aiText.toUpperCase().includes("14 TRIỆU") ||
          aiText.toUpperCase().includes("MƯỜI BỐN TRIỆU") ||
          aiText.toUpperCase().includes("15 TRIỆU") |
            aiText.toUpperCase().includes("MƯỜI LĂM TRIỆU")
        ) {
          let params = {
            limit: 3,
            offset: 0,
            categoryJobCode: "",
            addressCode: "",
            salaryJobCode: ["10-15tr"],
            categoryJoblevelCode: [],
            categoryWorktypeCode: [],
            experienceJobCode: [],
            search: "",
          };
          let arrData = await getListPostService(params);
          data = arrData.data;
          apiResponseText = `JindJobs xin được phép phản hồi lại bạn các công việc sau :`;
        } else if (aiText.toUpperCase().includes("NHÂN VIÊN")) {
          let params = {
            limit: 3,
            offset: 0,
            categoryJobCode: "",
            addressCode: "",
            salaryJobCode: [],
            categoryJoblevelCode: ["nhan-vien"],
            categoryWorktypeCode: [],
            experienceJobCode: [],
            search: "",
          };
          let arrData = await getListPostService(params);
          data = arrData.data;
          apiResponseText = `JindJobs xin được phép phản hồi lại bạn các công việc sau :`;
        } else if (aiText.toUpperCase().includes("GIÁM ĐỐC")) {
          let params = {
            limit: 3,
            offset: 0,
            categoryJobCode: "",
            addressCode: "",
            salaryJobCode: [],
            categoryJoblevelCode: ["giam-doc"],
            categoryWorktypeCode: [],
            experienceJobCode: [],
            search: "",
          };
          let arrData = await getListPostService(params);
          data = arrData.data;
          apiResponseText = `JindJobs xin được phép phản hồi lại bạn các công việc sau :`;
        } else if (aiText.toUpperCase().includes("TRƯỞNG PHÒNG")) {
          let params = {
            limit: 3,
            offset: 0,
            categoryJobCode: "",
            addressCode: "",
            salaryJobCode: [],
            categoryJoblevelCode: ["truong-phong"],
            categoryWorktypeCode: [],
            experienceJobCode: [],
            search: "",
          };
          let arrData = await getListPostService(params);
          data = arrData.data;
          apiResponseText = `JindJobs xin được phép phản hồi lại bạn các công việc sau :`;
        } else if (
          aiText.toUpperCase().includes("1 NĂM") ||
          aiText.toUpperCase().includes("MỘT NĂM")
        ) {
          let params = {
            limit: 3,
            offset: 0,
            categoryJobCode: "",
            addressCode: "",
            salaryJobCode: [],
            categoryJoblevelCode: [],
            categoryWorktypeCode: [],
            experienceJobCode: ["1-nam"],
            search: "",
          };
          let arrData = await getListPostService(params);
          data = arrData.data;
          apiResponseText = `JindJobs xin được phép phản hồi lại bạn các công việc sau :`;
        } else if (
          aiText.toUpperCase().includes("2 NĂM") ||
          aiText.toUpperCase().includes("HAI NĂM")
        ) {
          let params = {
            limit: 3,
            offset: 0,
            categoryJobCode: "",
            addressCode: "",
            salaryJobCode: [],
            categoryJoblevelCode: [],
            categoryWorktypeCode: [],
            experienceJobCode: ["2-nam"],
            search: "",
          };
          let arrData = await getListPostService(params);
          data = arrData.data;
          apiResponseText = `JindJobs xin được phép phản hồi lại bạn các công việc sau :`;
        } else if (
          aiText.toUpperCase().includes("3 NĂM") ||
          aiText.toUpperCase().includes("BA NĂM")
        ) {
          let params = {
            limit: 3,
            offset: 0,
            categoryJobCode: "",
            addressCode: "",
            salaryJobCode: [],
            categoryJoblevelCode: [],
            categoryWorktypeCode: [],
            experienceJobCode: ["3nam"],
            search: "",
          };
          let arrData = await getListPostService(params);
          data = arrData.data;
          apiResponseText = `JindJobs xin được phép phản hồi lại bạn các công việc sau :`;
        } else {
          let params = {
            limit: 3,
            offset: 0,
            categoryJobCode: "",
            addressCode: "",
            salaryJobCode: ["thoa-thuan"],
            categoryJoblevelCode: [],
            categoryWorktypeCode: ["fulltime", "part-time", "remote"],
            experienceJobCode: [],
            search: "",
          };
          let arrData = await getListPostService(params);
          console.log("Arr : ", arrData);
          data = arrData.data;
          apiResponseText = `JindJobs xin được phép phản hồi lại bạn các công việc sau :`;
        }
      }
    }

    if (user.roleCode === "COMPANY") {
      if (
        aiText.toUpperCase().includes("THÔNG TIN") ||
        aiText.toUpperCase().includes("CÁC") ||
        aiText.toUpperCase().includes("TÌM KIẾM") ||
        aiText.toUpperCase().includes("ỨNG VIÊN")
      ) {
        if (
          aiText.toUpperCase().includes("CÔNG NGHỆ THÔNG TIN") ||
          aiText.toUpperCase().includes("IT")
        ) {
          let arrData = {
            categoryJobCode: "cong-nghe-thong-tin",
            experienceJobCode: "",
            listSkills: [1,2,8,9],
            provinceCode: "",
            salaryCode: "",
          };
          data = arrData;
          apiResponseText = `JindJobs xin được phép phản hồi lại công ty các công ứng viên sau :`;
        }else if (
          aiText.toUpperCase().includes("BẤT ĐỘNG SẢN") ||
          aiText.toUpperCase().includes("BĐS") ||
          aiText.toUpperCase().includes("ĐẤT")
        ){
          let arrData = {
            categoryJobCode: "bat-dong-san",
            experienceJobCode: "",
            listSkills: [20],
            provinceCode: "",
            salaryCode: "",
          };
          data = arrData;
          apiResponseText = `JindJobs xin được phép phản hồi lại công ty các công ứng viên sau :`;
        }else {
          let arrData = {
            categoryJobCode: "",
            experienceJobCode: "",
            listSkills: [],
            provinceCode: "Đà Nẵng",
            salaryCode: "",
          };
          data = arrData;
          apiResponseText = `JindJobs xin được phép phản hồi lại công ty các công ứng viên sau :`;
        }
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

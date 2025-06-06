import React, { useRef } from "react";

const ChatForm = ({
  chatHistory,
  setChatHistory,
  generateBotResponse,
  generateSystemResponse,
}) => {
  const inputRef = useRef();

  const handleFormSubmit = (e) => {
    e.preventDefault();
    const userMessage = inputRef.current.value.trim();
    if (!userMessage) return;
    inputRef.current.value = "";

    setChatHistory((history) => [
      ...history,
      { role: "user", text: userMessage },
    ]);

    const textAi = userMessage;

    if (
      textAi.toUpperCase().includes("CHÀO") ||
      textAi.toUpperCase().includes("HI") ||
      textAi.toUpperCase().includes("HELLO") ||
      textAi.toUpperCase().includes("VIỆC") ||
      textAi.toUpperCase().includes("NGHỀ") ||
      textAi.toUpperCase().includes("CÔNG TY") ||
      textAi.toUpperCase().includes("LĨNH VỰC") ||
      textAi.toUpperCase().includes("NGÀNH") ||
      textAi.toUpperCase().includes("THÔNG TIN") ||
      textAi.toUpperCase().includes("CÁC") ||
      textAi.toUpperCase().includes("TÌM KIẾM") ||
      textAi.toUpperCase().includes("ỨNG VIÊN")
    ) {
      setTimeout(() => {
        setChatHistory((history) => [
          ...history,
          { role: "model", text: "Chờ tôi một lát ..." },
        ]);
        generateSystemResponse([
          ...chatHistory,
          { role: "model", text: userMessage },
        ]);
      }, 1000);
    } else {
      setTimeout(() => {
        setChatHistory((history) => [
          ...history,
          { role: "model", text: "Chờ tôi một lát ..." },
        ]);
        generateBotResponse([
          ...chatHistory,
          { role: "model", text: userMessage },
        ]);
      }, 1000);
    }
  };

  return (
    <form action="#" className="chat-form" onSubmit={handleFormSubmit}>
      <input
        ref={inputRef}
        type="text"
        placeholder="Đặt câu hỏi ..."
        className="message-input"
        required
      />
      <button class="material-symbols-outlined">arrow_upward</button>
    </form>
  );
};

export default ChatForm;

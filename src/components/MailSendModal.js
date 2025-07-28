import React, { useState } from "react";
import "./MailSendModal.css";
import axios from "axios";

const MailSendModal = ({ onClose, senderId }) => {
  const [recipientNickname, setRecipientNickname] = useState("");
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");

  const handleSend = async () => {
    if (!recipientNickname || !title || !content) {
      alert("모든 항목을 입력해주세요.");
      return;
    }

    try {
      const response = await axios.get(`http://localhost:8080/api/users/nickname/${recipientNickname}`);
      const receiverId = response.data.id;

      await axios.post("http://localhost:8080/api/messages/send", {
        senderId,
        receiverId,
        title,
        content,
      });

      alert("쪽지가 전송되었습니다!");
      onClose();
    } catch (err) {
      console.error("쪽지 전송 실패:", err);
      alert("전송 실패: " + (err.response?.data?.message || err.message));
    }
  };

  return (
    <div className="modal-overlay">
      <div className="modal-content">
        <h3>쪽지 보내기</h3>

        <label>받는 사람 (닉네임)</label>
        <input
          type="text"
          placeholder="홍길동"
          value={recipientNickname}
          onChange={(e) => setRecipientNickname(e.target.value)}
        />

        <label>제목</label>
        <input
          type="text"
          placeholder="제목"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />

        <label>내용</label>
        <textarea
          placeholder="내용 입력"
          value={content}
          onChange={(e) => setContent(e.target.value)}
        ></textarea>

        <div className="modal-buttons">
          <button className="cancel-button" onClick={onClose}>취소</button>
          <button className="send-button" onClick={handleSend}>보내기</button>
        </div>
      </div>
    </div>
  );
};

export default MailSendModal;

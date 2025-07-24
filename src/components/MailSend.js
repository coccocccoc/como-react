import React, { useState } from 'react';
import "./MailSend.css";
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const MailSend = () => {
    const [title, setTitle] = useState('');
    const [content, setContent] = useState('');
    const [recipient, setRecipient] = useState('');
    const navigate = useNavigate();

    // 임시로 senderId 고정 (나중에 로그인 연동 시 수정)
    const senderId = 1;

    const handleSubmit = async () => {
        if (!title || !content || !recipient) {
            alert("모든 항목을 입력해주세요.");
            return;
        }

        const messageDTO = {
            senderId: senderId,
            receiverId: parseInt(recipient),
            title: title,             
            content: content          
        }

        try {
            await axios.post("http://localhost:8080/api/messages/send", messageDTO);
            alert("쪽지가 전송되었습니다!");
            navigate('/mail');
        } catch (error) {
            console.error("쪽지 전송 실패:", error);
            alert("전송 실패: " + error.message);
        }
    };


    return (
        <div className="mail-editor-wrapper">
            <div className="mail-editor-group">
                <label className="mail-editor-label">제목</label>
                <input
                    type="text"
                    placeholder="글제목"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    className="mail-editor-title-input"
                />
            </div>

            <div className="mail-editor-group">
                <label className="mail-editor-label">받는 사람 (ID)</label>
                <input
                    type="text"
                    placeholder="받는 사람 ID"
                    value={recipient}
                    onChange={(e) => setRecipient(e.target.value)}
                    className="editor-recipient-input"
                />
            </div>

            <div className="mail-editor-group">
                <textarea
                    placeholder="내용을 입력해주세요..."
                    value={content}
                    onChange={(e) => setContent(e.target.value)}
                    className="mail-custom-quill"
                ></textarea>
            </div>

            <button onClick={handleSubmit} className="send-button">보내기</button>
        </div>
    );
};


export default MailSend;

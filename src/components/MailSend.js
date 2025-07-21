import React, { useState } from 'react';
import "./MailSend.css";
import { useNavigate } from 'react-router-dom';

const MailSend = () => {
    const [title, setTitle] = useState('');
    const [content, setContent] = useState('');
    const [recipient, setRecipient] = useState('');
    const navigate = useNavigate();

    const handleSubmit = () => {
        if (!title || !content || !recipient) {
            alert("모든 항목을 입력해주세요.");
            return;
        }

        const newMail = {
            id: Date.now(),
            title,
            content,
            writer: "나", // 현재 사용자 (임시)
            receiver: recipient,
            date: new Date().toLocaleDateString(),
        };

        // 기존 메일 불러오기
        const existingMails = JSON.parse(localStorage.getItem("mails")) || [];

        // 새 메일 추가
        const updatedMails = [...existingMails, newMail];

        // 저장
        localStorage.setItem("mails", JSON.stringify(updatedMails));

        alert("메일이 전송되었습니다!");
        navigate('/mail');
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
                <label className="mail-editor-label">받는 사람</label>
                <input
                    type="text"
                    placeholder="받는 사람"
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

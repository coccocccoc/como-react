import React, { useState, useEffect } from "react";
import "./MailList.css";
import { Link, useSearchParams } from "react-router-dom";
import axios from "axios";

const MailList = ({ currentUserId = 2 }) => {
    const [searchParams, setSearchParams] = useSearchParams();
    const selectedId = searchParams.get("selectedId");

    const [allMails, setAllMails] = useState([]);
    const [selectedPost, setSelectedPost] = useState(null);
    const [mode, setMode] = useState("received");
    const [currentPage, setCurrentPage] = useState(1);
    const mailsPerPage = 10;

    // 📥 쪽지 목록 불러오기
    useEffect(() => {
        const url =
            mode === "received"
                ? `http://localhost:8080/api/messages/received/${currentUserId}`
                : `http://localhost:8080/api/messages/sent/${currentUserId}`;

        axios
            .get(url)
            .then((res) => {
                setAllMails(res.data);

                // ✅ selectedId가 있다면 상세 보기 자동 선택
                if (selectedId) {
                    const found = res.data.find((mail) => mail.id === parseInt(selectedId, 10));
                    if (found) setSelectedPost(found);
                }
            })
            .catch((err) =>
                console.error(`${mode === "received" ? "받은" : "보낸"} 쪽지 불러오기 실패:`, err)
            );
    }, [mode, currentUserId, selectedId]);

    // ✉️ 쪽지 클릭 시 상세 보기로 전환
    const handleClick = (post) => {
        setSelectedPost(post);
        setSearchParams({ selectedId: post.id });
    };

    const totalPages = Math.ceil(allMails.length / mailsPerPage);
    const indexOfLastMail = currentPage * mailsPerPage;
    const indexOfFirstMail = indexOfLastMail - mailsPerPage;
    const currentMails = allMails.slice(indexOfFirstMail, indexOfLastMail);

    const handlePageChange = (page) => {
        setCurrentPage(page);
        setSelectedPost(null);
        setSearchParams({});
    };

    return (
        <div className="maillist-board-right">
            <h2 className="section-title-m">쪽지함</h2>

            {/* 📤 받은/보낸 쪽지 토글 */}
            <div className="mail-mode-toggle">
                <button
                    className={`toggle-btn ${mode === "received" ? "active" : ""}`}
                    onClick={() => {
                        setSelectedPost(null);
                        setSearchParams({});
                        setMode("received");
                    }}
                >
                    받은 쪽지
                </button>
                <button
                    className={`toggle-btn ${mode === "sent" ? "active" : ""}`}
                    onClick={() => {
                        setSelectedPost(null);
                        setSearchParams({});
                        setMode("sent");
                    }}
                >
                    보낸 쪽지
                </button>
            </div>

            {/* 📬 쪽지 리스트 */}
            {!selectedPost && (
                <>
                    <ul className="mail-list">
                        {[...currentMails]
                            .sort((a, b) => new Date(b.sentAt) - new Date(a.sentAt))
                            .map((post) => (
                                <li key={post.id} className="mail-row" onClick={() => handleClick(post)}>
                                    <div className="mail-title">{post.title}</div>
                                    <div className="mail-meta">
                                        <span>
                                            {mode === "received"
                                                ? `보낸이: ${post.senderNickname}`
                                                : `받는이: ${post.receiverNickname}`}
                                        </span>{" "}
                                        |{" "}
                                        <span>
                                            {post.sentAt
                                                ? new Date(post.sentAt).toLocaleString()
                                                : "날짜 없음"}
                                        </span>
                                    </div>
                                </li>
                            ))}
                    </ul>

                    {/* 📄 페이지네이션 */}
                    {totalPages > 1 && (
                        <div className="pagination">
                            {Array.from({ length: totalPages }, (_, i) => (
                                <button
                                    key={i + 1}
                                    className={`page-btn ${currentPage === i + 1 ? "active" : ""}`}
                                    onClick={() => handlePageChange(i + 1)}
                                >
                                    {i + 1}
                                </button>
                            ))}
                        </div>
                    )}

                    <Link to="/mailsend" className="mail-register">쪽지쓰기</Link>
                </>
            )}

            {/* 📑 쪽지 상세 */}
            {selectedPost && (
                <div className="mail-detail">
                    <h5>{selectedPost.title}</h5>
                    <div className="mail-etc">
                        <span className="mail-writer">보낸이: {selectedPost.senderNickname}</span>
                        <span className="mail-date">{new Date(selectedPost.sentAt).toLocaleString()}</span>
                    </div>
                    <p className="mail-content">{selectedPost.content}</p>
                    <button
                        onClick={() => {
                            setSelectedPost(null);
                            setSearchParams({});
                        }}
                    >
                        목록으로
                    </button>
                </div>
            )}
        </div>
    );
};

export default MailList;

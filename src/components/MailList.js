import React, { useState, useEffect } from "react";
import "./MailList.css";
import { Link } from "react-router-dom";

const MailList = ({ currentUser = "나" }) => {


    const [allMails, setAllMails] = useState([]);
    const [selectedPost, setSelectedPost] = useState(null);
    const [mode, setMode] = useState("received"); 
    const [currentPage, setCurrentPage] = useState(1);
    const mailsPerPage = 10;

    useEffect(() => {
        const saved = JSON.parse(localStorage.getItem("mails")) || [];
        setAllMails(saved);
    }, []);

    const handleClick = (post) => {
        setSelectedPost(post);
    };

    const filteredMails =
        mode === "received"
            ? allMails.filter((mail) => mail.receiver === currentUser)
            : allMails.filter((mail) => mail.writer === currentUser);

    const totalPages = Math.ceil(filteredMails.length / mailsPerPage);
    const indexOfLastMail = currentPage * mailsPerPage;
    const indexOfFirstMail = indexOfLastMail - mailsPerPage;
    const currentMails = filteredMails.slice(indexOfFirstMail, indexOfLastMail);

    const handlePageChange = (page) => {
        setCurrentPage(page);
        setSelectedPost(null);
    };

    return (
        <div className="maillist-board-right">
            <h2 className="section-title">쪽지함</h2>

            <div className="mail-mode-toggle">
                <button
                    className={`toggle-btn ${mode === "received" ? "active" : ""}`}
                    onClick={() => {
                        setSelectedPost(null);
                        setMode("received");
                    }}
                >
                    받은 쪽지
                </button>
                <button
                    className={`toggle-btn ${mode === "sent" ? "active" : ""}`}
                    onClick={() => {
                        setSelectedPost(null);
                        setMode("sent");
                    }}
                >
                    보낸 쪽지
                </button>
            </div>

            {!selectedPost && (
                <>
                    <ul className="mail-list">
                        {[...currentMails] 
                            .sort((a, b) => new Date(b.date) - new Date(a.date))
                            .map((post, index) => (
                                <li
                                    key={`${post.id}-${index}`}
                                    className="mail-row"
                                    onClick={() => handleClick(post)}
                                >
                                    <div className="mail-title">{post.title}</div>
                                    <div className="mail-meta">
                                        <span>{mode === "received" ? post.writer : post.receiver}</span> |{" "}
                                        <span>{post.date}</span>
                                    </div>
                                </li>
                            ))}
                    </ul>

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

                    <Link to="/mailsend" className="mail-register">
                        쪽지쓰기
                    </Link>
                </>
            )}

            {selectedPost && (
                <div className="mail-detail">
                    <h5>{selectedPost.title}</h5>
                    <div className="mail-etc">
                        <span className="mail-writer">{selectedPost.writer}</span>
                        <span className="mail-date">{selectedPost.date}</span>
                    </div>
                    <p className="mail-content">{selectedPost.content}</p>
                    <button className="btn-mail back-button" onClick={() => setSelectedPost(null)}>
                        목록으로
                    </button>
                </div>
            )}
        </div>
    );
};

export default MailList;

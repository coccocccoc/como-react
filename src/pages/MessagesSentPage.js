import React, { useEffect, useState } from 'react';
import MailSendModal from '../components/MailSendModal';
import { useSearchParams } from 'react-router-dom';
import axios from 'axios';

const MessagesSentPage = () => {

    const [searchParams, setSearchParams] = useSearchParams();
        const selectedId = searchParams.get("selectedId");
        const [currentUserId, setCurrentUserId] = useState(null);
        const [allMails, setAllMails] = useState([]);
        const [selectedPost, setSelectedPost] = useState(null);
        const [currentPage, setCurrentPage] = useState(1);
        const [isModalOpen, setIsModalOpen] = useState(false);
    
      const mailsPerPage = 10;

    // ✅ 로그인된 사용자 ID 불러오기
    useEffect(() => {
        const token = localStorage.getItem("token");
        if (!token) return;

        axios.get("http://localhost:8080/api/user/me", {
            headers: {
                Authorization: token.startsWith("Bearer ") ? token : `Bearer ${token}`,
            },
        })
        .then((res) => {
          setCurrentUserId(res.data.userId);
          console.log("📌 currentUserId", currentUserId);

        })
        .catch((err) => console.error("유저 정보 조회 실패:", err));
    }, []);

    // ✅ 보낸 쪽지 조회
    useEffect(() => {
      const token = localStorage.getItem("token");
      if (!token || !currentUserId) return;

      axios.get(`http://localhost:8080/api/messages/sent/${currentUserId}`, {
          headers: {
              Authorization: token.startsWith("Bearer ") ? token : `Bearer ${token}`,
          },
      })
      .then((res) => {
          console.log("📤 보낸 쪽지 응답:", res.data);
          setAllMails(res.data);
          if (selectedId) {
              const found = res.data.find((mail) => mail.id === parseInt(selectedId, 10));
              if (found) setSelectedPost(found);
          }
      })
      .catch((err) => console.error("보낸 쪽지 불러오기 실패:", err));
  }, [currentUserId, selectedId]);


    const handleClick = (post) => {
        setSelectedPost(post);
        setSearchParams({ selectedId: post.id });
    };

    const totalPages = Math.ceil(allMails.length / mailsPerPage);
    const currentMails = allMails.slice(
        (currentPage - 1) * mailsPerPage,
        currentPage * mailsPerPage
    );

    const handlePageChange = (page) => {
        setCurrentPage(page);
        setSelectedPost(null);
        setSearchParams({});
    };

    return (
        <div className="maillist-board-right">

            {!selectedPost && (
                <>
                    <ul className="mail-list">
                        {[...currentMails]
                            .sort((a, b) => new Date(b.sentAt) - new Date(a.sentAt))
                            .map((post) => (
                                <li key={post.id} className="mail-row" onClick={() => handleClick(post)}>
                                    <div className="mail-title">{post.title}</div>
                                    <div className="mail-meta">
                                        <span>받는이: {post.receiverNickname}</span> |{" "}
                                        <span>{post.sentAt ? new Date(post.sentAt).toLocaleString() : "날짜 없음"}</span>
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


                    {isModalOpen && (
                        <MailSendModal onClose={() => setIsModalOpen(false)} senderId={currentUserId} />
                    )}
                </>
            )}

            {selectedPost && (
                <div className="mail-detail">
                    <h5 className='selectedPostTitle'>{selectedPost.title}</h5>
                    <div className="mail-etc">
                        <span className="mail-writer">받는이: {selectedPost.receiverNickname}</span>
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

export default MessagesSentPage;
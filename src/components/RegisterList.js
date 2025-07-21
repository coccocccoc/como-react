import React, { useState } from "react";
import "./RegisterList.css";

const RegisterList = ({ posts }) => {
    const [selectedPost, setSelectedPost] = useState(null);

    const handleClick = (post) => {
        setSelectedPost(post);
    };

    return (
    

            <div className="registerlist-board-right">
            <h2 className="registerlist-section-title">내가 쓴 글</h2>

                {/* 게시물 목록 */}
                {!selectedPost && (
                    <ul className="registerlist-post-list">
                        {[...posts]
                            .sort((a, b) => new Date(b.date) - new Date(a.date)) // 최신순 정렬
                            .map((post, index) => (
                                <li
                                    key={`${post.id}-${index}`}
                                    className="registerlist-post-row"
                                    onClick={() => handleClick(post)}
                                >
                                    <div className="registerlist-post-title">{post.title}</div>
                                    <div className="registerlist-post-meta">
                                        <span>{post.writer}</span> | <span>{post.date}</span>
                                    </div>
                                </li>
                            ))}
                    </ul>
                )}

                {/* 게시물 상세 */}
                {selectedPost && (
                    <div className="registerlist-post-detail">
                        <h5>{selectedPost.title}</h5>
                        <div className="registerlist-etc">
                            <span className="registerlist-writer">{selectedPost.writer}</span>
                            <span className="registerlist-date">{selectedPost.date}</span>
                        </div>
                        <p className="registerlist-content">{selectedPost.content}</p>
                        <button className="registerlist-back-button" onClick={() => setSelectedPost(null)}>목록으로</button>
                    </div>
                )}
            </div>

    );
};

export default RegisterList;
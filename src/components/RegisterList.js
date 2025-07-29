import React, { useEffect, useState } from "react";
import "./RegisterList.css";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const RegisterList = ({ posts }) => {
    const [myPosts, setMyPosts] = useState([]);
    const navigate = useNavigate();

    useEffect(() => {
        const fetchMyPosts = async () => {
            try {
                const token = localStorage.getItem("token");
                if (!token) {
                    console.warn("❌ token이 없습니다.");
                    return;
                }

                const response = await axios.get("/api/user/my-posts", {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                });

                setMyPosts(response.data);
            } catch (err) {
                console.error("내 게시물 불러오기 실패", err);
            }
        };
        fetchMyPosts();
    }, []);

    const handleClick = (post) => {
        if (post.type === "group") {
            // ✅ state에 postId 전달
            navigate(`/group-board/${post.groupId}`, {
                state: { postId: post.postId }
            });
        } else if (post.type === "recruit") {
            navigate("/studies/detail", { state: post });
        }
    };


    return (
    

            <div className="registerlist-board-right">
            <h2 className="registerlist-section-title">내가 쓴 글</h2>

                {/* 게시물 목록 */}
                    <ul className="registerlist-post-list">
                        {[...myPosts]
                            .sort((a, b) => new Date(b.createdDate) - new Date(a.createdDate)) // 최신순 정렬
                            .map((post, index) => (
                                <li
                                    key={`${post.id}-${index}`}
                                    className="registerlist-post-row"
                                    onClick={() => handleClick(post)}
                                >
                                    <div className="registerlist-post-title">{post.title}</div>
                                    <div className="registerlist-post-meta">
                                        <span>{post.nickname}</span> | <span>{post.createdDate}</span>
                                    </div>
                                </li>
                            ))}
                    </ul>

                {/* 게시물 상세 */}
                {/* {selectedPost && (
                    <div className="registerlist-post-detail">
                        <h5>{selectedPost.title}</h5>
                        <div className="registerlist-etc">
                            <span className="registerlist-writer">{selectedPost.writer}</span>
                            <span className="registerlist-date">{selectedPost.date}</span>
                        </div>
                        <p className="registerlist-content">{selectedPost.content}</p>
                        <button className="registerlist-back-button" onClick={() => setSelectedPost(null)}>목록으로</button>
                    </div>
                )} */}
            </div>

    );
};

export default RegisterList;
import React, { useEffect, useState } from 'react';
import '../styles/Mypage.css';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
// import PostCard from '../components/PostCard';

function WrittenPage() {
  const [writtenPosts, setWrittenPosts] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchMyPosts = async () => {
      try {
        const token = localStorage.getItem('token');
        const response = await axios.get('/api/user/my-posts', {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        setWrittenPosts(response.data);
      } catch (error) {
        console.error('작성한 글 불러오기 실패:', error);
      }
    };

    fetchMyPosts();
  }, []);

  const handleClick = (post) => {
    if (post.type === 'group') {
      navigate(`/group-board/${post.groupId}`, {
        state: { postId: post.postId }
      });
    } else if (post.type === 'recruit') {
      navigate('/studies/detail', { state: post });
    }
  };

  return (
    <div className="mypage-posts-container">
      {writtenPosts.length > 0 ? (
        writtenPosts
          .sort((a, b) => new Date(b.createdDate) - new Date(a.createdDate)) // 최신순 정렬
          .map((post) => (
            <div
              key={post.id}
              className="mypost-item"
              onClick={() => handleClick(post)}
            >
              <div className="mypost-title">{post.title}</div>
              <div className="mypost-info">
                <span className="mypost-author">{post.nickname}</span>
                <span className="mypost-sep">|</span>
                <span className="mypost-date">{post.createdDate?.slice(0, 10)}</span>
              </div>
            </div>
          ))
      ) : (
        <div className="created-empty-wrapper0">
          <div className="created-empty-box0">작성한 글이 없습니다.</div>
        </div>
      )}
    </div>
  );
}

export default WrittenPage;

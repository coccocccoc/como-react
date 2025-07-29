import React, { useEffect, useState } from 'react';
import '../styles/Mypage.css';
import axios from 'axios';
// import PostCard from '../components/PostCard';

function WrittenPage() {
  const [writtenPosts, setWrittenPosts] = useState([]);

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
        console.log("내가 작성한 글:", response.data);
      } catch (error) {
        console.error('작성한 글 불러오기 실패:', error);
      }
    };

    fetchMyPosts();
  }, []);

  return (
    <div className="mypage-posts-container">
      {/* {writtenPosts.length > 0 ? (
        writtenPosts.map((post, index) => (
          <PostCard key={index} post={post} />
        ))
      ) : (
        <div className="created-empty-wrapper">
          <div className="created-empty-box">작성한 글이 없습니다.</div>
        </div>
      )} */}
    </div>
  );
}

export default WrittenPage;

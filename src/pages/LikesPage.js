import React, { useEffect, useState } from 'react';
import StudyCard from '../components/StudyCard';
import axios from 'axios';
import '../styles/Mypage.css';

function LikesPage() {
  const [likedStudies, setLikedStudies] = useState([]);
  const [loading, setLoading] = useState(true);
  const userId = 1; // 로그인 유저 ID (임시)

  useEffect(() => {
    axios.get(`http://localhost:8080/api/likes/${userId}`)
      .then((res) => setLikedStudies(res.data))
      .catch((err) => console.error("찜 목록 불러오기 실패:", err))
      .finally(() => setLoading(false));
  }, []);

  return (
    <div className="mypage-card-section">
      <div className="studylist-study-list">
        {loading ? (
          <p>불러오는 중...</p>
        ) : likedStudies.length > 0 ? (
          likedStudies.map((study, index) => (
            <StudyCard key={index} study={study} />
          ))
        ) : (
          <div className="created-empty-wrapper">
            <div className="created-empty-box">찜한 스터디가 없습니다.</div>
          </div>
        )}
      </div>
    </div>
  );
}

export default LikesPage;

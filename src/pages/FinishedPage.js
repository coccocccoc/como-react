import React, { useEffect, useState } from 'react';
import StudyCard from '../components/StudyCard';
import { mockStudies } from '../data/mockData1';
import '../styles/Mypage.css';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
// import '../styles/FinishedPage.css';

function FinishedPage() {
  const today = new Date();

  const [finishedStudies, setFinishedStudies] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) {
      alert("로그인이 필요합니다.");
      return;
    }

    axios.get("http://localhost:8080/api/studies/my-ended", {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
    .then((res) => {
      console.log("✅ 종료된 스터디:", res.data);
      setFinishedStudies(res.data); // 필터링 없이 바로 사용
    })
    .catch((err) => {
      console.error("❌ 종료된 스터디 조회 실패:", err);
    });
  }, []);

  return (
    <div className="studylist-study-list">
      {finishedStudies.length > 0 ? (
        finishedStudies.map((study, index) => (
          <StudyCard
            key={index}
            study={study}
            onClick={() => navigate(`/group-board/${study.groupId}`)}
          />
        ))
      ) : (
        <p className="empty-text">종료된 스터디가 없습니다.</p>
      )}
    </div>
  );
}

export default FinishedPage;

import React, { useEffect, useState } from 'react';
import StudyCard from '../components/StudyCard';
import '../styles/Mypage.css';
import axios from 'axios';

function CreatedPage() {

  const [createdStudies, setCreatedStudies] = useState([]);

  useEffect(() => {
    const fetchCreatedStudies = async () => {
      const token = localStorage.getItem('token');
      if (!token) return;

      try {
        const response = await axios.get('http://localhost:8080/api/studies/my-created', {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        setCreatedStudies(response.data);
        console.log("내가 만든 스터디 응답:", response.data);
      } catch (error) {
        console.error('❌ 내가 만든 스터디 불러오기 실패:', error);
      }
    };

    fetchCreatedStudies();
  }, []);

  return (
    <div className="studylist-study-list">
      {createdStudies.length > 0 ? (
        createdStudies.map((study, index) => (
          <StudyCard
            key={index}
            study={study}
            to="/group-board"
          />
        ))
      ) : (
        <div className="created-empty-wrapper">
          <div className="created-empty-box">내가 만든 스터디가 없습니다.</div>
        </div>
      )}
    </div>
  );
}

export default CreatedPage;
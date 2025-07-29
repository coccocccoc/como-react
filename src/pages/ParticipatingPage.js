import React, { useEffect, useState } from 'react';
import StudyCard from '../components/StudyCard';
import { mockStudies } from '../data/mockData1';
import '../styles/Mypage.css';
import '../styles/ParticipatingPage.css'
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

function ParticipatingPage() {
  
  const [participatingStudies, setParticipatingStudies] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) return;

    axios.get("http://localhost:8080/api/studies/my", {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
    .then(res => {
      const filtered = res.data.filter(study =>
        study.status === '모집중' || study.status === '활동중'
      );
      setParticipatingStudies(filtered);
    })
    .catch(err => console.error("참여 스터디 불러오기 실패:", err));
  }, []);

  return (
    <div className="studylist-study-list">
      {participatingStudies.map((study, index) => (
        <StudyCard
          key={index}
          study={study}
          onClick={() => navigate(`/group-board/${study.groupId}`)}
        />
      ))}
    </div>
  );
}

export default ParticipatingPage;

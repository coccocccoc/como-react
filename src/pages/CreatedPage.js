import React from 'react';
import StudyCard from '../components/StudyCard';
import { mockStudies } from '../data/mockData1';
import '../styles/Mypage.css';

function CreatedPage() {
  const loggedInUser = localStorage.getItem('nickname') || 'iseul';

  const createdStudies = mockStudies.filter(
    (study) => study.nickname === loggedInUser
  );

  return (
    <div className="studylist-study-list">
      {createdStudies.length > 0 ? (
        createdStudies.map((study, index) => (
          <StudyCard key={index} study={study} />
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
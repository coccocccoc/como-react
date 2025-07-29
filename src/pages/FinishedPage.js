import React from 'react';
import StudyCard from '../components/StudyCard';
import { mockStudies } from '../data/mockData1';
import '../styles/Mypage.css';
// import '../styles/FinishedPage.css';

function FinishedPage() {
  const today = new Date();

  const finishedStudies = mockStudies.filter(study => {
    const dueDate = new Date(study.dueDate);
    return study.status === "마감" || dueDate < today;
  });

  return (
    <div className="studylist-study-list">
      {finishedStudies.length > 0 ? (
        finishedStudies.map((study, index) => (
          <StudyCard key={index} study={study} />
        ))
      ) : (
        <p className="empty-text">종료된 스터디가 없습니다.</p>
      )}
    </div>
  );
}

export default FinishedPage;

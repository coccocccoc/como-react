import React from 'react';
import StudyCard from '../components/StudyCard';
import { mockStudies } from '../data/mockData1';
import '../styles/Mypage.css';
import '../styles/ParticipatingPage.css'

const currentUserId = "user01";

function ParticipatingPage() {
  const participatingStudies = mockStudies.filter(study =>
    study.approved.includes(currentUserId)
  );

  return (
    <div className="studylist-study-list">
      {participatingStudies.map((study, index) => (
        <StudyCard key={index} study={study} />
      ))}
    </div>
  );
}

export default ParticipatingPage;

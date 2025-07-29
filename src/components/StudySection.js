import React from "react";
import StudyCard from "./StudyCard";
import { useNavigate } from "react-router-dom";

// StudySection 컴포넌트
const StudySection = ({ title, data, to }) => {
  const navigate = useNavigate();

  const latestStudies = [...data]
    .sort((a, b) => new Date(b.regDate || b.createdDate) - new Date(a.regDate || a.createdDate))
    .slice(0, 4);
  
  const handleCardClick = (study) => {
    if (to === "/studies/detail") {
      const postId = study.recruitPostId || study.id || study.postId;
      navigate("/studies/detail", { state: { postId } });
    } else if (to === "/group-board") {
      navigate(`/group-board/${study.groupId}`);
    }
  };


  return (
    <section className="study-section">
      <p className="studysection-section-title">{title}</p>
      <div className="study-list">
        {latestStudies.map((study, i) => (
          <StudyCard
            key={`${study.id || study.recruitPostId || study.postId}-${i}`}
            study={study}
            onClick={() => handleCardClick(study)} // ✅ 클릭 시 동작 설정
          />
        ))}
      </div>
    </section>
  )
};

export default StudySection;

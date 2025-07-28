import React from "react";
import StudyCard from "./StudyCard";

// StudySection 컴포넌트
const StudySection = ({ title, data, to }) => {

  const latestStudies = [...data]
    .sort((a, b) => new Date(b.regDate) - new Date(a.regDate))
    .slice(0, 4)

  return (
    <section className="study-section">
      <p className="studysection-section-title">{title}</p>
      <div className="study-list">
        {latestStudies.map((study, i) => (
          <StudyCard key={`${study.id}-${i}`} study={study} to={to} />
        ))}
      </div>
    </section>
  )
};

export default StudySection;

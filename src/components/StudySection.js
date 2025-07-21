import React from "react";
import StudyCard from "./StudyCard";

// StudySection 컴포넌트
const StudySection = ({ title, data }) => (
  <section className="study-section">
    <p className="studysection-section-title">{title}</p>
    <div className="study-list">
      {data.map((study, i) => (
        <StudyCard key={`${study.id}-${i}`} study={study} />
      ))}
    </div>
  </section>
);

export default StudySection;

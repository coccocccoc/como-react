import React from "react";
import StudyCard from "./StudyCard";
import './StudySectionMy.css'

// StudySection 컴포넌트
const StudySectionMy = ({ title, data }) => (
    <div className="study-list-page-M" style={{backgroundColor: 'black'}}>
    <section className="study-section-M">
        <p className="section-title-M">{title}</p>
        <div className="study-list-M">
            {data.map((study, i) => (
                <StudyCard key={`${study.id}-${i}`} study={study} />
            ))}
        </div>
    </section>
    </div>
);

export default StudySectionMy;
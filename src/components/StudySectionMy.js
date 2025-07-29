import React from "react";
import StudyCard from "./StudyCard";
import './StudySectionMy.css'

// StudySection 컴포넌트
const StudySectionMy = ({ title, data, onCardClick  }) => (
    <div className="study-list-page-M" style={{backgroundColor: 'black'}}>
    <section className="study-section-M">
        <p className="section-title-M">{title}</p>
        <div className="study-list-M">
            {data.map((study, i) => (
          <div
            key={`${study.id || study.groupId}-${i}`}
            onClick={() => onCardClick?.(study)} // ✅ 클릭 시 props 함수 실행
            style={{ cursor: onCardClick ? 'pointer' : 'default' }} // 클릭 가능하면 마우스 포인터
          >
            <StudyCard study={study} onClick={() => onCardClick?.(study)} />
          </div>
        ))}
        </div>
    </section>
    </div>
);

export default StudySectionMy;
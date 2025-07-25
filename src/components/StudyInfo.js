import React from "react";
import "./StudyInfo.css"

const StudyInfo = ({ data }) => {

  if (!data) return <div>로딩 중...</div>;

  // 날짜 가공
  const formattedDate = data.regDate?.slice(0, 16).replace("T", " ") || "작성일 미상";


  return (
    <div className="studyinfo-study-detail-wrapper">

      {/* 제목 */}
      <h1 className="studyinfo-study-detail-title">{data.title}</h1>

      {/* 작성자 & 날짜 */}
      <div className="studyinfo-study-detail-meta">
        <span className="studyinfo-study-detail-nickname">👤 {data.nickname}</span>
        <span className="studyinfo-study-detail-date">{formattedDate}</span>
      </div>

      {/* 정보 박스 */}
      <div className="studyinfo-study-detail-info-box">
        <div className="studyinfo-info-item">
          <div className="studyinfo-info-label">모집 인원</div>
          <div className="studyinfo-info-value">{data.capacity}명</div>
        </div>

        <div className="studyinfo-info-item">
          <div className="studyinfo-info-label">예상 기간</div>
          <div className="studyinfo-info-value">
            {data.startDate} ~ {data.endDate}
          </div>
        </div>

        <div className="studyinfo-info-item">
          <div className="studyinfo-info-label">진행 방식</div>
          <div className="studyinfo-info-value">{data.mode}</div>
        </div>

        {/* <div className="studyinfo-info-item">
            <div className="studyinfo-info-label">모집 마감일</div>
            <div className="studyinfo-info-value">{data.dueDate}</div>
          </div> */}

        <div className="studyinfo-info-item">
          <div className="studyinfo-info-label">기술 스택</div>
          <div className="studyinfo-info-value">{data.techStackNames?.join(", ") || "없음"}</div>
        </div>
      </div>
      
    </div>
  );
};

export default StudyInfo;

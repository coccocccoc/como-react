import React, { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import '../styles/StudyDetail.css';

function StudyDetail() {
  const location = useLocation();
  const navigate = useNavigate();

  const study = location.state || {
    id: 1,
    title: '리액트 스터디 모집합니다!',
    nickname: '말하는 감자',
    date: '2025.07.10',
    people: 3,
    approved: [],
    applicants: [],
    status: '모집중',
    period: {
      start: '2025.07.10',
      end: '2025.07.31',
    },
    dueDate: '2025.07.11',
    method: '온/오프라인',
    techStacks: ['React', 'Node.js'],
    content: `<p>안녕하세요! 함께 성장할 리액트 스터디 팀원을 모집합니다.</p><ul><li>매주 2회 온라인 스터디</li><li>GitHub를 통한 코드 리뷰</li></ul>`,
  };

  const [studyData, setStudyData] = useState(study);
  const approvedCount = (studyData.approved || []).length;
  const applicants = studyData.applicants || [];
  const maxPeople = Number(studyData.people || 0);
  const closed = studyData.status === '마감';

  const handleApplyClick = () => {
    navigate(`/studies/apply/${studyData.id}`, { state: studyData });
  };

  const handleEditClick = () => {
    navigate('/studies/edit', { state: studyData });
  };

  const handleDeleteClick = () => {
    const confirmDelete = window.confirm('정말 삭제하시겠습니까?');
    if (confirmDelete) {
      alert('스터디가 삭제되었습니다.');
      navigate('/studies');
    }
  };

  // const handleApprove = (userId) => {
  //   const updatedApproved = [...(studyData.approved || []), userId];
  //   const updatedApplicants = (studyData.applicants || []).filter(id => id !== userId);
  //   const newStatus = updatedApproved.length >= maxPeople ? '마감' : '모집중';

  //   setStudyData({
  //     ...studyData,
  //     approved: updatedApproved,
  //     applicants: updatedApplicants,
  //     status: newStatus
  //   });
  // };

  // const currentUserId = 'iseul';
  // const isOwner = studyData.nickname === currentUserId;

  return (
    <div className="study-detail-page">
      <Navbar />
      <div className="study-detail-wrapper">
        <h1 className="study-detail-title">{studyData.title}</h1>
        <div className="study-detail-meta">
          <span className="study-detail-nickname">👤 {studyData.nickname}</span>
          <span className="study-detail-date">{studyData.date}</span>
        </div>

        <div className="study-detail-info-box">
          <div className="info-item">
            <div className="info-label">모집 인원</div>
            <div className="info-value">
              {approvedCount} / {(studyData.people || 0)}명
            </div>
          </div>
          <div className="info-item">
            <div className="info-label">예상 기간</div>
            <div className="info-value">
              {studyData.period.start} ~ {studyData.period.end}
            </div>
          </div>
          <div className="info-item">
            <div className="info-label">진행 방식</div>
            <div className="info-value">{studyData.method}</div>
          </div>
          <div className="info-item">
            <div className="info-label">모집 마감일</div>
            <div className="info-value">{studyData.dueDate}</div>
          </div>
          <div className="info-item">
            <div className="info-label">기술 스택</div>
            <div className="info-value">{studyData.techStacks.join(', ')}</div>
          </div>
        </div>

        <h2 className="study-detail-section-title">스터디 소개</h2>
        <div
          className="study-detail-content"
          dangerouslySetInnerHTML={{ __html: studyData.content }}
        />

        {/* 가입 신청자 목록 */}
        {/*
        {isOwner && applicants.length > 0 && (
          <div className="applicant-list-section">
            <h3 style={{ marginTop: '40px' }}>가입 신청자 목록</h3>
            <ul>
              {applicants.map((userId) => (
                <li key={userId} style={{ marginBottom: '10px' }}>
                  {userId}
                  <button
                    onClick={() => handleApprove(userId)}
                    style={{ marginLeft: '12px' }}
                  >
                    승인
                  </button>
                </li>
              ))}
            </ul>
          </div>
        )}
        */}

        <div className="study-detail-btn-wrapper">
          <button className="study-edit-btn" onClick={handleEditClick}>
            수정
          </button>
          <button className="study-delete-btn" onClick={handleDeleteClick}>
            삭제
          </button>

          {!closed && (
            <button className="study-detail-apply-btn" onClick={handleApplyClick}>
              스터디 신청하기
            </button>
          )}
          {closed && (
            <div className="study-closed-message">신청 마감된 스터디입니다.</div>
          )}
        </div>
      </div>
      <Footer />
    </div>
  );
}

export default StudyDetail;
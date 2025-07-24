import React, { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import NavBar from '../components/Navbar';
import Footer from '../components/Footer';
import Editor from '../components/Editor';
import '../styles/StudyRecruit.css';

function StudyEdit() {
  const location = useLocation();
  const navigate = useNavigate();

  const study = location.state || {};

  const [title, setTitle] = useState(study.title || '');
  const [content, setContent] = useState(study.content || '');

  if (!study || !study.nickname) {
    return (
      <div className="studyedit-recruit-background">
        <NavBar />
        <div className="studyedit-recruit-wrapper">
          <h2 className="studyedit-recruit-section-title">잘못된 접근입니다.</h2>
        </div>
        <Footer />
      </div>
    );
  }

  const handleSubmit = () => {
    const updatedStudy = {
      ...study,
      title,
      content,
    };

    alert('스터디가 성공적으로 수정되었습니다!');
    navigate('/studies', { state: updatedStudy });
  };

  const handleCancel = () => {
    navigate(-1);
  };

  return (
    <div className="studyedit-recruit-background">
      <NavBar />
      <div className="studyedit-recruit-wrapper">
        <h2 className="studyedit-recruit-section-title">스터디 정보 수정</h2>

        {/* 모집 인원 + 예상 기간 */}
        <div className="studyedit-recruit-row">
          <div className="studyedit-recruit-column">
            <label className="studyedit-recruit-label">모집 인원</label>
            <input
              className="studyedit-recruit-people-select"
              value={study.people}
              disabled
            />
          </div>

          <div className="studyedit-recruit-column">
            <label className="studyedit-recruit-label">예상 기간</label>
            <div className="studyedit-recruit-date-box">
              <input
                className="studyedit-recruit-date-input"
                value={study.period?.start || ''}
                disabled
              />
              <span className="studyedit-recruit-date-tilde">~</span>
              <input
                className="studyedit-recruit-date-input"
                value={study.period?.end || ''}
                disabled
              />
            </div>
          </div>
        </div>

        {/* 진행 방식 + 모집 마감일 */}
        <div className="studyedit-recruit-row">
          <div className="studyedit-recruit-column">
            <label className="studyedit-recruit-label">진행 방식</label>
            <input
              className="studyedit-recruit-method-select"
              value={study.method}
              disabled
            />
          </div>

          <div className="studyedit-recruit-column">
            <label className="studyedit-recruit-label">모집 마감일</label>
            <input
              className="studyedit-recruit-date-input"
              value={study.dueDate}
              disabled
            />
          </div>
        </div>

        {/* 기술 스택 */}
        <div className="studyedit-recruit-tech-block">
          <label className="studyedit-recruit-label">기술 스택</label>
          <div className="studyedit-recruit-tech-selected">
            {study.techStacks?.map((tag) => (
              <span key={tag} className="studyedit-recruit-tech-tag-selected">{tag}</span>
            ))}
          </div>
        </div>

        <hr className="studyedit-recruit-divider" />

        <h2 className="studyedit-recruit-section-title">스터디 소개 수정</h2>
        <div className="studyedit-recruit-editor-box">
          <Editor
            title={title}
            onTitleChange={setTitle}
            content={content}
            onContentChange={setContent}
          />
        </div>

        {/* 버튼 영역 */}
        <div className="studyedit-recruit-btns">
          <button className="studyedit-recruit-cancel-btn" onClick={handleCancel}>취소하기</button>
          <button className="studyedit-recruit-submit-btn" onClick={handleSubmit}>수정하기</button>
        </div>
      </div>
      <Footer />
    </div>
  );
}

export default StudyEdit;
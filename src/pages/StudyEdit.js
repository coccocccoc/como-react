import React, { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import NavBar from '../components/Navbar';
import Footer from '../components/Footer';
import Editor from '../components/Editor';
import '../styles/StudyRecruit.css';
import axios from 'axios';

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

  const handleSubmit = async () => {
    try {
      const updatedStudy = {
        ...study,
        title,
        content,
      };

      const response = await axios.put(
        `http://localhost:8080/api/studies/${study.recruitPostId}`,
        updatedStudy
      );

      alert('스터디가 성공적으로 수정되었습니다!');
      navigate('/studies/detail', { state: response.data }); // 상세 페이지로 이동
    } catch (error) {
      console.error('❌ 수정 실패:', error);
      alert('스터디 수정에 실패했습니다.');
    }
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
              value={study.capacity}
              disabled
            />
          </div>

          <div className="studyedit-recruit-column">
            <label className="studyedit-recruit-label">예상 기간</label>
            <div className="studyedit-recruit-date-box">
              <input
                className="studyedit-recruit-date-input"
                value={study.startDate || ''}
                disabled
              />
              <span className="studyedit-recruit-date-tilde">~</span>
              <input
                className="studyedit-recruit-date-input"
                value={study.endDate || ''}
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
              value={study.mode}
              disabled
            />
          </div>

          <div className="studyedit-recruit-column">
            <label className="studyedit-recruit-label">모집 마감일</label>
            <input
              className="studyedit-recruit-date-input"
              value={study.deadline}
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
import React, { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import Editor from '../components/Editor';
import '../styles/StudyApply.css';

function StudyApply() {
  const location = useLocation();
  const navigate = useNavigate();

  const study = location.state;

  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');

  if (!study) {
    return <div style={{ color: 'white', padding: '40px' }}>해당 스터디 정보를 불러올 수 없습니다.</div>;
  }

  const handleCancel = () => {
    navigate(-1);
  };

  const handleSubmit = () => {
    if (!title.trim() || !content.trim()) {
      alert('제목과 내용을 모두 입력해주세요.');
      return;
    }

    const userId = 'user99';

    const updatedStudy = {
      ...study,
      applicants: [...(study.applicants || []), userId]
    };

    alert('스터디 신청이 완료되었습니다!');
    navigate('/studies', { state: updatedStudy });
  };

  return (
    <div className="study-apply-page">
      <Navbar />

      <div className="study-apply-wrapper">
        <div className="study-apply-info-box">
          <div className="study-apply-left">
            <h2 className="study-apply-title">{study.title}</h2>
            <div className="study-apply-tags">
              {(study.techStacks || study.tags || []).map((tag, i) => (
                <span key={i} className="study-apply-tag">#{tag}</span>
              ))}
            </div>
          </div>

          <div className="study-apply-right">
            <span className="badge2">{study.method || study.status || '진행 방식 미정'}</span>
            <span className="study-apply-period">
              {study.period?.start || '시작일 미지정'} ~ {study.period?.end || '종료일 미지정'}
            </span>
          </div>
        </div>

        <h3 className="study-apply-subtitle">나에 대해 소개해주세요.</h3>

        <Editor
          title={title}
          onTitleChange={setTitle}
          content={content}
          onContentChange={setContent}
        />

        <div className="recruit-btns">
          <button className="recruit-cancel-btn" onClick={handleCancel}>취소하기</button>
          <button className="recruit-submit-btn" onClick={handleSubmit}>신청하기</button>
        </div>
      </div>

      <Footer />
    </div>
  );
}

export default StudyApply;
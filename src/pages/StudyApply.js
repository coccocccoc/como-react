import React, { useEffect, useState } from 'react';
import { useLocation, useNavigate, useParams } from 'react-router-dom';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import Editor from '../components/Editor';
import '../styles/StudyApply.css';
import axios from 'axios';

function StudyApply() {
  const navigate = useNavigate();
  const { groupId } = useParams();
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [study, setStudy] = useState(null);

  // ✅ 스터디 정보 불러오기
  useEffect(() => {
    axios
      .get(`http://localhost:8080/api/studies/group/${groupId}`)
      .then((res) => {
        setStudy(res.data);
      })
      .catch((err) => {
        console.error('스터디 정보 불러오기 실패:', err);
        alert('스터디 정보를 불러오지 못했습니다.');
      });
  }, [groupId]);

  if (!study) {
    return (
      <div style={{ color: 'white', padding: '40px' }}>
        해당 스터디 정보를 불러올 수 없습니다.
      </div>
    );
  }


  if (!study) {
    return (
      <div style={{ color: 'white', padding: '40px' }}>
        해당 스터디 정보를 불러올 수 없습니다.
      </div>
    );
  }

  // ✅ 취소 버튼
  const handleCancel = () => {
    navigate(-1);
  };

  // ✅ 신청 제출
  const handleSubmit = async () => {
    if (!title.trim() || !content.trim()) {
      alert('제목과 내용을 모두 입력해주세요.');
      return;
    }

  try {
      await axios.post(`http://localhost:8080/api/studies/apply`, {
        groupId: groupId,
        userId: 1, // ✅ 추후 로그인 사용자 정보로 교체
        applyTitle: title,
        applyContent: content,
      });

      alert('스터디 신청이 완료되었습니다!');
      navigate('/studies');
    } catch (err) {
      console.error('스터디 신청 실패:', err);
      alert('스터디 신청 중 오류가 발생했습니다.');
    }
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
            <span className="badge2">{study.mode || study.status || '진행 방식 미정'}</span>
            <span className="study-apply-period">
              {study.startDate || '시작일 미지정'} ~ {study.endDate || '종료일 미지정'}
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
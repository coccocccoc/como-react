import React, { useState } from 'react';
import '../styles/StudyRecruit.css';
import Editor from '../components/Editor';
import NavBar from '../components/Navbar';
import Footer from '../components/Footer';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

function StudyRecruit() {
  const navigate = useNavigate();

  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [selectedPeople, setSelectedPeople] = useState('');
  const [customPeople, setCustomPeople] = useState('');
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');
  const [dueDate, setDueDate] = useState('');
  const [method, setMethod] = useState('');
  const [selectedTags, setSelectedTags] = useState([]);
  const [showTechFilter, setShowTechFilter] = useState(false);
  const [isAlwaysOpen, setIsAlwaysOpen] = useState(false);

  const techTagMap = {
    "Javascript": 1, "Typescript": 2, "React": 3, "Vue": 4,
    "Node.js": 5, "Spring": 6, "Java": 7, "Next.js": 8,
    "Nest.js": 9, "Express": 10, "Go": 11, "C": 12,
    "Python": 13, "Django": 14, "Swift": 15, "Jest": 16,
    "Kotlin": 17, "MySQL": 18, "MongoDB": 19, "PHP": 20,
    "GraphQL": 21, "Firebase": 22, "React Native": 23, "Unity": 24,
    "Flutter": 25, "AWS": 26, "Kubernetes": 27, "Docker": 28,
    "Git": 29, "Figma": 30, "Zeplin": 31, "Svelte": 32
  };

  // tag 목록 추출
  const techTags = Object.keys(techTagMap);

  const handleTagClick = (tag) => {
    setSelectedTags(prev =>
      prev.includes(tag) ? prev.filter(t => t !== tag) : [...prev, tag]
    );
  };

  const handleSubmit = async () => {
    if (!title || !content || !startDate || !endDate || (!dueDate && !isAlwaysOpen) || !method || !selectedPeople) {
      alert('모든 항목을 입력해주세요.');
      return;
    }
    
    const token = localStorage.getItem('token');

    const studyData = {
      // userId: 1, // 임시데이터
      // 로그인 연동 후에 주석 풀기
      userId: Number(localStorage.getItem("userId")), 
      title,
      content,
      capacity: Number(selectedPeople === 'custom' ? customPeople : selectedPeople),
      mode: method, // "온라인", "오프라인", "온오프라인" 중 하나
      startDate,
      endDate,
      deadline: isAlwaysOpen ? null : dueDate,
      // dueDate: isAlwaysOpen ? '상시 모집' : dueDate,
      techStackIds: selectedTags.map(tag => techTagMap[tag]),
      date: new Date().toISOString().slice(0, 10),
    };

      console.log("📦 보내는 데이터:", studyData);

    try {
      const response = await axios.post('http://localhost:8080/api/studies', studyData, {
        headers: {
          Authorization: `Bearer ${token}`,
        }
      });
      console.log('등록 성공:', response.data);
      alert('스터디가 등록되었습니다!');
      navigate('/studies');
    } catch (error) {
      console.error('등록 실패:', error);
      alert('등록에 실패했습니다.');
    }
  };

  const handleCancel = () => {
    navigate(-1);
  };

  return (
    <div className="recruit-background">
      <NavBar />
      <div className="recruit-wrapper">
        <h2 className="recruit-section-title">프로젝트의 기본 정보를 입력해주세요.</h2>
        <div className="recruit-row">
          <div className="recruit-column">
            <label className="recruit-label">모집 인원</label>
            <div className="recruit-people-box">
              <select
                value={selectedPeople}
                onChange={(e) => setSelectedPeople(e.target.value)}
                className="recruit-people-select" >
                <option value="">선택</option>
                {[...Array(5)].map((_, i) => (
                  <option key={i + 1} value={i + 1}>{i + 1}명</option>
                ))}
                <option value="custom">직접 입력</option>
              </select>
              {selectedPeople === 'custom' && (
                <input
                  type="number"
                  placeholder="직접 입력"
                  value={customPeople}
                  onChange={(e) => setCustomPeople(e.target.value)}
                  className="recruit-people-input"
                />
              )}
            </div>

            <label className="recruit-label">진행 방식</label>
            <select
              value={method}
              onChange={(e) => setMethod(e.target.value)}
              className="recruit-method-select" >
              <option value="">선택</option>
              <option value="온라인">온라인</option>
              <option value="오프라인">오프라인</option>
              <option value="온오프라인">온/오프라인</option>
            </select>
          </div>

          <div className="recruit-column">
            <label className="recruit-label">예상 기간</label>
            <div className="recruit-date-box">
              <input
                type="date"
                value={startDate}
                onChange={(e) => setStartDate(e.target.value)}
                className="recruit-date-input" />
              <span className="recruit-date-tilde">~</span>
              <input
                type="date"
                value={endDate}
                onChange={(e) => setEndDate(e.target.value)}
                className="recruit-date-input" />
            </div>

            <label className="recruit-label">모집 마감일</label>
            <input
              type="date"
              value={dueDate}
              onChange={(e) => setDueDate(e.target.value)}
              className="recruit-date-input"
              disabled={isAlwaysOpen} />
            <div className="recruit-checkbox">
              <input
                type="checkbox"
                id="always-open"
                checked={isAlwaysOpen}
                onChange={() => setIsAlwaysOpen(!isAlwaysOpen)} />
              <label htmlFor="always-open">상시 모집</label>
            </div>
          </div>
        </div>

        <div className="recruit-tech-block">
          <label className="recruit-label">기술 스택</label>
          <div className="recruit-tech-selected">
            {selectedTags.map((tag) => (
              <span key={tag} className="recruit-tech-tag-selected">{tag}</span>
            ))}
          </div>
          <button
            type="button"
            className={`recruit-tech-filter-button ${showTechFilter ? 'active' : ''}`}
            onClick={() => setShowTechFilter(!showTechFilter)}
          >
            선택
          </button>
          {showTechFilter && (
            <div className="recruit-tech-dropdown">
              {techTags.map((tag) => (
                <div
                  key={tag}
                  className={`recruit-tech-tag ${selectedTags.includes(tag) ? 'selected' : ''}`}
                  onClick={() => handleTagClick(tag)}
                >
                  {tag}
                </div>
              ))}
            </div>
          )}
        </div>

        <hr className="recruit-divider" />

        <h2 className="recruit-section-title">프로젝트에 대해 설명해주세요.</h2>
        <div className="recruit-editor-box">
          <Editor
            title={title}
            onTitleChange={setTitle}
            content={content}
            onContentChange={setContent} />
        </div>

        <div className="studyedit-recruit-btns2">
          <button className="studyedit-recruit-cancel-btn2" onClick={handleCancel}>취소하기</button>
          <button className="studyedit-recruit-submit-btn2" onClick={handleSubmit}>신청하기</button>
        </div>
      </div>
      <Footer />
    </div>
  );
}

export default StudyRecruit;

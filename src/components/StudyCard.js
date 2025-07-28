import './StudyCard.css';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import WishGray from '../img/wish1.svg';
import WishGreen from '../img/wish2.svg';

function StudyCard({ study }) {
  const [isLiked, setIsLiked] = useState(false);
  const navigate = useNavigate();

  const truncate = (text, maxLen) => {
    return text.length > maxLen ? text.slice(0, maxLen) + "..." : text;
  };

  const isDeadlineNear = (dueDateStr) => {
    const today = new Date();
    const dueDate = new Date(dueDateStr);
    const diff = dueDate - today;
    const daysLeft = diff / (1000 * 60 * 60 * 24);
    return daysLeft <= 14 && dueDate >= today;
  };

  const isClosed = (dueDateStr) => {
    const today = new Date();
    const dueDate = new Date(dueDateStr);
    return dueDate < today;
  };

  const getStatusLabel = (dueDateStr, status) => {
    if (status === '마감' || isClosed(dueDateStr)) return '마감';
    if (isDeadlineNear(dueDateStr)) return '마감 임박';
    return '모집중';
  };

  const toggleLike = (e) => {
    e.stopPropagation();
    setIsLiked(!isLiked);
  };

  const handleCardClick = () => {
    const fullStudyData = {
      ...study,
      date: study.date || '2025.07.10',
      people: study.people || '1명 이상',
      period: study.period || { start: '2025.07.10', end: '2025.07.31' },
      techStacks: study.techStacks || study.tags || [],
      content: study.content || '<p>상세 설명 없음</p>',
      method: study.method || study.status || '온/오프라인',
    };

    navigate('/studies/detail', { state: fullStudyData });
  };

  const isStudyClosed = isClosed(study.dueDate) || study.status === '마감';
  const displayMethod = study.method || study.status || '진행 방식 미정';

  return (
    <div className="study-card" onClick={handleCardClick}>
      <div className="card-content">
        <div className="study-status">
          {/* 진행 방식 뱃지는 마감일이 지난 경우 숨김 */}
          {!isStudyClosed && (
            <span className="badge badge-online">
              {displayMethod}
            </span>
          )}

          {/* 상태 뱃지 */}
          <span
            className={`badge badge-recruiting ${isStudyClosed ? 'closed' : ''}`}>
            {getStatusLabel(study.dueDate, study.status)}
          </span>
        </div>

        <div className="study-meta">
          <span className="label">마감일</span> | {study.dueDate}
        </div>

        <div className="study-title">
          {truncate(study.title, 30)}
        </div>

        <div className="study-tags">
          {(study.tags || study.techStacks || []).map((tag, i) => (
            <span key={i}># {tag} </span>
          ))}
        </div>
      </div>

      <div className="study-footer">
        <div className="study-user">
          <div className="study-user-circle"></div>
          {study.nickname}
        </div>

        <button className="study-like-btn" onClick={toggleLike}>
          <img
            src={isLiked ? WishGreen : WishGray}
            alt="찜하기"
            className="study-like-icon"
          />
        </button>
      </div>
    </div>
  );
}

export default StudyCard;
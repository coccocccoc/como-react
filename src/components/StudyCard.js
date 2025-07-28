import './StudyCard.css';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import WishGray from '../img/wish1.svg';
import WishGreen from '../img/wish2.svg';

function StudyCard({ study, to = '/studies/detail' }) {
  const [isLiked, setIsLiked] = useState(false);
  const navigate = useNavigate();

  const truncate = (text, maxLen) => {
    return text.length > maxLen ? text.slice(0, maxLen) + "..." : text;
  };

  const isClosed = (dueDateStr) => {
    const today = new Date();
    const dueDate = new Date(dueDateStr);
    return dueDate < today;
  };


  // const isDeadlineNear = (dueDateStr) => {
  //   const today = new Date();
  //   const dueDate = new Date(dueDateStr);
  //   const diff = dueDate - today;
  //   const daysLeft = diff / (1000 * 60 * 60 * 24);
  //   return daysLeft <= 14 && dueDate >= today;
  // };

  // const getStatusLabel = (dueDateStr, status) => {
  //   if (status === '마감' || isClosed(dueDateStr)) return '마감';
  //   if (isDeadlineNear(dueDateStr)) return '마감 임박';
  //   return '모집중';
  // };

  const getStatusLabel = (dueDateStr) => {
    if (!dueDateStr) return '모집중'; // deadline의 값이 null(상시모집)이어도 "모집중"
    
    const today = new Date();
    const dueDate = new Date(dueDateStr);

    // 시/분/초 제거 (날짜만 비교)
    const todayOnly = new Date(today.getFullYear(), today.getMonth(), today.getDate());
    const dueDateOnly = new Date(dueDate.getFullYear(), dueDate.getMonth(), dueDate.getDate());

    const diff = dueDateOnly - todayOnly;
    const daysLeft = diff / (1000 * 60 * 60 * 24);

    if (daysLeft < 0) return '마감';
    if (daysLeft <= 14) return '마감 임박';
    return '모집중';
  };




  const toggleLike = (e) => {
    e.stopPropagation();
    setIsLiked(!isLiked);
  };

  const handleCardClick = () => {
    if (to === '/group-board' && study.groupId) {
      navigate(`/group-board/${study.groupId}`);
      return;
    }

    const fullStudyData = {
      ...study,
      title: study.title,
      deadline: study.deadline,
      techStacks: study.techStackNames || [],
      nickname: study.nickname || '익명',
      content: study.content || '<p>상세 설명 없음</p>',
      people: `${study.capacity}명`,
      period: {
        start: study.startDate,
        end: study.endDate,
      },
      method: study.mode,
      date: study.regDate?.slice(0, 10),
    };

    navigate('/studies/detail', { state: fullStudyData });
  };

  const isStudyClosed = study.deadline
    ? new Date(study.deadline) < new Date()
    : false;
  
  const displayMode = study.mode || '진행 방식 미정';

  return (
    <div className="study-card" onClick={handleCardClick}>
      <div className="card-content">
        <div className="study-status">
          {/* 진행 방식 뱃지는 마감일이 지난 경우 숨김 */}
          {!isStudyClosed && (
            <span className="badge badge-online">
              {displayMode}
            </span>
          )}

          {/* 상태 뱃지 */}
          <span
            className={`badge badge-recruiting ${isStudyClosed ? 'closed' : ''}`}>
            {getStatusLabel(study.deadline)}
          </span>
        </div>

        <div className="study-meta">
          <span className="label">마감일</span> | {study.deadline ? study.deadline : '상시모집'}
        </div>

        <div className="study-title">
          {truncate(study.title, 30)}
        </div>

        <div className="study-tags">
          {(study.techStackNames || []).map((tag, i) => (
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
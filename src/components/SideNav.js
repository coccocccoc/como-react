import React, { useState } from 'react';
import './SideNav.css';
import { NavLink, useLocation } from 'react-router-dom';
import MailSendModal from './MailSendModal';

const SideNav = () => {
  const location = useLocation();
  const [isModalOpen, setIsModalOpen] = useState(false);

  const isInbox = location.pathname === '/mypage/messages/inbox';
  const isSent = location.pathname === '/mypage/messages/sent';
  const isMessagesPage = location.pathname.startsWith('/mypage/messages');

  return (
    <div className="sidenav-sidebar">
      <div className="sidenav-text">
        <h4>마이페이지</h4>

        <p><NavLink to="/mypage/participating" className="sidenav-link">참여 스터디</NavLink></p>
        <p><NavLink to="/mypage/finished" className="sidenav-link">종료 스터디</NavLink></p>
        <p><NavLink to="/mypage/created" className="sidenav-link">내가 만든 스터디</NavLink></p>
        <p><NavLink to="/mypage/written" className="sidenav-link">작성한 글</NavLink></p>
        <p><NavLink to="/mypage/likes" className="sidenav-link">찜 목록</NavLink></p>

        {/* 쪽지함 라인 */}
        <div className="message-row">
          <NavLink
            to="/mypage/messages/inbox"
            className={({ isActive }) =>
              isActive || isInbox || isSent ? 'sidenav-link active' : 'sidenav-link'
            }
          >
            쪽지함
          </NavLink>
          <button
            className="message-write-btn"
            onClick={(e) => {
              e.stopPropagation();
              setIsModalOpen(true);
            }}
          >
            쪽지 쓰기
          </button>
        </div>

        {/* 서브 메뉴 */}
        {isMessagesPage && (
          <div className="message-submenu">
            <p
              className={isInbox ? 'submenu-link active' : 'submenu-link inactive'}
              onClick={() => window.location.href = '/mypage/messages/inbox'}
            >
              수신함
            </p>
            <p
              className={isSent ? 'submenu-link active' : 'submenu-link inactive'}
              onClick={() => window.location.href = '/mypage/messages/sent'}
            >
              발신함
            </p>
          </div>
        )}

        {/* 모달 */}
        {isModalOpen && (
          <MailSendModal
            senderId={1}
            onClose={() => setIsModalOpen(false)}
          />
        )}
      </div>
    </div>
  );
};

export default SideNav;
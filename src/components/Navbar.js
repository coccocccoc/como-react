// components/NavBar.js
import "./Navbar.css";
import logo from "../img/logo.svg";
import notificationIcon from "../img/notification.svg";
import { Link, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import useNotificationSocket from "./useNotificationSocket";
import axios from "axios";
import NotificationPopup from "./NotificationPopup";

function NavBar() {
  const [notifications, setNotifications] = useState([]);
  const navigate = useNavigate();
  const [nickname, setNickname] = useState('');
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem("token");
    const savedNickname = localStorage.getItem("nickname");

    if (token && savedNickname) {
      setIsLoggedIn(true);
      setNickname(savedNickname);
    }
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("nickname");
    setIsLoggedIn(false);
    setNickname('');
    navigate("/");
  };

  const handleReceiveNotification = (noti) => {
    setNotifications((prev) => [...prev, noti]);
  };

  const handleClick = (noti) => {
    if (noti.type === "message") {
      navigate(`/mail?selectedId=${noti.targetId}`);
    } else if (noti.type === "board") {
      navigate(`/board?id=${noti.targetId}`);
    } else if (noti.type === "comment") {
      navigate(`/board?id=${noti.targetId}#comments`);
    } else if (noti.type === "notice") {
      navigate(`/notice?id=${noti.targetId}`);
    } else if (noti.type === "application") {
    navigate(`/group-board/${noti.targetId}`); // 스터디 가입 신청
  }
};

  useNotificationSocket(1, handleReceiveNotification);

  return (
    <nav className="navbar">
      <div className="navbar-logo">
        <a href="/">
          <img src={logo} alt="COMO 로고" />
        </a>
      </div>

      <ul className="navbar-menu">
        <li><Link to="/studies">스터디 찾아보기</Link></li>
        <li>
          {/* 로그인 안되어있는 상태로 팀원 모집하기 버튼 클릭시 로그인창으로 이동 */}
          <button
            className="nav-button"
            onClick={() => {
              const token = localStorage.getItem("token");
              if (!token) {
                alert("로그인이 필요합니다.");
                navigate("/login");
              } else {
                navigate("/studies/recruit");
              }
            }}
          >
            팀원 모집하기
          </button>
        </li>
        
        {isLoggedIn ? (
          <>
            {/* 🔔 알림 버튼 - 닉네임 왼쪽에 위치 */}
            <li>
              <button
                onClick={async () => {
                  try {
                    const res = await axios.get("http://localhost:8080/api/notification?userId=1");
                    setNotifications(res.data);
                  } catch (err) {
                    console.error("알림 가져오기 실패", err);
                  }
                }}
                aria-label="알림"
                className="bell-button"
              >
                <img src={notificationIcon} alt="알림" className="notification-icon" />
              </button>
            </li>

            {/* 👤 닉네임 */}
            <li>
              <Link to="/mypage" className="navbar-nickname">
                {nickname ? `${nickname}님` : '사용자님'}
              </Link>
            </li>

            {/* 🚪 로그아웃 */}
            <li>
              <button onClick={handleLogout} className="logout-button">로그아웃</button>
            </li>
          </>
        ) : (
          <li><Link to="/login">로그인 / 회원가입</Link></li>
        )}
      </ul>

      {/* 알림 팝업 */}
      {notifications.map((n, i) => (
        <NotificationPopup
          key={i}
          content={n.content}
          type={n.type}
          style={{ top: `${110 + i * 50}px` }}
          onClick={() => handleClick(n)}
          onClose={() => setNotifications((prev) => prev.filter((_, idx) => idx !== i))}
        />
      ))}
    </nav>
  );
}

export default NavBar;
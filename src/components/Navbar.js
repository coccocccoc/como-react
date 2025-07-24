// components/NavBar.js
import "./Navbar.css";
import logo from "../img/logo.svg";
import { Link, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import useNotificationSocket from "./useNotificationSocket";
import axios from "axios";
import NotificationPopup from "./NotificationPopup"; // ✅ 알림 하나 렌더링용

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
    console.log("🧭 이동 시도:", noti);
    console.log("➡️ 이동 주소:", `/mail?selectedId=${noti.targetId}`);

    setNotifications((prev) => [...prev, noti]);
  };

  const handleClick = (noti) => {
    console.log("🧭 이동 시도:", noti);

    if (noti.type === "message") {
      navigate(`/mail?selectedId=${noti.targetId}`); // ✅ 이게 실행돼야 함
    } else if (noti.type === "board") {
      navigate(`/board?id=${noti.targetId}`); 
    } else if (noti.type === "comment") {
      navigate(`/board?id=${noti.targetId}#comments`);
    } else if (noti.type === "notice") {
      navigate(`/notice?id=${noti.targetId}`);
    }
  };

  // ✅ WebSocket으로 알림 수신
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
        <li><Link to="/studies/recruit">팀원 모집하기</Link></li>
        
        {isLoggedIn ? (
          <>
            <li>
              <Link to="/mypage" className="navbar-nickname">
                {nickname ? `${nickname}님` : '사용자님'}
              </Link>
            </li>
            <li><button onClick={handleLogout} className="logout-button">로그아웃</button></li>
          </>
        ) : (
          <li><Link to="/login">로그인 / 회원가입</Link></li>
        )}

        <li>
          <button
            onClick={async () => {
              try {
                const res = await axios.get("http://localhost:8080/api/notification?userId=1");
                console.log("받은 알림 목록:", res.data);
                setNotifications(res.data);
              } catch (err) {
                console.error("알림 가져오기 실패", err);
              }
            }}
            aria-label="알림"
            className="bell-button"
          >
            🔔
          </button>
        </li>
      </ul>

      {/* 알림 목록 팝업 렌더링 */}
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

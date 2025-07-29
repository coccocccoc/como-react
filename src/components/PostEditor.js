import React, { useEffect } from "react";
import "./NotificationPopup.css";

const NotificationPopup = ({ content, type, onClose, style, onClick }) => {
  useEffect(() => {
    const timer = setTimeout(onClose, 3000);
    return () => clearTimeout(timer);
  }, [onClose]);

  const iconMap = {
    message: "✉️",        // 쪽지 알림
    application: "📝",     // 스터디 가입 신청 알림
  };

  const backgroundMap = {
    message: "#91f8e0ff",       // 민트
    application: "#ffd166",    // 연노랑
  };

  return (
    <div
      className="notification-popup"
      style={{
        ...style,
        backgroundColor: backgroundMap[type] || "#323232",
      }}
      onClick={() => {
        console.log("✅ 팝업 클릭됨!");
        onClick();
      }}
    >
      <p>{iconMap[type] || "🔔"} {content}</p>
    </div>
  );
};

export default NotificationPopup;

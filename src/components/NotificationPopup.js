// components/NotificationPopup.js
import React, { useEffect } from "react";
import "./NotificationPopup.css";

const NotificationPopup = ({ content, type, onClose, style, onClick }) => {
    useEffect(() => {
        const timer = setTimeout(onClose, 3000);
        return () => clearTimeout(timer);
    }, [onClose]);

    const iconMap = {
        message: "",
        notice: "📢",
        comment: "💬",
    };

    const backgroundMap = {
        message: "#91f8e0ff",
        notice: "#f39c12",
        comment: "#2ecc71",
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
                onClick(); // 기존 핸들러 실행
            }}

        >
            <p>{iconMap[type] || "🔔"} {content}</p>
        </div>
    );
};

export default NotificationPopup;

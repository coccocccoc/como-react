// useNotificationSocket.js
import { useEffect } from "react";
import { Client } from "@stomp/stompjs";
import SockJS from "sockjs-client";

const useNotificationSocket = (userId, onMessageReceive) => {
    useEffect(() => {
        const socket = new SockJS("http://localhost:8080/ws");
        const stompClient = new Client({
            webSocketFactory: () => socket,
            reconnectDelay: 5000,
            onConnect: () => {
                const path = `/topic/notifications/${userId}`;
                // console.log("✅ WebSocket 연결 성공:", userId);
                // console.log("📡 구독 주소:", path);
                stompClient.subscribe(path, (message) => {
                    const notification = JSON.parse(message.body);
                    console.log("📩 수신된 알림:", notification);
                    onMessageReceive(notification);
                });
            },
        });

        stompClient.activate();

        return () => {
            stompClient.deactivate();
        };
    }, [userId, onMessageReceive]);
};

export default useNotificationSocket;

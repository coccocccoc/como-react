import React, { useEffect, useState } from "react";
import "../styles/App.css";
import StudySection from "../components/StudySection";
import "../styles/main.css";
import NavBar from "../components/Navbar";
import Footer from "../components/Footer";
import axios from "axios";

const bannerStyle = {
  width: "100%",
  height: "430px",
  backgroundColor: "#ddd",
  display: "flex",
  alignItems: "center",
  justifyContent: "center"
};

function Main() {
  const [localStudies, setLocalStudies] = useState([]);
  const [myStudies, setMyStudies] = useState([]);
  const [isLoggedIn, setIsLoggedIn] = useState(false); 

  // 인기 스터디 데이터 고정
  const popularStudies = [
    {
      id: 101,
      title: "🔥 알고리즘 스터디 모집",
      nickname: "코딩천재",
      regDate: "2025-07-20T10:00",
      capacity: 5,
      startDate: "2025-08-01",
      endDate: "2025-08-31",
      mode: "온라인",
      deadline: "2025-07-30",
      techStackNames: ["Java", "Spring"],
      content: "<p>매일 알고리즘 문제 풉니다!</p>"
    },
    {
      id: 102,
      title: "✨ 프론트엔드 개발자 모여라",
      nickname: "프론트킹",
      regDate: "2025-07-15T14:00",
      capacity: 4,
      startDate: "2025-08-05",
      endDate: "2025-09-10",
      mode: "온/오프라인",
      deadline: "2025-08-01",
      techStackNames: ["React", "TypeScript"],
      content: "<p>함께 프론트 공부해요</p>"
    },
    {
      id: 103,
      title: "📚 백엔드 실전 프로젝트 팀원 모집",
      nickname: "백엔드마스터",
      regDate: "2025-07-10T09:30",
      capacity: 6,
      startDate: "2025-08-10",
      endDate: "2025-09-30",
      mode: "오프라인",
      deadline: "2025-08-05",
      techStackNames: ["Node.js", "MongoDB"],
      content: "<p>실전 프로젝트 함께 해요</p>"
    },
    {
      id: 104,
      title: "💼 취업 준비 스터디 (코테 + CS)",
      nickname: "스펙업중",
      regDate: "2025-07-22T16:30",
      capacity: 5,
      startDate: "2025-08-01",
      endDate: "2025-10-01",
      mode: "온라인",
      deadline: "2025-07-31",
      techStackNames: ["Python", "Java", "CS"],
      content: "<p>코딩 테스트 + CS 개념 정리! 매주 온라인 모의면접 진행합니다.</p>"
    }
  ];


  useEffect(() => {
    // 로그인 여부 확인
    const token = localStorage.getItem("token");
    setIsLoggedIn(!!token);

    // 최신 스터디 목록 가져오기
    axios.get("/api/studies")
      .then((res) => {
        setLocalStudies(res.data); // 받아온 실데이터 저장
      })
      .catch((err) => {
        console.error("스터디 불러오기 실패", err);
      });

    // 로그인 되어있다면 내가 속한 스터디도 불러오기
    if (token) {
      axios.get("/api/studies/my",{
          headers: { Authorization: `Bearer ${token}` }
        })
        .then((res) => {
          setMyStudies(res.data);
        })
        .catch((err) => {console.error("내 스터디 불러오기 실패", err);});
    }
  }, []);

  return (
    <div className="app">
      {/* Header */}
      <NavBar />

      {/* Banner */}
      <div style={bannerStyle}></div>

      {/* Main */}
      <main className="main">
        {isLoggedIn && (
          <StudySection title="내가 활동하는 스터디" data={myStudies} to="/group-board" />
        )}
        {/* 데이터 고정 */}
        <StudySection title="인기 스터디" data={popularStudies} to="/studies/detail" /> 
        <StudySection title="최신 스터디" data={localStudies} to="/studies/detail" />
      </main>

      {/* Footer */}
      <footer>
        <Footer />
      </footer>
    </div>
  );
}

export default Main;

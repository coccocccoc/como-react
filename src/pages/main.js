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

  useEffect(() => {
    // 로그인 여부 확인
    const token = localStorage.getItem("token");
    setIsLoggedIn(!!token);

    console.log(localStudies);

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
      axios.get("/api/studies/my", { headers: { Authorization: `Bearer ${token}` } })
        .then((res) => {
          setMyStudies(res.data);
        })
        .catch((err) => {
          console.error("내 스터디 불러오기 실패", err);
        });
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
          <StudySection title="내가 활동하는 스터디" data={myStudies} />
        )}
        {/* 데이터 고정 */}
        <StudySection title="인기 스터디" data={[]} /> 
        <StudySection title="최신 스터디" data={localStudies} />
      </main>

      {/* Footer */}
      <footer>
        <Footer />
      </footer>
    </div>
  );
}

export default Main;

import React, { useEffect, useState } from "react";
import "../styles/App.css";
import StudySection from "../components/StudySection";
import { cardData } from "../data/mockData2";
import "../styles/main.css";
import NavBar from "../components/Navbar";
import Footer from "../components/Footer";
import mainBannerImg from "../img/main.jpg";

function Main() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem("token");
    setIsLoggedIn(!!token);
    console.log(token + "!!!!");
  }, []);

  return (
    <div className="app">
      {/* Header */}
      <NavBar />

      {/* Banner */}
      <div className="main-banner">
        <img src={mainBannerImg} alt="메인 배너" className="main-banner-img" />
      </div>

      {/* Main */}
      <main className="main">
        {isLoggedIn && (
          <StudySection title="내가 활동하는 스터디" data={cardData.myStudies} />
        )}
        <StudySection title="인기 스터디" data={cardData.popularStudies} />
        <StudySection title="우리동네 스터디" data={cardData.localStudies} />
      </main>

      {/* Footer */}
      <footer>
        <Footer />
      </footer>
    </div>
  );
}

export default Main;
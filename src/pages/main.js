import React from "react";
import "../styles/App.css";
import StudySection from "../components/StudySection";
import {cardData} from "../data/mockData2";
import "../styles/main.css";
import NavBar from "../components/Navbar";
import Footer from "../components/Footer";

const bannerStyle = {
  width: "100%",
  height: "430px",
  backgroundColor: "#ddd",
  display: "flex",
  alignItems: "center",
  justifyContent: "center"
};

function Main() {
  return (
    <div className="app">
      {/* Header */}
      <NavBar />

      {/* Banner */}
      <div style={bannerStyle}></div>

      {/* Main */}
      <main className="main">
        <StudySection title="내가 활동하는 스터디" data={cardData.myStudies} />
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

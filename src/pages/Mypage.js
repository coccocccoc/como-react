import React from 'react';
import NavBar from '../components/Navbar';
import Footer from '../components/Footer';
import SideNav from '../components/SideNav';
import ProfileInfoBox from '../components/ProfileInfoBox';
import { Outlet } from 'react-router-dom';
import '../styles/Mypage.css';

const Mypage = () => {
  return (
    <div className="mypage-container">
      <NavBar />

      {/* 상단: 사이드 + 프로필 */}
      <div className="mypage-content">
        <SideNav />
        <div className="mypage-right">
          <div className="mypage-profile-wrapper">
            <ProfileInfoBox />
          </div>
        </div>
      </div>

      {/* 하단: 카드 리스트 */}
      <div className="mypage-card-section">
        <Outlet />
      </div>

      <Footer />
    </div>
  );
};

export default Mypage;

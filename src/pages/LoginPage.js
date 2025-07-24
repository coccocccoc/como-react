import React from 'react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import '../styles/LoginPage.css';

function LoginPage() {
  const KAKAO_REST_API_KEY = 'd72eaab0b22382802575882ee30e0777';
  const KAKAO_REDIRECT_URI = 'http://localhost:3000/oauth/kakao/callback';

  const GOOGLE_CLIENT_ID = '구글_CLIENT_ID';
  const GOOGLE_REDIRECT_URI = 'http://localhost:3000/oauth/google/callback';

  const NAVER_CLIENT_ID = '네이버_CLIENT_ID';
  const NAVER_REDIRECT_URI = 'http://localhost:3000/oauth/naver/callback';
  const STATE = 'naver123';

  const handleKakaoLogin = () => {
    window.location.href =
      `https://kauth.kakao.com/oauth/authorize?client_id=${KAKAO_REST_API_KEY}` +
      `&redirect_uri=${KAKAO_REDIRECT_URI}&response_type=code`;
  };

  const handleGoogleLogin = () => {
    window.location.href =
      `https://accounts.google.com/o/oauth2/v2/auth?client_id=${GOOGLE_CLIENT_ID}` +
      `&redirect_uri=${GOOGLE_REDIRECT_URI}&response_type=code&scope=email profile`;
  };

  const handleNaverLogin = () => {
    window.location.href =
      `https://nid.naver.com/oauth2.0/authorize?client_id=${NAVER_CLIENT_ID}` +
      `&redirect_uri=${NAVER_REDIRECT_URI}&response_type=code&state=${STATE}`;
  };

  return (
    <>
      <Navbar />
      <div className="login-container">
        <div className="login-center">
          <h1 className="login-title">COMO, 스터디를 잇다.</h1>
          <p className="login-subtitle">COMO에서 함께할 스터디 멤버를 찾아보세요.</p>

          <div className="login-button-group">
            <button className="login-btn kakao" onClick={handleKakaoLogin}>
              <span className="circle" /> Kakao 로그인
            </button>
            <button className="login-btn google" onClick={handleGoogleLogin}>
              <span className="circle" /> Google 로그인
            </button>
            <button className="login-btn naver" onClick={handleNaverLogin}>
              <span className="circle" /> Naver 로그인
            </button>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
}

export default LoginPage;
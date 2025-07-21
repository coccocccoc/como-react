import './Footer.css';
import logo from '../img/logo.svg';

function Footer() {
  return (
    <footer className="footer">
      <div className="footer-container">
        <img src={logo} alt="COMO 로고" className="footer-logo" />
        <p>상호명: COMO 코모 | 대표자: 슬세현</p>
        <p>사업자번호: 025-07-980103 | 주소: 인천광역시 남동구 문화로 | 대표번호: 010-2025-0730</p>
        <small>COPYRIGHT (C) 2025 COMO. ALL RIGHT RESERVED</small>
      </div>
    </footer>
  );
}

export default Footer;
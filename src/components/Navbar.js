import './Navbar.css';
import logo from '../img/logo.svg';
import { Link } from 'react-router-dom';

function NavBar() {
  return (
    <nav className="navbar">
      <div className="navbar-logo">
        
        <a href="/">
          <img src={logo} alt="COMO 로고" />
        </a>
        
      </div>

      <ul className="navbar-menu">
        <li><Link to="/studies">스터디 찾아보기</Link></li>
        <li><Link to="/studies/recruit">팀원 모집하기</Link></li>
        <li><Link to="/login">로그인 / 회원가입</Link></li>
      </ul> 

    </nav>
  );
}

export default NavBar;
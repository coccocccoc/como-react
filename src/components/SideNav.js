import React, { useEffect, useState } from 'react';
import './SideNav.css';
import defaultProfile from '../img/profile.svg';
import { Link } from 'react-router-dom';

const SideNav = () => {       

  const savedProfile = JSON.parse(localStorage.getItem('userProfile'));

  const [profile, setProfile] = useState(savedProfile || {
    name: "홍길동",
    email: "example@email.com",
    imgPath: null
  });

  console.log("👉 imgPath:", profile.imgPath); 



  useEffect(() => {
    fetch('http://localhost:8080/api/user/me', {
      headers: {
        Authorization: `Bearer ${localStorage.getItem('token')}`,
      }
    })
      .then(res => res.json())
      .then(data => {
        setProfile({
          name: data.nickname,
          email: data.email,
          imgPath: data.imgPath || null 
        });
      });
  }, []);
  
  

  return (
      <div className="sidenav-layout">
        <div className="sidenav-sidebar">
          <div style={{ padding: '5px 0px 20px 5px' }}><h4>마이페이지</h4></div>

          <p><Link to={'/mypageon'}>참여하고 있는 스터디</Link></p>
          <p><Link to={'/mypageoff'}>종료한 스터디</Link></p>
          <p><Link to={'/registerlist'}>작성한 글</Link></p>
           <p><Link to={'#'}>내가 만든 스터디</Link></p>
          <p><Link to={'/mypagelikes'}>찜 목록</Link></p>
          <p><Link to={'/mail'}>쪽지함</Link></p>
        </div>

        <div className="card">
          <div className="sidenav-profile-image-container">
          <img
            src={profile.imgPath || defaultProfile}
            alt="프로필 이미지"
            className="sidenav-profile-image"
          />
          </div>

          <div className="sidenav-card-body">
            <div className="sidenav-profile-field">
              <label>이름: </label>
              <span>{profile.name}</span>
            </div>

            <div className="sidenav-profile-field">
              <label>이메일: </label>
              <span>{profile.email}</span>
            </div>

          <Link to={'/modification'} className="edit-btn-s">프로필 수정</Link>
            
          </div>
        </div>
      </div>
  );
};  

export default SideNav;

import React from 'react';
import './SideNav.css';
import './ProfileInfoBox.css'
import defaultProfile from '../img/profile.svg';
import { Link } from 'react-router-dom';

const ProfileInfoBox = () => {
  const savedProfile = localStorage.getItem('userProfile');
  const savedImage = localStorage.getItem('userImage');

  const profile = savedProfile
    ? JSON.parse(savedProfile)
    : {
        name: "닉네임",
        email: "xxexample@email.com"
      };

  return (
    <div className="profile-layout">
      <div className="sidenav-logo-box">
        <img src={savedImage || defaultProfile} alt="프로필" className="sidenav-profile-img" />
      </div>
      <div className="sidenav-info-box">
        <p><strong>닉네임:</strong> {profile.name}</p>
        <p><strong>이메일:</strong> {profile.email}</p>
        <Link to="/modification" className="edit-btn-s">프로필 수정</Link>
      </div>
    </div>
  );
};

export default ProfileInfoBox;

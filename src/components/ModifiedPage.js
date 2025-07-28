import React, { useState } from 'react';
import './ModifiedPage.css';
import defaultProfile from '../img/profile.svg';
import { useNavigate } from 'react-router-dom';
import SideNav from '../components/SideNav';

const ModifiedPage = () => {
  const savedProfile = JSON.parse(localStorage.getItem('userProfile'));
  const savedImage = localStorage.getItem('userImage');

  const [profile, setProfile] = useState(
    savedProfile || {
      name: '홍길동',
      email: 'example@email.com',
    }
  );
  const [image, setImage] = useState(savedImage || null);
  const navigate = useNavigate();

  const handleChange = (e, field) => {
    setProfile({
      ...profile,
      [field]: e.target.value,
    });
  };

  const handleSave = () => {
    localStorage.setItem('userProfile', JSON.stringify(profile));
    localStorage.setItem('userImage', image);
    navigate('/mypage');
  };

  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setImage(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <div className="mypage-container">
      <div className="mypage-content">
        {/* 왼쪽 사이드바 */}
        <SideNav />

        {/* 오른쪽 프로필 수정 UI */}
        <div className="mypage-right">
          <div className="profile-layout">
            {/* 프로필 이미지 + 파일 업로드 */}
            <div className="profile-image-container">
              <label htmlFor="file-upload">
                <img
                  src={image || defaultProfile}
                  alt="프로필"
                  className="profile-image"
                />
                <input
                  id="file-upload"
                  type="file"
                  accept="image/*"
                  onChange={handleImageUpload}
                  className="upload-input"
                />
              </label>
            </div>

            <div className="sidenav-info-box">
              <p>
                <strong>닉네임:</strong>{' '}
                <input
                  type="text"
                  value={profile.name}
                  onChange={(e) => handleChange(e, 'name')}
                  className="input-field"
                />
              </p>
              <p>
                <strong>이메일:</strong>{' '}
                <input
                  type="email"
                  value={profile.email}
                  onChange={(e) => handleChange(e, 'email')}
                  className="input-field"
                />
              </p>
              <div className="button-group">
                <button onClick={handleSave} className="edit-btn-m">저장</button>
                <button onClick={() => navigate('/mypage')} className="cancel-btn-m">취소</button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ModifiedPage;
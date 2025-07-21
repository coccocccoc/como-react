import React, { useState } from 'react'
import './ModifiedPage.css'
import defaultProfile from '../img/profile.svg';

import { Link, useNavigate } from 'react-router-dom'

const ModifiedPage = () => {

  const savedProfile = JSON.parse(localStorage.getItem('userProfile'));

  const [profile, setProfile] = useState(
    savedProfile || {
      name: "홍길동",
      email: "example@email.com",
      region: "구미",
      age: "20"
    }
  );

  const navigate = useNavigate();
  const savedImage = localStorage.getItem('userImage');
  const [image, setImage] = useState(savedImage || null);

  const handleChange = (e, field) => {
    setProfile({
      ...profile,
      [field]: e.target.value,
    });
  };

  const handleSave = () => {
    localStorage.setItem('userProfile', JSON.stringify(profile));
    navigate('/mypage'); // 또는 navigate(-1) 로 이전 페이지로
  };

  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setImage(reader.result);
        localStorage.setItem('userImage', reader.result); // ✅ 이미지도 저장
      };
      reader.readAsDataURL(file);
    }
  };


  return (

      <div className="layout">
        <div className="sidebar">
          <div style={{ padding: '5px 0px 20px 5px' }}><h4>마이페이지</h4></div>

          <p><Link to={'/mypageon'}>참여하고 있는 스터디</Link></p>
          <p><Link to={'/mypageoff'}>종료한 스터디</Link></p>
          <p><Link to={'/registerlist'}>작성한 글</Link></p>
          <p><Link to={'#'}>내가 만든 스터디</Link></p>
          <p><Link to={'/mypagelikes'}>찜 목록</Link></p>
          <p><Link to={'/mail'}>쪽지함</Link></p>
        </div>

        <div className="card-M">
          <div className="profile-image-container">
            <label htmlFor="file-upload" className="profile-image-label">
              {/* 업로드된 이미지가 있으면 그 이미지, 없으면 기본 이미지 */}
              <img
                src={image || defaultProfile}
                alt="프로필 이미지"
                className="profile-image"
              />
            </label>
            <input
              id="file-upload"
              type="file"
              accept="image/*"
              onChange={handleImageUpload}
              className="upload-input"
            />
          </div>

          <div className="card-body">
            <div className="profile-field">
              <label>이름: </label>
              <input
                type="text"
                value={profile.name}
                onChange={(e) => handleChange(e, 'name')}
                className="input-field"
              />
            </div>

            <div className="profile-field">
              <label>이메일: </label>
              <input
                type="email"
                value={profile.email}
                onChange={(e) => handleChange(e, 'email')}
                className="input-field"
              />
            </div>

          <div className="profile-field">
            <label>지역: </label>
            <input
              type="region"
              value={profile.region}
              onChange={(e) => handleChange(e, 'region')}
              className="input-field"
            />
          </div>

          <div className="profile-field">
            <label>연령대: </label>
            <input
              type="age"
              value={profile.age}
              onChange={(e) => handleChange(e, 'age')}
              className="input-field"
            />
          </div>

            <button onClick={handleSave} className="edit-btn-m">저장</button>
          </div>

        </div>
      </div>

  )
}

export default ModifiedPage
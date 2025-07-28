import React, { useState } from 'react'
import './ModifiedPage.css'
import defaultProfile from '../img/profile.svg';

import { Link, useNavigate } from 'react-router-dom'

const ModifiedPage = () => {

  const savedProfile = JSON.parse(localStorage.getItem('userProfile'));

  const [profile, setProfile] = useState(
    savedProfile || {
      name: "홍길동",
      email: "example@email.com"
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
    // 👉 로컬에 저장
    localStorage.setItem('userProfile', JSON.stringify(profile));

    // 👉 서버에 닉네임 반영 (email은 수정 안 함)
    fetch('http://localhost:8080/api/user/update-nickname', {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${localStorage.getItem('token')}`,
      },
      body: JSON.stringify({ nickname: profile.name }),
    })
      .then((res) => {
        if (!res.ok) throw new Error('서버 반영 실패');
        alert('프로필이 저장되었습니다.');
        navigate('/mypage');
      })
      .catch((err) => {
        console.error('닉네임 수정 에러:', err);
        alert('서버에 프로필 저장 중 오류가 발생했습니다.');
      });
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
                disabled 
                onChange={(e) => handleChange(e, 'email')}
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
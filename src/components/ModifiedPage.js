import React, { useState } from 'react'
import './ModifiedPage.css'
import defaultProfile from '../img/profile.svg';

import { Link, useNavigate } from 'react-router-dom'

const ModifiedPage = () => {

  const savedProfile = JSON.parse(localStorage.getItem('userProfile'));
  const savedImage = localStorage.getItem('userImage');


  const [nickname, setNickname] = useState(savedProfile?.name || "");
  const [email, setEmail] = useState(savedProfile?.email || "");
  const [imagePreview, setImagePreview] = useState(savedImage || null);
  const [uploadFile, setUploadFile] = useState(null);

  const navigate = useNavigate();

  const handleSave = () => {
    if (!/^[\w.-]+@[a-zA-Z\d.-]+\.[a-zA-Z]{2,}$/.test(email)) {
      alert("올바른 이메일 형식이 아닙니다.");
      return;
    }

    const formData = new FormData();
    formData.append("nickname", nickname);
    formData.append("email", email);
    if (uploadFile) {
      formData.append("uploadFile", uploadFile); // ✔ 파일 첨부
    }

    fetch('http://localhost:8080/api/user/update-profile', {
      method: 'PATCH',
      headers: {
        Authorization: `Bearer ${localStorage.getItem('token')}`,
      },
      body: formData,
    })
      .then((res) => {
        if (!res.ok) throw new Error('서버 반영 실패');
        alert('프로필이 저장되었습니다.');
        localStorage.setItem('userProfile', JSON.stringify({ name: nickname, email }));
        navigate('/mypage');
      })
      .catch((err) => {
        console.error('수정 에러:', err);
        alert('서버에 프로필 저장 중 오류가 발생했습니다.');
      });
  };


  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      setUploadFile(file);

      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview(reader.result); // 미리보기용 이미지 저장
        localStorage.setItem('userImage', reader.result); // 원하면 생략 가능
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
            <img
              src={imagePreview || defaultProfile}
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
              value={nickname}
              onChange={(e) => setNickname(e.target.value)}
              className="input-field"
            />
            </div>

            <div className="profile-field">
              <label>이메일: </label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
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
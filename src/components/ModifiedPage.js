import React, { useState } from 'react';
import './ModifiedPage.css';
import defaultProfile from '../img/profile.svg';
import { useNavigate } from 'react-router-dom';
import SideNav from '../components/SideNav';

const ModifiedPage = () => {

  const savedProfile = JSON.parse(localStorage.getItem('userProfile'));
  const savedImage = localStorage.getItem('userImage');

  const [nickname, setNickname] = useState(savedProfile?.name || "");
  const [email, setEmail] = useState(savedProfile?.email || "");
  const [uploadFile, setUploadFile] = useState(null);
  const [image, setImage] = useState(savedImage || null);
  const navigate = useNavigate();


  
  
  const handleSave = () => {
  if (!/^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/.test(email)) {
    alert("올바른 이메일 형식이 아닙니다.");
    return;
  }

  const formData = new FormData();
  formData.append("nickname", nickname);
  formData.append("email", email);
  if (uploadFile) {
    formData.append("uploadFile", uploadFile); // ✔ 파일 첨부
  }

  fetch("http://localhost:8080/api/user/update-profile", {
    method: "PATCH",
    headers: {
      Authorization: `Bearer ${localStorage.getItem("token")}`,
    },
    body: formData,
  })
    .then((res) => {
      if (!res.ok) throw new Error("서버 반영 실패");
      alert("프로필이 저장되었습니다.");
      localStorage.setItem(
        "userProfile",
        JSON.stringify({ name: nickname, email })
      );
      localStorage.setItem("nickname", nickname);
      if (image) {
        localStorage.setItem("userImage", image);
      }
      navigate("/mypage");
    })
    .catch((err) => {
      console.error("수정 에러:", err);
      alert("서버에 프로필 저장 중 오류가 발생했습니다.");
    });
  };

  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      setUploadFile(file);

      const reader = new FileReader();
      reader.onloadend = () => {
        setImage(reader.result); // 미리보기용 이미지 저장
        localStorage.setItem('userImage', reader.result); // 원하면 생략 가능
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
                  value={nickname}
                  onChange={(e) => setNickname(e.target.value)}
                  className="input-field"
                />
              </p>
              <p>
                <strong>이메일:</strong>{' '}
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
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
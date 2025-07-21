import React from "react";
import NavBar from "../components/Navbar";
import StudyInfo from "../components/StudyInfo";
import { studyInfo } from "../data/mockData2";
import PostEditor from "../components/PostEditor";
import Footer from "../components/Footer";
import axios from "axios";

const GroupBoardRegister = () => {
  const handleSubmit = async (data) => {
    try {
      const response = await axios.post("http://localhost:8080/group-board/register", {
        ...data,
        groupId: 1, // 실 사용 시 바인딩된 값으로 대체
        userId: 1
      });
      alert(`등록 되었습니다.`);
      // 등록 성공 후 목록으로 이동
      window.location.href = "/group-board";
    } catch (err) {
      console.error("등록 실패:", err);
      alert("등록에 실패했습니다.");
    }
  };

  return (
    <div className="group-board-register">
      <NavBar />
      <StudyInfo data={studyInfo} />
      <PostEditor
        categories={["공지사항", "자유방", "인증방", "질문방"]}
        onSubmit={handleSubmit}
        onCancel={() => console.log("취소됨")}
      />

      <Footer />
    </div>
    
  );
};

export default GroupBoardRegister;
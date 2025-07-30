import React, { useEffect, useState } from "react";
import NavBar from "../components/Navbar";
import StudyInfo from "../components/StudyInfo";
import PostEditor from "../components/PostEditor";
import Footer from "../components/Footer";
import axios from "axios";
import { useLocation, useNavigate, useParams } from "react-router-dom";

const GroupBoardRegister = () => {
  const location = useLocation(); // 현재 라우팅된 페이지의 state 접근
  const navigate = useNavigate();
  const { groupId } = useParams();
  const [studyData, setStudyData] = useState(null);

   // 스터디 정보 불러오기
  useEffect(() => {
    if (groupId) {
      const token = localStorage.getItem("token");
      const bearerToken = token?.startsWith("Bearer ") ? token : `Bearer ${token}`;

      axios.get(`http://localhost:8080/api/studies/group/${groupId}`, {
        headers: {
          Authorization: bearerToken,
        }
      })
        .then((res) => {
          setStudyData(res.data);
        })
        .catch((err) => {
          console.error("스터디 정보 불러오기 실패:", err);
          alert("스터디 정보를 불러오는 데 실패했습니다.");
        });
    }
  }, [groupId]);


  const handleSubmit = async (data) => {
    if (!groupId) {
      alert("스터디 그룹 정보가 없습니다.");
      return;
    }

    const token = localStorage.getItem("token");
    const userId = Number(localStorage.getItem("userId"));

    try {
      await axios.post(
        "http://localhost:8080/group-board/register",
        {
          ...data,
          groupId: groupId,
          userId: userId
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      alert("등록 되었습니다.");
      navigate(`/group-board/${groupId}`);
    } catch (err) {
      console.error("등록 실패:", err);
      alert("등록에 실패했습니다.");
    }
  };




  return (
    <div className="group-board-register">
      <NavBar />

      {/* ✅ 실 데이터로 StudyInfo 렌더링 */}
      {studyData ? (
        <StudyInfo data={studyData} />
      ) : (
        <div style={{ padding: "2rem", textAlign: "center" }}>스터디 정보를 불러오는 중...</div>
      )}
      
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
import React, { useEffect, useState } from "react";
import "../styles/App.css"
import StudyInfo from "../components/StudyInfo";
import GroupBoardSection from "../components/GroupBoardSection";
import { studyInfo, boardPosts } from "../data/mockData2";
import NavBar from "../components/Navbar";
import { useNavigate } from "react-router-dom";
import Footer from "../components/Footer";
import axios from "axios";

const GroupBoard = () => {
  const navigate = useNavigate();
  const [posts, setPosts] = useState({});
  const groupId = 1;

  useEffect(() => {
    axios.get(`http://localhost:8080/group-board/${groupId}`)
      .then(res => {
        const rawPosts = res.data.content;

        // 카테고리별로 그룹핑
        const grouped = {};
        rawPosts.forEach(p => {
          const cat = p.category;
          if (!grouped[cat]) grouped[cat] = [];
          grouped[cat].push({
            ...p,
            id: p.groupPostId,
            writer: p.nickname || "익명", // 임시
            date: p.regDate?.slice(0, 10),
          });
        });

        setPosts(grouped);
      })
      .catch(err => console.error("불러오기 실패:", err));
  }, []);

  return (
    <div className="group-board">
      <NavBar />
      <StudyInfo data={studyInfo} onWrite={() => navigate("/group-board/register")} />
      <GroupBoardSection posts={posts} />
      <Footer />
    </div>
  );
};

export default GroupBoard;

import React, { useEffect, useState } from "react";
import "../styles/App.css"
import StudyInfo from "../components/StudyInfo";
import GroupBoardSection from "../components/GroupBoardSection";
import NavBar from "../components/Navbar";
import { useNavigate, useParams } from "react-router-dom";
import Footer from "../components/Footer";
import axios from "axios";

const GroupBoard = () => {
  const navigate = useNavigate();
  const [posts, setPosts] = useState({});
  const [comments, setComments] = useState({}); // 댓글 상태 추가
  const [studyData, setStudyData] = useState(null);
  const { groupId } = useParams();




  // ✅ 스터디 모집글 정보 불러오기
  useEffect(() => {
    axios.get(`http://localhost:8080/api/studies/group/${groupId}`)
      .then(res => {
        setStudyData(res.data);
      })
      .catch(err => {
        console.error("스터디 정보 불러오기 실패:", err);
      });
  }, [groupId]);

  // ✅ 그룹 게시글 목록 불러오기
  useEffect(() => {
    axios
      .get(`http://localhost:8080/group-board/${groupId}`)
      .then((res) => {
        const grouped = {};
        res.data.content.forEach((p) => {
          const cat = p.category;
          if (!grouped[cat]) grouped[cat] = [];
          grouped[cat].push({
            ...p,
            id: p.groupPostId,
            writer: p.nickname || "익명",
            date: p.regDate?.slice(0, 10),
          });
        });
        setPosts(grouped);
      })
      .catch((err) => console.error("게시글 불러오기 실패:", err));
  }, [groupId]);

  // ✅ 댓글 불러오기
  useEffect(() => {
    Object.keys(posts).forEach(cat => {
      posts[cat].forEach(post => {
        axios.get(`http://localhost:8080/group-board/comments/post/${post.id}`)
          .then(response => {
            setComments(prev => ({ ...prev, [post.id]: response.data }));
          })
          .catch(error => {
            console.error("댓글 불러오기 실패", error);
          });
      });
    });
  }, [posts]);




  // useEffect(() => {
  //   axios.get(`http://localhost:8080/group-board/${groupId}`)
  //     .then(res => {
  //       const rawPosts = res.data.content;

  //       // 카테고리별로 그룹핑
  //       const grouped = {};
  //       rawPosts.forEach(p => {
  //         const cat = p.category;
  //         if (!grouped[cat]) grouped[cat] = [];
  //         grouped[cat].push({
  //           ...p,
  //           id: p.groupPostId,
  //           writer: p.nickname || "익명", // 임시
  //           date: p.regDate?.slice(0, 10),
  //         });
  //       });

  //       setPosts(grouped);
  //     })
  //     .catch(err => console.error("불러오기 실패:", err));
  // }, []);

  // // 각 게시글에 대한 댓글을 가져오는 useEffect
  // useEffect(() => {
  //   Object.keys(posts).forEach(cat => {
  //     posts[cat].forEach(post => {
  //       axios
  //         .get(`http://localhost:8080/group-board/comments/post/${post.id}`)
  //         .then(response => {
  //           setComments(prev => ({ ...prev, [post.id]: response.data }));
  //         })
  //         .catch(error => {
  //           console.error("댓글 불러오기 실패", error);
  //         });
  //     });
  //   });
  // }, [posts]);

  return (
    <div className="group-board">
      <NavBar />

      {/* ✅ 스터디 정보 컴포넌트 */}
      {studyData && (
        <StudyInfo data={studyData} />
      )}


      {/* ✅ 그룹 게시판 컴포넌트 */}
      <GroupBoardSection posts={posts} comments={comments} onWrite={() => navigate(`/group-board/${groupId}/register`)} />
      
      <Footer />
    </div>
  );
};

export default GroupBoard;

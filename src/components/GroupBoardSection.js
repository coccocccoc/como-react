import React, { useEffect, useState } from "react";
import PostEditor from "./PostEditor";
import CommentSection from "./CommentSection";
import "./GroupBoardSection.css";
import axios from "axios";
import { useParams } from "react-router-dom";

const GroupBoardSection = ({ posts, comments, onWrite, initialPostId }) => {
  const [postData, setPostData] = useState({});
  const [categories, setCategories] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState("");
  const [selectedPost, setSelectedPost] = useState(null);
  const [mode, setMode] = useState("list"); // list | write | edit
  const [commentState, setCommentState] = useState({}); // {postId: [{id, author, text, date}]}
  const [editingPost, setEditingPost] = useState(null); // 수정 중인 게시물 백업
  const [pendingMembers, setPendingMembers] = useState([]); 
  const [selectedMember, setSelectedMember] = useState(null);
  const [applicationContent, setApplicationContent] = useState({ title: "", content: "" });
  const { groupId } = useParams();
  const token = localStorage.getItem("token");const [isLeader, setIsLeader] = useState(false);




  //  시스템 카테고리 분리
  const systemCategories = isLeader ? ["회원 승인"] : [];
  const visibleCategories = ["공지사항", "자유방", "인증방", "질문방"];


  // 스터디장 여부 확인
  useEffect(() => {
    const fetchLeaderInfo = async () => {
      try {
        const token = localStorage.getItem("token");
        const bearerToken = token?.startsWith("Bearer ") ? token : `Bearer ${token}`;
        const res = await axios.get(
          `http://localhost:8080/api/study-groups/${groupId}`,
          {
            headers: {
              Authorization: bearerToken,
            },
          });
        const creatorId = res.data.creatorId;
        const myUserId = Number(localStorage.getItem("userId"));

        setIsLeader(myUserId === creatorId); // 스터디장인지 여부 저장
      } catch (err) {
        console.error("스터디장 정보 불러오기 실패", err);
      }
    };

    fetchLeaderInfo();
  }, [groupId]);

  useEffect(() => {
    if (initialPostId && postData) {
      for (const category in postData) {
        const post = postData[category].find(p => String(p.id) === String(initialPostId));
        if (post) {
          setSelectedCategory(category);
          setSelectedPost(post);
          break;
        }
      }
    }
  }, [postData, initialPostId]);


  // 신청자 목록 불러오기
  useEffect(() => {
    if (mode === "approve") {
      const rawToken = localStorage.getItem("token");
      const bearerToken = rawToken?.startsWith("Bearer ") ? rawToken : `Bearer ${rawToken}`;

      axios
        .get(`http://localhost:8080/api/study-group-members/pending?groupId=${groupId}`, {
          headers: {
            Authorization: bearerToken,
          }
        })
        .then((res) => {
          const converted = res.data.map((m) => ({
            id: m.userId,
            name: m.nickname, 
            date: new Date().toISOString().slice(0, 10),
            userId: m.userId,
            groupId: m.groupId,
            applyTitle: m.applyTitle,
            applyContent: m.applyContent,
          }));
          setPendingMembers(converted);
        })
        .catch((err) => {
          console.error("신청자 목록 불러오기 실패", err);
          setPendingMembers([]);
        });
    }
  }, [mode, groupId]);

  // 신청글 불러오기
  useEffect(() => {
    if (selectedMember) {
      console.log("📨 신청글 요청 파라미터", {
        groupId,
        userId: selectedMember.userId
      });

      const rawToken = localStorage.getItem("token");
      const bearerToken = rawToken?.startsWith("Bearer ") ? rawToken : `Bearer ${rawToken}`;

      axios
        .get(
          `http://localhost:8080/api/study-group-members/application?groupId=${groupId}&userId=${selectedMember.userId}`,
          {
            headers: {
              Authorization: bearerToken,
            },
          }
        )
        .then((res) => {
          const data = res.data[0] || {};
          console.log("📨 신청글 응답 데이터", data);
          setApplicationContent({
            title: data.applyTitle || "제목 없음",
            content: data.applyContent || "신청 내용 없음",
          });
        })
        .catch((err) => {
          console.error("❌ 신청글 불러오기 실패", err);
          setApplicationContent({
            title: "제목 없음",
            content: "신청 내용을 불러올 수 없습니다.",
          });
        });
    }
  }, [selectedMember, groupId]);



  // 승인 거절 처리
  const handleMemberApproval = (memberId, isAccepted) => {
    const numericGroupId = Number(groupId);

    const url = isAccepted
      ? `http://localhost:8080/api/study-group-members/approve`
      : `http://localhost:8080/api/study-group-members/reject`;
    
    const rawToken = localStorage.getItem("token");
    const bearerToken = rawToken?.startsWith("Bearer ") ? rawToken : `Bearer ${rawToken}`;

    axios
      .post(
        `${url}?userId=${memberId}&groupId=${numericGroupId}`,
        {},
        {
          headers: {
            Authorization: bearerToken,
          },
        }
      )
      .then(() => {
        setPendingMembers((prev) => prev.filter((m) => m.id !== memberId));
        setSelectedMember(null);
        setApplicationContent({ title: "", content: "" });
      })
      .catch((err) => {
        console.error("승인/거절 처리 실패", err);
        alert("처리 중 오류가 발생했습니다.");
      });
  };







  useEffect(() => {
    setCommentState(comments);
  }, [comments]);

  useEffect(() => {
    if (!posts) return;

    const buildPostData = (raw) => {
      const result = {};
      for (const category in raw) {
        result[category] = raw[category].map(item => ({ ...item, category }));
      }
      return result;
    };

    const newPostData = buildPostData(posts);
    setPostData(newPostData);

    const orderedCategories = [...visibleCategories, ...systemCategories];
    setCategories(orderedCategories);

    setSelectedCategory(
      orderedCategories.includes("공지사항") ? "공지사항" : orderedCategories[0] || ""
    );
  }, [posts]);


  // 백 연동시 주석 해제
  // useEffect(() => {
  //   if (mode === "approve") {
  //     axios.get("/api/applications/pending").then((res) => {
  //       setPendingMembers(res.data);
  //     });
  //   }
  // }, [mode]);
  
  // useEffect(() => {
  //   if (selectedMember) {
  //     axios
  //       .get(`/api/applications/${selectedMember.id}`)
  //       .then((res) => setApplicationContent(res.data.content));
  //   }
  // }, [selectedMember]);



  // 백 연동시 주석 해제
  // const handleMemberApproval = (memberId, isAccepted) => {
  //   const url = isAccepted
  //     ? `/api/applications/${memberId}/approve`
  //     : `/api/applications/${memberId}/reject`;

  //   axios.post(url).then(() => {
  //     setPendingMembers((prev) => prev.filter((m) => m.id !== memberId));
  //     setSelectedMember(null);
  //     setApplicationContent("");
  //   });
  // };

  // 임시데이터 사용
  // 백 연동시 삭제
  // const handleMemberApproval = (memberId, isAccepted) => {
  //   // ✅ 콘솔에 로그만 찍고 리스트에서 제거
  //   console.log(`${memberId}번 회원 ${isAccepted ? "수락" : "거절"}됨`);

  //   setPendingMembers((prev) => prev.filter((m) => m.id !== memberId));
  //   setSelectedMember(null);
  //   setApplicationContent("");
  // };







  // 게시물 crud
  const createPost = (p) => {
    const newPost = {
      ...p,
      id : Date.now(),
      category : p.category,
      date : new Date().toISOString().slice(0, 10),
      writer : p.writer || "임시닉네임",
    };
    setPostData(prev => ({
      ...prev,
      [newPost.category]: [newPost, ...(prev[newPost.category] || [])],
    }));
    setSelectedCategory(newPost.category);
    setMode("list");
  };

  const updatePost = async (p) => {
    try {
      const postId = p.groupPostId || p.id;

      await axios.put(
        `http://localhost:8080/group-board/post/${postId}`,
        {
          groupPostId: postId, 
          title: p.title,
          content: p.content,
          category: p.category,
          userId: Number(localStorage.getItem("userId"))
        },
        {
          headers: {
            Authorization: `Bearer ${token}`
          }
        }
      );

      setPostData(prev => {
        const updatedList = (prev[p.category] || []).map(item =>
          item.groupPostId === postId ? { ...item, ...p } : item
        );
        return { ...prev, [p.category]: updatedList };
      });

      setSelectedPost(null);
      setMode("list");
    } catch (err) {
      console.error("게시물 수정 실패", err);
      alert("수정에 실패했습니다.");
    }
  };

  const handleDelete = async () => {
    if (!selectedPost) return;

    if (window.confirm("🗑️ 게시물을 삭제하시겠습니까?")) {
      try {
        const postId = selectedPost.groupPostId || selectedPost.id;
        const requesterId = Number(localStorage.getItem("userId")); // ✅ 현재 로그인한 유저 ID

        await axios.delete(
          `http://localhost:8080/group-board/post/${postId}`,
          {
            params: { requesterId },
            headers: {
              Authorization: `Bearer ${token}`
            }
          }
        );


        // 해당 게시물 제거
        setPostData(prev => {
          const updatedList = (prev[selectedPost.category] || []).filter(
            item => item.groupPostId !== postId
          );
          return { ...prev, [selectedPost.category]: updatedList };
        });

        setSelectedPost(null);
        setMode("list");
      } catch (err) {
        console.error("삭제 실패", err);
        alert("삭제에 실패했습니다.");
      }
    }
  };


  // 댓글 crud
  const addCmt = (pid, c) => {
    const token = localStorage.getItem("token");
    const userId = Number(localStorage.getItem("userId"));

    axios
      .post("http://localhost:8080/group-board/comments/add", {
        groupPostId: pid,
        content: c.content,
        userId: userId
      }, {
        headers: {
          Authorization: `Bearer ${token}`,
        }
      })
      .then(response => {
        setCommentState(prev => ({
          ...prev,
          [pid]: [...(prev[pid] || []), response.data],
        }));
      })
      .catch(error => {
        console.error("댓글 추가 실패", error);
      });
  };

  const delCmt = (pid, cid) => {
    const token = localStorage.getItem("token");

    axios
      .delete(`http://localhost:8080/group-board/comments/delete/${cid}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        }
      })
      .then(() => {
        setCommentState(prev => ({
          ...prev,
          [pid]: prev[pid].filter(c => c.commentId !== cid),
        }));
      })
      .catch(error => {
        console.error("댓글 삭제 실패", error);
      });
  };



  const updCmt = (pid, upd) => {
    const token = localStorage.getItem("token");

    axios
      .put(`http://localhost:8080/group-board/comments/update/${upd.commentId}`, {
        content: upd.content,
      }, {
        headers: {
          Authorization: `Bearer ${token}`,
        }
      })
      .then(response => {
        const updated = response.data;
        setCommentState(prev => ({
          ...prev,
          [pid]: prev[pid].map(c =>
            c.commentId === updated.commentId ? updated : c
          ),
        }));
      })
      .catch(error => {
        console.error("댓글 수정 실패", error);
      });
  };


  const renderPosts = () => (
    <ul className="post-list">
      {[...(postData[selectedCategory] || [])]
        .sort((a, b) => new Date(b.regDate || b.date) - new Date(a.regDate || a.date))
        .map((post) => (
          <li
            key={`post-${post.groupPostId || post.id}`}
            className="post-row"
            onClick={() => setSelectedPost(post)}
          >
            <div className="post-title">{post.title}</div>
            <div className="post-meta">
              <span>{post.writer}</span> | <span>{post.date}</span>
            </div>
          </li>
        ))}
    </ul>
  );


  return (
    <div className="groupBoardSection">
      {/* 왼쪽 카테고리 목록 */}
      <div className="board-left">
        <button className="write-btn" onClick={onWrite}>
          글 작성
        </button>
        <ul>
          {categories.map(cat => (
            <li
              key={cat}
              onClick={() => {
                setSelectedCategory(cat);
                setSelectedPost(null);
                setMode(cat === "회원 승인" ? "approve" : "list");
              }}
              style={{
                cursor : "pointer",
                color  : selectedCategory === cat ? "#00F438" : "#ccc",
              }}
            >
              {cat}
            </li>
          ))}
        </ul>
      </div>


      {/* 오른쪽 본문 */}
      <div className="board-right">

        {mode === "approve" && (
          <div className="approval-section">
            <ul className="approval-list">
              {pendingMembers.map((member) => (
                <li key={member.id} className="approval-item">
                  <div className="left">
                    <span onClick={() => setSelectedMember(member)} className="member-name">
                      {member.name}
                    </span>
                    |
                    <span className="member-date"> {member.date}</span>
                  </div>
                  <div className="right">
                    <button onClick={() => handleMemberApproval(member.id, true)}>수락</button>
                    <button onClick={() => handleMemberApproval(member.id, false)}>거절</button>
                  </div>
                </li>
              ))}
            </ul>

            {selectedMember && (
              <div className="application-popup">
                <div className="popup-content">
                  <button className="close-btn" onClick={() => setSelectedMember(null)}>X</button>
                  <h4>{selectedMember.name}님의 가입 신청</h4>

                  <div className="application-details">
                    <p className="application-title">{applicationContent.title}</p>
                    {applicationContent.content ? (
                      <div
                        className="application-body"
                        dangerouslySetInnerHTML={{ __html: applicationContent.content }}
                      />
                    ) : (
                      <p className="application-body">신청 내용을 불러올 수 없습니다.</p>
                    )}
                  </div>

                  <div className="approval-buttons">
                    <button onClick={() => handleMemberApproval(selectedMember.id, true)}>수락</button>
                    <button onClick={() => handleMemberApproval(selectedMember.id, false)}>거절</button>
                  </div>
                </div>
              </div>
            )}
          </div>
        )}

        {mode === "list" && !selectedPost && renderPosts()}

        {(mode === "write" || mode === "edit") && (
          <PostEditor
            categories={visibleCategories}
            initData={{
              ...selectedPost,
              id: selectedPost?.id || selectedPost?.groupPostId }}
            onSubmit={mode === "write" ? createPost : updatePost}
            onCancel={() => {
              if (editingPost) {
                setSelectedPost(editingPost);
                setMode("list");
                setEditingPost(null);
              } else {
                setMode("list"); 
              }
            }}
          />
        )}

        
        {selectedPost && mode === "list" && (
          <div className="post-detail">
            <h5>{selectedPost.title}</h5>
            <div className="etc">
              <span className="writer">{selectedPost.writer}</span>
              <span className="date">{selectedPost.regDate.slice(0, 16).replace('T', ' ')}</span>
            </div>
            <p className="content">{selectedPost.content}</p>
            <button className="back-button" onClick={() => setSelectedPost(null)}>
              목록으로
            </button>
            <button className="edit-btn" onClick={() => {
              setEditingPost(selectedPost);
              setSelectedCategory(selectedPost.category);
              setMode("edit");
            }}>
              수정
            </button>
            <button className="delete-btn" onClick={handleDelete}>삭제</button>

            <CommentSection
              postId={selectedPost.id}
              comments={commentState[selectedPost.id] || []}
              onAdd={(c) => addCmt(selectedPost.id, c)}
              onDelete={(cid) => delCmt(selectedPost.id, cid)}
              onUpdate={(c) => updCmt(selectedPost.id, c)}
              currentUser={{ name: "임시" }}
            />
          </div>
        )}
      </div>
    </div>


  );
};


export default GroupBoardSection;

import React, { useEffect, useState } from "react";
import PostEditor from "./PostEditor";
import CommentSection from "./CommentSection";
import "./GroupBoardSection.css";
import axios from "axios";

const GroupBoardSection = ({ posts, comments, onWrite  }) => {
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

  //  시스템 카테고리 분리
  const systemCategories = ["회원 승인"];
  const visibleCategories = ["공지사항", "자유방", "인증방", "질문방"];





  // 임시데이터
  // 백 연동시 삭제
  useEffect(() => {
    if (mode === "approve") {
      setPendingMembers([
        { id: 101, name: "말하는 감자", date: "2025-07-20" },
        { id: 102, name: "백엔드왕", date: "2025-07-21" },
        { id: 103, name: "포항 AI팀", date: "2025-07-22" },
      ]);
    }
  }, [mode]);

  useEffect(() => {
    if (selectedMember) {
      const dummyApplications = {
        101: { title: "가입 인사", content: "안녕하세요! 열심히 활동하겠습니다." },
        102: { title: "참여 요청", content: "책 모임에 꼭 참여하고 싶어요!" },
        103: { title: "가입 부탁드립니다", content: "함께 책 이야기 나누고 싶습니다!" },
      };

      // 해당 회원의 신청 데이터가 없을 경우 기본값
      setApplicationContent(
        dummyApplications[selectedMember.id] || {
          title: "제목 없음",
          content: "신청 글이 없습니다."
        }
      );
    }
  }, [selectedMember]);








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
  const handleMemberApproval = (memberId, isAccepted) => {
    // ✅ 콘솔에 로그만 찍고 리스트에서 제거
    console.log(`${memberId}번 회원 ${isAccepted ? "수락" : "거절"}됨`);

    setPendingMembers((prev) => prev.filter((m) => m.id !== memberId));
    setSelectedMember(null);
    setApplicationContent("");
  };







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

      await axios.put(`http://localhost:8080/group-board/post/${postId}`, {
        groupPostId: postId, 
        title: p.title,
        content: p.content,
        category: p.category,
        userId: 1, // 임시데이터
      });

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

        await axios.delete(`http://localhost:8080/group-board/post/${postId}`, {
          params: { requesterId: 1 } // 임시 사용자 ID
        });

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
    // 서버에 댓글 추가 요청
    axios
      .post("http://localhost:8080/group-board/comments/add", {
        userId: 1, // 예시: 사용자 ID
        groupPostId: pid,
        content: c.content,
      })
      .then(response => {
        // 서버에서 반환된 새 댓글을 상태에 추가
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
    axios
      .delete(`http://localhost:8080/group-board/comments/delete/${cid}`)
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
    // 서버에 댓글 수정 요청
    axios
      .put(`http://localhost:8080/group-board/comments/update/${upd.commentId}`, {
        content: upd.content,
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
                    <p className="application-body">{applicationContent.content}</p>
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

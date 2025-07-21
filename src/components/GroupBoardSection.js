import React, { useEffect, useState } from "react";
import PostEditor from "./PostEditor";
import CommentSection from "./CommentSection";
import "./GroupBoardSection.css";
import axios from "axios";

const GroupBoardSection = ({ posts, onWrite  }) => {
  const [postData, setPostData] = useState({});
  const [categories, setCategories] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState("");
  const [selectedPost, setSelectedPost] = useState(null);
  const [mode, setMode] = useState("list"); // list | write | edit
  const [comments, setComments] = useState({}); // {postId: [{id, author, text, date}]}
  const [editingPost, setEditingPost] = useState(null); // 수정 중인 게시물 백업

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

    // 원하는 순서대로 정렬
    const predefinedOrder = ["공지사항", "자유방", "인증방", "질문방"];
    const orderedCategories = predefinedOrder.filter(cat => cat in newPostData);
    setCategories(orderedCategories);

    // 기본 선택 카테고리
    setSelectedCategory(
      orderedCategories.includes("공지사항") ? "공지사항" : orderedCategories[0] || ""
    );
  }, [posts]);



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
  const addCmt = (pid, c) =>
    setComments(prev => ({ ...prev, [pid]: [...(prev[pid] || []), c] }));

  const delCmt = (pid, cid) =>
    setComments(prev => ({ ...prev, [pid]: prev[pid].filter(c => c.id !== cid) }));

  const updCmt = (pid, upd) =>
    setComments(prev => ({
      ...prev,
      [pid]: prev[pid].map(c => (c.id === upd.id ? upd : c)),
    }));

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
                setMode("list");
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
        {/* 게시물 목록 */}
        {!selectedPost && mode === "list" && (
          <ul className="post-list">
            {[...(postData[selectedCategory] || [])]
              .sort((a, b) => new Date(b.regDate || b.date) - new Date(a.regDate || a.date))
              .map(post => (
                <li
                  key={`${selectedCategory}-${post.id || post.title || Date.now()}`}
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
        )}

        {/* 글쓰기/수정 폼 */}
        {(mode === "write" || mode === "edit") && (
          <PostEditor
            categories={categories}
            initData={{
              ...selectedPost,
              id: selectedPost?.id || selectedPost?.groupPostId,
            }}
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

        {/* 게시물 상세, 댓글 */} 
        {selectedPost && mode === "list" && (
          <div className="post-detail">
            <h5>{selectedPost.title}</h5>
            <div className="etc">
              <span className="writer">{selectedPost.writer}</span>
              <span className="date">{selectedPost.date}</span>
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
            <button className="delete-btn" onClick={handleDelete}>
              삭제
            </button>

            <CommentSection
              postId={selectedPost.id}
              comments={comments[selectedPost.id] || []}
              onAdd={ c => addCmt(selectedPost.id, c) }
              onDelete={ cid => delCmt(selectedPost.id, cid) }
              onUpdate={c => updCmt(selectedPost.id, c)}
              currentUser={{ name: "임시" }}
            />
          </div>
        )}
      </div>
    </div>
  );
};


export default GroupBoardSection;

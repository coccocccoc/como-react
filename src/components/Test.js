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
              comments={commentState[selectedPost.id] || []}
              onAdd={ c => addCmt(selectedPost.id, c) }
              onDelete={ cid => delCmt(selectedPost.id, cid) }
              onUpdate={c => updCmt(selectedPost.id, c)}
              currentUser={{ name: "임시" }}
            />
          </div>
        )}
      </div>
    </div>
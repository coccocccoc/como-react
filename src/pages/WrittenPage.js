import React from 'react';
import '../styles/Mypage.css';
// import PostCard from '../components/PostCard';
// import { myPosts } from '../data/mockPosts';

function WrittenPage() {
  const loggedInUser = localStorage.getItem('nickname') || 'iseul';

  // 로그인한 사용자가 작성한 글만 필터링
//   const writtenPosts = myPosts.filter((post) => post.nickname === loggedInUser);

  return (
    <div className="mypage-posts-container">
      {/* {writtenPosts.length > 0 ? (
        writtenPosts.map((post, index) => (
          <PostCard key={index} post={post} />
        ))
      ) : (
        <div className="created-empty-wrapper">
          <div className="created-empty-box">작성한 글이 없습니다.</div>
        </div>
      )} */}
    </div>
  );
}

export default WrittenPage;

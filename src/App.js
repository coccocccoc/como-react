import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Main from "./pages/main"; 
import GroupBoard from "./pages/groupBoard";
import GroupBoardRegister from "./pages/groupBoardRegister";
import StudyList from './pages/StudyList';
import StudyRecruit from './pages/StudyRecruit';
import StudyDetail from './pages/StudyDetail'; 
import StudyApply from './pages/StudyApply';
import StudyEdit from './pages/StudyEdit';
import MailHome from './pages/MailHome';

import Mypage from './pages/Mypage';
import ParticipatingPage from './pages/ParticipatingPage'; 
import FinishedPage from './pages/FinishedPage'; 
import CreatedPage from './pages/CreatedPage';
import ProfileModification from './pages/ProfileModification';
import LoginPage from "./pages/LoginPage";
import KakaoCallback from './pages/KakaoCallback';
import NaverCallback from './pages/NaverCallback';
import WrittenPage from './pages/WrittenPage';
import LikesPage from './pages/LikesPage';
import MessagesInboxPage from "./pages/MessagesInboxPage";
import MessagesSentPage from "./pages/MessagesSentPage";


function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Main />} />
        <Route path="/group-board/:groupId" element={<GroupBoard />} />
        <Route path="/group-board/:groupId/register" element={<GroupBoardRegister />} />
        <Route path="/studies" element={<StudyList />} />
        <Route path="/studies/recruit" element={<StudyRecruit />} />
        <Route path="/studies/detail" element={<StudyDetail />} />
        <Route path="/studies/apply/:groupId" element={<StudyApply />} />
        <Route path="/studies/edit" element={<StudyEdit />} />

        {/* 마이페이지 중첩 라우팅 */}
        <Route path="/mypage" element={<Mypage />}>
          <Route path="participating" element={<ParticipatingPage />} />
          <Route path="finished" element={<FinishedPage />} />
          <Route path="created" element={<CreatedPage />} />
          <Route path="written" element={<WrittenPage />} />
          <Route path="likes" element={<LikesPage />} />
          <Route path="messages/inbox" element={<MessagesInboxPage />} />
          <Route path="messages/sent" element={<MessagesSentPage />} />
        </Route>


        <Route path="/mail" element={<MailHome />} />
  
        <Route path="/modification" element={<ProfileModification />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/oauth/kakao/callback" element={<KakaoCallback />} />
        <Route path="/oauth/naver/callback" element={<NaverCallback />} />
      </Routes>
    </Router>
  );
}

export default App;

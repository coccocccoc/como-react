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
import MailSend from './pages/MailSend';
import Mypage from './pages/Mypage';
import MypageLikes from './pages/MypageLikes';
import MypageList from './pages/MypageList';
import MypageOff from './pages/MypageOff';
import MypageOn from './pages/MypageOn';
import ProfileModification from './pages/ProfileModification';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Main />} />
        <Route path="/group-board" element={<GroupBoard />} />
        <Route path="/group-board/register" element={<GroupBoardRegister />} />
        <Route path="/studies" element={<StudyList />} />
        <Route path="/studies/recruit" element={<StudyRecruit />} />
        <Route path="/studies/detail" element={<StudyDetail />} />
        <Route path="/studies/apply/:id" element={<StudyApply />} />
        <Route path="/studies/edit" element={<StudyEdit />} />
        <Route path="/mypage" element={<Mypage />} />
        <Route path="/mypageon" element={<MypageOn />} />
        <Route path="/mypageoff" element={<MypageOff />} />
        <Route path="/registerlist" element={<MypageList />} />
        <Route path="/mypagelikes" element={<MypageLikes />} />
        <Route path="/mail" element={<MailHome />} />
        <Route path="/mailsend" element={<MailSend />} />
        <Route path="/modification" element={<ProfileModification/>} />
      </Routes>
    </Router>
  );
}

export default App;

import React, { useEffect, useState } from 'react';
import NavBar from '../components/Navbar';
import Header from '../components/Header';
import SideNav from '../components/SideNav';

import Footer from '../components/Footer';
import StudySectionMy from '../components/StudySectionMy';
import { cardData } from '../data/mockData3';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const MypageOff = () => {

    const [endedStudies, setEndedStudies] = useState([]);
    const navigate = useNavigate();

    useEffect(() => {
        const token = localStorage.getItem('token');

        if (!token) {
        alert('로그인이 필요합니다.');
        return;
        }

        axios
            .get('http://localhost:8080/api/studies/my-ended', {
                headers: {
                Authorization: `Bearer ${token}`,
                },
            })
            .then((res) => {
                console.log('✅ 종료된 스터디 조회 결과:', res.data);
                setEndedStudies(res.data); // 필터링 필요 없음
            })
            .catch((err) => {
                console.error('❌ 종료된 스터디 조회 실패:', err);
            });
    }, []);

  // 카드 클릭 시 group-board로 이동
  const handleCardClick = (study) => {
    navigate(`/group-board/${study.groupId}`);
  };

  console.log("종료된 스터디 데이터:", endedStudies);

    return (
        <div>
            <NavBar />
            <Header />

            <SideNav />

            <main className="main-F">
                <StudySectionMy 
                    title="종료된 스터디"
                    data={endedStudies}
                    onCardClick={(study) => navigate(`/group-board/${study.groupId}`)} 
                 />
            </main>
            <Footer></Footer>
        </div>
    );
}

export default MypageOff;

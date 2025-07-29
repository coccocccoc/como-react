import React, { useEffect, useState } from 'react';
import NavBar from '../components/Navbar';
import Header from '../components/Header';
import SideNav from '../components/SideNav';
import Footer from '../components/Footer';
import StudySectionMy from '../components/StudySectionMy';
import { cardData } from '../data/mockData3';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const MypageOn = () => {
    const [ongoingStudies, setOngoingStudies] = useState([]);
    const navigate = useNavigate();

    useEffect(() => {
        const token = localStorage.getItem("token");
        if (!token) return;

        axios.get("http://localhost:8080/api/studies/my", {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        })
        .then(res => {
            const filtered = res.data.filter(study => 
                study.status === '모집중' || study.status === '활동중'
            );
            setOngoingStudies(filtered);
        })
        .catch(err => console.error("스터디 불러오기 실패:", err));
    }, []);
    
    return (
        <div>
            <NavBar />
            <Header />

            <SideNav />

            <main className="main-O">
                <StudySectionMy 
                    title="참여하고 있는 스터디" 
                    data={ongoingStudies}
                    onCardClick={(study) => navigate(`/group-board/${study.groupId}`)} // ✅ 경로 변경
                />
            </main>
            <Footer></Footer>
        </div>
    );
}

export default MypageOn;

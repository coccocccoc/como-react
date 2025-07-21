import React from 'react';
import NavBar from '../components/Navbar';
import Header from '../components/Header';
import SideNav from '../components/SideNav';

import Footer from '../components/Footer';
import StudySectionMy from '../components/StudySectionMy';
import { cardData } from '../data/mockData3';

const MypageOff = () => {
    return (
        <div>
            <NavBar />
            <Header />

            <SideNav />

            <main className="main-F">
                <StudySectionMy title="종료된 스터디" data={cardData.myStudies} />
            </main>
            <Footer></Footer>
        </div>
    );
}

export default MypageOff;

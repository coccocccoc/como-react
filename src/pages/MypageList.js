import React from 'react';
import NavBar from '../components/Navbar';
import Header from '../components/Header';
import SideNav from '../components/SideNav';
import RegisterList from '../components/RegisterList';
import { posts } from '../data/mockData3';
import Footer from '../components/Footer';

const MypageList = () => {

    return (
        <div>

            
            <NavBar />
            <Header />

            <SideNav />

            <RegisterList posts={posts}></RegisterList>
            <Footer></Footer>
        </div>
    );
}

export default MypageList;

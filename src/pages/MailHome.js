import React from 'react';
import NavBar from '../components/Navbar';
import Header from '../components/Header';
import Footer from '../components/Footer';
import MailList from '../components/MailList';
import SideNav from '../components/SideNav';
import { posts } from '../data/mockData3';

const Mail = () => {
    return (
        <div>
            <NavBar />
            <Header />


            <SideNav></SideNav>

            <MailList posts={posts}></MailList>
            <Footer></Footer>
        </div>
    );
}

export default Mail;

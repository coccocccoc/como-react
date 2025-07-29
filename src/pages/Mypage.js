import React from 'react';
import NavBar from '../components/Navbar';
import Header from '../components/Header';
import SideNav from '../components/SideNav';
import Main from '../components/Main';
import Footer from '../components/Footer';

const Mypage = () => {
    
    return (
   <div>
            <NavBar />
            <Header />
    
                <SideNav />
             
                    <Main></Main>
            <Footer></Footer>
        </div>
    );
}

export default Mypage;

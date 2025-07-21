import React from 'react';
import NavBar from '../components/Navbar';
import Header from '../components/Header';


import SideNav from '../components/SideNav';

import MailSend from '../components/MailSend';
import Footer from '../components/Footer';

const Mail = () => {
    return (
        <div>
            <NavBar />
            <Header />

      
            <SideNav></SideNav>
          
           <MailSend></MailSend>
           <Footer></Footer>
        </div>
    );
}

export default Mail;

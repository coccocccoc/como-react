import React from 'react';
import NavBar from '../components/Navbar';
import Header from '../components/Header';
import ModifiedPage from '../components/ModifiedPage';
import Main from '../components/Main';
import Footer from '../components/Footer';

const ProfileModification = () => {
    return (
        <div>
            <NavBar />
            <Header />

            <ModifiedPage />

            <Main></Main>
            <Footer></Footer>
        </div>
    );
}

export default ProfileModification;

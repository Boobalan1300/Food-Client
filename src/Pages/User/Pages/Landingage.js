

import React, { useEffect } from 'react';
import NavBar from '../../../Common/navbar';
import HeaderComponent from '../Pages/Header';
import ProductsComponent from './Products';
import AboutComponent from '../Pages/about';
import SupportComponent from './support';
import FooterComponent from '../../../Common/footer';
import { useNavigate } from 'react-router-dom';

const LandingPage = () => {
  const navigate = useNavigate();

  // useEffect(() => {
  //   const token = localStorage.getItem('token');
  //   const userEmail = localStorage.getItem('email');

  //   if (!token || !userEmail) {
  //     navigate('/login');
  //   }
  // }, [navigate]);

  return (
    <>
      <NavBar />
      <HeaderComponent />
      <ProductsComponent />
      <AboutComponent/>
      <SupportComponent/>
      <FooterComponent/>
    </>
  );
};

export default LandingPage;





import React, { Fragment, useEffect, useState } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { useCookies } from 'react-cookie';
import UserAnalytics from './analyticsPlugin/UserAnalytics';
import EventAnalytics from './analyticsPlugin/EventAnalytics';
import Navbar from './components/ui/Navbar';
import Home from './components/pages/Home';
import About from './components/pages/About';
import ContactUs from './components/pages/ContactUs';
import AnalyticsUI from './components/ui/analyticsUI/AnalyticsUI';
import pathString from './hooks/usePathString';
import './App.css';

const  App = () => {

  const pathStringLive = pathString();
  const [cookies, setCookie] = useCookies(['visited']);
  const [adminUser, setAdminUser] = useState(false);

  useEffect(() => {
    if (!cookies.visited) {
      setCookie('visited', true);
    }
    // console.log('adminUser in app', adminUser);

  }, [cookies.visited, setCookie, adminUser]);
  


  return (
    <Fragment>
      <UserAnalytics adminUser={adminUser} setAdminUser={setAdminUser} visited={cookies.visited}>
        <EventAnalytics>
          <BrowserRouter>
            <Navbar adminUser={adminUser} />
            <Routes>
              {[`/${pathStringLive}`, `/${pathStringLive}/home`].map((path, i) => (
                <Route key={i} path={path} element={<Home />} />
              ))}
              <Route path={`/${pathStringLive}/about`} element={<About />} />
              <Route path={`/${pathStringLive}/contact`} element={<ContactUs />} />
             { adminUser && <Route path={`/${pathStringLive}/analytics-page`} element={<AnalyticsUI />} /> }
            </Routes>
          </BrowserRouter>
        </EventAnalytics>
      </UserAnalytics>
    </Fragment>
  );
}


export default App;

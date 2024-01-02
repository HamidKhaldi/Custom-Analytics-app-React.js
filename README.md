# React-D3-SP-Analytics-App

How to use:

1 - Create your react app.

2 - Install the relevant dependencies: 'react-tracking' and 'react-cookie'.

3 - Copy the analyticsPlugin folder to you src folder.

4 - Copy the analyticsUI folder (it is inside the ui folder).

5 - In index.js add the the component (see below):

==============================

import React from 'react';

import ReactDOM from 'react-dom/client';

import { CookiesProvider } from 'react-cookie';

import './index.css';

import App from './App';

import reportWebVitals from './reportWebVitals';

const root = ReactDOM.createRoot(document.getElementById('root'));

root.render( <React.StrictMode>

<CookiesProvider>

  <App />
  
</CookiesProvider>
</React.StrictMode> );

reportWebVitals();

==============================

6 - In App.js Add the custom components (see below):

==============================

function App() {

const pathStringLive = pathString();

const [cookies, setCookie] = useCookies(['visited']);

useEffect(() => {

if (!cookies.visited) {
  setCookie('visited', true);
}
}, [cookies.visited, setCookie]);

return (

<Fragment>
  <UserAnalytics visited={cookies.visited}>
    <EventAnalytics>
      <BrowserRouter>
        <Navbar />
        <Routes>
          {[`/${pathStringLive}`, `/${pathStringLive}/home`].map((path, i) => (
            <Route key={i} path={path} element={<Home />} />
          ))}
          <Route path={`/${pathStringLive}/about`} element={<About />} />
          <Route path={`/${pathStringLive}/contact`} element={<ContactUs />} />
          <Route path={`/${pathStringLive}/analytics-page`} element={<AnalyticsUI />} />
        </Routes>
      </BrowserRouter>
    </EventAnalytics>
  </UserAnalytics>
</Fragment>
); }

export default App;

==============================

8 - Import and add the component and pass the pageName prop that you want.

9 - Use the useTracking hook to track any clicks of buttons/links that you want (the logic for the events is located in the EventAnalytics component).

Example of 8 & 9:

==============================

import React, { useEffect } from 'react';

import track, { useTracking } from 'react-tracking';

import PageAnalytics from '../../analyticsPlugin/PageAnalytics';

const Home = () => {

const { trackEvent } = useTracking();

return (

<PageAnalytics pageName='Home'>
  <div>
    <h1 className='page-header'>Home</h1>
    <h2>Click for HookButton</h2>
    <button onClick={() => {
      trackEvent({ component: 'Home', event: "HomeButton-Clicked" });
  }}>Click Me!</button>
  </div>
</ PageAnalytics>
)

}

export default Home;

==============================

10 - Change the urls in the custom components to reflect the lists on your SP site. (Please note that the column names need to be the same as in the code when you create your analytics lists on you SP site.)

11 - Use the AnalyticsUI.js to display your analytics data and customise it as you see fit, using D3.js or other libraries.

12 - To add the authentication step for the Analytics page, copy the code in App.js, UserAnalytics and Navbar.js (which pertains to adminUser), and change the url and the admin group-name to the one on your SharePoint site.

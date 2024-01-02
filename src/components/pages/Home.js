import React, { useEffect } from 'react';
import track, { useTracking } from 'react-tracking';
import PageAnalytics from '../../analyticsPlugin/PageAnalytics';

const Home = () => {

const { trackEvent } = useTracking();

  return (
    <PageAnalytics pageName='Home'>
      <div>
        <h1 className='page-header'>Home</h1>
        <h2>Click for button analytics</h2>
        <button onClick={() => {
          trackEvent({ component: 'Home', event: "HomeButton-Clicked" });
      }}>Click Me!</button>
      </div>
    </ PageAnalytics>
  )


}

export default Home;

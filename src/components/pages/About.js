import React, { useEffect } from 'react';
import track, { useTracking } from 'react-tracking';
import PageAnalytics from '../../analyticsPlugin/PageAnalytics';

const About = () => {

  const { trackEvent } = useTracking();

  return (
    <PageAnalytics pageName='About'>
    <div>
      <h1 className='page-header'>About</h1>
      <h2>Click for button analytics</h2>
      <button onClick={() => {
        trackEvent({ component: 'About', event: "AboutButton-Clicked" });
    }}>Click Me!</button>
    </div>
  </ PageAnalytics>
  )
}

export default About;

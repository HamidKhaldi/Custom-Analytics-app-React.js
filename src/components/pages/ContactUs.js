// ContactUs.js
import React, { useEffect } from 'react';
import track, { useTracking } from 'react-tracking';
import PageAnalytics from '../../analyticsPlugin/PageAnalytics';

const ContactUs = () => {

const { trackEvent } = useTracking();
  return (
    <PageAnalytics pageName='Contact-Us'>
    <div>
      <h1 className='page-header'>Contact Us</h1>
      <h2>Click for button analytics</h2>
      <button onClick={() => {
        trackEvent({ component: 'ContactUs', event: "ContactUsButton-Clicked" });
    }}>Click Me!</button>
    </div>
  </ PageAnalytics>
  )
}


export default ContactUs;

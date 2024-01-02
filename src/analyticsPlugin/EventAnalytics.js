import React, { useEffect  } from 'react';
import track, { useTracking } from 'react-tracking';
import axios from 'axios';

const EventComponent = ({ children }) => { 

    return (
        <>
            {children}
        </>
    )
}

const EventAnalytics = track(
  { app: "sp-analytics" },
  {
    dispatch: (data) => {      
      let webUrl = "siteUrl";
      axios.post(webUrl + '/_api/contextinfo', {}, {
        headers: { "Accept": "application/json; odata=verbose" }
      })
        .then(response => {
          let digestValue = response.data.d.GetContextWebInformation.FormDigestValue;
          if (data.component && data.event) {
            axios.post("siteUrl/_api/web/lists/GetByTitle('Lst_Page-Events-Analytics')/items", {
              __metadata: {
                type: 'SP.Data.Lst_x005f_PageEventsAnalyticsListItem'
              },
              'Title': data.component,
              'Event': data.event
            }, {
              headers: {
                "Accept": "application/json;odata=verbose",
                "Content-Type": "application/json;odata=verbose",
                "X-RequestDigest": digestValue,
                "X-HTTP-Method": "POST"
              }
            })
              .then(response => {
                console.log('tracked event data sent', response.data);
              })
              .catch(error => {
                console.log('error sending data', error);
              });
          }
        })
        .catch(error => {
          console.log('context info Error', error);
        });
      
    }
  }
)(EventComponent);

export default EventAnalytics;

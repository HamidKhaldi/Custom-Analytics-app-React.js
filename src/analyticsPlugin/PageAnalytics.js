import React, { useEffect, children } from 'react';
import track, { useTracking } from 'react-tracking';
import axios from 'axios';

const PageAnalytics = ({ children, pageName }) => {
  console.log('pageName ', pageName);

  const { Track } = useTracking(
    { page: pageName, date: new Date() },
    {
      dispatchOnMount: (data) => {

        let webUrl = "siteUrl";
        axios.post(webUrl + '/_api/contextinfo', {}, {
          headers: { "Accept": "application/json; odata=verbose" }
        })
          .then(response => {
          let digestValue = response.data.d.GetContextWebInformation.FormDigestValue;
            axios.post("siteUrl/_api/web/lists/GetByTitle('Lst_Page-Analytics')/items", {
              __metadata: {
                type: 'SP.Data.Lst_x005f_PageAnalyticsListItem'
              },
              'Title': data.page,
              'Date': data.date
            }, {
              headers: {
                "Accept": "application/json;odata=verbose",
                "Content-Type": "application/json;odata=verbose",
                "X-RequestDigest": digestValue,
                "X-HTTP-Method": "POST"
              }
            })
              .then(response => {
                console.log('tracked page data sent', response.data);
              })
              .catch(error => {
                console.log('error sending data', error);
              });
          })
          .catch(error => {
            console.log('context info Error', error);
          });

      }
    }
  );


  return (
    <Track>
      {children}
    </Track>
  )
}

export default track()(PageAnalytics);

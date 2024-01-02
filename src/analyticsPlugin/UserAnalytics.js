import React, { useState, useEffect } from 'react';
import track, { useTracking } from 'react-tracking';
import axios from 'axios';

const UserAnalytics = ({ children, visited, adminUser, setAdminUser }) => {

    const [userDetails, setUserDetails] = useState({
        Title: '',
        Department: '',
        Location: ''
    });
    const [dataSent, setDataSent] = useState(false);
    const [adminUsers, setAdminUsers] = useState([]);
    const [userEmail, setUserEmail] = useState('');

    const addQuotes = (str) => {
        return `"${str}"`;
    }


    useEffect(() => {

        (async () => {

            const siteUrl = 'https://eygb.sharepoint.com/sites/Creative-UK'; 
            const groupName = 'Creative-UK-Admin'; 

            try {
                // Get the SharePoint group ID
                const groupEndpoint = `${siteUrl}/_api/web/sitegroups?$filter=Title eq '${groupName}'`;
                const groupResponse = await axios.get(groupEndpoint);
                //console.log('groupResponse ', groupResponse);
                const groupId = groupResponse.data.value[0].Id;

                try {
                    // Get the group's users
                    const usersEndpoint = `${siteUrl}/_api/web/sitegroups(${groupId})/users`;
                    const usersResponse = await axios.get(usersEndpoint);
                    const usersData = usersResponse.data.value;

                    usersData.forEach(user => {
                        //console.log('user ', user);
                        if (user.Email === userEmail) {
                            setAdminUser(true);
                            console.log('adminUser in user ', adminUser);
                        }
                    });


                } catch (error) {
                    console.error('groupEndpoint ', error);
                }
            } catch (error) {
                console.error('groupEndpoint ', error);
            }
        })();


        console.log('visited ', visited);
        let webUrl = "siteUrl";

        axios.get(webUrl + "/_api/SP.UserProfiles.PeopleManager/GetMyProperties", {
            headers: {
                "Access-Control-Allow-Origin": "*",
                "Content-Type": "application/json",
            }
        })
            .then(response => {
                
                setUserEmail(response.data.Email);
                //console.log('userEmail ', userEmail);

                let newUserDetails = {
                    Title: '',
                    Department: '',
                    Loaction: ''
                }
                response.data.UserProfileProperties.forEach(function (item) {
                    if (item.Key === 'Title') {
                        userDetails.Title = item.Value;
                    }
                    if (item.Key === 'Department') {
                        userDetails.Department = item.Value;
                    }
                    if (item.Key === 'EYAreaDescription') {
                        userDetails.Location = item.Value;
                    }

                });

                setUserDetails({ ...userDetails }, newUserDetails);
                //console.log('user details final ', userDetails);

                let webUrl = "siteUrl";
                axios.post(webUrl + '/_api/contextinfo', {}, {
                    headers: { "Accept": "application/json; odata=verbose" }
                })
                    .then(response => {
                        let digestValue = response.data.d.GetContextWebInformation.FormDigestValue;
                        axios.post("siteUrl/_api/web/lists/GetByTitle('Lst_User-Analytics')/items", {
                            __metadata: {
                                type: 'SP.Data.Lst_x005f_AnalyticsListItem'
                            },
                            'Title': userDetails.Title,
                            'Department': userDetails.Department,
                            'Location': userDetails.Location,
                            'Returning': visited
                        }, {
                            headers: {
                                "Accept": "application/json;odata=verbose",
                                "Content-Type": "application/json;odata=verbose",
                                "X-RequestDigest": digestValue,
                                "X-HTTP-Method": "POST"
                            }
                        })
                            .then(response => {
                                //console.log('user data sent ', response.data);
                                setDataSent(true);
                            })
                            .catch(error => {
                                console.log('error sending data', error);
                            });
                    })
                    .catch(error => {
                        console.log('context info Error', error);
                    });

            })
            .catch(function (error) {
                console.log('Error', error);
            });
    }, [userEmail, adminUser]);

    return (
        <>
            {children}
        </>
    )
}

export default UserAnalytics;

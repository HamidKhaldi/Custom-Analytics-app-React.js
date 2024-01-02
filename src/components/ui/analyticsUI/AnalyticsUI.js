import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './AnalyticsUI.scss';
import PieChart from './PieChart';
import BarChart from './BarChart';

const AnalyticsUI = (props) => {

    const [userDetails, setUserDetails] = useState({
        Title: '',
        Department: '',
        Location: ''
    });
    const [titleObj, setTitleObj] = useState({});
    const [deptObj, setDeptObj] = useState({});
    const [locationObj, setLocationObj] = useState({});
    const [pageObj, setPageObj] = useState({});
    const [dateObj, setDateObj] = useState({});
    const [dataSent, setDataSent] = useState(false);
    const [userAnalytics, setUserAnalytics] = useState([]);
    const [pageAnalytics, setPageAnalytics] = useState([]);
    const [userData, setUserData] = useState(false);
    const [pageData, setPageData] = useState(false);

    const options = { day: 'numeric', month: 'long', year: 'numeric' };

    const addQuotes = (str) => {
        return `"${str}"`;
    }

    useEffect(() => {

        async function fetchAnalyticsData() {
            const baseUrlPages = "siteUrl/_api/web/lists/GetByTitle('Lst_Page-Analytics')/items";
            const baseUrlUsers = "siteUrl/_api/web/lists/GetByTitle('Lst_User-Analytics')/items";
            
            const urlPages = `${baseUrlPages}?$select=*&$top=5000`;
            const urlUsers = `${baseUrlUsers}?$select=*&$top=5000`;
            
            try {
                const response = await axios.get(urlPages);
                const allPageRecords = response.data.value;    
           
                //console.log('allPageRecords', allPageRecords);
                let pageArr = [], dateArr = [], pageCountObj = {}, dateCountObj = {};
                let pageAnalyticsArr = allPageRecords;
                setPageData(true);

                for (const item in pageAnalyticsArr) {
                    pageArr.push(pageAnalyticsArr[item]['Title']);
                    dateArr.push(new Date(pageAnalyticsArr[item]['Date']).toLocaleDateString("en-GB", options));
                };

                //console.log('pageArr ', pageArr);
                // console.log('dateArr ', dateArr);

                pageArr.map((a) => {
                    if (a in pageCountObj) pageCountObj[a]++; else pageCountObj[a] = 1;
                });
                //console.log('pageCountObj ', pageCountObj);
                setPageObj(pageCountObj);

                dateArr.map((a) => {
                    a = addQuotes(a);
                    if (a in dateCountObj) dateCountObj[a]++; else dateCountObj[a] = 1;
                });
                //console.log('dateCountObj ', dateCountObj);
                setDateObj(dateCountObj);
                console.log('dateObj ', dateObj);


            } catch (error) {
                console.error(error);
            }

            try {
                const response = await axios.get(urlUsers);
                const allUserRecords = response.data.value;    
                let titleArr = [], deptArr = [], locationArr = [], titleCountObj = {}, deptCountObj = {}, locationCountObj = {};
               
                setUserData(true);
                allUserRecords.map(user => {
                    titleArr.push(user.Title);
                    deptArr.push(user.Department);
                    locationArr.push(user.Location);
                });


                titleArr.map((a) => {
                    a = addQuotes(a);
                    if (a in titleCountObj) titleCountObj[a]++; else titleCountObj[a] = 1;
                });

                setTitleObj(titleCountObj);
               
                deptArr.map((a) => {
                    a = addQuotes(a);
                    if (a in deptCountObj) deptCountObj[a]++; else deptCountObj[a] = 1;
                });

                setDeptObj(deptCountObj);
 
                locationArr.map((a) => {
                    a = addQuotes(a);
                    if (a in locationCountObj) locationCountObj[a]++; else locationCountObj[a] = 1;
                });

                setLocationObj(locationCountObj);
                
            } catch (error) {
                console.error(error);
            }
        }
        
        fetchAnalyticsData();

    }, []);

    return (
        <div>
            <h1 className='header'>Analytics</h1>
            <PieChart titleObj={titleObj} deptObj={deptObj} locationObj={locationObj} />
            <h2 className='header'>Visits Analytics</h2>
            <ul className='bar-chart-list'>
                <li className='bar-chart-list--item'>
                    <BarChart xAxisLabel={'Page'} dataObj={pageObj} />
                </li>
                <li className='bar-chart-list--item'>
                    <BarChart xAxisLabel={'Date'} dataObj={dateObj} />
                </li>
            </ul>
        </div>

    )
}

export default AnalyticsUI;
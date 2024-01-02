import React, { useState, useEffect, useRef } from 'react';
import * as d3 from 'd3';
import './PieChart.scss';


const PieChart = props => {
    const [dataLoaded, setDataLoaded] = useState(false);

    const isEmpty = (obj) => {
        return Object.keys(obj).length === 0;
    }


    const formatData = (obj) => {
        let formatArr = [];
        for (var key in obj) {
            if (obj.hasOwnProperty(key)) {
                formatArr.push({ label: key, value: obj[key] });
            }
        }
        return formatArr;
    };

    const mounted = useRef(false);
    useEffect(() => {
        if (!mounted.current) {
            console.log(' prop in did mount ', props);
            // do componentDidMount logic
            mounted.current = true;
        } else {
            // do componentDidUpdate logic
            console.log(' prop in did update ', props);
            if (!isEmpty(props.titleObj) && !isEmpty(props.locationObj) && !isEmpty(props.deptObj)) {
                setDataLoaded(true);
                drawPieChart('#pie-chart-2', formatData(props.deptObj));
                drawPieChart('#pie-chart-3', formatData(props.locationObj));
                drawPieChart('#pie-chart-1', formatData(props.titleObj));
            }
        }
    }, [props.titleObj, props.locationObj, props.deptObj]);

    const drawPieChart = (id, data) => {

        var width = 300;
        var height = 300;
        var radius = Math.min(width, height) / 2;

        var svg = d3.select(id)
            .append("svg")
            .attr("width", '100%')
            .attr("height", '100%')
            .attr('viewBox', '0 0 ' + Math.min(width, height) + ' ' + Math.min(width, height))
            .attr('preserveAspectRatio', 'xMinYMin')
            .append("g")
            .attr("transform", "translate(" + Math.min(width, height) / 2 + "," + Math.min(width, height) / 2 + ")");

        var pie = d3.pie().value(function (d) { return d.value; })
        var colorScale = d3.scaleOrdinal().range(["#ffe600", "#a9a9a9"]);


        var arc = d3.arc()
            .outerRadius(radius - 10)
            .innerRadius(0);

        var labelArc = d3.arc()
            .outerRadius(radius - 40)
            .innerRadius(radius - 40);

        var g = svg.selectAll(".arc")
            .data(pie(data))
            .enter().append("g")
            .attr("class", "arc");

        g.append("path")
            .attr("d", arc)
            .attr("fill", function (d, i) { return colorScale(i); });

        g.append("text")
            .style("font", "12px sans-serif")
            .style("word-wrap", "break-word")
            .style("width", "100%")
            .attr("truncate", "false")
            .attr("transform", function(d) {
                var element = this.getBBox(); 
                var x = element.width / 2; 
                var y = element.height / 2;
                return "translate(" + x + ", " + y + ")";
            })              
            .attr("dy", ".35em")
            .text(function (d) { return d.data.label + " (" + d.data.value + "%)"; });
    };


    return (
        <div>
            <h2 className='header'>User Analytics</h2>
            <ul className='pie-list'>
                <li className='pie-list--item'>
                    <h3 className='sub-header'>Title</h3>
                    <div id="pie-chart-1"></div>
                </li>
                <li className='pie-list--item'>
                    <h3 className='sub-header'>Department</h3>
                    <div id="pie-chart-2"></div>
                </li>
                <li className='pie-list--item'>
                    <h3 className='sub-header'>Location</h3>
                    <div id="pie-chart-3"></div>
                </li>
            </ul>
        </div>
    )

}

export default PieChart;
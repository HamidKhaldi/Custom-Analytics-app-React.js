import React, { useEffect, useRef } from 'react';
import * as d3 from 'd3';
import './BarChart.scss';

const BarChart = props => {
  const isEmpty = obj => {
    return Object.keys(obj).length === 0;
  };

  const chartRef = useRef();
  const mounted = useRef();

  const formatData = obj => {
    let formatArr = [];
    for (var key in obj) {
      if (obj.hasOwnProperty(key)) {
        formatArr.push({ xValue: key, yValue: obj[key] });
      }
    }
    return formatArr;
  };

  useEffect(() => {
    if (!mounted.current) {
      mounted.current = true;
    } else {
      if (!isEmpty(props.dataObj)) {
        if (props && chartRef.current) {
          console.log('props.dataObj ', props.dataObj);
          const svg = d3.select(chartRef.current);
          const width = chartRef.current.clientWidth; // Get the actual width of the parent container
          const height = 400;
          const margin = { top: 40, right: 40, bottom: 40, left: 40 };
          const innerWidth = width - margin.left - margin.right;
          const innerHeight = height - margin.top - margin.bottom;

          const xScale = d3
            .scaleBand()
            .domain(formatData(props.dataObj).map(d => d.xValue))
            .range([0, innerWidth])
            .padding(0.1);

          const yScale = d3
            .scaleLinear()
            .domain([0, d3.max(formatData(props.dataObj), d => d.yValue)])
            .range([innerHeight, 0]);

          const xAxis = d3.axisBottom(xScale);
          const yAxis = d3.axisLeft(yScale);

          svg
            .selectAll('.bar')
            .data(formatData(props.dataObj))
            .enter()
            .append('rect')
            .attr('class', 'bar')
            .attr('x', d => xScale(d.xValue))
            .attr('y', d => yScale(d.yValue))
            .attr('width', xScale.bandwidth())
            .attr('height', d => innerHeight - yScale(d.yValue))
            .attr('fill', '#FFAF46');

          svg
            .selectAll('.bar-label')
            .data(formatData(props.dataObj))
            .enter()
            .append('text')
            .attr('class', 'bar-label')
            .attr('x', d => xScale(d.xValue) + xScale.bandwidth() / 2)
            .attr('y', d => yScale(d.yValue / 2))
            .attr('text-anchor', 'middle')
            .text(d => d.yValue);

          svg
            .append('g')
            .attr('class', 'x-axis')
            .attr('transform', `translate(0, ${innerHeight})`)
            .call(xAxis);

          svg
            .append('g')
            .attr('class', 'y-axis')
            .call(yAxis);

          // X-axis legend
          svg
            .append('text')
            .attr('class', 'x-axis-legend')
            .attr('x', width / 2)
            .attr('y', height)
            .style('text-anchor', 'middle')
            .text(props.xAxisLabel);

          // Y-axis legend
          svg
            .append('text')
            .attr('class', 'y-axis-legend')
            .attr('x', width)
            .attr('y', height / 2)
            .style('text-anchor', 'middle')
            .text('Visits');
        }
      }
    }
  }, [props.dataObj]);

  return <svg className="barchart-svg" ref={chartRef} width="100%" height="400" />;
};

export default BarChart;

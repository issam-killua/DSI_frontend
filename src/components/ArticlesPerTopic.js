/*
import React, { useEffect, useRef } from 'react';
import * as d3 from 'd3';

const ArticlesPerTopic = ({ data }) => {
  const chartRef = useRef();

  useEffect(() => {
    if (data && data.length > 0) {
      // create the bar chart
      const margin = { top: 50, right: 50, bottom: 50, left: 50 };
      const width = 800 - margin.left - margin.right;
      const height = 500 - margin.top - margin.bottom;

      const svg = d3.select(chartRef.current)
        .attr('width', width + margin.left + margin.right)
        .attr('height', height + margin.top + margin.bottom)
        .append('g')
        .attr('transform', `translate(${margin.left}, ${margin.top})`);

      const x = d3.scaleBand()
        .domain(data.map(d => d.topic))
        .range([0, width])
        .padding(0.1);

      const y = d3.scaleLinear()
        .domain([0, d3.max(data, d => data.filter(d2 => d2.topic === d.topic).length)])
        .range([height, 0]);

      svg.append('g')
        .attr('transform', `translate(0, ${height})`)
        .call(d3.axisBottom(x))
        .selectAll('text')
        .attr('transform', 'rotate(-45)')
        .style('text-anchor', 'end');

      svg.append('g')
        .call(d3.axisLeft(y));

      // Add a black x-axis line
      svg.append("g")
        .attr("class", "x-axis-line")
        .attr("transform", `translate(0, ${height})`)
        .append("line")
        .attr("stroke", "black")
        .attr("x1", 0)
        .attr("y1", 0)
        .attr("x2", width)
        .attr("y2", 0);

      svg.selectAll('.bar')
        .data(data)
        .enter()
        .append('rect')
        .attr('class', 'bar')
        .attr('x', d => x(d.topic))
        .attr('y', d => y(data.filter(d2 => d2.topic === d.topic).length))
        .attr('width', x.bandwidth())
        .attr('height', d => height - y(data.filter(d2 => d2.topic === d.topic).length))
        .style('fill', 'steelblue');

    }
  }, [data]);

  return <svg ref={chartRef}></svg>;
};

export default ArticlesPerTopic; */
import React, { useEffect, useRef, useState } from 'react';
import * as d3 from 'd3';
import axios from 'axios';

const ArticlesPerTopic = () => {
  const chartRef = useRef();
  const [data, setData] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get('http://127.0.0.1:8000/api/data');
        setData(response.data.data);
      } catch (error) {
        console.error(error);
      }
    };
    fetchData();
  }, []);

  useEffect(() => {
    if (data && data.length > 0) {
      // create the bar chart
      const margin = { top: 50, right: 50, bottom: 50, left: 50 };
      const width = 800 - margin.left - margin.right;
      const height = 500 - margin.top - margin.bottom;

      const svg = d3.select(chartRef.current)
        .attr('width', width + margin.left + margin.right)
        .attr('height', height + margin.top + margin.bottom)
        .append('g')
        .attr('transform', `translate(${margin.left}, ${margin.top})`);

      const x = d3.scaleBand()
        .domain(data.map(d => d.topic))
        .range([0, width])
        .padding(0.1);

      const y = d3.scaleLinear()
        .domain([0, d3.max(data, d => data.filter(d2 => d2.topic === d.topic).length)])
        .range([height, 0]);

      svg.append('g')
        .attr('transform', `translate(0, ${height})`)
        .call(d3.axisBottom(x))
        .selectAll('text')
        .attr('transform', 'rotate(-45)')
        .style('text-anchor', 'end');

      svg.append('g')
        .call(d3.axisLeft(y));

      // Add a black x-axis line
      svg.append("g")
        .attr("class", "x-axis-line")
        .attr("transform", `translate(0, ${height})`)
        .append("line")
        .attr("stroke", "black")
        .attr("x1", 0)
        .attr("y1", 0)
        .attr("x2", width)
        .attr("y2", 0);

      svg.selectAll('.bar')
        .data(data)
        .enter()
        .append('rect')
        .attr('class', 'bar')
        .attr('x', d => x(d.topic))
        .attr('y', d => y(data.filter(d2 => d2.topic === d.topic).length))
        .attr('width', x.bandwidth())
        .attr('height', d => height - y(data.filter(d2 => d2.topic === d.topic).length))
        .style('fill', 'steelblue');
    }
  }, [data]);

  return <svg ref={chartRef}></svg>;
};

export default ArticlesPerTopic;

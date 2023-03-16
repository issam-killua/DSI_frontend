import React, { useEffect, useRef } from 'react';
import * as d3 from 'd3';

function AuthorChart({data}) {
    const chartRef = useRef();
  
    useEffect(() => {
      // create the bar chart
      const margin = { top: 20, right: 20, bottom: 30, left: 40 };
      const width = 1000 - margin.left - margin.right;
      const height = 500 - margin.top - margin.bottom;
  
      const svg = d3.select(chartRef.current)
        .attr('width', width + margin.left + margin.right)
        .attr('height', height + margin.top + margin.bottom)
        .append('g')
        .attr('transform', `translate(${margin.left}, ${margin.top})`);

     svg.classed("m-4 p-2",true)
     
      const x = d3.scaleBand()
        .domain(data.map(d => d.authors))
        .range([0, width])
        .padding(0.45);
  
      const y = d3.scaleLinear()
        .domain([0, d3.max(data, d => data.filter(d2 => d2.authors === d.authors).length)])
        .range([height, 0]);
  
    /*  svg.append('g')
        .attr('transform', `translate(0, ${height})`)
        .call(d3.axisBottom(x));*/
    svg.append('g')
        .attr('transform', `translate(0, ${height})`)
        .call(d3.axisBottom(x).tickSize(0).tickPadding(10))
        .selectAll('text')
        .style('text-anchor', 'end')
        .attr('transform', 'rotate(-45)');
     
  
      svg.append('g')
        .call(d3.axisLeft(y));
  
      svg.selectAll('.bar')
        .data(data)
        .enter()
        .append('rect')
        .attr('class', 'bar')
        .attr('x', d => x(d.authors))
        .attr('y', d => y(data.filter(d2 => d2.authors === d.authors).length))
        .attr('width', x.bandwidth())
        .attr('height', d => height - y(data.filter(d2 => d2.authors === d.authors).length))
        .style('fill', 'steelblue');
  
     
        }, []);
      return (
              <div>
                  <svg ref={chartRef}></svg>
              </div>
  
        );
      }
      
export default AuthorChart;
      
  
  
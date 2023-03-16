import React, { useEffect, useRef } from 'react';
import * as d3 from 'd3';

function CircleChart({data}) {
    const chartRef = useRef();

    useEffect(() => {
      // create the pie chart
      const width2 = 500;
      const height2 = 500;
  
      const radius = Math.min(width2, height2) / 2;
  
      const svg2 = d3.select(chartRef.current)
        .attr('width', width2)
        .attr('height', height2)
        .append('g')
        .attr('transform', `translate(${width2 / 2}, ${height2 / 2})`);
  
      const color = d3.scaleOrdinal()
        .domain(data.map(d => d.authors))
        .range(d3.schemeCategory10);
  
      const pie = d3.pie()
        .value(d => data.filter(d2 => d2.authors === d.authors).length)
        .sort(null);
  
      const data_ready = pie(data);
  
      svg2.selectAll('path')
        .data(data_ready)
        .enter()
        .append('path')
        .attr('d', d3.arc()
          .innerRadius(0)
          .outerRadius(radius)
        )
        .attr('fill', d => color(d.data.authors))
        .attr('stroke', 'black')
        .style('stroke-width', '2px')
        .style('opacity', 0.7);
      
        }, []);
      return (
              <div>
                  <svg ref={chartRef}></svg>
              </div>
  
        );
      }
      
export default CircleChart;
      
  
  
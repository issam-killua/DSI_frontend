import React, { useState, useEffect } from 'react';
import * as d3 from 'd3';
import axios from 'axios';

const DateChart = () => {
  const [beforeDate, setBeforeDate] = useState('');
  const [afterDate, setAfterDate] = useState('');
  const [data, setData] = useState([]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const beforeData = await axios.get(`http://127.0.0.1:8000/api/data/before/${beforeDate}`);
    const afterData = await axios.get(`http://127.0.0.1:8000/api/data/after/${afterDate}`);
    const beforeDates = beforeData.data.data.map((d) => d.date);
    const afterDates = afterData.data.data.map((d) => d.date);
    const dates = [...beforeDates, ...afterDates];
    const dateCounts = {};
    dates.forEach((date) => {
      if (date in dateCounts) {
        dateCounts[date] += 1;
      } else {
        dateCounts[date] = 1;
      }
    });
    const chartData = Object.entries(dateCounts).map(([date, count]) => ({ date, count }));
    setData(chartData);
  };

  useEffect(() => {
    const svg = d3.select('#chart');
    svg.selectAll('*').remove();
    if (data.length > 0) {
      const margin = { top: 20, right: 20, bottom: 30, left: 40 };
      const width = 700 - margin.left - margin.right;
      const height = 500 - margin.top - margin.bottom;

      const x = d3.scaleBand()
        .range([0, width])
        .padding(0.1)
        .domain(data.map((d) => d.date));

      const y = d3.scaleLinear()
        .range([height, 0])
        .domain([0, d3.max(data, (d) => d.count)]);

      const xAxis = d3.axisBottom(x);

      const yAxis = d3.axisLeft(y)
        .ticks(10);

      svg.append('g')
        .attr('transform', `translate(${margin.left},${height + margin.top})`)
        .call(xAxis);

      svg.append('g')
        .attr('transform', `translate(${margin.left},${margin.top})`)
        .call(yAxis);

      svg.selectAll('.bar')
        .data(data)
        .enter().append('rect')
        .attr('class', 'bar')
        .attr('x', (d) => x(d.date) + margin.left)
        .attr('y', (d) => y(d.count) + margin.top)
        .attr('height', (d) => height - y(d.count))
        .attr('width', x.bandwidth());
    }
  }, [data]);

  return (
    /*<div>
      <form onSubmit={handleSubmit}>
        <label htmlFor="before">Before:</label>
        <input
          type="date"
          id="before"
          name="before"
          value={beforeDate}
          onChange={(e) => setBeforeDate(e.target.value)}
        />
        <label htmlFor="after">After:</label>
        <input
          type="date"
          id="after"
          name="after"
          value={afterDate}
          onChange={(e) => setAfterDate(e.target.value)}
        />
        <button type="submit">Submit</button>
      </form>
      <svg id="chart"  width={800} height={500}/>
    </div> */
    <div className="form-container">
        <form onSubmit={handleSubmit}>
            <div className="form-group">
                <label htmlFor="before">Before:</label>
                    <input
        type="date"
        id="before"
        name="before"
        value={beforeDate}
        onChange={(e) => setBeforeDate(e.target.value)}
      />
    </div>
    <div className="form-group">
      <label htmlFor="after">After:</label>
      <input
        type="date"
        id="after"
        name="after"
        value={afterDate}
        onChange={(e) => setAfterDate(e.target.value)}
      />
    </div>
    <button className="submit-btn" type="submit">Submit</button>
  </form>
  <svg id="chart" width={800} height={500}/>
</div>

);
};

export default DateChart;

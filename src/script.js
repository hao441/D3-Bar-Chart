const barx = '';
const bary = '';
const barwidth = '';
const barheight = '';
const padding = 40;

const w = 1400;
const h = 400;


 


fetch('https://raw.githubusercontent.com/freeCodeCamp/ProjectReferenceData/master/GDP-data.json')
  .then(res => res.json())
  .then(data => {

  
    const dataset = data.data.map(d => [d[0], d[1]])
    
    const dateValues = data.data.map(d => d[0])
    const gdpValues = data.data.map(d => d[1])

    const xScale = d3.scaleTime()
                     .domain([d3.min(dataset, (d) => new Date(d[0])), d3.max(dataset, (d) => new Date(d[0]))])
                     .range([padding, w - padding])
     
    const yScale = d3.scaleLinear()
                     .domain([0, d3.max(dataset, (d) => d[1])])
                     .range([h-padding, padding])
    
    const xAxis = d3.axisBottom(xScale)
  
    const yAxis = d3.axisLeft(yScale);
    
    const svg = d3.select('#chart')
              .append('svg')
              .attr('width', w)
              .attr('height', h)
    
    svg.append('g')
       .attr('id', 'x-axis')
       .attr('transform', 'translate(' + 0 + ', ' + (h - padding) + ')')
       .call(xAxis)
    
   svg.append('g')
      .attr('id', 'y-axis')
      .attr('transform', 'translate(' + padding + ', ' + 0 + ')')
      .call(yAxis)

  
  
  function handleMouseOver (d, i)  {
    
       
    svg.append('g')
       .attr('id', 'welcome')
       .attr('x', xScale(new Date(d[0])))
       .attr('y', yScale(d[1]))
    
    svg.select('#welcome')
       .append('rect')
       .attr('x', xScale(new Date(d[0])))
       .attr('y', yScale(d[1]))
       .attr('width', '135px')
       .attr('height', '50px')
       .style('fill', 'yellow')
    
    svg.select('#welcome')
       .append('text')
       .text('Date: ' + d[0])
       .attr('id', 'tooltip')
       .attr('x', xScale(new Date(d[0])) + 10)
       .attr('y', yScale(d[1]) + 20)
       .attr('data-date', d[0])
       .style('position', 'absolute')
    
    svg.select('#welcome')
       .append('text')
       .text('GDP: ' + d[1])
       .attr('id', 'tooltip')
       .attr('x', xScale(new Date(d[0])) + 10)
       .attr('y', yScale(d[1]) + 40)
       .style('position', 'absolute')
  }
  
  function handleMouseOut (d, i)  {
    svg.select('#welcome')
       .remove()
  }
  
    

  svg.selectAll("rect")
       .data(dataset)
       .enter()
       .append("rect")
       .attr('data-date', (d, i) => d[0])
       .attr('data-gdp', (d) => d[1])      
       .attr('class', 'bar')
       .attr("x", (d) => xScale(new Date(d[0])))
       .attr("y", (d) => yScale(d[1]))
       .attr("width", (w - padding)/dateValues.length)
       .attr('height', (d) => yScale(0) - yScale(d[1]))
       .style('fill', 'gray')
       .on('mouseover', handleMouseOver)
       .on('mouseout', handleMouseOut)
})

  






const svgW = 500;
const svgH = 500;

const data = [25, 20, 10, 12, 15];

const svg = d3
  .select("#chart-area")
  .append("svg")
  .attr("width", svgW)
  .attr("height", svgH);

const cx = 100;
const cy = 250;

const circles = svg.selectAll("circle").data(data);

circles
  .enter()
  .append("circle")
  .attr("cx", (d, i) => i * 50 + 50)
  .attr("cy", (d, i) => 250)
  .attr("r", (d, i) => d)
  .attr("fill", "red");

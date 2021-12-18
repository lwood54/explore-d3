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

svg
  .append("circle")
  .attr("cx", cx)
  .attr("cy", cy)
  .attr("r", 70)
  .attr("fill", "red");

const rectStartX = svgW / 20;
const rectStartY = svgH / 20;
const rectW = 80;
const rectH = 50;
svg
  .append("rect")
  .attr("x", rectStartX)
  .attr("y", rectStartY)
  .attr("width", rectW)
  .attr("height", rectH)
  .attr("fill", "teal")
  .attr("rx", 8);

svg
  .append("text")
  .attr("x", rectStartX + rectW / 2)
  .attr("y", rectStartY + rectH / 2)
  .attr("text-anchor", "middle")
  .attr("alignment-baseline", "middle")
  .attr("stroke", 2)
  .text("hello");

svg
  .append("path")
  .attr("d", "M 10 10 H 90 V 90 H 10 L 10 10")
  .attr("fill", "transparent")
  .attr("stroke", "black");

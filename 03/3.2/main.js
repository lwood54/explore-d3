const MARGIN = {
  LEFT: 100,
  RIGHT: 10,
  TOP: 10,
  BOTTOM: 130,
};
const WIDTH = 600 - MARGIN.LEFT - MARGIN.RIGHT;
const HEIGHT = 400 - MARGIN.TOP - MARGIN.BOTTOM;

const svg = d3
  .select("#chart-area")
  .append("svg")
  .attr("width", WIDTH + MARGIN.LEFT + MARGIN.RIGHT)
  .attr("height", HEIGHT + MARGIN.TOP + MARGIN.BOTTOM);

const g = svg
  .append("g")
  .attr("transform", `translate(${MARGIN.LEFT}, ${MARGIN.TOP})`);

// X Axis Label
g.append("text")
  .attr("class", "x axis-label")
  .attr("x", WIDTH / 2)
  .attr("y", HEIGHT + 110)
  .attr("font-size", "20px")
  .attr("text-anchor", "middle")
  .text("The world's tallest buildings");

// Y Axis Label
g.append("text")
  .attr("class", "y axis-label")
  .attr("x", -(HEIGHT / 2))
  .attr("y", -60)
  .attr("font-size", "20px")
  .attr("text-anchor", "middle")
  .attr("transform", "rotate(-90)")
  .text("Height (m)");

d3.json("data/buildings.json").then((data) => {
  console.log("data", data);

  data.forEach((d) => {
    d.height = Number(d.height);
  });
  console.log("numbers...data", data);
  const x = d3
    .scaleBand()
    .domain(data.map((building) => building.name))
    .range([0, WIDTH])
    .paddingInner(0.3)
    .paddingOuter(0.2);

  const y = d3
    .scaleLinear()
    // .domain([0, 828]) // min --> max acceptable input values from data // hard coded old way
    .domain([0, d3.max(data, (d) => d.height)]) // min --> max acceptable input values from data // using d3 built in .max() method
    // .range([0, HEIGHT]); // min --> max pixel range for display
    .range([HEIGHT, 0]); // min --> max pixel range for display // reverse range to have y-axis start at origin
  // ***** NOTE: when reversing the range, this means that what was max height 828 was coming in at 400, now comes in as height 0 ***** //

  const xAxisCall = d3.axisBottom(x);
  g.append("g")
    .attr("class", "x axis")
    .attr("transform", `translate(0, ${HEIGHT})`)
    .call(xAxisCall)
    .selectAll("text")
    .attr("y", "10")
    .attr("x", "-5")
    .attr("text-anchor", "end")
    .attr("transform", "rotate(-40)");

  const yAxisCall = d3
    .axisLeft(y)
    .ticks(3)
    .tickFormat((d) => `${d}m`);
  g.append("g").attr("class", "y axis").call(yAxisCall);

  // const bars = svg.selectAll("rect").data(data);
  const bars = g.selectAll("rect").data(data); // append to group element to move entire group instead of just the svg
  console.log("bars", bars);

  bars
    .enter()
    .append("rect")
    // .attr("x", (d, i) => i * 60) // hard coding x value
    .attr("x", (d, i) => x(d.name)) // using the scaleBand() method to get dynamic x values
    // .attr("y", (d) => y(d.height))
    .attr("y", (d) => {
      console.log("d.height", y(d.height)); // at this point, height is really the difference between height value and height of svg (or max value height)
      return y(d.height);
    })
    // .attr("width", 40) // hard coding width
    .attr("width", x.bandwidth) // using scaleBand().bandwidth
    .attr("height", (d) => HEIGHT - y(d.height))
    // .attr("height", (d) => y(HEIGHT - d.height))
    .attr("fill", "gray");
});

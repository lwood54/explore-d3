const svgW = 500;
const svgH = 500;

// const data = [25, 20, 10, 12, 15];

// external data
d3.csv("data/ages.csv").then((data) => {
  data.forEach((d) => {
    d.age = Number(d.age);
  });
  console.log("data", data);

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
    .attr("cx", (d, i) => i * 100 + 50)
    .attr("cy", (d, i) => 250)
    .attr("r", (d, i) => 3 * d.age)
    .attr("fill", (d) => {
      return d.name === "Tony" ? "red" : "blue";
    });
});

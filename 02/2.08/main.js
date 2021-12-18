d3.json("data/buildings.json").then((data) => {
  console.log("data", data);

  data.forEach((d) => {
    d.height = Number(d.height);
  });
  console.log("numbers...data", data);

  const svg = d3
    .select("#chart-area")
    .append("svg")
    .attr("width", 500)
    .attr("height", 500);

  const bars = svg.selectAll("rect").data(data);
  console.log("bars", bars);

  bars
    .enter()
    .append("rect")
    .attr("x", (d, i) => i * 50)
    .attr("width", 25)
    .attr("height", (d) => d.height)
    .attr("fill", "gray");
});

// set the dimensions and margins of the graph
var margin = {top: 550, right: 10, bottom: 10, left: 0};

  width = 1000 - margin.left - margin.right,
  height = 1000 - margin.top - margin.bottom;
  onBrushed = function() {};

// append the svg object to the body of the page
var loliPop = d3.select("#data_viz")
    .append("svg")
    .attr("width", width)
    .attr("height", height)
    .append("g")
    .attr("transform", "translate(0," + (margin.top + 200) + ")");

          // Initialize the X axis
          var x = d3.scaleBand()
            .range([ 0, width ])
            .padding(1);
          var xAxis = loliPop.append("g")
            .attr("transform", "translate(0," + height + ")")

          // Initialize the Y axis
          var y = d3.scaleLinear()
            .range([ height, 0]);
          var yAxis = loliPop.append("g")
            .attr("class", "myYaxis")


          // A function to update the chart
          function update(selectedVar) {

            // Parse the Data
            d3.csv("./data/top502.csv", function(data) {

			  var color = d3.scaleOrdinal(["#98abc5", "#8a89a6", "#7b6888", "#6b486b", "#a05d56", "#d0743c",
                                 "#ff8c00", "purple", "brown", "steelblue"]);

              // X axis
              x.domain(data.map(function(d) { return d.Popularity; }))
              xAxis.transition().duration(1000).call(d3.axisBottom(x))
			           .attr("fill", "white");


              // Add Y axis
              y.domain([0, d3.max(data, function(d) { return +d[selectedVar] }) ]);
              yAxis.transition().duration(1000).call(d3.axisLeft(y))
			           .attr("fill", "white");
;

              // variable u: map data to existing circle
              var j = loliPop.selectAll(".myLine")
                .data(data)
              // update lines
              j
                .enter()
                .append("line")
                .attr("class", "myLine")
                .merge(j)
                .transition()
                .duration(1000)
                  .attr("x1", function(d) { console.log(x(d.Popularity)) ; return x(d.Popularity); })
                  .attr("x2", function(d) { return x(d.Popularity); })
                  .attr("y1", y(0))
                  .attr("y2", function(d) { return y(d[selectedVar]); })
                  .attr("stroke", "red")


              // variable u: map data to existing circle
              var u = loliPop.selectAll("circle")
                .data(data)
              // update bars
              u
                .enter()
                .append("circle")
                .merge(u)
                .transition()
                .duration(1000)
                  .attr("class", "circle")
                  .attr("cx", function(d) { return x(d.Popularity); })
                  .attr("cy", function(d) { return y(d[selectedVar]); })
                  .attr("r", 8)
                  .attr("fill", "white");

              // add title
              d3.select("svg")
                  .append("text")
                  .attr("class", 'loliPop')
                  .attr("x", 200)
                  .attr("y", 1300)
                  .style("font-size", "40px")
                  .style("stroke", "white")
                  .text("Popularity vs Traits");


            })

          }

          // Initialize plot
          update('Popularity');

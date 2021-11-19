var selected = '';

function TreeMap(svg, data, category, songList){
    this.svg=svg;

    var svgHeight = 400;
    var svgWidth = 400;
    var color = d3.scaleOrdinal(["#98abc5", "#8a89a6", "#7b6888", "#6b486b", "#a05d56", "#d0743c",
                                 "#ff8c00", "purple", "brown", "steelblue"]);

    reDrawRadialChart(songList, color, category);
    
    var tree = d3.treemap()
      .size([svgWidth, svgHeight + 100])
      .padding(1)
      .round(true);

    var strat = d3.stratify()
      .id(function(d) {
        return d.genre;
      })
      .parentId(function(d) {
        return d.parent;
      });

    var rt = strat(data)
      .sum(function(d) { return +d[category]; })
      .sort(function(a, b) {
          //console.log(a, b);
          return b.data[category] > a.data[category];
          //return b.height - a.height || b.count - a.count; 
      });

    tree(rt);

    var parent = d3.select("#treemap");

    var child = parent.selectAll(".child")
      .data(rt.leaves(), function(d) {
        return d.data.genre;
      })
      .enter()
      .append("div")
      .attr("class", "child")
      .style("left", function(d) {return d.x0 + "px"; })
      .style("top", function(d) { return d.y0 +  "px"; })
      .style("width", function(d) { return d.x1 - d.x0 - 5 + "px"; })
      .style("height", function(d) { return d.y1 - d.y0 - 5 + "px"; })
      .style("background", function(d) { return color(d.data.genre); })
      .on('mouseover', function(d){
          var tooltipT = d3.select('#tooltipT');
          tooltipT.style("opacity", 1);
          tooltipT.style('display', 'block');

          //initial pos of tooltip
          tooltipT.style('left', d3.event.pageX + "px");
          tooltipT.style('top', d3.event.pageY + "px");

          //display info when mouseover

          var genreList = songList.filter(function(f){
              return f.genre == d.data.genre;
          });
          var toolTipText = "";
          for (var i = 0; i < genreList.length; i++) {
              toolTipText += genreList[i].Track_Name + "<br>";
          }
          tooltipT.html("<b>Songs:</b> <br>" + toolTipText);
      })
    .on("mouseout", function(d){

        if (d3.event.pageY > 375 || d3.event.pageX > 375) {
            d3.select("#toolTipT").style("opacity", 0);
        }
    })
    .on("click", function(d){
        var genreList = songList.filter(function(f){
              return f.genre == d.data.genre;
          });
       if(selected==''){
           selected = d.data.genre;

           //console.log(d3.select("#treemap").selectAll(".child"));
           d3.select("#treemap").selectAll(".child").style("opacity", .4);
           d3.select(this).style("opacity", 1);
           reDrawRadialChart(genreList, color, category);
       }
        else{
            selected=''; d3.select("#treemap").selectAll(".child").style("opacity", 1);
            reDrawRadialChart(songList, color, category);
        }
    });

    var label = child.append("div")
      .attr("class", "label");

    var value = child.append("div")
      .attr("class", "value");

    child.call(function(d) {
      d.select(".label")
        .text(function(d) { return d.data.genre; })
        .style("color", "white");
    })


    parent.append("text")
      .attr("left", "400px")
      .attr("top", "400px")
      .attr("x", 400)
      .style("text-anchor", "middle")
      .text(category);

d3.select("svg")
    .append("text")
    .attr("class", 'treeLabel')
    .attr("x", 175)
    .attr("y", 550)
    .style("font-size", "40px")
    .style("stroke", "white")
    .text("The Genre");
}

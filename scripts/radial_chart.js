function RadialChart(data){
    
    var margin = {
        top: 0,
        right: 20,
        bottom: 10,
        left: 40
      },
      width = 800 - margin.left - margin.right,
      height = 500 - margin.top - margin.bottom,
      radius = Math.min(width, height) / 2;

    var tooltip = d3.select("body").append("div")
        .attr("class", "tooltip")
        .style("opacity", 0);

    var songClick = false;

    var donut = d3.select("#donut")
        .append("svg")
        .attr("width", width + margin.left + margin.right)
        .attr("height", height + margin.top + margin.bottom),
        g = donut.append("g")
            .attr("transform", "translate(" + (width/3) + "," + (height/2) + ")");

    var color = d3.scaleOrdinal(["#98abc5", "#8a89a6", "#7b6888", "#6b486b", "#a05d56", "#d0743c",
                                 "#ff8c00", "purple", "brown", "steelblue"]);

    var pie = d3.pie()
        .sort(null)
        .value(function(d) { return d.Danceability; });

    var path = d3.arc()
        .outerRadius(function(d) {
            //return d.data.Popularity * 2.5;
            
            return d.data.Popularity * (d.data.Popularity/40);
        })
        .innerRadius(function (d) {
            return (30 /*+ d.data.Energy*/);
        });

    var arc = g.selectAll(".arc")
        .data(pie(data))
        .enter().append("g")
          .attr("class", "arc");

    arc.append("path")
        .attr("d", path)
        .attr("fill", function(d) { return color(d.data.genre); })
        .on("mouseover", function(d) {
            d3.select(this)
                .style("fill", "black");
            d3.select("#tooltip")
                .style("left", (d3.event.pageX - 150) + "px")
                .style("top", (d3.event.pageY - 80) + "px")
                .select("#value1")
                .text(d.data.Track_Name);
            d3.select("#tooltip")
                .select("#value2")
                .style("font", "12px")
                .text(d.data.Artist_Name);
            d3.select("#tooltip")
                .select("#value3")
                .text("Overall: " + d.data.Popularity);
            d3.select("#tooltip")
                .select("#value4")
                .text("Danceability: " + d.data.Danceability);
            d3.select("#tooltip")
                .select("#value5")
                .text("Energy: " + d.data.Danceability);
            d3.select("#tooltip").classed("hidden", false);
        })
        .on("mouseout", function (d) {
            d3.select(this)
                .transition()
                .style("fill", function(d) { return color(d.data.genre); });
            d3.select("#tooltip")
                .classed("hidden", true);
        })
        .on('click', function (d) {
            songClick = !songClick
            song = d.data.Track_Name;
            if (songClick) {
                newCoord();
            } else {
                returnCoord();
            }
        });

    donut.append("text")
        .attr("class", 'donutLabel')
        .attr("x", 300)
        .attr("y", 610)
        .style("font-size", "40px")
        .style("stroke", "white")
        .text("The Songs");
};

function reDrawRadialChart(genreList, genreColor, category){
    d3.selectAll("#donut").select("svg").remove();
    
    var margin = {
        top: 0,
        right: 20,
        bottom: 10,
        left: 40
      },
        
      width = 800 - margin.left - margin.right,
      height = 500 - margin.top - margin.bottom,
      radius = Math.min(width, height) / 2;

    var tooltip = d3.select("body").append("div")
        .attr("class", "tooltip")
        .style("opacity", 0);

    var songClick = false;

    var donut = d3.select("#donut")
        .append("svg")
        .attr("width", width + margin.left + margin.right)
        .attr("height", height + margin.top + margin.bottom),
        g = donut.append("g")
            .attr("transform", "translate(" + (width/3) + "," + (height/2) + ")");

    var color = d3.scaleOrdinal(["#98abc5", "#8a89a6", "#7b6888", "#6b486b", "#a05d56", "#d0743c",
                                 "#ff8c00", "purple", "brown", "steelblue"]);

    var pie = d3.pie()
        .sort(null)
        .value(function(d) { return d[category]; });

    var path = d3.arc()
        .outerRadius(function(d) {
            //return d.data.Popularity * 2.5;
            return d.data.Popularity * (d.data.Popularity/40);
        })
        .innerRadius(function (d) {
            return (30 /*+ d.data.Energy*/);
        });

    var arc = g.selectAll(".arc")
        .data(pie(genreList))
        .enter().append("g")
          .attr("class", "arc");

    arc.append("path")
        .attr("d", path)
        .attr("fill", function(d) { return genreColor(d.data.genre); }
             
             )
        .on("mouseover", function(d) {
            d3.select(this)
                .style("fill", "black");
            d3.select("#tooltip")
                .style("left", (d3.event.pageX - 150) + "px")
                .style("top", (d3.event.pageY - 80) + "px")
                .select("#value1")
                .text(d.data.Track_Name);
            d3.select("#tooltip")
                .select("#value2")
                .style("font", "12px")
                .text(d.data.Artist_Name);
            d3.select("#tooltip")
                .select("#value3")
                .text("Overall: " + d.data.Popularity);
            d3.select("#tooltip")
                .select("#value4")
                .text("Selected attribute:" + d.data[category]);
            d3.select("#tooltip")
                .select("#value5")
                .text("Energy: " + d.data.Energy);
            d3.select("#tooltip").classed("hidden", false);
        })
        .on("mouseout", function (d) {
            d3.select(this)
                .transition()
                .style("fill", function(d) { return genreColor(d.data.genre); });
            d3.select("#tooltip")
                .classed("hidden", true);
        })
        .on('click', function (d) {
            songClick = !songClick
            song = d.data.Track_Name;
            if (songClick) {
                newCoord();
            } else {
                returnCoord();
            }
        });

    donut.append("text")
        .attr("class", 'donutLabel')
        .attr("x", 200)
        .attr("y", 610)
        .style("font-size", "40px")
        .style("stroke", "white")
        .text("The Songs"); 
};

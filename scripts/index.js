var category = "Liveness";
var treeMapData = [],
    originalData = [];
function main(fullData) {
    treeMapData = buildTreeMapData(fullData, "energy");
    originalData = fullData;
    RadialChart(fullData);
    updateAll("Energy");
}

function buildTreeMapData(fullData, category) {
    var foundGenre = [];
    var treeMapData = [];
    
    treeMapData.push({parent:"",
                     genre:"root",
                     count: 0});
    treeMapData[0][category]=0;
    treeMapData.push({parent: "root",
                     genre:"genre",
                     count: 0});
    treeMapData[1][category]=0;

    for (var i = 0; i < fullData.length; i++) {
        if (foundGenre.indexOf(fullData[i].genre) >= 0) {
            treeMapData[foundGenre.indexOf(fullData[i].genre)+2].count += 1;
            treeMapData[foundGenre.indexOf(fullData[i].genre)+2][category] += +fullData[i][category];
        }
        
        else {
            treeMapData.push({parent:"genre",
                              genre: fullData[i].genre, 
                              count: 1});
            treeMapData[treeMapData.length - 1][category] = +fullData[i][category];
            foundGenre.push(fullData[i].genre);
        }
    }

    return treeMapData;
}

function reDrawTreeMap(treeMapData1, category, fullData) {
    d3.selectAll(".child").remove();
    d3.select("#treemap").selectAll("text").remove();
	treeMap = new TreeMap(d3.select("#treemap"), treeMapData1, category, fullData);
}

function updateAll(categoryName){
    treeMapData = buildTreeMapData(originalData, categoryName);
    console.log("HEREREERERERER")
    console.log(treeMapData);
    reDrawTreeMap(treeMapData, categoryName, originalData);
    update(categoryName);
    //reDrawRadialChart()
    
}

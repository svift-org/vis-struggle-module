SVIFT.vis.struggle = (function (data, container) {
   // Module object
  var module = SVIFT.vis.base(data, container);

  console.log(data);
  //Taken from https://bl.ocks.org/cagrimmett/07f8c8daea00946b9e704e3efcbd5739/bd1f4c0c33d8af6f64535b7963b0da2e6499fc31
 
  module.d3config = {
    ease:d3.easeCubicInOut, 
    interpolate:[], 

  };

  module.gridSetupData = function(size) {

    var data = new Array();
    var xpos = 1; //starting xpos and ypos at 1 so the stroke will show when we make the grid below
    var ypos = 1;

    // iterate for rows 
    for (var row = 0; row < 10; row++) {
        data.push( new Array() );

        // iterate for cells/columns inside rows
        for (var column = 0; column < 10; column++) {
            data[row].push({
                x: xpos,
                y: ypos,
                width: size,
                height: size
            })
            // increment the x position. I.e. move it over by 50 (width variable)
            xpos += size;
        }
        // reset the x position after a row is complete
        xpos = 1;
        // increment the y position for the next row. Move it down 50 (height variable)
        ypos += size; 
    }
    return data;
  }

  module.setup = function () {

    var dummyData = module.gridSetupData(10);
    module.d3config.row =  module.g.append('g').selectAll(".row")
      .data(dummyData)
      .enter().append("g")
      .attr("class", "row");

    module.d3config.column = module.d3config.row.selectAll(".square")
        .data(function(d) { return d; })
        .enter().append("rect")
        .attr("class","square")
        .style("fill", "#fff")
        .style("stroke", "#ddd");

    module.d3config.interpolate = d3.interpolate(0,data.data.data[0]);

  };

  module.resize = function () {

    var width = module.container.node().offsetWidth - module.config.margin.left - module.config.margin.right,
    height = module.container.node().offsetHeight - module.config.margin.top - module.config.margin.bottom;
    var maxSize = Math.min(width,height);
    var cellSize = maxSize / 10;
    var cellData = module.gridSetupData(cellSize);

    module.d3config.row
      .data(cellData)
      .enter();

    module.d3config.column
      .data(function(d) { return d; })
      .enter()

    module.d3config.column
        .attr("x", function(d) { return d.x; })
        .attr("y", function(d) { return d.y; })
        .attr("width", function(d) { return d.width; })
        .attr("height", function(d) { return d.height; })

  };



  module.drawBars = function(t){

    var interpolation = Math.round(module.d3config.interpolate(module.d3config.ease(t))) -1;
    var rects = d3.selectAll("rect")
        .filter(function(d, i) { return i <= interpolation; })
        .style("fill", "#F832B6")

  };

  module.timeline = {
    bars: {start:0, end:3000, func:module.drawBars}
  };

  return module;
 });


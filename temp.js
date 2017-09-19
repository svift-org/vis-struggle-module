SVIFT.vis.struggle = (function (data, container) {
   // Module object
  var module = SVIFT.vis.base(data, container);

  console.log(data)
 
  module.d3config = {
    axisWidth : 50,
    axisHeight : 50,
    ease:d3.easeCubicInOut, 
    yInterpolate:[], 
    hInterpolate:[]
  };

  module.setup = function () {

    module.d3config.x = d3.scaleBand().padding(0.1).domain(data.data.data.map(function(d) { return d[0]; }));
    module.d3config.xAxis = d3.axisBottom().scale(module.d3config.x);

    module.d3config.y = d3.scaleLinear().domain([0, d3.max(data.data.data, function(d){return d[1];})]);
    module.d3config.yAxis = d3.axisLeft().scale(module.d3config.y);

    module.d3config.gXAxis = module.g.append('g');
    module.d3config.gYAxis = module.g.append('g').attr('transform','translate('+module.d3config.axisWidth+',0)');

    module.d3config.bars = module.g.append('g').selectAll('rect').data(data.data.data).enter().append('rect')
      .style('stroke','transparent')
      .style('fill','#000');
  };

  module.resize = function () {
    var width = module.container.node().offsetWidth - module.config.margin.left - module.config.margin.right - module.d3config.axisWidth,
      height = module.container.node().offsetHeight - module.config.margin.top - module.config.margin.bottom - module.d3config.axisHeight;

    module.d3config.x.range([0,width]);
    module.d3config.y.range([height,0]);

    module.d3config.xAxis.scale(module.d3config.x);
    module.d3config.gXAxis.call(module.d3config.xAxis);

    module.d3config.yAxis.scale(module.d3config.y);
    module.d3config.gYAxis.call(module.d3config.yAxis);

    module.d3config.gXAxis.attr('transform','translate('+module.d3config.axisWidth+','+height+')');

    module.d3config.bars
      .attr('x', function(d){ return module.d3config.x(d[0])+module.d3config.axisWidth; })
      .attr("width", module.d3config.x.bandwidth());

    data.data.data.forEach(function(d,i){
      module.d3config.yInterpolate[i] = d3.interpolate(height, module.d3config.y(d[1]));
      module.d3config.hInterpolate[i] = d3.interpolate(0, height-module.d3config.y(d[1]));
    });
    
    module.drawBars(module.playHead);
  };

  module.drawBars = function(t){
  	console.log(t)
    module.d3config.bars
      .attr('y',      function(d,i){ return module.d3config.yInterpolate[i](module.d3config.ease(t)); })
      .attr('height', function(d,i){ return module.d3config.hInterpolate[i](module.d3config.ease(t)); });
  };

  module.timeline = {
    bars: {start:0, end:3000, func:module.drawBars}
  };

  return module;
 });
















  // // Module object
  // var module = SVIFT.vis.base(data, container);
 
  // module.goal = 0;
  // module.steps = [];
  // module.width = 0;

  // module.setup = function () {
  //   module.goal = Math.random()*100;
  //   for(var i = 0; i<5; i++){
  //     module.steps.push( {value: module.goal - ((Math.random()>0.5)?-(100-module.goal):module.goal) * Math.random()/2, duration:Math.random()} );
  //   }

  //   module.g.selectAll('rect').data([0,1]).enter().append('rect')
  //     .attr('id',function(d){ return (d===0)?'left':'right'; })
  //     .attr('width', 50)
  //     .attr('height', 50)
  //     .attr('y', 0)
  //     .attr('x', 0)
  //     .style('stroke','transparent')
  //     .style('fill',function(d){ return (d===0)?'#D94949':'#60BB2B'; });
  // };

  // module.resize = function () {
  //   var width = module.container.node().offsetWidth-module.config.margin.right-module.config.margin.left,
  //     height = module.container.node().offsetHeight-module.config.margin.top-module.config.margin.bottom;

  //   module.width = width;

  //   module.g.selectAll('rect')
  //     .attr('height',height);

  //   var interLeft = [{value:0}], interRight = [{value:0}];

  //   module.steps.forEach(function(step, si){
  //     interLeft.push({value:width/100*step.value, duration:step.duration, ease:(si===0)?d3.easeCubicInOut:false});
  //     interRight.push({value:width/100*(100-step.value), duration:step.duration, ease:(si===0)?d3.easeCubicInOut:false});
  //   })
    
  //   var lastDuration = Math.random();
  //   interLeft.push({value:width/100*module.goal, duration:lastDuration});
  //   interRight.push({value:width/100*(100-module.goal), duration:lastDuration});

  //   module.timeline.leftRect.obj.interpolate = SVIFT.helper.interpolate(interLeft);
  //   module.timeline.rightRect.obj.interpolate = SVIFT.helper.interpolate(interRight);

  //   if(!module.playState){
  //     module.draw(module.playHead);
  //   }
  // };

  // module.drawLeftRect = function(t){
  //   module.g.select('#left').attr('width', module.timeline.leftRect.obj.interpolate(t));
  // };

  // module.drawRightRect = function(t){
  //   module.g.select('#right')
  //     .attr('width', module.timeline.rightRect.obj.interpolate(t))
  //     .attr('x', module.width - module.timeline.rightRect.obj.interpolate(t));
  // };

  // module.timeline = {
  //   leftRect: {start:0, end:5000, func:module.drawLeftRect, obj:{interpolate:null}},
  //   rightRect: {start:0, end:5000, func:module.drawRightRect, obj:{interpolate:null}}
  // };

  // return module;


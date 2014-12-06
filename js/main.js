
d3.json('./dataset.json', function (err, data) {
  var massagedData = _.transform(data.medals, function (result, val, key) {
    result.push(_.assign({id: key}, val[0]));
    return result;
  }, []);
  var top10 = _(massagedData)
                .sortBy(function (item) { return - parseInt(item.total, 10); })
                .first(10)
                .shuffle()
                .map(function (item) {
                  item.total = parseInt(item.total, 10);
                  return item;
                })
                .value();

  var max = d3.max(top10, function (d) { return d.total; });


  var margin = {top: 20, right: 20, bottom: 20, left: 20};
  var w = 650 - margin.left - margin.right,
    h = 300 - margin.top - margin.bottom;
  console.log(max);

  var xScale = d3.scale.ordinal()
                  .domain(top10.map(function (d) { return d.total;}))
                  .rangeBands([0, w], 0.1);

  var yScale = d3.scale.linear()
                 .domain([0, max * 1.05])
                 .range([0, h]);

  var colorScale = d3.scale.linear()
                    .domain([0, top10.length])
                    .range(['#face3d', 'red']);



  var svg = d3.select('#chartArea').append('svg')
    .attr('width', w + margin.left + margin.right)
    .attr('height', h + margin.top + margin.bottom)
    .append('g')
    .attr('transform', 'translate(' + margin.left + ',' + margin.top + ')');

  svg
    .selectAll('rect')
    .data(top10)
    .enter()
    .append('rect')
    .attr('x', function (d, i) {
      return xScale(d.total);
    })
    .attr('y', function (d) {
      return h - yScale(d.total);
    })
    .attr('width', xScale.rangeBand())
    .attr('height', function (d) {
      return yScale(d.total);
    })
    .attr('fill', function (d, i) {
      return colorScale(i);
    });
});

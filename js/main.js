
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

  var w = 650, h = 300;
  console.log(max);
  var yScale = d3.scale.linear()
                 .domain([0, max])
                 .range([0, h]);

  var svg = d3.select('#chartArea').append('svg')
    .attr('width', w)
    .attr('height', h);

  svg
    .selectAll('rect')
    .data(top10)
    .enter()
    .append('rect')
    .attr('class', function (d, i) {
      return (i % 2) ? 'bar' : 'bar special';
    })
    .attr('x', function (d, i) {
      return i * 65 ;
    })
    .attr('y', function (d) {
      return h - yScale(d.total);
    })
    .attr('width', 60)
    .attr('height', function (d) {
      return yScale(d.total);
    });
});

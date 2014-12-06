
d3.json('./dataset.json', function (err, data) {
  var massagedData = _.transform(data.medals, function (result, val, key) {
    result.push(_.assign({id: key}, val[0]));
    return result;
  }, []);
  var top10 = _(massagedData)
                .sortBy(function (item) { return - parseInt(item.total, 10); })
                .first(10)
                .shuffle()
                .value();

  var svg = d3.select('#chartArea').append('svg')
    .attr('width', 650)
    .attr('height', 300);
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
      return 300 - (d.total * 2);
    })
    .attr('width', 60)
    .attr('height', function (d) {
      return d.total * 2 + 'px';
    });
});

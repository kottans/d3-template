
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
  d3
    .select('body').selectAll('div')
    .data(top10)
    .enter()
    .append('div')
    .attr('class', function (d, i) {
      return (i % 2) ? 'bar' : 'bar special';
    })
    .style('height', function (d) {
      return d.total * 2 + 'px';
    })
});

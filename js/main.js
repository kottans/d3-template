d3.json('/dataset.json', function (err, data) {
  if (err) {
    alert(err);
    return 1;
  }
  var massageData = _.transform(data.medals,
    function (result, val, key) {
      result.push(_.assign({id: key}, val[0]));
      return result;
    }, []);
  var sortedData = _(massageData)
    .map(function (item) {
      item.total = parseInt(item.total, 10);
      return item;
    })
    .reject(function (country) {
      return !country.total;
    })
    .sortBy(function (item) {
      return - item.total;
    })
    .value();


  var margin = {
    top: 40,
    right: 40,
    bottom: 40,
    left: 40
  };

  var h = 300 - margin.top - margin.bottom,
    w = 650 - margin.left - margin.right;

  var svg = d3.select('#ChartArea')
              .append('svg')
              .attr('width', w + margin.left + margin.right)
              .attr('height', h + margin.top + margin.bottom)
              .append('g')
              .attr('transform',
                    'translate(' +
                    margin.left +
                    ',' +
                    margin.top +
                    ')');
  svg.append('g')
    .attr('class', 'axis x-axis');

  svg.append('g')
    .attr('class', 'axis y-axis');

  var currentOffset = 0;
  var top10 = sortedData.slice(currentOffset, 10);
  displayData(top10);
  var globalMax;
  function displayData(data) {
    var maxY = d3.max(data,
      function (d) {
        return d.total;
      });
    globalMax = globalMax || maxY;
    var cScale = d3.scale.linear()
                    .domain([0, globalMax])
                    .range(['#face3d', 'red']);

    var yScale = d3.scale.linear()
                  .domain([0, maxY * 1.1])
                  .range([h, 0]);

    var xScale = d3.scale.ordinal()
                    .domain(data
                        .map(function (d) {
                          return d.id;
                        }))
                    .rangeBands([0, w]);

    var yAxis = d3.svg.axis()
                  .scale(yScale)
                  .ticks(5)
                  .orient('left');

    var xAxis = d3.svg.axis()
                  .scale(xScale)
                  .orient('bottom');

    var dataSelection = svg.
      selectAll('rect').
      data(data);

    dataSelection.exit().remove();

    dataSelection.enter().append('rect');

    dataSelection
      .style('fill', function (d, i) {
        return cScale(d.total);
      })
      .attr('width', xScale.rangeBand())
      .transition()
      .attr('x', function (d, i) {
        return xScale(d.id);
      })
      .attr('height', function (d, i) {
        return (yScale(0) - yScale(d.total));
      })
      .attr('y', function (d, i) {
        return yScale(d.total);
      });

    dataSelection
      .on('mouseenter', function (d, i) {
        console.log(d.total);
        d3.select(d3.event.target)
          .attr('class', 'special');
      })
      .on('mouseleave', function () {
        d3.select(d3.event.target)
          .attr('class', '');
      });

      svg.select('g.x-axis')
        .attr("transform", "translate(0,"+h+")")
        .call(xAxis);

      svg.select('g.y-axis')
        .call(yAxis);
  }


  d3.selectAll('.arrow')
    .on('click', function () {
      var dataToDisplay;
      var direction = d3.event.target
        .className.split(' ').slice(-1)[0];
      if (direction === 'right') {
        currentOffset += 1;
        dataToDisplay = sortedData
          .slice(currentOffset,
            currentOffset + 10);
        displayData(dataToDisplay);
      } else {
        alert('Not implemented yet');
      }

    });
});

// Load the JSON data
fetch('json.txt')
  .then(response => response.json())
  .then(data => {
    // Prepare the data for the candlestick graph
    var series = [
      {
        data: data.map(item => ({
          x: item.Date,
          y: [
            Math.round(item.Open),
            Math.round(item.High),
            Math.round(item.Low),
            Math.round(item.Close),
          ],
        })),
      },
    ];

    // Create the chart using ApexCharts
    var options = {
      series: series,
      chart: {
        type: 'candlestick',
        height: 400,
      },
      title: {
        text: 'Candlestick Chart',
        align: 'center',
      },
      xaxis: {
        type: 'datetime',
      },
      yaxis: {
        labels: {
          formatter: function (value) {
            return Math.round(value);
          },
        },
      },
    };

    var chart = new ApexCharts(document.querySelector('#chart'), options);
    chart.render();
  })
  .catch(error => console.error(error));
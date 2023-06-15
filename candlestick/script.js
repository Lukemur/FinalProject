// Define the variable 'data'
var data;
var sma20Data;
var sma50Data;

// Load the JSON data
fetch('json.txt')
    .then(response => response.json())
    .then(jsonData => {
        data = jsonData.data;

        // Prepare the data for the candlestick graph
        var series = [
            {
                name: 'Candlestick',
                data: data.map(item => ({
                    x: new Date(item.Date),
                    y: [
                        Math.round(item.Open),
                        Math.round(item.High),
                        Math.round(item.Low),
                        Math.round(item.Close),
                    ],
                })),
            },
            {
                name: 'SMA 20',
                data: sma20Data,
            },
            {
                name: 'SMA 50',
                data: sma50Data,
            },
        ];

        // Create the chart using ApexCharts
        var options = {
            series: series,
            // Rest of the options...
        };

        var chart = new ApexCharts(document.querySelector('#candlestick-chart'), options);
        chart.render();

        // Function to toggle SMA lines visibility
        function toggleSMA() {
            var sma20Series = chart.getSeriesByName('SMA 20');
            var sma50Series = chart.getSeriesByName('SMA 50');

            if (sma20Series.visible) {
                chart.hideSeries('SMA 20');
                chart.hideSeries('SMA 50');
            } else {
                chart.showSeries('SMA 20');
                chart.showSeries('SMA 50');
            }
        }

        // Add event listener to toggle SMA lines
        document.getElementById('toggle-sma').addEventListener('click', toggleSMA);

        // Load the SMA data
        fetch('sma.json')
            .then(response => response.json())
            .then(smaData => {
                sma20Data = smaData.data.map(item => ({
                    x: new Date(item.Date),
                    y: item.SMA_20,
                }));

                sma50Data = smaData.data.map(item => ({
                    x: new Date(item.Date),
                    y: item.SMA_50,
                }));

                // Update the series data with SMA data
                chart.updateSeries([
                    {
                        name: 'Candlestick',
                        data: data.map(item => ({
                            x: new Date(item.Date),
                            y: [
                                Math.round(item.Open),
                                Math.round(item.High),
                                Math.round(item.Low),
                                Math.round(item.Close),
                            ],
                        })),
                    },
                    {
                        name: 'SMA 20',
                        data: sma20Data,
                    },
                    {
                        name: 'SMA 50',
                        data: sma50Data,
                    },
                ]);
            })
            .catch(error => console.error(error));
    })
    .catch(error => console.error(error));

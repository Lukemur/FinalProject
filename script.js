anychart.onDocumentReady(function () {
  anychart.data.loadCsvFile(
    'https://gist.githubusercontent.com/shacheeswadia/cd509e0b0c03964ca86ae7d894137043/raw/5f336c644ad61728dbac93026f3268b86b8d0680/teslaDailyData.csv',
    function (data) {
      // create data table on loaded data
      var dataTable = anychart.data.table();
      dataTable.addData(data);

      // map loaded data for the candlestick series
      var mapping = dataTable.mapAs({
        open: 1,
        high: 2,
        low: 3,
        close: 4
      });

      // create stock chart
      var chart = anychart.stock();

      // create first plot on the chart
      var plot = chart.plot(0);
      
      // set grid settings
      plot.yGrid(true).xGrid(true).yMinorGrid(true).xMinorGrid(true);

      var series = plot.candlestick(mapping)
        .name('Tesla');
      series.legendItem().iconType('rising-falling');

      // create scroller series with mapped data
      chart.scroller().candlestick(mapping);

      // set chart selected date/time range
      chart.selectRange('2020-11-27', '2021-11-26');

      // create range picker
      var rangePicker = anychart.ui.rangePicker();
      
      // init range picker
      rangePicker.render(chart);

      // create range selector
      var rangeSelector = anychart.ui.rangeSelector();
      
      // init range selector
      rangeSelector.render(chart);
      
      // sets the title of the chart
      chart.title('Tesla Inc. Stock Chart');
      
      // set container id for the chart
      chart.container('container');
      
      // initiate chart drawing
      chart.draw();
    }
  );
});

// Beginning of JS for stockpicker drop-down menu
function showDropdown(category) {
  var dropdown = document.getElementById(category);
  dropdown.style.display = "block";
}

function hideDropdown(category) {
  var dropdown = document.getElementById(category);
  dropdown.style.display = "none";
}

function hideMenu() {
  var menu = document.querySelector(".menu");
  menu.style.display = "none";
}
var scan = document.getElementsByClassName("mybutton");
for (var i = 0; i < scan.length; i++) {
  scan[i].addEventListener("click", function() {
    console.log("Button clicked!");
  });
}
 // Get the text content container
 const textContent = document.getElementById('text-content');
 
 function clearStockLines() {
  while (textContent.firstChild) {
    textContent.removeChild(textContent.firstChild);
  }
}

function sponch() {
  var gifElement = document.getElementById("sponch");
  gifElement.style.display = "block";
}

function hidesponch() {
  var gifElement = document.getElementById("sponch");
  gifElement.style.display = "none";
}


var scanRSIOB = document.getElementById("stvb1");//create var for RSI overbought

scanRSIOB.addEventListener("click", function() {//Create event listner that prints out the number of stocks searched for according to input value
  var RSIOBnum = document.getElementById("stv1").value;
  console.log("You have searched for " + RSIOBnum + " stocks with an overbought RSI");
  clearStockLines();
  hidesponch();

  for (let i = 1; i <= RSIOBnum; i++) {
    const stockLine = document.createElement('p');
    stockLine.textContent = `stock ${i}`;
    textContent.appendChild(stockLine);
}
});

var scanRSIUB = document.getElementById("stvb2");//create var for RSI underbought

scanRSIUB.addEventListener("click", function() {//Create event listner that prints out the number of stocks searched for according to input value
  var RSIUBnum = document.getElementById("stv2").value;
  console.log("You have searched for " + RSIUBnum + " stocks with an underbought RSI");
  clearStockLines();
  hidesponch();

  for (let i = 1; i <= RSIUBnum; i++) {
    const stockLine = document.createElement('p');
    stockLine.textContent = `stock ${i}`;
    textContent.appendChild(stockLine);
}
});

var scanMACDUT = document.getElementById("stvb3");//create var for MACD strong uptrend

scanMACDUT.addEventListener("click", function() {//Create event listner that prints out the number of stocks searched for according to input value
  var MACDUTnum = document.getElementById("stv3").value;
  console.log("You have searched for " + MACDUTnum + " stocks with an strong uptrend for MACD");
  clearStockLines();
  hidesponch();

  for (let i = 1; i <= MACDUTnum; i++) {
    const stockLine = document.createElement('p');
    stockLine.textContent = `stock ${i}`;
    textContent.appendChild(stockLine);
}
  
});

var scanMACDDT = document.getElementById("stvb4");//create var for MACD strong downtrend

scanMACDDT.addEventListener("click", function() {//Create event listner that prints out the number of stocks searched for according to input value
  var MACDDTnum = document.getElementById("stv4").value;
  console.log("You have searched for " + MACDDTnum + " stocks with an strong downtrend for MACD");
  clearStockLines();
  hidesponch();

  for (let i = 1; i <= MACDDTnum; i++) {
    const stockLine = document.createElement('p');
    stockLine.textContent = `stock ${i}`;
    textContent.appendChild(stockLine);
}
});


var scanSMA = document.getElementById("SMAb");

scanSMA.addEventListener("click", function(){
  var tickSMA = document.getElementById("tickSMA").value;
  var timeSMA = document.getElementById("SMAtime").value;
  console.log(`you have searched for ${tickSMA}, showing a simple moving average with a time period of ${timeSMA}`);
  clearStockLines();
  hidesponch();
  if (tickSMA === "sponch") {
    sponch();
  }
})

var scanEMA = document.getElementById("EMAb");

scanEMA.addEventListener("click", function(){
  var tickEMA = document.getElementById("tickEMA").value;
  var timeEMA = document.getElementById("EMAtime").value;
  console.log(`you have searched for ${tickEMA}, showing an exponential moving average with a time period of ${timeEMA}`);
  clearStockLines();
  hidesponch();
  if (tickEMA === "sponch") {
    sponch();
  }
})
//end of JS for stockpicker drop-down menu

//Javascript for pie chart add money/title and remove functionality
let chart;
let dataPoints = [];

function addData() {
  const titleInput = document.getElementById("title");
  const moneyInput = document.getElementById("money");

  const title = titleInput.value;
  const money = parseFloat(moneyInput.value);

  if (title !== "" && !isNaN(money) && money > 0) {
    dataPoints.push({ title, money });
    titleInput.value = "";
    moneyInput.value = "";
    renderChart();
    renderDataList();
  }
}

function removeData(index) {
  dataPoints.splice(index, 1);
  renderChart();
  renderDataList();
}

function renderChart() {
  if (chart) {
    chart.destroy();
  }

  const series = dataPoints.map((point) => point.money);
  const labels = dataPoints.map((point) => point.title);

  chart = new ApexCharts(document.querySelector("#chartContainer"), {
    series: series,
    chart: {
      type: "pie"
    },
    labels: labels
  });

  chart.render();
}

function renderDataList() {
  const dataList = document.getElementById("dataList");
  dataList.innerHTML = "";

  dataPoints.forEach((point, index) => {
    const listItem = document.createElement("li");
    listItem.textContent = `${point.title}: $${point.money.toFixed(2)}`;

    const removeButton = document.createElement("button");
    removeButton.textContent = "Remove";
    removeButton.addEventListener("click", () => removeData(index));

    listItem.appendChild(removeButton);
    dataList.appendChild(listItem);
  });
}
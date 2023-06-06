// Maybe use this onload function to load all tickers in S&P and send to frontend, minimalizes API calls

// window.onload = function() { // when website loads run this function (this is called an anonymous function)
//   const date = new Date(); // use built in JS func to getcurrent date
//   // parse date into a nice string
//   const dateString = (date.getMonth() + 1) + '/' + date.getDate() + '/' + date.getFullYear();
//   document.getElementById('date').innerHTML = dateString; // set the .date HTML text to our dateString
//   if ("geolocation" in navigator) { // if browser supports location
//   navigator.geolocation.getCurrentPosition(success); // call 'success' function
// } else { // if location does not exist
//   console.log("Geolocation is not available in your browser."); // print message to user
// }
// }

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

// Backend Calls for Technical Indicators ------------------------------------------------------------------

var scanRSIOB = document.getElementById("stvb1");//create var for RSI overbought

scanRSIOB.addEventListener("click", function() {//Create event listner that prints out the number of stocks searched for according to input value
  // const xhr1 = new XMLHttpRequest();
  // xhr1.open("GET", `http://localhost:5000/RSI`);
  // xhr1.send();

  // xhr1.onload = function() {
  //   const body = JSON.parse(xhr1.responseText);
  // }

  

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

// Sort the JSON data by RSIUB in descending order
jsonData.sort(function(a, b) {
  return b.RISUB - a.RSIUB;
});

// Display the top RSIOBnum tickers and their corresponding values
for (let i = 0; i < RSIUBnum && i < jsonData.length; i++) {
  const stockLine = document.createElement('p');
  stockLine.textContent = `Ticker: ${jsonData[i].Ticker} | RSI Underbought: ${jsonData[i].RISUB}`;
  textContent.appendChild(stockLine);
}
});

var scanMACDUT = document.getElementById("stvb3");//create var for MACD strong uptrend

scanMACDUT.addEventListener("click", function() {//Create event listner that prints out the number of stocks searched for according to input value
  var MACDUTnum = document.getElementById("stv3").value;
  console.log("You have searched for " + MACDUTnum + " stocks with an strong uptrend for MACD");
  clearStockLines();
  hidesponch();

// Sort the JSON data by MACDUT in descending order
jsonData.sort(function(a, b) {
  return b.MACDUT - a.MACDUT;
});

// Display the top MACDUTnum tickers and their corresponding values
for (let i = 0; i < MACDUTnum && i < jsonData.length; i++) {
  const stockLine = document.createElement('p');
  stockLine.textContent = `Ticker: ${jsonData[i].Ticker} | MACD Uptrending: ${jsonData[i].MACDUT}`;
  textContent.appendChild(stockLine);
}
  
});

var scanMACDDT = document.getElementById("stvb4");//create var for MACD strong downtrend

scanMACDDT.addEventListener("click", function() {//Create event listner that prints out the number of stocks searched for according to input value
  var MACDDTnum = document.getElementById("stv4").value;
  console.log("You have searched for " + MACDDTnum + " stocks with an strong downtrend for MACD");
  clearStockLines();
  hidesponch();

// Sort the JSON data by MACDDT in descending order
jsonData.sort(function(a, b) {
  return b.MACDDT - a.MACDDT;
});

// Display the top MACDDTnum tickers and their corresponding values
for (let i = 0; i < MACDDTnum && i < jsonData.length; i++) {
  const stockLine = document.createElement('p');
  stockLine.textContent = `Ticker: ${jsonData[i].Ticker} | MACD Downtrend: ${jsonData[i].MACDDT}`;
  textContent.appendChild(stockLine);
}
});


var scanSMA = document.getElementById("SMAb");

scanSMA.addEventListener("click", function(){
  var tickSMA = document.getElementById("tickSMA").value;
  var timeSMAsp = document.getElementById("SMAtimesp").value;
  var timeSMAlp = document.getElementById("SMAtimelp").value;
  console.log(`you have searched for ${tickEMA}, showing an exponential moving average with a short time period of ${timeSMAsp} days and a long moving average of ${timeSMAlp} days`);
  clearStockLines();
  hidesponch();
  if (tickSMA === "sponch") {
    sponch();
  }

  // request for SMA data
  const xhr1 = new XMLHttpRequest();
  xhr1.open("GET", `http://localhost:5000/SMA?tickSMA=${tickSMA}&SMAtime=${SMAtime}`);
  xhr1.send();

  xhr1.onload = function() {
    const body = JSON.parse(xhr1.responseText); // parse response

    // may need to implement the simple movie average function here
  }
})

var scanEMA = document.getElementById("EMAb");

scanEMA.addEventListener("click", function(){
  var tickEMA = document.getElementById("tickEMA").value;
  var timeEMAsp = document.getElementById("EMAtimesp").value;
  var timeEMAlp = document.getElementById("EMAtimelp").value;
  console.log(`you have searched for ${tickEMA}, showing an exponential moving average with a short time period of ${timeEMAsp} days and a long moving average of ${timeEMAlp} days`);
  clearStockLines();
  hidesponch();
  if (tickEMA === "sponch") {
    sponch();
    }
    
    let foundMatch = false;
    for (let i = 0; i < jsonData.length; i++) {
    if (jsonData[i].Ticker == tickEMA) {
       foundMatch = true;
       break;}}
   if (foundMatch) {
       console.log("We found your stock!");
 }
       else {
       console.log("We could not find your stock, make sure your search is case-sensitive");
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

// JSON DATA
const jsonData = [
  {
   "Ticker": 1111,
   "RSIOB": 1,
   "RISUB": 1,
   "MACDUT": 1,
   "MACDDT": 1
  },
  {
   "Ticker": 1112,
   "RSIOB": 2,
   "RISUB": 2,
   "MACDUT": 2,
   "MACDDT": 2
  },
  {
   "Ticker": 1113,
   "RSIOB": 3,
   "RISUB": 3,
   "MACDUT": 3,
   "MACDDT": 3
  },
  {
   "Ticker": 1114,
   "RSIOB": 4,
   "RISUB": 4,
   "MACDUT": 4,
   "MACDDT": 4
  },
  {
   "Ticker": 1115,
   "RSIOB": 5,
   "RISUB": 5,
   "MACDUT": 5,
   "MACDDT": 5
  },
  {
   "Ticker": 1116,
   "RSIOB": 6,
   "RISUB": 6,
   "MACDUT": 6,
   "MACDDT": 6
  },
  {
   "Ticker": 1117,
   "RSIOB": 7,
   "RISUB": 7,
   "MACDUT": 7,
   "MACDDT": 7
  },
  {
   "Ticker": 1118,
   "RSIOB": 8,
   "RISUB": 8,
   "MACDUT": 8,
   "MACDDT": 8
  },
  {
   "Ticker": 1119,
   "RSIOB": 9,
   "RISUB": 9,
   "MACDUT": 9,
   "MACDDT": 9
  },
  {
   "Ticker": 1120,
   "RSIOB": 10,
   "RISUB": 10,
   "MACDUT": 10,
   "MACDDT": 10
  },
  {
   "Ticker": 1121,
   "RSIOB": 11,
   "RISUB": 11,
   "MACDUT": 11,
   "MACDDT": 11
  },
  {
   "Ticker": 1122,
   "RSIOB": 12,
   "RISUB": 12,
   "MACDUT": 12,
   "MACDDT": 12
  },
  {
   "Ticker": 1123,
   "RSIOB": 13,
   "RISUB": 13,
   "MACDUT": 13,
   "MACDDT": 13
  },
  {
   "Ticker": 1124,
   "RSIOB": 14,
   "RISUB": 14,
   "MACDUT": 14,
   "MACDDT": 14
  },
  {
   "Ticker": 1125,
   "RSIOB": 15,
   "RISUB": 15,
   "MACDUT": 15,
   "MACDDT": 15
  },
  {
   "Ticker": 1126,
   "RSIOB": 16,
   "RISUB": 16,
   "MACDUT": 16,
   "MACDDT": 16
  },
  {
   "Ticker": 1127,
   "RSIOB": 17,
   "RISUB": 17,
   "MACDUT": 17,
   "MACDDT": 17
  },
  {
   "Ticker": 1128,
   "RSIOB": 18,
   "RISUB": 18,
   "MACDUT": 18,
   "MACDDT": 18
  },
  {
   "Ticker": 1129,
   "RSIOB": 19,
   "RISUB": 19,
   "MACDUT": 19,
   "MACDDT": 19
  },
  {
   "Ticker": 1130,
   "RSIOB": 20,
   "RISUB": 20,
   "MACDUT": 20,
   "MACDDT": 20
  },
  {
   "Ticker": 1131,
   "RSIOB": 21,
   "RISUB": 21,
   "MACDUT": 21,
   "MACDDT": 21
  },
  {
   "Ticker": 1132,
   "RSIOB": 22,
   "RISUB": 22,
   "MACDUT": 22,
   "MACDDT": 22
  },
  {
   "Ticker": 1133,
   "RSIOB": 23,
   "RISUB": 23,
   "MACDUT": 23,
   "MACDDT": 23
  },
  {
   "Ticker": 1134,
   "RSIOB": 24,
   "RISUB": 24,
   "MACDUT": 24,
   "MACDDT": 24
  },
  {
   "Ticker": 1135,
   "RSIOB": 25,
   "RISUB": 25,
   "MACDUT": 25,
   "MACDDT": 25
  },
  {
   "Ticker": 1136,
   "RSIOB": 26,
   "RISUB": 26,
   "MACDUT": 26,
   "MACDDT": 26
  },
  {
   "Ticker": 1137,
   "RSIOB": 27,
   "RISUB": 27,
   "MACDUT": 27,
   "MACDDT": 27
  },
  {
   "Ticker": 1138,
   "RSIOB": 28,
   "RISUB": 28,
   "MACDUT": 28,
   "MACDDT": 28
  },
  {
   "Ticker": 1139,
   "RSIOB": 29,
   "RISUB": 29,
   "MACDUT": 29,
   "MACDDT": 29
  },
  {
   "Ticker": 1140,
   "RSIOB": 30,
   "RISUB": 30,
   "MACDUT": 30,
   "MACDDT": 30
  },
  {
   "Ticker": 1141,
   "RSIOB": 31,
   "RISUB": 31,
   "MACDUT": 31,
   "MACDDT": 31
  },
  {
   "Ticker": 1142,
   "RSIOB": 32,
   "RISUB": 32,
   "MACDUT": 32,
   "MACDDT": 32
  },
  {
   "Ticker": 1143,
   "RSIOB": 33,
   "RISUB": 33,
   "MACDUT": 33,
   "MACDDT": 33
  },
  {
   "Ticker": 1144,
   "RSIOB": 34,
   "RISUB": 34,
   "MACDUT": 34,
   "MACDDT": 34
  },
  {
   "Ticker": 1145,
   "RSIOB": 35,
   "RISUB": 35,
   "MACDUT": 35,
   "MACDDT": 35
  },
  {
   "Ticker": 1146,
   "RSIOB": 36,
   "RISUB": 36,
   "MACDUT": 36,
   "MACDDT": 36
  },
  {
   "Ticker": 1147,
   "RSIOB": 37,
   "RISUB": 37,
   "MACDUT": 37,
   "MACDDT": 37
  },
  {
   "Ticker": 1148,
   "RSIOB": 38,
   "RISUB": 38,
   "MACDUT": 38,
   "MACDDT": 38
  },
  {
   "Ticker": 1149,
   "RSIOB": 39,
   "RISUB": 39,
   "MACDUT": 39,
   "MACDDT": 39
  },
  {
   "Ticker": 1150,
   "RSIOB": 40,
   "RISUB": 40,
   "MACDUT": 40,
   "MACDDT": 40
  },
  {
   "Ticker": 1151,
   "RSIOB": 41,
   "RISUB": 41,
   "MACDUT": 41,
   "MACDDT": 41
  },
  {
   "Ticker": 1152,
   "RSIOB": 42,
   "RISUB": 42,
   "MACDUT": 42,
   "MACDDT": 42
  },
  {
   "Ticker": 1153,
   "RSIOB": 43,
   "RISUB": 43,
   "MACDUT": 43,
   "MACDDT": 43
  },
  {
   "Ticker": 1154,
   "RSIOB": 44,
   "RISUB": 44,
   "MACDUT": 44,
   "MACDDT": 44
  },
  {
   "Ticker": 1155,
   "RSIOB": 45,
   "RISUB": 45,
   "MACDUT": 45,
   "MACDDT": 45
  },
  {
   "Ticker": 1156,
   "RSIOB": 46,
   "RISUB": 46,
   "MACDUT": 46,
   "MACDDT": 46
  },
  {
   "Ticker": 1157,
   "RSIOB": 47,
   "RISUB": 47,
   "MACDUT": 47,
   "MACDDT": 47
  },
  {
   "Ticker": 1158,
   "RSIOB": 48,
   "RISUB": 48,
   "MACDUT": 48,
   "MACDDT": 48
  },
  {
   "Ticker": 1159,
   "RSIOB": 49,
   "RISUB": 49,
   "MACDUT": 49,
   "MACDDT": 49
  },
  {
   "Ticker": 1160,
   "RSIOB": 50,
   "RISUB": 50,
   "MACDUT": 50,
   "MACDDT": 50
  }
 ];
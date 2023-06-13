// Maybe use this onload function to load all tickers in S&P and send to frontend, minimalizes API calls

window.onload = function() { // when website loads run this function (this is called an anonymous function)
  const xhr = new XMLHttpRequest();

  xhr.open("GET", `http://localhost:5000/ONLOAD`);
  
  xhr.onload = function() {
    if (xhr.status === 200) {
      console.log('Request was successful!');
    } else {
      // Request failed or returned an error
      console.error('Error:', xhr.status, xhr.statusText);
    }
  };
  xhr.send();
};

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
 let textContent = document.getElementById('text-content');
 
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
  // let xhr1 = new XMLHttpRequest();
  // xhr1.open("GET", `http://localhost:5000/RSI`);
  // xhr1.send();

  // xhr1.onload = function() {
  //   let body = JSON.parse(xhr1.responseText);
  // }

  

  var RSIOBnum = document.getElementById("stv1").value;
  console.log("You have searched for " + RSIOBnum + " stocks with an overbought RSI");
  clearStockLines();
  hidesponch();

// Sort the JSON data by RSIOB in descending order
jsonData.sort(function(a, b) {
  return b.RSI - a.RSI;
});

// Display the top RSIOBnum tickers and their corresponding values
for (let i = 0; i < RSIOBnum && i < jsonData.length; i++) {
  if (jsonData[i].RSI < 70){continue};
  let stockLine = document.createElement('p');
  stockLine.textContent = `Ticker: ${jsonData[i].Ticker} | RSI: ${jsonData[i].RSI} | Price: $${jsonData[i].PRICE} `;
  let stockbox = document.createElement('input');
  stockbox.type = "value";
  stockbox.id = `stocknum` + i;
  stockbox.placeholder = "How many stocks?";
  stockbox.style.width = 120 + "px";
  var button = document.createElement('button');
  button.textContent = 'Add to portfolio';
  button.addEventListener('click', function(addData) {
    //code here  
      let stocksbought = document.getElementById(`stocknum`+i).value; 
      let titleInput = jsonData[i].Ticker;
      let moneyInput = jsonData[i].PRICE;
    
      let title = jsonData[i].Ticker;
      let money = ((jsonData[i].PRICE) *(stocksbought));
    
      if (title !== "" && !isNaN(money) && money > 0) {
        dataPoints.push({ title, money });
        titleInput.value = "";
        moneyInput.value = "";
        renderChart();
        renderDataList();
      }

    console.log(`Button ${i + 1} clicked.`);
    console.log(`you have added ${stocksbought} stocks of ${jsonData[i].Ticker} to your portfolio`);
    // You can access jsonData[i] or perform any other actions
  });
  stockLine.appendChild(stockbox);
  stockLine.appendChild(button);
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
  return a.RSI - b.RSI;
});

// Display the top RSIOBnum tickers and their corresponding values
for (let i = 0; i < RSIUBnum && i < jsonData.length; i++) {
  if(jsonData[i].RSI > 30){continue};
  let stockLine = document.createElement('p');
  stockLine.textContent = `Ticker: ${jsonData[i].Ticker} | RSI: ${jsonData[i].RSI} | Price: $${jsonData[i].PRICE} `;
  let stockbox = document.createElement('input');
  stockbox.type = "value";
  stockbox.id = `stocknum` + i;
  stockbox.placeholder = "How many stocks?";
  stockbox.style.width = 120 + "px";
  var button = document.createElement('button');
  button.textContent = 'Add to portfolio';
  button.addEventListener('click', function(addData) {
    //code here  
      let stocksbought = document.getElementById(`stocknum`+i).value; 
      let titleInput = jsonData[i].Ticker;
      let moneyInput = jsonData[i].PRICE;
    
      let title = jsonData[i].Ticker;
      let money = ((jsonData[i].PRICE) *(stocksbought));
    
      if (title !== "" && !isNaN(money) && money > 0) {
        dataPoints.push({ title, money });
        titleInput.value = "";
        moneyInput.value = "";
        renderChart();
        renderDataList();
      }

    console.log(`Button ${i + 1} clicked.`);
    console.log(`you have added ${stocksbought} stocks of ${jsonData[i].Ticker} to your portfolio`);
    // You can access jsonData[i] or perform any other actions
  });
  stockLine.appendChild(stockbox);
  stockLine.appendChild(button);
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
  return b.MACD - a.MACD;
});

// Display the top MACDUTnum tickers and their corresponding values
for (let i = 0; i < MACDUTnum && i < jsonData.length; i++) {
  let stockLine = document.createElement('p');
  stockLine.textContent = `Ticker: ${jsonData[i].Ticker} | MACD Uptrending: ${jsonData[i].MACD} | Price: ${jsonData[i].PRICE} `;
  let stockbox = document.createElement('input');
  stockbox.type = "value";
  stockbox.id = `stocknum` + i;
  stockbox.placeholder = "How many stocks?";
  stockbox.style.width = 120 + "px";
  var button = document.createElement('button');
  button.textContent = 'Add to portfolio';
  button.addEventListener('click', function(addData) {
    //code here  
      let stocksbought = document.getElementById(`stocknum`+i).value; 
      let titleInput = jsonData[i].Ticker;
      let moneyInput = jsonData[i].PRICE;
    
      let title = jsonData[i].Ticker;
      let money = ((jsonData[i].PRICE) *(stocksbought));
    
      if (title !== "" && !isNaN(money) && money > 0) {
        dataPoints.push({ title, money });
        titleInput.value = "";
        moneyInput.value = "";
        renderChart();
        renderDataList();
      }

    console.log(`Button ${i + 1} clicked.`);
    console.log(`you have added ${stocksbought} stocks of ${jsonData[i].Ticker} to your portfolio`);
    // You can access jsonData[i] or perform any other actions
  });
  stockLine.appendChild(stockbox);
  stockLine.appendChild(button);
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
  let stockLine = document.createElement('p');
  stockLine.textContent = `Ticker: ${jsonData[i].Ticker} | MACD Downtrend: ${jsonData[i].MACDDT} | Price: ${jsonData[i].PRICE} `;
  let stockbox = document.createElement('input');
  stockbox.type = "value";
  stockbox.id = `stocknum` + i;
  stockbox.placeholder = "How many stocks?";
  stockbox.style.width = 120 + "px";
  var button = document.createElement('button');
  button.textContent = 'Add to portfolio';
  button.addEventListener('click', function(addData) {
    //code here  
      let stocksbought = document.getElementById(`stocknum`+i).value; 
      let titleInput = jsonData[i].Ticker;
      let moneyInput = jsonData[i].PRICE;
    
      let title = jsonData[i].Ticker;
      let money = ((jsonData[i].PRICE) *(stocksbought));
    
      if (title !== "" && !isNaN(money) && money > 0) {
        dataPoints.push({ title, money });
        titleInput.value = "";
        moneyInput.value = "";
        renderChart();
        renderDataList();
      }

    console.log(`Button ${i + 1} clicked.`);
    console.log(`you have added ${stocksbought} stocks of ${jsonData[i].Ticker} to your portfolio`);
    // You can access jsonData[i] or perform any other actions
  });
  stockLine.appendChild(stockbox);
  stockLine.appendChild(button);
  textContent.appendChild(stockLine);
}
});


var scanSMA = document.getElementById("SMAb");

scanSMA.addEventListener("click", function(){
  let stockLine = document.createElement('p');
  var tickSMA = document.getElementById("tickSMA").value;
  var timeSMAsp = document.getElementById("SMAtimesp").value;
  var timeSMAlp = document.getElementById("SMAtimelp").value;
  console.log(`you have searched for ${tickSMA}, showing an exponential moving average with a short time period of ${timeSMAsp} days and a long moving average of ${timeSMAlp} days`);
  clearStockLines();
  hidesponch();
  if (tickSMA === "sponch") {
    sponch();
  }
  let foundMatch = false;
  for (let i = 0; i < jsonData.length; i++) {
  if (jsonData[i].Ticker == tickSMA) {
     foundMatch = true;
     break;}}
 if (foundMatch) {
     console.log("We found your stock!");

     //code
     
     stockLine.textContent = `Ticker: ${jsonData[i].Ticker} | MACD Downtrend: ${jsonData[i].MACDDT} | Price: ${jsonData[i].PRICE} `;
}
     else {
     console.log("We could not find your stock, make sure your search is case-sensitive");
}

  

  // request for SMA data

  // const xhr1 = new XMLHttpRequest();
  // xhr1.open("GET", `http://localhost:5000/SMA?tickSMA=${tickSMA}&SMAtimesp=${SMAtimesp}&SMAtimelp=${SMAtimelp}`);
  
  const xhr1 = new XMLHttpRequest();
  xhr1.open("GET", `http://localhost:5000/SMA?tickSMA=${tickSMA}&SMAtimesp=${timeSMAsp}&SMAtimelp=${timeSMAlp}`);
  xhr1.send();

  xhr1.onload = function() {
    let body = JSON.parse(xhr1.responseText); // parse response

    // here parse the body JSON response for stock data 
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
       let stockLine = document.createElement('p');
       stockLine.textContent = `Ticker: ${jsonData[i].Ticker} | MACD Downtrend: ${jsonData[i].MACDDT} | Price: ${jsonData[i].PRICE} `;
 }
       else {
       console.log("We could not find your stock, make sure your search is case-sensitive");
 }

 // request for EMA data
 const xhr2 = new XMLHttpRequest();
 xhr2.open("GET", `http://localhost:5000/EMA?tickEMA=${tickEMA}&EMAtimesp=${timeEMAsp}&EMAtimelp=${timeEMAlp}`);
 xhr1.send();

 xhr2.onload = function() {
   const body = JSON.parse(xhr2.responseText); // parse response

   // may need to implement the simple movie average function here
 }

 })
//end of JS for stockpicker drop-down menu

//Javascript for pie chart add money/title and remove functionality
let chart;
let dataPoints = [];

function addData() {
  let titleInput = document.getElementById("title");
  let moneyInput = document.getElementById("money");

  let title = titleInput.value;
  let money = parseFloat(moneyInput.value);

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

  let series = dataPoints.map((point) => point.money);
  let labels = dataPoints.map((point) => point.title);

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
  let dataList = document.getElementById("dataList");
  dataList.innerHTML = "";

  dataPoints.forEach((point, index) => {
    let listItem = document.createElement("li");
    listItem.textContent = `${point.title}: $${point.money.toFixed(2)}`;

    let removeButton = document.createElement("button");
    removeButton.textContent = "Remove";
    removeButton.addEventListener("click", () => removeData(index));

    listItem.appendChild(removeButton);
    dataList.appendChild(listItem);
  });
}

// JSON DATA
let jsonData = [
  {
   "Ticker": 1111,
   "RSI": 84,
   "MACD": 20,
   "PRICE": 52
  },
  {
   "Ticker": 1112,
   "RSI": 2,
   "MACD": 53,
   "PRICE": 63
  },
  {
   "Ticker": 1113,
   "RSI": 79,
   "MACD": 28,
   "PRICE": 8
  },
  {
   "Ticker": 1114,
   "RSI": 26,
   "MACD": 90,
   "PRICE": 64
  },
  {
   "Ticker": 1115,
   "RSI": 42,
   "MACD": 78,
   "PRICE": 70
  },
  {
   "Ticker": 1116,
   "RSI": 12,
   "MACD": 32,
   "PRICE": 76
  },
  {
   "Ticker": 1117,
   "RSI": 3,
   "MACD": 34,
   "PRICE": 41
  },
  {
   "Ticker": 1118,
   "RSI": 58,
   "MACD": 37,
   "PRICE": 31
  },
  {
   "Ticker": 1119,
   "RSI": 86,
   "MACD": 48,
   "PRICE": 11
  },
  {
   "Ticker": 1120,
   "RSI": 55,
   "MACD": 20,
   "PRICE": 56
  },
  {
   "Ticker": 1121,
   "RSI": 86,
   "MACD": 12,
   "PRICE": 82
  },
  {
   "Ticker": 1122,
   "RSI": 78,
   "MACD": 25,
   "PRICE": 72
  },
  {
   "Ticker": 1123,
   "RSI": 66,
   "MACD": 30,
   "PRICE": 88
  },
  {
   "Ticker": 1124,
   "RSI": 38,
   "MACD": 94,
   "PRICE": 62
  },
  {
   "Ticker": 1125,
   "RSI": 21,
   "MACD": 18,
   "PRICE": 62
  },
  {
   "Ticker": 1126,
   "RSI": 37,
   "MACD": 93,
   "PRICE": 22
  },
  {
   "Ticker": 1127,
   "RSI": 45,
   "MACD": 39,
   "PRICE": 23
  },
  {
   "Ticker": 1128,
   "RSI": 54,
   "MACD": 35,
   "PRICE": 21
  },
  {
   "Ticker": 1129,
   "RSI": 64,
   "MACD": 31,
   "PRICE": 62
  },
  {
   "Ticker": 1130,
   "RSI": 32,
   "MACD": 64,
   "PRICE": 95
  },
  {
   "Ticker": 1131,
   "RSI": 14,
   "MACD": 19,
   "PRICE": 93
  },
  {
   "Ticker": 1132,
   "RSI": 17,
   "MACD": 5,
   "PRICE": 82
  },
  {
   "Ticker": 1133,
   "RSI": 66,
   "MACD": 72,
   "PRICE": 58
  },
  {
   "Ticker": 1134,
   "RSI": 77,
   "MACD": 9,
   "PRICE": 6
  },
  {
   "Ticker": 1135,
   "RSI": 28,
   "MACD": 35,
   "PRICE": 75
  },
  {
   "Ticker": 1136,
   "RSI": 75,
   "MACD": 8,
   "PRICE": 22
  },
  {
   "Ticker": 1137,
   "RSI": 7,
   "MACD": 3,
   "PRICE": 84
  },
  {
   "Ticker": 1138,
   "RSI": 88,
   "MACD": 98,
   "PRICE": 12
  },
  {
   "Ticker": 1139,
   "RSI": 67,
   "MACD": 97,
   "PRICE": 66
  },
  {
   "Ticker": 1140,
   "RSI": 96,
   "MACD": 32,
   "PRICE": 59
  },
  {
   "Ticker": 1141,
   "RSI": 28,
   "MACD": 10,
   "PRICE": 50
  },
  {
   "Ticker": 1142,
   "RSI": 1,
   "MACD": 40,
   "PRICE": 78
  },
  {
   "Ticker": 1143,
   "RSI": 22,
   "MACD": 55,
   "PRICE": 80
  },
  {
   "Ticker": 1144,
   "RSI": 69,
   "MACD": 70,
   "PRICE": 79
  },
  {
   "Ticker": 1145,
   "RSI": 14,
   "MACD": 83,
   "PRICE": 28
  },
  {
   "Ticker": 1146,
   "RSI": 60,
   "MACD": 92,
   "PRICE": 71
  },
  {
   "Ticker": 1147,
   "RSI": 10,
   "MACD": 59,
   "PRICE": 76
  },
  {
   "Ticker": 1148,
   "RSI": 65,
   "MACD": 2,
   "PRICE": 35
  },
  {
   "Ticker": 1149,
   "RSI": 75,
   "MACD": 81,
   "PRICE": 58
  },
  {
   "Ticker": 1150,
   "RSI": 48,
   "MACD": 43,
   "PRICE": 72
  },
  {
   "Ticker": 1151,
   "RSI": 50,
   "MACD": 82,
   "PRICE": 80
  },
  {
   "Ticker": 1152,
   "RSI": 89,
   "MACD": 39,
   "PRICE": 39
  },
  {
   "Ticker": 1153,
   "RSI": 8,
   "MACD": 30,
   "PRICE": 41
  },
  {
   "Ticker": 1154,
   "RSI": 72,
   "MACD": 100,
   "PRICE": 41
  },
  {
   "Ticker": 1155,
   "RSI": 52,
   "MACD": 5,
   "PRICE": 84
  },
  {
   "Ticker": 1156,
   "RSI": 76,
   "MACD": 64,
   "PRICE": 58
  },
  {
   "Ticker": 1157,
   "RSI": 60,
   "MACD": 77,
   "PRICE": 64
  },
  {
   "Ticker": 1158,
   "RSI": 83,
   "MACD": 89,
   "PRICE": 75
  },
  {
   "Ticker": 1159,
   "RSI": 75,
   "MACD": 99,
   "PRICE": 90
  },
  {
   "Ticker": 1160,
   "RSI": 39,
   "MACD": 32,
   "PRICE": 60
  }
 ]

 let jsonData2 = [
  {
    "Date":1684108800000,
    "Open":309.1000061035,
    "High":309.8999938965,
    "Low":307.5899963379,
    "Close":309.4599914551,
    "Adj Close":308.7849731445,
    "Volume":16336500,
    "date":1684108800000,
    "SMA_20":300.0634979248,
    "SMA_50":285.0903997803
  },
  {
    "Date":1684195200000,
    "Open":309.8299865723,
    "High":313.7099914551,
    "Low":309.8299865723,
    "Close":311.7399902344,
    "Adj Close":311.0599975586,
    "Volume":26730300,
    "date":1684195200000,
    "SMA_20":301.2319976807,
    "SMA_50":286.1877996826
  },
  {
    "Date":1684281600000,
    "Open":312.2900085449,
    "High":314.4299926758,
    "Low":310.7399902344,
    "Close":314.0,
    "Adj Close":314.0,
    "Volume":24315000,
    "date":1684281600000,
    "SMA_20":302.5094970703,
    "SMA_50":287.3847998047
  },
  {
    "Date":1684368000000,
    "Open":314.5299987793,
    "High":319.0400085449,
    "Low":313.7200012207,
    "Close":318.5199890137,
    "Adj Close":318.5199890137,
    "Volume":27276000,
    "date":1684368000000,
    "SMA_20":304.1299972534,
    "SMA_50":288.681199646
  },
  {
    "Date":1684454400000,
    "Open":316.7399902344,
    "High":318.75,
    "Low":316.3699951172,
    "Close":318.3399963379,
    "Adj Close":318.3399963379,
    "Volume":27529500,
    "date":1684454400000,
    "SMA_20":305.758996582,
    "SMA_50":290.0015994263
  },
  {
    "Date":1684713600000,
    "Open":318.6000061035,
    "High":322.5899963379,
    "Low":318.0100097656,
    "Close":321.1799926758,
    "Adj Close":321.1799926758,
    "Volume":24115700,
    "date":1684713600000,
    "SMA_20":307.7294967651,
    "SMA_50":291.453399353
  },
  {
    "Date":1684800000000,
    "Open":320.0299987793,
    "High":322.7200012207,
    "Low":315.25,
    "Close":315.2600097656,
    "Adj Close":315.2600097656,
    "Volume":30797200,
    "date":1684800000000,
    "SMA_20":309.721496582,
    "SMA_50":292.680199585
  },
  {
    "Date":1684886400000,
    "Open":314.7300109863,
    "High":316.5,
    "Low":312.6099853516,
    "Close":313.8500061035,
    "Adj Close":313.8500061035,
    "Volume":23384900,
    "date":1684886400000,
    "SMA_20":310.6454971313,
    "SMA_50":293.7413995361
  },
  {
    "Date":1684972800000,
    "Open":323.2399902344,
    "High":326.8999938965,
    "Low":320.0,
    "Close":325.9200134277,
    "Adj Close":325.9200134277,
    "Volume":43301700,
    "date":1684972800000,
    "SMA_20":311.6999984741,
    "SMA_50":294.9509997559
  },
  {
    "Date":1685059200000,
    "Open":324.0199890137,
    "High":333.3999938965,
    "Low":323.8800048828,
    "Close":332.8900146484,
    "Adj Close":332.8900146484,
    "Volume":36630600,
    "date":1685059200000,
    "SMA_20":312.9814987183,
    "SMA_50":296.0847998047
  },
  {
    "Date":1685404800000,
    "Open":335.2300109863,
    "High":335.7399902344,
    "Low":330.5199890137,
    "Close":331.2099914551,
    "Adj Close":331.2099914551,
    "Volume":29503100,
    "date":1685404800000,
    "SMA_20":314.2639984131,
    "SMA_50":297.1203997803
  },
  {
    "Date":1685491200000,
    "Open":332.2900085449,
    "High":335.9400024414,
    "Low":327.3299865723,
    "Close":328.3900146484,
    "Adj Close":328.3900146484,
    "Volume":45950600,
    "date":1685491200000,
    "SMA_20":315.4129989624,
    "SMA_50":298.2435998535
  },
  {
    "Date":1685577600000,
    "Open":325.9299926758,
    "High":333.5299987793,
    "Low":324.7200012207,
    "Close":332.5799865723,
    "Adj Close":332.5799865723,
    "Volume":26773900,
    "date":1685577600000,
    "SMA_20":316.8219985962,
    "SMA_50":299.4195996094
  },
  {
    "Date":1685664000000,
    "Open":334.25,
    "High":337.5,
    "Low":332.549987793,
    "Close":335.3999938965,
    "Adj Close":335.3999938965,
    "Volume":25864000,
    "date":1685664000000,
    "SMA_20":318.3214981079,
    "SMA_50":300.6817993164
  },
  {
    "Date":1685923200000,
    "Open":335.2200012207,
    "High":338.549987793,
    "Low":334.6600952148,
    "Close":335.9400024414,
    "Adj Close":335.9400024414,
    "Volume":21241193,
    "date":1685923200000,
    "SMA_20":319.5859985352,
    "SMA_50":301.847399292
  }
]
 const ticklist = [
    "MMM", "AOS", "ABT", "ABBV", "ABMD", "ACN", "ATVI", "ADM", "ADBE", "AAP", "AMD", "AES", "AFL", "A", "APD", "AKAM", "ALB", "ALK", "ARE", "ALGN", "ALLE", "LNT", "ALL", "GOOGL", "GOOG", "MO", "AMZN", "AMCR", "AEE", "AAL", "AEP", "AXP", "AIG", "AMT", "AWK", "AMP", "ABC", "AME", "AMGN", "APH", "ADI", "ANSS", "AON", "APA", "AAPL", "AMAT", "APTV", "ANET", "AJG", "AIZ", "T", "ATO", "ADSK", "ADP", "AZO", "AVB", "AVY", "BKR", "BAC", "BBWI", "BAX", "BDX", "BRK.B", "BBY", "BIO", "TECH", "BIIB", "BLK", "BK", "BA", "BKNG", "BWA", "BXP", "BSX", "BMY", "AVGO", "BR", "BRO", "CHRW", "CDNS", "CZR", "CPB", "COF", "CAH", "KMX", "CCL", "CARR", "CTLT", "CAT", "CBOE", "CBRE", "CDW", "CE", "CNC", "CNP", "CDAY", "CF", "CRL", "SCHW", "CHTR", "CVX", "CMG", "CB", "CHD", "CI", "CINF", "CTAS", "CSCO", "C", "CFG", "CLX", "CME", "CMS", "KO", "CTSH", "CL", "CMCSA", "CMA", "CAG", "COP", "ED", "STZ", "CPRT", "GLW", "CTVA", "COST", "CTRA", "CCI", "CSX", "CMI", "CVS", "DHI", "DHR", "DRI", "DVA", "DE", "DAL", "XRAY", "DVN", "DXCM", "FANG", "DLR", "DFS", "DISH", "DG", "DLTR", "D", "DPZ", "DOV", "DOW", "DTE", "DUK", "DD", "DXC", "EMN", "ETN", "EBAY", "ECL", "EIX", "EW", "EA", "LLY", "EMR", "ENPH", "ETR", "EOG", "EFX", "EQIX", "EQR", "ESS", "EL", "ETSY", "RE", "EVRG", "ES", "EXC", "EXPE", "EXPD", "EXR", "XOM", "FFIV", "FAST", "FRT", "FDX", "FIS", "FITB", "FRC", "FE", "FISV", "FLT", "FMC", "F", "FTNT", "FTV", "FOXA", "FOX", "BEN",]

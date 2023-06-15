// Global Variables

let tickString = "MMM AOS ABT ABBV ABMD ACN ATVI ADM ADBE AAP AMD AES AFL A APD AKAM ALB ALK ARE ALGN ALLE LNT ALL GOOGL GOOG MO AMZN AMCR AEE AAL AEP AXP AIG AMT AWK AMP ABC AME AMGN APH ADI ANSS AON APA AAPL AMAT APTV ANET AJG AIZ T ATO ADSK ADP AZO AVB AVY BKR BAC BBWI BAX BDX BRK.B BBY BIO TECH BIIB BLK BK BA BKNG BWA BXP BSX BMY AVGO BR BRO CHRW CDNS CZR CPB COF CAH KMX CCL CARR CTLT CAT CBOE CBRE CDW CE CNC CNP CDAY CF CRL SCHW CHTR CVX CMG CB CHD CI CINF CTAS CSCO C CFG CLX CME CMS KO CTSH CL CMCSA CMA CAG COP ED STZ CPRT GLW CTVA COST CTRA CCI CSX CMI CVS DHI DHR DRI DVA DE DAL XRAY DVN DXCM FANG DLR DFS DISH DG DLTR D DPZ DOV DOW DTE DUK DD DXC EMN ETN EBAY ECL EIX EW EA LLY EMR ENPH ETR EOG EFX EQIX EQR ESS EL ETSY RE EVRG ES EXC EXPE EXPD EXR XOM FFIV FAST FRT FDX FIS FITB FRC FE FISV FLT FMC F FTNT FTV FOXA FOX BEN FCX GPS GRMN IT GNRC GD GE GIS GM GPC GILD GPN GL GS HAL HBI HAS HCA PEAK HSIC HES HPE HLT HOLX HD HON HRL HST HWM HPQ HUM HBAN HII IBM IEX IDXX ITW ILMN INCY IR INTC ICE IFF IP IPG INTU ISRG IVZ IPGP IQV IRM JBHT JKHY J SJM JNJ JCI JPM JNPR KSU K KEY KEYS KMB KIM KMI KLAC KHC KR LHX LH LRCX LW LVS LEG LDOS LEN LNC LIN LYV LKQ LMT L LOW LUMN LYB MTB MRO MPC MKTX MAR MMC MLM MAS MA MTCH MKC MCD MCK MDT MRK MET MTD MGM MCHP MU MSFT MAA MRNA MHK TAP MDLZ MPWR MNST MCO MS MSI MSCI NDAQ NTAP NFLX NWL NEM NWSA NWS NEE NKE NI NSC NTRS NOC NLOK NCLH NRG NUE NVDA NVR NXPI ORLY OXY ODFL OMC OKE ORCL OGN OTIS PCAR PKG PH PAYX PAYC PYPL PENN PNR PEP PKI PFE PM PSX PNW PXD PNC POOL PPG PPL PFG PG PGR PLD PRU PTC PEG PSA PHM PVH QRVO QCOM PWR DGX RL RJF RTX O REG REGN RF RSG RMD RHI ROK ROL ROP ROST RCL SPGI CRM SBAC SLB STX SEE SRE NOW SHW SPG SWKS SNA SO LUV SWK SBUX STT STE SYK SYF SNPS SYY TMUS TROW TTWO TPR TGT TEL TDY TFX TER TSLA TXN TXT COO HIG HSY MOS TRV DIS TMO TJX TSCO TT TDG TRMB TFC TYL TSN USB UDR ULTA UAA UA UNP UAL UPS URI UNH UHS VLO VTR VRSN VRSK VZ VRTX VFC VTRS V VNO VMC WRB GWW WAB WBA WMT WM WAT WEC WFC WELL WST WDC WU WRK WY WHR WMB WYNN XEL XLNX XYL YUM ZBRA ZBH ZION ZTS";
let ticklist = tickString.split(" ");
//const tickString = "SPY AAPL";
//const ticklist = ["SPY", "AAPL"];
// make new global var to store current JSON response to generate graph
let graphJSON;

// Use this onload function to load all tickers in S&P on backend, minimalizes API calls

window.onload = function() { // when website loads run this function (this is called an anonymous function)
 const xhr = new XMLHttpRequest();

 xhr.open("GET", `http://localhost:5000/ONLOAD`);
 xhr.send();
 xhr.onload = function() {
   if (xhr.status === 200) {
     console.log('Request was successful!');
   } else {
     // Request failed or returned an error
     console.error('Error:', xhr.status, xhr.statusText);
   }
 };
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
  var RSIOBnum = document.getElementById("stv1").value;
  console.log("You have searched for " + RSIOBnum + " stocks with an overbought RSI");
  var max_rsi = new Array(RSIOBnum);
  clearStockLines();
  hidesponch();



  // request for RSI data

  const xhr1 = new XMLHttpRequest();
  xhr1.open("GET", `http://localhost:5000/RSI`);
  xhr1.send();

  xhr1.onload = function() {
    const body = JSON.parse(xhr1.responseText); // parse response

    let ptDate = body[ body.length - 1 ]["('Date', '')"];
    for (let t in ticklist) {
      let ptVolume = body[body.length - 1][ "('Volume', '" + ticklist[t] + "')" ];
      let ptHigh = body[body.length - 1][ "('High', '" + ticklist[t] + "')" ];
      let ptLow = body[body.length - 1][ "('Low', '" + ticklist[t] + "')" ];
      let ptOpen = body[body.length - 1][ "('Open', '" + ticklist[t] + "')" ];
      let ptClose = body[body.length - 1][ "('Close', '" + ticklist[t] + "')" ];
      let ptAdjClose = body[body.length - 1][ "('Adj Close', '" + ticklist[t] + "')" ];
      let ptRSI = body[body.length - 1][ ticklist[t] ];

      if (ptRSI > 70) {
        let stockLine = document.createElement('p');
        stockLine.textContent = `Ticker: ${ticklist[t]} | RSI: ${ptRSI} | Price: ${ptClose} `;
        let stockbox = document.createElement('input');
        stockbox.type = "value";
        stockbox.id = `stocknum` + i;
        stockbox.placeholder = "How many stocks?";
        stockbox.style.width = 120 + "px";
        var button = document.createElement('button');
        button.textContent = 'Add to portfolio';

        button.addEventListener('click', function(addData) {
          let stocksbought = document.getElementById(`stocknum`+i).value; 
          let titleInput = ticklist[t];
          let moneyInput = ptClose;
      
          let title = ticklist[t];
          let money = ((ptClose) * (stocksbought));
        
          if (title !== "" && !isNaN(money) && money > 0) {
            dataPoints.push({ title, money });
            titleInput.value = "";
            moneyInput.value = "";
            renderChart();
            renderDataList();
            console.log(`Button ${i + 1} clicked.`);
            console.log(`you have added ${stocksbought} stocks of ${jsonData[i].Ticker} to your portfolio`);
          }
        });

        // You can access jsonData[i] or perform any other actions
        stockLine.appendChild(stockbox);
        stockLine.appendChild(button);
        textContent.appendChild(stockLine);
      }
    }
  } 
});


var scanRSIUB = document.getElementById("stvb2");//create var for RSI underbought

scanRSIUB.addEventListener("click", function() {//Create event listner that prints out the number of stocks searched for according to input value
 var RSIUBnum = document.getElementById("stv2").value;
 console.log("You have searched for " + RSIUBnum + " stocks with an underbought RSI");
 clearStockLines();
 hidesponch();

// request for RSI data
// const xhr2 = new XMLHttpRequest();
// xhr2.open("GET", `http://localhost:5000/RSI`);
// xhr2.send();

// xhr2.onload = function() {
//   const body = JSON.parse(xhr2.responseText); // parse response
//   console.log(body); 
//   for (let i in body) {
//     let ptDate = body[i]['Date'];
//     let ptVolume = body[i]['Volume'];
//     let ptHigh = body[i]['High'];
//     let ptLow = body[i]['Low'];
//     let ptOpen = body[i]['Open'];
//     let ptClose = body[i]['Close'];
//     let ptAdjClose = body[i]['Adj Close'];
//     let shortEMA = body[i]['EMA_' + timeEMAsp];
//     let longEMA = body[i]['EMA_' + timeEMAlp];
//     // if (i == 5) { 
//     //   console.log(ptDate);
//     //   console.log(ptVolume);
//     //   console.log(ptHigh);
//     //   console.log(ptLow);
//     //   console.log(ptOpen);
//     //   console.log(ptClose);
//     //   console.log(ptAdjClose);
//     //   console.log(shortEMA);
//     //   console.log(longEMA);
//     // } 
//   }
// }


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
 // get params
 var tickSMA = document.getElementById("tickSMA").value;
 var timeSMAsp = document.getElementById("SMAtimesp").value;
 var timeSMAlp = document.getElementById("SMAtimelp").value;
 console.log(`you have searched for ${tickSMA}, showing an exponential moving average with a short time period of ${timeSMAsp} days and a long moving average of ${timeSMAlp} days`);
 clearStockLines();

 // easter egg
 hidesponch();
 if (tickSMA === "sponch") { sponch(); }

 let foundMatch = false;
 for (let i in ticklist) {
   if (ticklist[i] == tickSMA.toUpperCase()) {
     foundMatch = true;
     break;}}
 if (foundMatch) {
     console.log("We found your stock!");
     let stockLine = document.createElement('p');
     //stockLine.textContent = `Ticker: ${tickSMA.toUpperCase()} | MACD Downtrend: ${jsonData[i].MACDDT} | Price: ${jsonData[i].PRICE} `;
     
 } else {
   console.log("We could not find your stock, make sure your search is case-sensitive");
 }

 // request for SMA data

 const xhr5 = new XMLHttpRequest();
 xhr5.open("GET", `http://localhost:5000/SMA?tickSMA=${tickSMA.toUpperCase()}&SMAtimesp=${timeSMAsp}&SMAtimelp=${timeSMAlp}`);
 xhr5.send();

 xhr5.onload = function() {
  const body = JSON.parse(xhr5.responseText); // parse response
  graphJSON = body;
  console.log(body); 
  for (let i in body) {
    let ptDate = body[i]['Date'];
    let ptVolume = body[i]['Volume'];
    let ptHigh = body[i]['High'];
    let ptLow = body[i]['Low'];
    let ptOpen = body[i]['Open'];
    let ptClose = body[i]['Close'];
    let ptAdjClose = body[i]['Adj Close'];
    let shortEMA = body[i]['SMA_' + timeSMAsp];
    let longEMA = body[i]['SMA_' + timeSMAlp];
  }
  var chartData = [];
  for (var i = 0; i < body.length; i++) {
      chartData.push([
          new Date(body[i].Date),
          body[i].Open,
          body[i].High,
          body[i].Low,
          body[i].Close,
          body[i].SMA_20, // Add SMA_20 value to the chart data
          body[i].SMA_50 // Add SMA_50 value to the chart data
      ]);
  }
  
  var traceCandlestick = {
      x: chartData.map(function(item) { return item[0]; }),
      close: chartData.map(function(item) { return item[4]; }),
      high: chartData.map(function(item) { return item[2]; }),
      low: chartData.map(function(item) { return item[3]; }),
      open: chartData.map(function(item) { return item[1]; }),
      type: 'candlestick',
      xaxis: 'x',
      yaxis: 'y'
  };
  
  var traceSMA20 = {
      x: chartData.map(function(item) { return item[0]; }),
      y: chartData.map(function(item) { return item[5]; }), // Use SMA_20 values for y-axis
      mode: 'lines',
      name: `${timeSMAsp}`,
      xaxis: 'x',
      yaxis: 'y2'
  };
  
  var traceSMA50 = {
      x: chartData.map(function(item) { return item[0]; }),
      y: chartData.map(function(item) { return item[6]; }), // Use SMA_50 values for y-axis
      mode: 'lines',
      name: `${timeSMAlp}`,
      xaxis: 'x',
      yaxis: 'y2'
  };
  
  var layout = {
      title: `${tickSMA} SMA Graph`,   //import name
      dragmode: 'zoom',
      showlegend: true,
      xaxis: {
          rangeslider: {
              visible: false
          }
      },
      yaxis: {
          autorange: true,
          type: 'linear',
          title: 'Price'
      },
      yaxis2: {
          overlaying: 'y',
          side: 'right',
          autorange: true,
          type: 'linear',
          title: 'SMA'
      }
  };
  
  Plotly.newPlot('chart', [traceCandlestick, traceSMA20, traceSMA50], layout);
}
})


var scanEMA = document.getElementById("EMAb");

scanEMA.addEventListener("click", function(){
 // retrieve params from html
 var tickEMA = document.getElementById("tickEMA").value;
 var timeEMAsp = document.getElementById("EMAtimesp").value;
 var timeEMAlp = document.getElementById("EMAtimelp").value;
 console.log(`you have searched for ${tickEMA}, showing an exponential moving average with a short time period of ${timeEMAsp} days and a long moving average of ${timeEMAlp} days`);
 clearStockLines();
 
 // easter egg
 hidesponch();
 if (tickEMA === "sponch") { sponch(); }
   
 let foundMatch = false;
 for (let i in ticklist) {
   if (ticklist[i] == tickEMA.toUpperCase()) {
     foundMatch = true;
     break;}}
 if (foundMatch) {
     console.log("We found your stock!");
     

// request for EMA data
const xhr6 = new XMLHttpRequest();
xhr6.open("GET", `http://localhost:5000/EMA?tickEMA=${tickEMA}&EMAtimesp=${timeEMAsp}&EMAtimelp=${timeEMAlp}`);
xhr6.send();

xhr6.onload = function() {
  const body = JSON.parse(xhr6.responseText); // parse response
  graphJSON = body;
  console.log(body); 
  for (let i in body) {
    let ptDate = body[i]['Date'];
    let ptVolume = body[i]['Volume'];
    let ptHigh = body[i]['High'];
    let ptLow = body[i]['Low'];
    let ptOpen = body[i]['Open'];
    let ptClose = body[i]['Close'];
    let ptAdjClose = body[i]['Adj Close'];
    let shortEMA = body[i]['EMA_' + timeEMAsp];
    let longEMA = body[i]['EMA_' + timeEMAlp];
  }
  var chartData = [];
  for (var i = 0; i < body.length; i++) {
      chartData.push([
          new Date(body[i].Date),
          body[i].Open,
          body[i].High,
          body[i].Low,
          body[i].Close,
          body[i].EMA_20, // Add SMA_20 value to the chart data
          body[i].EMA_50 // Add SMA_50 value to the chart data
      ]);
  }
  
  var traceCandlestick = {
      x: chartData.map(function(item) { return item[0]; }),
      close: chartData.map(function(item) { return item[4]; }),
      high: chartData.map(function(item) { return item[2]; }),
      low: chartData.map(function(item) { return item[3]; }),
      open: chartData.map(function(item) { return item[1]; }),
      type: 'candlestick',
      xaxis: 'x',
      yaxis: 'y'
  };

  var traceEMA20 = {
      x: chartData.map(function(item) { return item[0]; }),
      y: chartData.map(function(item) { return item[5]; }), // Use SMA_20 values for y-axis
      mode: 'lines',
      name: `${timeEMAsp}`,
      xaxis: 'x',
      yaxis: 'y2'
  };

  var traceEMA50 = {
      x: chartData.map(function(item) { return item[0]; }),
      y: chartData.map(function(item) { return item[6]; }), // Use SMA_50 values for y-axis
      mode: 'lines',
      name: `${timeEMAlp}`,
      xaxis: 'x',
      yaxis: 'y2'
  };

  
  var layout = {
      title: `${tickEMA} EMA Graph`, // + stockname   //how to add stock Symbol
      dragmode: 'zoom',
      showlegend: true,
      xaxis: {
          rangeslider: {
              visible: false
          }
      },
      yaxis: {
          autorange: true,
          type: 'linear',
          title: 'Price'
      },
      yaxis2: {
          overlaying: 'y',
          side: 'right',
          autorange: true,
          type: 'linear',
          title: 'EMA'
      }
  };
  
  Plotly.newPlot('chart', [traceCandlestick, traceEMA20, traceEMA50], layout);
}

     let stockLine = document.createElement('p');
     //stockLine.textContent = `Ticker: ${tickEMA.toUpperCase()} | MACD Downtrend: ${jsonData[i].MACDDT} | Price: ${jsonData[i].PRICE} `;
    
 } else {
   console.log("We could not find your stock, make sure your search is case-sensitive");
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

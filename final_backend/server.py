from flask import Flask, jsonify, request
from flask_cors import CORS
import copy
import numpy as np
import pandas as pd
import yfinance as yf
from datetime import datetime, timedelta

app = Flask(__name__)
CORS(app)


# Global Variables --------------------------------------------------

# string stores all tickers for stocks in S&P 500; separated by whitespaces
spTickers = "MMM AOS ABT ABBV ABMD ACN ATVI ADM ADBE AAP AMD AES AFL A APD AKAM ALB ALK ARE ALGN ALLE LNT ALL GOOGL GOOG MO AMZN AMCR AEE AAL AEP AXP AIG AMT AWK AMP ABC AME AMGN APH ADI ANSS AON APA AAPL AMAT APTV ANET AJG AIZ T ATO ADSK ADP AZO AVB AVY BKR BAC BBWI BAX BDX BBY BIO TECH BIIB BLK BK BA BKNG BWA BXP BSX BMY AVGO BR BRO CHRW CDNS CZR CPB COF CAH KMX CCL CARR CTLT CAT CBOE CBRE CDW CE CNC CNP CDAY CF CRL SCHW CHTR CVX CMG CB CHD CI CINF CTAS CSCO C CFG CLX CME CMS KO CTSH CL CMCSA CMA CAG COP ED STZ CPRT GLW CTVA COST CTRA CCI CSX CMI CVS DHI DHR DRI DVA DE DAL XRAY DVN DXCM FANG DLR DFS DISH DG DLTR D DPZ DOV DOW DTE DUK DD DXC EMN ETN EBAY ECL EIX EW EA LLY EMR ENPH ETR EOG EFX EQIX EQR ESS EL ETSY RE EVRG ES EXC EXPE EXPD EXR XOM FFIV FAST FRT FDX FIS FITB FRC FE FISV FLT FMC F FTNT FTV FOXA FOX BEN FCX GPS GRMN IT GNRC GD GE GIS GM GPC GILD GPN GL GS HAL HBI HAS HCA PEAK HSIC HES HPE HLT HOLX HD HON HRL HST HWM HPQ HUM HBAN HII IBM IEX IDXX ITW ILMN INCY IR INTC ICE IFF IP IPG INTU ISRG IVZ IPGP IQV IRM JBHT JKHY J SJM JNJ JCI JPM JNPR K KEY KEYS KMB KIM KMI KLAC KHC KR LHX LH LRCX LW LVS LEG LDOS LEN LNC LIN LYV LKQ LMT L LOW LUMN LYB MTB MRO MPC MKTX MAR MMC MLM MAS MA MTCH MKC MCD MCK MDT MRK MET MTD MGM MCHP MU MSFT MAA MRNA MHK TAP MDLZ MPWR MNST MCO MS MSI MSCI NDAQ NTAP NFLX NWL NEM NWSA NWS NEE NKE NI NSC NTRS NOC NCLH NRG NUE NVDA NVR NXPI ORLY OXY ODFL OMC OKE ORCL OGN OTIS PCAR PKG PH PAYX PAYC PYPL PENN PNR PEP PKI PFE PM PSX PNW PXD PNC POOL PPG PPL PFG PG PGR PLD PRU PTC PEG PSA PHM PVH QRVO QCOM PWR DGX RL RJF RTX O REG REGN RF RSG RMD RHI ROK ROL ROP ROST RCL SPGI CRM SBAC SLB STX SEE SRE NOW SHW SPG SWKS SNA SO LUV SWK SBUX STT STE SYK SYF SNPS SYY TMUS TROW TTWO TPR TGT TEL TDY TFX TER TSLA TXN TXT COO HIG HSY MOS TRV DIS TMO TJX TSCO TT TDG TRMB TFC TYL TSN USB UDR ULTA UAA UA UNP UAL UPS URI UNH UHS VLO VTR VRSN VRSK VZ VRTX VFC VTRS V VNO VMC WRB GWW WAB WBA WMT WM WAT WEC WFC WELL WST WDC WU WRK WY WHR WMB WYNN XEL XYL YUM ZBRA ZBH ZION ZTS"
# spTickers = "MMM AOS ABT ABBV ATVI ADM" # ADBE AAP AMD AES AFL A APD AKAM ALB ALK ARE ALGN ALLE LNT ALL GOOGL GOOG MO AMZN AMCR AEE AAL AEP AXP AIG AMT AWK AMP ABC AME AMGN APH ADI ANSS AON APA AAPL AMAT APTV ANET AJG AIZ T ATO ADSK ADP AZO AVB AVY BKR BAC BBWI BAX BDX BBY BIO TECH BIIB BLK BK BA BKNG BWA BXP BSX BMY AVGO BR BRO CHRW CDNS CZR CPB COF CAH KMX CCL CARR CTLT CAT CBOE CBRE CDW CE CNC CNP CDAY CF CRL SCHW CHTR CVX CMG CB CHD CI CINF CTAS CSCO C CFG CLX CME CMS KO CTSH CL CMCSA CMA CAG COP ED STZ CPRT GLW CTVA COST CTRA CCI CSX CMI CVS DHI DHR DRI DVA DE DAL XRAY DVN DXCM FANG DLR DFS DISH DG DLTR D DPZ DOV DOW DTE DUK DD DXC EMN ETN EBAY ECL EIX EW EA LLY EMR ENPH ETR EOG EFX EQIX EQR ESS EL ETSY RE EVRG ES EXC EXPE EXPD EXR XOM FFIV FAST FRT FDX FIS FITB FRC FE FISV FLT FMC F FTNT FTV FOXA FOX BEN FCX GPS GRMN IT GNRC GD GE GIS GM GPC GILD GPN GL GS HAL HBI HAS HCA PEAK HSIC HES HPE HLT HOLX HD HON HRL HST HWM HPQ HUM HBAN HII IBM IEX IDXX ITW ILMN INCY IR INTC ICE IFF IP IPG INTU ISRG IVZ IPGP IQV IRM JBHT JKHY J SJM JNJ JCI JPM JNPR K KEY KEYS KMB KIM KMI KLAC KHC KR LHX LH";
# spTickers = "SPY AAPL"
# spTickList = ["SPY", "AAPL"]
# use spTickers string to create a list of all S&P 500 stock tickers
spTickList = spTickers.split(' ')
# use default dataframe constructor to initialize global dataframe variable
spDF = pd.DataFrame()


# Helper Functions --------------------------------------------------

# def winInit(tickers):
#     # tickers is a dictionary with key of ticker name and value of API return data
#     initTicks = yf.Tickers(tickers) # include tickers for all stocks in S&P or however many to load
#     return initTicks;

# helps to retrieve dataframes of stock information
def get_stock_data(stock, period, interval):
    ticker = stock
    yf.pdr_override()
    df = yf.download(tickers=stock, threads=True,interval=interval,period=period)
    df.reset_index(inplace=True) 
    # df['date'] = df['Date'].dt.date 
    df['Date'] = df['Date'].dt.strftime('%Y-%m-%d')
    
    return df

def calcRSI(data):

    df_list = list()
    df_list.append(data) # initialize df list to data arg
    for ticker in spTickList:
        delta = data['Close'][ticker].diff(1).dropna()

        # Create two copies of the Closing price Series
        delta_up = delta.copy()
        delta_down = delta.copy()
        delta_up[ delta_up < 0 ] = 0
        delta_down[ delta_down > 0 ] = 0

        # Calculate the rolling average of average up and average down
        avg_up = delta_up.rolling(14).mean()
        avg_down = delta_down.rolling(14).mean().abs()

        # Calculate RSI
        RSI = 100 * avg_up / (avg_up + avg_down)

        df_list.append(RSI)

    # combine all dataframes into a single dataframe
    df = pd.concat(df_list, axis=1)



    return df


# API Endpoints -----------------------------------------------------

@app.route('/ONLOAD')
def winOnload():
    # initialize spDF and spTickers global vars
    global spDF
    spDF = get_stock_data(spTickers, '10y', '1d')

    # print global stock dataframe
    print(spDF)
    print(spDF.tail().to_json(orient="records", indent=2))
    # print(spDF.head().to_json(orient="records", indent=2))
    
    return 'Initialization complete'

@app.route('/RSI')
def RSI():
    # get arguments from frontend
    scan_num = request.args.get('RSIUBnum')

    # use copy module to make a local copy of the global S&P 500 dataframe
    localSPDF = copy.copy(spDF)

    # Call RSI Helper Function to create dataframe for RSI values
    RSI_df = calcRSI(localSPDF)

    json_response = RSI_df.to_json(orient="records", indent=2)
    print(RSI_df.tail().to_json(orient="records", indent=2))

    return json_response

@app.route('/MACD')
def MACD():
    # use copy module to make a local copy of the global S&P 500 dataframe
    localSPDF = copy.copy(spDF)

    ## Calculate the Short Term Exponential Moving AverageShort
    shortEMA = localSPDF.Close.ewm(span=12, adjust=False).mean()

    ## Calculate the Long Term Exponential Moving Average
    longEMA = localSPDF.Close.ewm(span=26, adjust=False).mean()

    ## Calculate the Moving Average Convergence/Divergence (MACD)
    MACD = shortEMA - longEMA
    
    ## Calculate the signal line
    signal = MACD.ewm(span=9, adjust=False).mean()

    for i in spTickList:
        # for each ticker add a new column to the data frame MACD and SIGNAL line data
        localSPDF['MACD_' + i] = MACD[i]
        localSPDF["SIGNAL_" + i] = signal[i]

    # convert dataframe reqTick to JSON and return response
    json_response = localSPDF.to_json(orient="records", indent=2)
    print(localSPDF.tail(15).to_json(orient="records", indent=2))
    return json_response

@app.route('/SMA')
def SMA():
    # get arguments from frontend
    ticker = request.args.get('tickSMA')
    shortMA = request.args.get('SMAtimesp')
    longMA = request.args.get('SMAtimelp')

    # initialize variables for API call
    # end = datetime.now() # get current date today
    # start = end - timedelta(weeks=time) # find start date by using timedelta() to subract period from current date to 

    # use yfinance API to load information for the stock
    reqTick = get_stock_data(ticker, "10y", "1d")

    # add short and long MA data to the dataframe
    reqTick["SMA_" + shortMA] = reqTick['Close'].rolling(int(shortMA)).mean()
    reqTick["SMA_" + longMA] = reqTick['Close'].rolling(int(longMA)).mean()

    # convert dataframe reqTick to JSON and return response
    json_response = reqTick.to_json(orient="records", indent=2)
    print(reqTick.tail(15).to_json(orient="records", indent=2))
    return json_response

@app.route('/EMA')
def EMA():
    # get arguments from frontend
    ticker = request.args.get('tickEMA')
    shortMA = request.args.get('EMAtimesp')
    longMA = request.args.get('EMAtimelp')

    # use yfinance API to load information for the stock
    reqTick = get_stock_data(ticker, "10y","1d")

    # add short and long EMA data to the dataframe
    reqTick["EMA_" + shortMA] = reqTick['Close'].ewm(span = int(shortMA)).mean()
    reqTick["EMA_" + longMA] = reqTick['Close'].ewm(span = int(longMA)).mean()

    # convert dataframe reqTick to JSON and return response
    json_response = reqTick.to_json(orient="records", indent=2)
    print(reqTick.tail(15).to_json(orient="records", indent=2))
    return json_response


if __name__ == '__main__':
    app.run(host='localhost', port=5000)
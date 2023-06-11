from flask import Flask, jsonify, request
import numpy as np
import pandas as pd
import yfinance as yf
from datetime import datetime, timedelta

app = Flask(__name__)

# Helper Functions --------------------------------------------------

# def winOnload():
#     # tickers is a dictionary with key of ticker name and value of API return data
#     tickers = yf.Tickers('msft aapl goog') # include tickers for all stocks in S&P or however many to load
#     return tickers;

# helps to retrieve dataframes of stock information
def get_stock_data(stock, period, interval):
    ticker = stock
    yf.pdr_override()
    df = yf.download(tickers=stock, interval=interval,period=period)
    df.reset_index(inplace=True) 
    
    return df

# def RSI(data, window=14, adjust=False):
#     delta = data['Close'].diff(1).dropna()
#     loss = delta.copy()
#     gains = delta.copy()

#     gains[gains < 0] = 0
#     loss[loss > 0] = 0

#     gain_ewm = gains.ewm(com=window - 1, adjust=adjust).mean()
#     loss_ewm = abs(loss.ewm(com=window - 1, adjust=adjust).mean())

#     RS = gain_ewm / loss_ewm
#     RSI = 100 - 100 / (1 + RS)

#     return RSI

# API Endpoints -----------------------------------------------------

@app.route('/')
def hello():
    return 'Hello, Flask!'

@app.route('/RSI')
def RSI():
    # get arguments from frontend
    scan_num = request.args.get('RSIUBnum')
    # time = int(time) # convert time to integer


    # initialize variables for API call
    # end = datetime.now() # get current date today
    # start = end - timedelta(weeks=time) # find start date by using timedelta() to subract period from current date to 

    # use yfinance API to load information for the stock
    reqTick = get_stock_data("SPY AAPL", "1y","1d")
    
    # reqTick.head()
    # define list for short (20 day) and long (50 day) SMAs
    # SMAs=[20, 50]

    # iterate over SMAs and use rolling() function in the pre-defined time window for the adjusted close 
    # price which is in the 5th column of the data frame; each SMA will is then added as a new column
    # for i in SMAs:
    #     = reqTick.iloc[:,4].rolling(i).mean()

    # print(reqTick['Close'])
    # print(reqTick['Close'].rolling(13))
    # print(reqTick['Close'].rolling(13).mean())

    # reqTick["SMA_20"] = reqTick['Close'].rolling(20).mean()
    # reqTick["SMA_50"] = reqTick['Close'].rolling(50).mean()

    print(reqTick.head())
    print(reqTick.head().to_json(orient="records"))

    return jsonify(reqTick)

# @app.route('/MACD')
# def MACD():
#     return 'Hello, MACD!'

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
    reqTick = get_stock_data(ticker, "1y","1d")

    # add short and long MA data to the dataframe
    reqTick["SMA_" + shortMA] = reqTick['Close'].rolling(int(shortMA)).mean()
    reqTick["SMA_" + longMA] = reqTick['Close'].rolling(int(longMA)).mean()

    # convert dataframe reqTick to JSON and return response
    json_response = reqTick.to_json(orient="records", indent=2)
    return json_response

# @app.route('/EMA')
# def EMA():
#     return 'Hello, EMA!'

if __name__ == '__main__':
    app.run(host='localhost', port=5000)
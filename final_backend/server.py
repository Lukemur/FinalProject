from flask import Flask, jsonify, request
import pandas as pd
import yfinance as yf
from datetime import datetime, timedelta

app = Flask(__name__)

# Helper Functions --------------------------------------------------

# def winOnload():
#     # tickers is a dictionary with key of ticker name and value of API return data
#     tickers = yf.Tickers('msft aapl goog') # include tickers for all stocks in S&P or however many to load
#     return tickers;


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

# @app.route('/RSI')
# def MACD():
#     return 'Hello, RSI!'

# @app.route('/MACD')
# def MACD():
#     return 'Hello, MACD!'

@app.route('/SMA')
def SMA():
    # get arguments from frontend
    ticker = request.args.get('tickSMA')
    time = request.args.get('SMAtime')
    time = int(time) # convert time to integer

    print(ticker)
    print(time)


    # initialize variables for API call
    end = datetime.now() # get current date today
    start = end - timedelta(weeks=time) # find start date by using timedelta() to subract period from current date to 

    # use yfinance API to load information for the stock
    reqTick = yf.download(ticker, start, end, interval='1d')
    reqTick.head()

    # define list for short (20 day) and long (50 day) SMAs
    SMAs=[20, 50]

    # iterate over SMAs and use rolling() function in the pre-defined time window for the adjusted close 
    # price which is in the 5th column of the data frame; each SMA will is then added as a new column
    for i in SMAs:
        reqTick["SMA_"+str(i)]= reqTick.iloc[:,4].rolling(window=i).mean()

    print(reqTick)

    return jsonify(reqTick)

# @app.route('/EMA')
# def EMA():
#     return 'Hello, EMA!'

if __name__ == '__main__':
    app.run(host='localhost', port=5000)
import yfinance as yf
import pandas as pd
import datetime as dt 
def getStockdata(s,sd,ed):
    stock=yf.Ticker(s)
    req = stock.history(start=sd, end=ed, interval="1d")
    return req

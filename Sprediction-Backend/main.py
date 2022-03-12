#================================Import the Libraries======================================
from urllib import response
from fastapi import FastAPI,Response, status
from pydantic import BaseModel
import datetime as dt
import pandas as pd
import os
import numpy as np
from sklearn.preprocessing import StandardScaler
import yfinance as yf
import tensorflow as tf

#=======================================Create a FastAPI App===============================
app = FastAPI()

#================================Schema Validation=========================================

class PlotData(BaseModel):
    stockcode:str
    startdate:str
    enddate:str
    
class ForecastData(BaseModel):
    stockcode:str
    startdate:str
    enddate:str
    ndays:int

#===========================Endpoint 1:Function to Forecast Stock Prices===============================

def Forecast(code,data,scaler,window_size,ndays):
    #Pre-Processing user data
    df1=[]
    scaler=StandardScaler()
    raw = data['Close'][len(data) - ndays - window_size:].values
    raw = raw.reshape(-1,1)
    scaler_data=scaler.fit_transform(raw)
    raw = scaler.transform(raw)
    X_predict = []
    for i in range(window_size, raw.shape[0]):
        X_predict.append(raw[i-window_size:i, 0])
    X_predict = np.array(X_predict)
    X_predict = np.reshape(X_predict, (X_predict.shape[0], X_predict.shape[1], 1))
    #loading the predefined Model
    model = tf.keras.models.load_model("./Models/%s.h5"%code)
    #Predicting the prices
    result=model.predict(X_predict)
    res = scaler.inverse_transform(result)
    return res.tolist()
#==============================Function to get Historical Stock Data===================================

def getStockdata(s,sd,ed):
    stock=yf.Ticker(s)
    req = stock.history(start=sd, end=ed, interval="1d")
    return req

#=========================Validating input data=======================================================
def validate(c,s,e):
    symbolList=['AAPL','MSFT','GOOG','ADBE','ORCL','CRM','SAP','IBM','ADP','VMW','SNOW','SNPS','CDNS','ZS','MDB','SPLK','PATH','JNPR','FB']
    if c not in symbolList:
        return False
    elif(int(s[:4])>int(e[:4])):
        
        return False
    elif(int(s[5:7])>int(e[5:7])and int(s[:4])==int(e[:4])):
        
        return False
    elif(int(s[8:])>int(e[8:])and int(s[:4])==int(e[:4]) and int(s[5:7])==int(e[5:7]) ):
        
        return False
    else:
        return True

#=========================Setting up the Default route=================================================

@app.get('/')
def root():
    return {"message":"This is the home page"}


#=====================Endpoint 1: Responding to request for Historical Data===========================

@app.post('/api/plotdata')
def plotdata(post :PlotData ,response :Response):
    if not validate(post.stockcode,post.startdate,post.enddate):
        response.status_code=status.HTTP_400_BAD_REQUEST
        return {"message":"StockCode doesnt exist"}
    df=getStockdata(post.stockcode,post.startdate,post.enddate)
    return {"history":df['Close']}

#=====================Endpoint 2: Responding to request for Forecasting Data===========================

@app.post('/api/forecast')
def forecast(forecastdata : ForecastData,response :Response):
    if not validate(forecastdata.stockcode,forecastdata.startdate,forecastdata.enddate):
        response.status_code=status.HTTP_400_BAD_REQUEST
        return {"message":"StockCode doesnt exist"}
    res=[]
    stock=yf.Ticker(forecastdata.stockcode)
    df = stock.history(start="2018-01-01",interval="1d")
    dfp=getStockdata(forecastdata.stockcode,forecastdata.startdate,forecastdata.enddate)
    df1=Forecast(code=forecastdata.stockcode,data=df,scaler=StandardScaler(),window_size=100,ndays=forecastdata.ndays)
    for i in df1:
        res.append(i[0])
    return {"fdata":res,'history':dfp['Close']}
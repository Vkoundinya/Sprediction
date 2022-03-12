from fastapi import FastAPI
from fastapi.params import Body
from pydantic import BaseModel
import datetime as dt
import pandas as pd
import os
from sklearn.preprocessing import StandardScaler 
import keras
import numpy as np
from getStockData import getStockdata

app = FastAPI()

class PlotData(BaseModel):
    stockcode:str
    startdate:str
    enddate:str
    
class ForecastData(BaseModel):
    stockcode:str
    startdate:str
    enddate:str
    ndays:int


   


@app.get('/')
def root():
    return {"message":"This is the home page"}

@app.post('/api/plotdata')
def plotdata(post :PlotData):
    df=getStockdata(post.stockcode,post.startdate,post.enddate)
    return df['Close']



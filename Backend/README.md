# Stock
This Repository corresponds to the backend server for a stock prdeiction Apllication.

It is modelled using FastAPI framework and is deployed on heroku . I have modelled an  LSTM Model to predict the stock prices and used the Yfinance API for Historcial Stock Data Acqusition.

The server responds to 2 kinds of requests from the user:
1----------> Sending only Historical Data to be Displayed on the front End

2-----------> Sending Historical Data as well as Forecast Data if the user requests for one.

Training a Single LSTM model wouldnt make sense as different stocks operate on different Prices . So pre trained Models are stored in the form of .h5 file extensions and the corresponding model to user's request is loaded and is used for prediction.

This is the first release and further improvements include automating the process of model traing while the markets are closed on a daily basis and forecasting the price  as much accurate as we can.

the link to the heroku server is https://stock--analysis.herokuapp.com/

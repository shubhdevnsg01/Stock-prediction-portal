from django.shortcuts import render
from rest_framework.views import APIView
from .serializers import StockPredictionSerializer
from rest_framework.response import Response
from rest_framework import status
import pandas as pd
import matplotlib.pyplot as plt
import yfinance as yf
import numpy as np
from datetime import datetime
import os
from django.conf import settings
from .utils import save_plot
from sklearn.preprocessing import MinMaxScaler
from keras.models import load_model
from sklearn.metrics import mean_squared_error
from sklearn.metrics import r2_score
# Create your views here.
class StockPrediction(APIView):
    def post(self,req):
        serializer=StockPredictionSerializer(data=req.data)
        if serializer.is_valid():
            ticker=serializer.validated_data['ticker']
            print(ticker)
            ##fetch data
            now=datetime.now()
            start=datetime(now.year-10,now.month,now.day)
            end=now
            df=yf.download(ticker,start,end)
            if df.empty:
                return Response({"Erro no response found"})
            
            # print(df)
            df=df.reset_index()
            plt.switch_backend('AGG')
            plt.figure(figsize=(12,5))
            plt.plot(df.Close,label='Closing Price')
            plt.title(f'Closing price of {ticker}')
            plt.xlabel('Days')
            plt.ylabel('Close price')
            plt.legend()

            plot_image_path=f'{ticker}_plot.png'
            plot_image=save_plot(plot_image_path)

            ma100=df.Close.rolling(100).mean()
            plt.switch_backend('AGG')
            plt.figure(figsize=(12,5))
            plt.plot(df.Close,label='Closing Price')
            plt.plot(ma100,'r',label='Moving Average')
            plt.title(f'100 days of Moving Average of {ticker}')
            plt.xlabel('Days')
            plt.ylabel('Moving average of 100')
            plt.legend()

            plot_100_dma_image_path=f'{ticker}_ma100.png'
            plot_100dma_image=save_plot(plot_100_dma_image_path)

            ma200=df.Close.rolling(200).mean()
            plt.switch_backend('AGG')
            plt.figure(figsize=(12,5))
            plt.plot(df.Close,label='Closing Price')
            plt.plot(ma200,'r',label='Moving Average')
            plt.title(f'200 days of Moving Average of {ticker}')
            plt.xlabel('Days')
            plt.ylabel('Moving average of 200 ')
            plt.legend()
            
            plot_200_dma_image_path=f'{ticker}_ma200.png'
            plot_200dma_image=save_plot(plot_200_dma_image_path)

            #splitting data
            data_training=pd.DataFrame(df.Close[0:int(len(df)*.7)])
            data_testing=pd.DataFrame(df.Close[int(len(df)*.7):int(len(df))])
            #scaling down to 0 and 1
            scaler=MinMaxScaler(feature_range=(0,1))

            #Load ML model
            model=load_model('stock_prediction_model.keras')

            #preparing test data
            past_100_days=data_training.tail(100)
            final_df=pd.concat([past_100_days,data_testing],ignore_index=True)
            input_data=scaler.fit_transform(final_df)

            x_test=[]
            y_test=[]
            for i in range(100,input_data.shape[0]):
                x_test.append(input_data[i-100:i])
                y_test.append(input_data[i,0])
            
            x_test=np.array(x_test)
            y_test=np.array(y_test)
            #making predictions
            y_predicted=model.predict(x_test)

            #Scaling back to Original Prices
            y_predicted = scaler.inverse_transform(y_predicted.reshape(-1, 1)).flatten()
            y_test = scaler.inverse_transform(y_test.reshape(-1, 1)).flatten()

            #Plotting of Prediction
            plt.switch_backend('AGG')
            plt.figure(figsize=(12,5))
            plt.plot(y_test,'g',label='Real Price')
            plt.plot(y_predicted,'r',label='Predicted Price')
            plt.title(f'Final Prediction for {ticker}')
            plt.xlabel('Days')
            plt.ylabel('Price')
            plt.legend()

            plot_final=f'{ticker}_final.png'
            plot_final_image=save_plot(plot_final)

            #Model Evaluation
            mse=mean_squared_error(y_test,y_predicted)
            rmse=np.sqrt(mse)
            r2=r2_score(y_test,y_predicted)


            return Response({'status':'Success',
                             'plot_image':plot_image,
                             'plot_100dma_image':plot_100dma_image,
                             'plot_200dma_image':plot_200dma_image,
                             'plot_final_image':plot_final_image,
                             'mse':mse,
                             'rmse':rmse,
                             'r2':r2})
            
        


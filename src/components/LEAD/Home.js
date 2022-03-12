import React from 'react'
import "./Home.css"
import Table1 from "../Table/Table"
import { useNavigate } from "react-router-dom";
import axios from 'axios';
const Home = () => {
    let navigate = useNavigate();
    const formSubmit = e => {
        e.preventDefault();
        let axiosConfig = {
            'Content-Type': 'application/json;charset=UTF-8',
            'Access-Control-Allow-Origin': '*',
            'Access-Control-Allow-Methods': 'GET, POST, PATCH, PUT, DELETE, OPTIONS',
            'Access-Control-Allow-Headers': 'Origin, Content-Type, X-Auth-Token'
        };
        if (e.nativeEvent.submitter.name === "generate") {
            console.log(e.target.startdate.value)
            const plotdata = { "stockcode": e.target.stockcode.value, "startdate": e.target.startdate.value, "enddate": e.target.enddate.value };
            console.log(plotdata)
            axios.post('https://stock--analysis.herokuapp.com/api/plotdata', plotdata, { headers: axiosConfig })
                .then(function (response) {
                    console.log(response);
                    const keys = Object.keys(response.data.history)
                    for (let i = 0; i < keys.length; i++) {
                        keys[i] = keys[i].slice(0, 10)
                    }
                    const rdata = Object.values(response.data.history);
                    console.log(keys, rdata)
                    navigate('/PlotData', { state: { 'labels': keys, 'data': rdata } });
                })

            console.log("Generate button");


        }
        else {
            const forecastdata = { "stockcode": e.target.stockcode.value, "startdate": e.target.startdate.value, "enddate": e.target.enddate.value, "ndays": e.target.daycount.value };
            console.log(forecastdata)
            axios.post('https://stock--analysis.herokuapp.com/api/forecast', forecastdata, { headers: axiosConfig })
                .then(function (response) {
                    const keys = Object.keys(response.data.history)
                    for (let i = 0; i < keys.length; i++) {
                        keys[i] = keys[i].slice(0, 10)
                    }
                    const rdata = Object.values(response.data.history)
                    const fdata = response.data.fdata
                    console.log(rdata)
                    console.log(fdata)
                    navigate('/ForecastPlot', { state: { 'labels': keys, 'pdata': rdata, 'fdata': fdata } });
                })
            console.log("forecast button");
        }
    }
    return (
        <>
            <div className='home' id='Home'>
                <a href="https://wa.me/+917780183667" target="_blank" rel="noreferrer"><button className='btn_shadow hire'>Text me</button></a>
                <div className='container top'>
                    <div className='heading'>
                        <h2>Stock Visualization and Prediction </h2>
                    </div>
                    <p>
                        You can select any of the stocks displayed in the table on the left and check the stock price between dates and can get the prediction as per your requirement
                    </p>
                    <div className='grid'>
                        <div className='container left'>
                            <Table1 />
                        </div>
                        <div className='container d_flex box_shadow right'>
                            <form onSubmit={formSubmit}>
                                <div className='input row'>
                                    <span>Code of the Stock :</span>
                                    <input type='text' name='stockcode' placeholder='Stock Code' style={{textTransform:"uppercase"}}/>
                                </div>
                                <div className='input row'>
                                    <span >Date Selector :</span>
                                    <div className='date-selector inline'>
                                        <input type='date' name='startdate' placeholder='Start date' />
                                        <input type='date' name='enddate' placeholder='End date(defaults to today)' />
                                    </div>
                                    <button className='generate  btn_shadow generate_graph' name='generate'  >Generate</button>

                                </div>
                                <div className='input row'>
                                    <span>Number of days :</span>
                                    <input type='number' name='daycount' placeholder=' Forecast duration' />
                                    <button className='btn_shadow forecast_stock' name="forecast">Forecast</button>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default Home

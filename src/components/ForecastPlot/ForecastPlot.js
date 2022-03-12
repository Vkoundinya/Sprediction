import React from 'react'
import { useLocation } from 'react-router-dom'
import { LineChart, Line, CartesianGrid, XAxis, YAxis, Tooltip, Legend } from 'recharts';
import { useNavigate } from 'react-router-dom';
import './ForecastPlot.css';
function ForecastPlot() {
  let navigate = useNavigate();
  const location = useLocation();
  const labels = location.state.labels
  const pdata = location.state.pdata
  const fdata = location.state.fdata
  const userPlotData = []
  const forecastData = []
  for (let i = 0; i < pdata.length; i++) {
    userPlotData[i] = { 'Date': labels[i], 'Price': pdata[i] }
  }
  for (let i = 0; i < fdata.length; i++) {
    forecastData[i] = { "Day": i, 'Price': fdata[i] }
  }
  const CustomTooltip = ({ active, payload, label }) => {
    if (active && payload && payload.length) {
      return (
        <div className="custom-tooltip">
          <p className="intro" style={{ color: "red" }}>  Day  :  Stockprice   </p>
          <p className="label" style={{ color: "red" }}>{`${label} : ${Math.round(payload[0].value * 100) / 100}`}</p>
        </div>
      );
    }
    return null;
  };
  const gohome = e => {
    navigate('/Home');
  }
  console.log(userPlotData)
  return (
    <>
      <div className='forecast'>
        <div className='heading'>
          <h2>
            Requested Stock Forecast Data:
          </h2>
          <div className='inline'>
            <h3>Stock data :</h3>
            <h3>Forecast data :</h3>
          </div>
        </div>
        <button className='btn_shadow gohome' onClick={gohome}> Go home</button>
        <div className='container d_flex grid'>
          <div className='box_shadow'>
            <LineChart width={600} height={500} data={userPlotData} margin={{ top: 20, bottom: 5 }}>
              <CartesianGrid stroke="#ccc" strokeDasharray="5 5" />
              <Legend verticalAlign="top" height={36} />
              <XAxis dataKey="Date" />
              <YAxis type="number" domain={['auto', 'auto']} />
              <Line type="monotone" dataKey="Price" stroke="#8884d8" dot={false} />
              <Tooltip content={CustomTooltip} />
            </LineChart>
          </div>
          <div className='box_shadow'>
            <LineChart width={600} height={500} data={forecastData} margin={{ top: 20, bottom: 5, }}>
              <CartesianGrid stroke="#ccc" strokeDasharray="5 5" />
              <XAxis dataKey="Day" />
              <YAxis type="number" domain={['auto', 'auto']} />
              <Line type="monotone" dataKey="Price" stroke="#8884d8" dot={false} />
              <Tooltip content={CustomTooltip} />
            </LineChart>
          </div>
        </div>
      </div>
    </>
  )
}

export default ForecastPlot
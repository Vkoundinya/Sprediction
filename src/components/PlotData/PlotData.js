import React from 'react';
import { useLocation } from 'react-router-dom';
import { LineChart, Line, CartesianGrid, XAxis, YAxis, Tooltip, Legend } from 'recharts';
import { useNavigate } from "react-router-dom";
import './PlotData.css';
function PlotData() {
  let navigate = useNavigate();
  const location = useLocation();
  const labels = location.state.labels
  const pdata = location.state.data
  const userPlotData = []
  for (let i = 0; i <= pdata.length; i++) {
    userPlotData[i] = { 'Date': labels[i], 'Price': pdata[i] }
  }
  const gohome = e => {
    navigate('/Home');
  }
  const CustomTooltip = ({ active, payload, label }) => {
    if (active && payload && payload.length) {
      return (
        <div className="custom-tooltip">
          <p className="intro" style={{ color: "red" }}>  Date  :  Stockprice   </p>
          <p className="label" style={{ color: "red" }}>{`${label} : ${Math.round(payload[0].value * 100) / 100}`}</p>
          <p className="intro">{'Date'}</p>
        </div>
      );
    }

    return null;
  };
  return (
    <>
      <div className='plotdata'>
        <div className='heading'>
          <h2>
            Requested Stock Data:
          </h2>
        </div>
        <button className='btn_shadow gohome' onClick={gohome}> Go home  </button>
        <div className=' container d_flex'>
          <div className='box_shadow'>
            <LineChart width={700} height={500} data={userPlotData} margin={{ top: 5, right: 20, bottom: 5, left: 10 }}>
              <CartesianGrid stroke="#ccc" strokeDasharray="5 5" />
              <Legend verticalAlign="top" height={36} />
              <XAxis dataKey="Date" />
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

export default PlotData
import React from 'react'
import {BrowserRouter as Router,Route,Routes} from "react-router-dom";
import "./App.css"
import Home from './components/LEAD/Home'
import PlotData from './components/PlotData/PlotData'
import ForecastPlot from './components/ForecastPlot/ForecastPlot';
function App  () {
  return (
          <Router>
            <Routes>
            <Route exact path='/' element={<Home/>} />
              <Route exact path='/Home' element={<Home/>} />
              <Route exact path='/PlotData' element={<PlotData/>}/>
              <Route exact path='/ForecastPlot' element={<ForecastPlot/>}/>
             </Routes>
          </Router>
  )
}

export default App;
import React from 'react';
import './Table.css';
import table1 from "./TableApi"
import Card from './Card';
const Table1 = () => {
  return (
    <div className='container  d_flex'>
        <div className='grid'>
               <div className='container'>
                <div class="field">
		        <div class="scroll">
                </div>
                </div>
                </div>
        <div className='box_shadow '>
        <table className='table table-bordered table-striped'>
            <thead>
                <tr>
                    <th>Name of the Stock</th>
                    <th>Stock Code</th>
                </tr>

            </thead>
            <tbody>
                {table1.map((val,index) => {
                        return (<Card key={index} image={val.image} title={val.title} code={val.code}/>)
                    })}
            </tbody>


        </table>
        </div>
        </div>
        </div>
  )
}

export default Table1






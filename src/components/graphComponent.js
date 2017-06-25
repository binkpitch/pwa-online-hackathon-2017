import React from 'react'
import {BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer} from 'recharts'

const graphComponent = (props) => {
  return (
    <div>
      <ResponsiveContainer height={500} aspect={2}>
        <BarChart data={props.data}
          margin={{top: 5, right: 30, left: 20, bottom: 5}}>
          <XAxis dataKey='Number' />
          <YAxis />
          <CartesianGrid strokeDasharray='3 3' />
          <Tooltip />
          <Legend />
          <Bar dataKey='Votes' fill='#82ca9d' />
        </BarChart>
      </ResponsiveContainer>
    </div>
  )
}

export default graphComponent

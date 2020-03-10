import React, {useState} from 'react';

import {Line} from 'react-chartjs-2'

export const Graph = () => {
   const [data, setData] = useState({
      labels: ['1', '2', '3', '4', '5'],
      datasets: [
         {
            label: 'Orders',
            backgroundColor: 'rgba(0, 0, 255)',
            data: [4, 5, 1, 10, 32, 2, 12]
         },
         {
            label: 'New Orders',
            backgroundColor: 'rgba(0, 0,  255, 0.3)',
            data: [14, 15, 21, 0, 12, 4, 2]
         },
      ]
   });

   return (
      <div>
         <Line
            options={{
               responsive: true
            }}
            data={data}
            setDate={setData}
         />
      </div>
   )
}

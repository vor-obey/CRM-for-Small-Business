import React from 'react';

import {Line} from 'react-chartjs-2'
import {useTranslation} from "react-i18next";

export const Graph = () => {
   const { t } = useTranslation('');

   const Data = {
      labels: ['1', '2', '3', '4', '5'],
      datasets: [
         {
            label: t('ORDERS'),
            backgroundColor: 'rgba(0, 0, 255, 0.6)',
            data: [4, 5, 1, 10, 32, 2, 12]
         },
         {
            label: t('NEW_ORDERS'),
            backgroundColor: 'rgba(0, 0,  255, 0.4)',
            data: [14, 15, 21, 0, 12, 4, 2]
         },
      ]
   };

   return (
      <div>
         <Line
            options={{
               responsive: true
            }}
            data={Data}
         />
      </div>
   )
}

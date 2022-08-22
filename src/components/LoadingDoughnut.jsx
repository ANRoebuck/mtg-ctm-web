import React from "react";
import { Pie } from 'react-chartjs-2';

const LoadingDoughnut = ({ total, loading }) => {

  const loaded = total - loading;

  const data = {
    datasets: [{
      data: [loaded, loading],
      backgroundColor: ['green', 'black'],
      borderWidth: [1, 1],
      borderColor: 'black',
    }],
  };

  const options = {
    cutoutPercentage: 40,
    responsive: false,
    maintainAspectRatio: false,
    tooltips: {
      enabled: false
    }
  };

  const height = 80;
  const width = 80;

  return (
    <div className="loading-doughnut">
      { loaded === total ? null :
        <Pie data={data} options={options} height={height} width={width}/>
      }
    </div>
  )
};

export default LoadingDoughnut;

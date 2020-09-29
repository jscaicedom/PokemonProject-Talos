import React from 'react';
import { connect } from 'react-redux';
import modal from '../style/modal.module.css';
import { Bar } from 'react-chartjs-2';

const Graphics = ({ select, compare }) => {
  const data = {
    labels: select.descriptions[select.currentIndex].stats.map((stat) => {
      return stat.stat.name;
    }),
    datasets: [
      {
        label: select.currentPokemon,
        backgroundColor: 'rgb(56,120,107)',
        hoverBackgroundColor: 'rgba(56,120,107,0.5)',
        data: select.descriptions[select.currentIndex].stats.map((stat) => {
          return stat.base_stat;
        }),
      },
    ],
  };
  if (compare.isCompared) {
    data.datasets.push({
      label: compare.compareTo.name,
      backgroundColor: 'rgb(73,91,41)',
      hoverBackgroundColor: 'rgba(73,91,41,0.5)',
      data: compare.compareTo.stats.map((stat) => {
        return stat.base_stat;
      }),
    });
  }

  const options = {
    legend: {
      display: false,
    },
    maintainAspectRatio: false,
    responsive: true,
    title: {
      display: true,
      text: 'Stats',
      fontSize: 20,
      fontColor: 'black',
    },
    scales: {
      yAxes: [
        {
          ticks: {
            beginAtZero: true,
          },
        },
      ],
    },
  };
  return (
    <div className={'modal-footer ' + modal.graphics}>
      <Bar data={data} options={options} />
    </div>
  );
};

const mapStateToProps = (state) => {
  return {
    select: state.select,
    compare: state.compare,
  };
};

export default connect(mapStateToProps)(Graphics);

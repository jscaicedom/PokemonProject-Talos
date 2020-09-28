import React from 'react';
import { connect } from 'react-redux';
import general from '../style/general.module.css';
import modal from '../style/modal.module.css';
import { Bar } from 'react-chartjs-2';
import { removeCompare } from '../redux/actions/compareAction';

const Comparemodal = ({ select, compare, removeCompare }) => {
  if (select.isSelected) {
    if (compare.isCompared) {

      const handleClose = () => {
        if (compare.isCompared) { 
          removeCompare();
        }
      };

      const data = {
        labels: select.descriptions[select.currentIndex].stats.map(
          (stat) => {
            return stat.stat.name;
          }
        ),
        datasets: [
          {
            label: select.currentPokemon,
            backgroundColor: 'rgb(56,120,107)',
            hoverBackgroundColor: 'rgba(56,120,107,0.5)',
            data: select.descriptions[
              select.currentIndex
            ].stats.map((stat) => {
              return stat.base_stat;
            }),
          },
          {
            label: compare.compareTo.name,
            backgroundColor: 'rgb(73,91,41)',
            hoverBackgroundColor: 'rgba(73,91,41,0.5)',
            data: compare.compareTo.stats.map((stat) => {
              return stat.base_stat;
            }),
          }
        ],
      };

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
      const graphicsStyle = { width: '100%', height: '20rem' };

      return (
        <div
          className='modal fade'
          id='exampleModal'
          tabIndex='-1'
          role='dialog'
          aria-labelledby='exampleModalLabel'
          aria-hidden='true'
        >
          <div className='modal-dialog' role='document'>
            <div className='modal-content'>
              <div className='modal-header'>
                <h5 className='modal-title' id='exampleModalLabel'>
                  {select.currentPokemon.toUpperCase()}
                </h5>

                <h5 className='modal-title' id='exampleModalLabel'>
                  &nbsp; VS. {compare.compareTo.name.toUpperCase()}
                </h5>
                <button
                  type='button'
                  className='close'
                  data-dismiss='modal'
                  aria-label='Close'
                  onClick={handleClose}
                >
                  <span aria-hidden='true'>&times;</span>
                </button>
              </div>

              <div className='modal-body'>
                <div
                  className={
                    modal['images-container'] + ' ' + modal['general-container']
                  }
                >
                  <div className={general['image-container']}>
                    <img
                      className={general['pokemon-image']}
                      alt={select.currentPokemon}
                      src={
                        select.descriptions[select.currentIndex]
                          .sprites.front_default
                      }
                    />
                  </div>
                  <div className={general['image-container']}>
                    <img
                      className={general['pokemon-image']}
                      alt={compare.compareTo.name}
                      src={compare.compareTo.sprites.front_default}
                    />
                  </div>
                </div>
                <div className={modal['compare-container']}>
                  <div className={modal['compare-description']}>
                    <div className={modal['compare-text']}>
                      {
                        select.descriptions[select.currentIndex]
                          .height
                      }
                      m
                    </div>
                    <div className={modal['compare-text']}>
                      {
                        select.descriptions[select.currentIndex]
                          .weight
                      }
                      kg
                    </div>
                    <div className={modal['compare-text']}>
                      {select.genders[select.currentIndex]}
                    </div>

                    {select.descriptions[
                      select.currentIndex
                    ].abilities.map((ability) => (
                      <div
                        className={modal['compare-text']}
                        key={ability.ability.url}
                      >
                        {ability.ability.name}
                      </div>
                    ))}
                  </div>
                  <div className={modal['compare-description']}>
                    <div className={modal['modal-subtitle']}>Height</div>
                    <div className={modal['modal-subtitle']}>Weight</div>
                    <div className={modal['modal-subtitle']}>Gender</div>
                    <div className={modal['modal-subtitle']}>Abilities</div>
                  </div>
                  <div className={modal['compare-description']}>
                    <div className={modal['compare-text']}>
                      {compare.compareTo.height}m
                    </div>
                    <div className={modal['compare-text']}>
                      {compare.compareTo.weight}
                      kg
                    </div>
                    <div className={modal['compare-text']}>
                      {compare.gender}
                    </div>

                    {compare.compareTo.abilities.map((ability) => (
                      <div
                        className={modal['compare-text']}
                        key={ability.ability.url}
                      >
                        {ability.ability.name}
                      </div>
                    ))}
                  </div>
                </div>
              </div>
              <div className='modal-footer'
              style={graphicsStyle}>
              <Bar data={data} options={options} />
            </div>
            </div>
          </div>
        </div>
      );
    }
  }
  return <div></div>;
};

const mapStateToProps = (state) => {
  return {
    select: state.select,
    compare: state.compare,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    removeCompare: () => dispatch(removeCompare()),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Comparemodal);

import React from 'react';
import { connect } from 'react-redux';
import general from '../style/general.module.css';
import modal from '../style/modal.module.css';
import Graphics from './Graphics';
import Comparemodal from './Comparemodal';
import { comparePokemon, removeCompare } from '../redux/actions/compareAction';

const Modal = ({ select, compare, comparePokemon, removeCompare }) => {
  if (select.isSelected) {
    const handleCompare = () => {
      comparePokemon(
        select.descriptions[select.currentIndex],
        select.genders[select.currentIndex]
      );
    };
    const handleClose = () => {
      if (compare.isCompared) {
        removeCompare();
      }
    };

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
              {compare.isCompared ? (
                <h5 className='modal-title' id='exampleModalLabel'>
                  &nbsp; VS. {compare.compareTo.name.toUpperCase()}
                </h5>
              ) : (
                <button
                  onClick={handleCompare}
                  data-dismiss='modal'
                  className={modal['compare-button']}
                >
                  Compare to...
                </button>
              )}
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
            {compare.isCompared ? (
              <Comparemodal />
            ) : (
              <div className={'modal-body ' + modal['general-container']}>
                <div
                  className={
                    general['image-container'] + ' ' + modal['image-container']
                  }
                >
                  <img
                    className={general['pokemon-image']}
                    alt={select.currentPokemon}
                    src={
                      select.descriptions[select.currentIndex].sprites
                        .front_default
                    }
                  />
                </div>
                <div>
                  <p className={modal['description-container']}>
                    {select.description[select.currentIndex]}
                  </p>
                  <div className={modal['data-container']}>
                    <div className={modal['data-box']}>
                      <div className={modal['modal-subtitle']}>Height</div>
                      <div>
                        {select.descriptions[select.currentIndex].height}m
                      </div>
                    </div>
                    <div className={modal['data-box']}>
                      <div className={modal['modal-subtitle']}>Weight</div>
                      <div>
                        {select.descriptions[select.currentIndex].weight}
                        kg
                      </div>
                    </div>
                    <div className={modal['data-box']}>
                      <div className={modal['modal-subtitle']}>Gender</div>
                      <div>{select.genders[select.currentIndex]}</div>
                    </div>
                    <div className={modal['data-box']}>
                      <div className={modal['modal-subtitle']}>Abilities</div>
                      <ul>
                        {select.descriptions[select.currentIndex].abilities.map(
                          (ability) => (
                            <li key={ability.ability.url}>
                              {ability.ability.name}
                            </li>
                          )
                        )}
                      </ul>
                    </div>
                    <div className={modal['data-box']}>
                      <div className={modal['modal-subtitle']}>Type</div>
                      <ul>
                        {select.descriptions[select.currentIndex].types.map(
                          (type) => (
                            <li key={type.type.url}>{type.type.name}</li>
                          )
                        )}
                      </ul>
                    </div>
                  </div>
                </div>
              </div>
            )}
            <Graphics />
          </div>
        </div>
      </div>
    );
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
    comparePokemon: (description, gender) =>
      dispatch(comparePokemon(description, gender)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Modal);

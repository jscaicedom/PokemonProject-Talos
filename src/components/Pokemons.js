import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { fetchPokemons } from '../redux/actions/pokemonsActions';
import general from '../style/general.module.css';
import {
  fetchSelectedPokemon,
  existingPokemon,
} from '../redux/actions/clickAction';

const Pokemons = (props) => {
  useEffect(() => {
    props.dispatch(fetchPokemons(props.pokemons.offset));
  }, [props]);

  useEffect(() => {
    let off = 0;
    const handleScroll = () => {
      let scrollHeight = document.documentElement.scrollHeight;
      let scrollPosition =
        window.innerHeight + document.documentElement.scrollTop;
      if ((scrollHeight - scrollPosition) / scrollHeight === 0) {
        off = off + 20;
        props.dispatch(fetchPokemons(off));
      }
    };
    window.addEventListener('scroll', handleScroll);

    return () => {
      window.removeEventListener('scroll');
    };
  }, [props]);

  const handleClick = (e) => {
    const name = e.target.alt;
    let exist = false;
    if (props.select.descriptions.length > 0) {
      props.select.descriptions.forEach((pokemon, index) => {
        if (pokemon.name === name) {
          props.dispatch(existingPokemon(name, index));
          exist = true;
        }
      });
      if (!exist) {
        props.dispatch(fetchSelectedPokemon(name));
      }
    } else {
      props.dispatch(fetchSelectedPokemon(name));
    }
  };

  return (
    <div className={general['general-content']}>
      <div className={general['pokemons-container']}>
        {props.pokemons.searchedPokemons.map((pokemon) => (
          <div
            className={general['pokemon-container']}
            key={`${pokemon.name}-${pokemon.index}`}
            onClick={handleClick}
          >
            <div className={general['image-container']}>
              <img
                className={general['pokemon-image']}
                alt={pokemon.name}
                src={`https://raw.githubusercontent.com/PokeAPI/sprites/146c91287ad01f6e15315bbd733fd7442c91fe6d/sprites/pokemon/${pokemon.index}.png`}
                data-toggle='modal'
                data-target='#exampleModal'
              />
            </div>
            <div className={general['pokemon-name']}>
              <p className={general['name-text']}>
                {pokemon.name.toUpperCase()}
              </p>
            </div>
          </div>
        ))}
      </div>
      {props.compare.isCompared ? (
        <div className={general['compare-card']}>
          <p className={general['compare-card-title']}> Comparing pokemon </p>
          <p className={general['compare-subtitle']}>
            {props.compare.compareTo.name.toUpperCase()}
          </p>
        </div>
      ) : (
        <div></div>
      )}
    </div>
  );
};

export default connect((state) => {
  return state;
})(Pokemons);

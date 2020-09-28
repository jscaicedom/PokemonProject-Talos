import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { fetchPokemons } from '../redux/actions/pokemonsActions';
import general from '../style/general.module.css';
import {
  fetchSelectedPokemon,
  getExistingPokemon,
} from '../redux/actions/clickAction';

const Pokemons = ({
  select,
  pokemons,
  compare,
  fetchPokemons,
  getExistingPokemon,
  fetchSelectedPokemon,
}) => {
  useEffect(() => {
    fetchPokemons(0);
  }, [fetchPokemons]);

  useEffect(() => {
    let off = 0;
    const handleScroll = () => {
      let scrollHeight = document.documentElement.scrollHeight;
      let scrollPosition =
        window.innerHeight + document.documentElement.scrollTop;
      if ((scrollHeight - scrollPosition) / scrollHeight === 0) {
        off = off + 20;
        fetchPokemons(off);
      }
    };
    window.addEventListener('scroll', handleScroll);

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, [fetchPokemons]);

  const handleClick = (event) => {
    const name = event.currentTarget.lastChild.children[0].textContent.toLowerCase();
    let exist = false;
    if (select.descriptions.length > 0) {
      select.descriptions.forEach((pokemon, index) => {
        if (pokemon.name === name) {
          getExistingPokemon(name, index);
          exist = true;
        }
      });
      if (!exist) {
        fetchSelectedPokemon(name);
      }
    } else {
      fetchSelectedPokemon(name);
    }
  };

  const getUrl = (index) => {
    const url = `https://raw.githubusercontent.com/PokeAPI/sprites/146c91287ad01f6e15315bbd733fd7442c91fe6d/sprites/pokemon/${index}.png`;
    return url;
  };

  return (
    <div className={general['general-content']}>
      <div className={general['pokemons-container']}>
        {pokemons.searchedPokemons.map((pokemon) => (
          <div
            className={general['pokemon-container']}
            key={`${pokemon.name}-${pokemon.index}`}
            onClick={handleClick}
          >
            <div className={general['image-container']}>
              <img
                className={general['pokemon-image']}
                alt={pokemon.name}
                src={getUrl(pokemon.index)}
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
      {compare.isCompared ? (
        <div className={general['compare-card']}>
          <p className={general['compare-card-title']}> Comparing pokemon </p>
          <p className={general['compare-subtitle']}>
            {compare.compareTo.name.toUpperCase()}
          </p>
        </div>
      ) : (
        <div></div>
      )}
    </div>
  );
};

const mapStateToProps = (state) => {
  return {
    select: state.select,
    pokemons: state.pokemons,
    compare: state.compare,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    fetchPokemons: (offset) => dispatch(fetchPokemons(offset)),
    getExistingPokemon: (name, index) =>
      dispatch(getExistingPokemon(name, index)),
    fetchSelectedPokemon: (name) => dispatch(fetchSelectedPokemon(name)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Pokemons);

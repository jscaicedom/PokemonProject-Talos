import React from 'react';
import { connect } from 'react-redux';
import general from '../style/general.module.css';
import { searchPokemon } from '../redux/actions/pokemonsActions';
import { Link } from 'react-router-dom';

const Header = ({ searchPokemon }) => {
  const handleChange = (event) => {
    const name = event.target.value;
    searchPokemon(name);
  };

  return (
    <div className={general.header}>
      <div className={general['header-text']}>
        <Link to='/' className={general['header-title']}>
          PokéApp
        </Link>
        <Link to='/pokemons' className={general['header-subtitle']}>
          Pokemons
        </Link>
      </div>
      <div>
        <input
          type='search'
          name='buscar'
          className={general['header-input']}
          placeholder='Search'
          onChange={handleChange}
        />
      </div>
    </div>
  );
};

const mapStateToProps = (state) => {
  return {
    state
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    searchPokemon: (name) => dispatch(searchPokemon(name))
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Header);

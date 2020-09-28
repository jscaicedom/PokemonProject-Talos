import { COMPARE_POKEMON, WITHOUT_COMPARE } from '../actions/compareAction';

const initialState = {
  isCompared: false,
  compareTo: {},
  genre: '',
};

function comparedPokemon(state = initialState, action) {
  switch (action.type) {
    case COMPARE_POKEMON:
      return {
        isCompared: true,
        compareTo: action.payload.compareTo,
        genre: action.payload.genre,
      };

    case WITHOUT_COMPARE:
      return {
        isCompared: false,
      };

    default:
      return state;
  }
}

export default comparedPokemon;

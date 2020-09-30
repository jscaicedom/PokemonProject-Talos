import {
  FETCH_POKEMONS_REQUEST,
  FETCH_POKEMONS_SUCCESS,
  FETCH_POKEMONS_ERROR,
  SEARCH_POKEMON,
} from '../actions/pokemonsActions';

const initialState = {
  pokemons: [],
  isFetching: false,
  error: null,
  searchedPokemons: [],
  offset: 0,
};

function pokemons(state = initialState, action) {
  switch (action.type) {
    case FETCH_POKEMONS_REQUEST:
      return {
        ...state,
        isFetching: true,
      };

    case FETCH_POKEMONS_SUCCESS:
      return {
        ...state,
        isFetching: false,
        pokemons: state.pokemons.concat(
          action.payload.pokemons.map((pokemon, indexOf) => {
            const index = indexOf + state.pokemons.length + 1;
            return { ...pokemon, index };
          })
        ),

        searchedPokemons: state.searchedPokemons.concat(
          action.payload.pokemons.map((pokemon, fetchIndex) => {
            const index = fetchIndex + state.pokemons.length + 1;
            return { ...pokemon, index };
          })
        ),
        offset: state.offset + 20,
      };

    case FETCH_POKEMONS_ERROR:
      return {
        ...state,
        isFetching: false,
        error: action.payload.error,
      };

    case SEARCH_POKEMON:
      return {
        ...state,
        searchedPokemons: state.pokemons.filter((pokemon, index) =>
          pokemon.name.startsWith(action.payload.name)
        ),
      };

    default:
      return state;
  }
}

export default pokemons;

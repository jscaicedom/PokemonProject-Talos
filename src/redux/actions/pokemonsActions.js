export const FETCH_POKEMONS_REQUEST = 'FETCH_POKEMONS_REQUEST';
export const FETCH_POKEMONS_SUCCESS = 'FETCH_POKEMONS_SUCCESS';
export const FETCH_POKEMONS_ERROR = 'FETCH_POKEMONS_ERROR';
export const SEARCH_POKEMON = 'SEARCH_POKEMON';

export const fetchPokemons = (index) => (dispatch) => {
  dispatch({ type: FETCH_POKEMONS_REQUEST });

  fetch(`https://pokeapi.co/api/v2/pokemon/?limit=20&offset=${index}`)
    .then((res) => res.json())
    .then((pokemons) => {
      dispatch({
        type: FETCH_POKEMONS_SUCCESS,
        payload: {
          pokemons: pokemons.results,
        },
      });
    })
    .catch((error) => {
      dispatch({
        type: FETCH_POKEMONS_ERROR,
        error: error.toString(),
      });
    });
};

export const searchPokemon = (name) => (dispatch) => {
  dispatch({
    type: SEARCH_POKEMON,
    payload: {
      name,
    },
  });
};

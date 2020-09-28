export const FETCH_SELECTED_POKEMON = 'FETCH_SELECTED_POKEMON';
export const FETCH_SELECTED_ERROR = 'FETCH_SELECTED_ERROR';
export const EXISTING_POKEMON = 'EXISTING_POKEMON';

export const fetchSelectedPokemon = (pokemon) => (dispatch) => {
  fetch(`https://pokeapi.co/api/v2/pokemon/${pokemon}`)
    .then((res) => res.json())
    .then((description) => {
      fetch(description.species.url)
        .then((desc) => desc.json())
        .then((species) => {
          dispatch({
            type: FETCH_SELECTED_POKEMON,
            payload: {
              description,
              name: pokemon,
              text: species.flavor_text_entries[1].flavor_text,
              genre: species.genre_ratio,
            },
          });
        });
    })
    .catch((error) => {
      dispatch({
        type: FETCH_SELECTED_ERROR,
        error: error.toString(),
      });
    });
};

export const existingPokemon = (name, index) => (dispatch) => {
  dispatch({
    type: EXISTING_POKEMON,
    payload: {
      name,
      index,
    },
  });
};

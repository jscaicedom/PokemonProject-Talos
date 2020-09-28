export const COMPARE_POKEMON = 'COMPARE_POKEMON';
export const WITHOUT_COMPARE = 'WITHOUT_COMPARE';

export const comparePokemon = (compareTo, genre) => (dispatch) => {
  dispatch({
    type: COMPARE_POKEMON,
    payload: {
      compareTo,
      genre,
    },
  });
};

export const removeCompare = () => (dispatch) => {
  dispatch({
    type: WITHOUT_COMPARE,
  });
};

export const COMPARE_POKEMON = 'COMPARE_POKEMON';
export const WITHOUT_COMPARE = 'WITHOUT_COMPARE';

export const comparePokemon = (compareTo, gender) => (dispatch) => {
  dispatch({
    type: COMPARE_POKEMON,
    payload: {
      compareTo,
      gender,
    },
  });
};

export const removeCompare = () => (dispatch) => {
  dispatch({
    type: WITHOUT_COMPARE,
  });
};

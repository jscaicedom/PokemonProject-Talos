import {
  FETCH_SELECTED_POKEMON,
  FETCH_SELECTED_ERROR,
  EXISTING_POKEMON,
} from '../actions/clickAction';

const initialState = {
  descriptions: [],
  isSelected: false,
  actualPokemon: '',
  indexActual: 0,
  description: [],
  genre: [],
};

function selectedPokemon(state = initialState, action) {
  switch (action.type) {
    case FETCH_SELECTED_POKEMON:
      return {
        ...state,
        indexActual: state.descriptions.length,
        descriptions: [...state.descriptions, action.payload.description],
        isSelected: true,
        actualPokemon: action.payload.name,
        description: [...state.description, action.payload.text],
        genre: [...state.genre, action.payload.genre > 4 ? 'Female' : 'Male'],
      };

    case FETCH_SELECTED_ERROR:
      return {
        error: action.payload.error,
      };

    case EXISTING_POKEMON:
      return {
        ...state,
        actualPokemon: action.payload.name,
        indexActual: action.payload.index,
      };

    default:
      return state;
  }
}

export default selectedPokemon;

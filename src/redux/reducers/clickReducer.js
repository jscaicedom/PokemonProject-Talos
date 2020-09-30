import {
  FETCH_SELECTED_POKEMON,
  FETCH_SELECTED_ERROR,
  EXISTING_POKEMON,
} from '../actions/clickAction';

const initialState = {
  descriptions: [],
  isSelected: false,
  currentPokemon: '',
  currentIndex: 0,
  description: [],
  genders: [],
};

function selectedPokemon(state = initialState, action) {
  switch (action.type) {
    case FETCH_SELECTED_POKEMON:
      return {
        ...state,
        currentIndex: state.descriptions.length,
        descriptions: [...state.descriptions, action.payload.description],
        isSelected: true,
        currentPokemon: action.payload.name,
        description: [...state.description, action.payload.text],
        genders: [...state.genders, action.payload.gender > 4 ? 'Female' : 'Male'],
      };

    case FETCH_SELECTED_ERROR:
      return {
        error: action.payload.error,
      };

    case EXISTING_POKEMON:
      return {
        ...state,
        currentPokemon: action.payload.name,
        currentIndex: action.payload.index,
      };

    default:
      return state;
  }
}

export default selectedPokemon;

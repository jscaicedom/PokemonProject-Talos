import { combineReducers } from "redux";
import pokemons from "./pokemonsReducer";
import select from "./clickReducer";
import compare from "./compareReducer";

export default combineReducers({
  pokemons,
  select,
  compare,
});

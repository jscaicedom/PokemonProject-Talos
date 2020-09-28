import { createStore, applyMiddleware } from 'redux'
import logger from 'redux-logger'
import thunk from 'redux-thunk'
import rootReducer from './reducers'


// Store
// Almacenamiento de nuestro estado
const store = createStore(rootReducer, applyMiddleware(logger, thunk))

export default store
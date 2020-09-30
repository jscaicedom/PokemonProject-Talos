import React from 'react';
import { Provider } from 'react-redux';
import store from './redux/store';
import Pokemons from './components/Pokemons';
import Header from './components/Header';
import Home from './components/Home';
import { Route, HashRouter } from 'react-router-dom';

const App = () => {
  return (
    <HashRouter basename='/'>
      <Provider store={store}>
        <Header />
        <Route path='/' exact render={Home} />
        <Route path='/pokemons' component={Pokemons} />
      </Provider>
    </HashRouter>
  );
};

export default App;

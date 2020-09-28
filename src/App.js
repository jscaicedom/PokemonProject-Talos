import React from "react";
import { Provider } from "react-redux";
import store from "./redux/store";
import Pokemons from "./components/Pokemons";
import Header from "./components/Header";
import Modal from "./components/Modal";
import Home from "./components/Home";
import { BrowserRouter as Router, Route, HashRouter } from "react-router-dom";

const App = () => {
  return (
    <HashRouter basename="/">
      <Router>
        <Provider store={store}>
          <Header />
          <Route path="/" exact render={Home} />
          <Route path="/pokemons" component={Pokemons} />
          <Modal />
        </Provider>
      </Router>
    </HashRouter>
  );
};

export default App;

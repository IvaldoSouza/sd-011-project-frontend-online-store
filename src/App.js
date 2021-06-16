import React, { Component } from 'react';
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import { Home, Cart } from './pages';
import * as api from './services/api';
import './App.css';

class App extends Component {
  constructor() {
    super();
    this.defineStateCategories = this.defineStateCategories.bind(this);
    this.state = {
      categories: [],
    };
  }

  componentDidMount() {
    this.defineStateCategories();
  }

  async defineStateCategories() {
    const categories = await api.getCategories();
    const array = categories.map(({ name }) => name);
    this.setState({ categories: array });
  }

  render() {
    const { categories } = this.state;
    return (
      <div className="App">
        <BrowserRouter>
          <Switch>
            <Route exact path="/" render={ (() => <Home categories={ categories } />) } />
            <Route path="/cart" component={ Cart } />
          </Switch>
        </BrowserRouter>
      </div>
    );
  }
}

export default App;

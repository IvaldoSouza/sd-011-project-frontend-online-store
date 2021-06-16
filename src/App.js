import React, { Component } from 'react';
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import './App.css';
import './css/searchlist.css';
import './css/home.css';
import * as api from './services/api';
import { About, Home, SearchList, Header, Footer, NotFound } from './pages/index';

export default class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      searchQuery: '',
    };

    this.getSearchQuery = this.getSearchQuery.bind(this);
  }

  componentDidMount() {
    api.getCategories();
    api.getProductsFromCategoryAndQuery();
  }

  getSearchQuery = (value) => {
    this.setState({ searchQuery: value });
  };

  render() {
    return (
      <>
        <Header />
        <BrowserRouter className="App">
          <Switch>
            <Route
              path="/"
              render={(props) => <Home {...props} sendSubmit={this.getSearchQuery} />}
              exact
            />
            <Route
              path="/search/:id"
              render={(props) => (
                <SearchList
                  {...props}
                  sendSubmit={this.getSearchQuery}
                  product={this.state.searchQuery}
                />
              )}
              exact
            />
            <Route path="/about" component={About} exact />
            <Route component={NotFound} />
          </Switch>
        </BrowserRouter>
        <Footer />
      </>
    );
  }
}

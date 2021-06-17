import React, { Component } from 'react';
import { Switch, Route, BrowserRouter } from 'react-router-dom';
import './App.css';
import './css/searchlist.css';
import './css/home.css';
import * as api from './services/api';
import { About, NotFound, ShoppingCart, Home } from './pages/zPageMenu';
import { Footer, Header } from './components/zComponentsMenu';

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
      <BrowserRouter>
        <Header />
        <Switch>
          {/* prettier-ignore */}
          <Route exact path="/" render={(props) => <Home {...props}  searchQuery = {this.state.searchQuery} sendSubmit={this.getSearchQuery}/>}  />
          <Route exact path="/cart" render={(props) => <ShoppingCart {...props} />} />
          <Route exact path="/about" component={About} />
          <Route component={NotFound} />
        </Switch>
        {/* <Footer /> */}
      </BrowserRouter>
    );
  }
}

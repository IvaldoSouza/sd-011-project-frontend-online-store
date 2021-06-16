import React, { Component } from 'react';
import { getCategories, getProductsFromCategoryAndQuery } from '../services/api';
import ButtonCart from './ButtonCart';
import Products from './Products';

class Home extends Component {
  constructor(props) {
    super(props);
    this.state = {
      categories: [],
      products: [],
      searchText: '',
      category: '',
    };
    this.fetchCategories = this.fetchCategories.bind(this);
    this.fetchProducts = this.fetchProducts.bind(this);
    this.handleCategory = this.handleCategory.bind(this);
    this.handleSearch = this.handleSearch.bind(this);
    // this.handleCategoryProducts = this.handleCategoryProducts.bind(this);
  }

  componentDidMount() {
    this.fetchCategories();
  }

  handleCategory(categoryId) {
    this.setState({
      category: categoryId,
    });
    console.log(categoryId);
  }

  handleSearch({ target }) {
    const { name, value } = target;
    this.setState({
      [name]: value,
    });
  }

  async fetchCategories() {
    const resultCategories = await getCategories();
    this.setState({
      categories: resultCategories,
    });
  }

  async fetchProducts(categoryId, query) {
    const resultProducts = await getProductsFromCategoryAndQuery(categoryId, query);
    this.setState({
      products: resultProducts.results,
    });
    console.log(resultProducts);
  }

  // async handleCategoryProducts(categoryId) {
  //   const result = await getProductsFromCategoryAndQuery(categoryId);
  //   this.setState({
  //     products: result,
  //   });
  // }

  render() {
    const { categories, searchText, category, products } = this.state;
    console.log(products);
    return (
      <div>
        <label data-testid="home-initial-message" htmlFor="home-initial">
          Digite algum termo de pesquisa ou escolha uma categoria.
          <input
            data-testid="query-input"
            name="searchText"
            type="text"
            value={ searchText }
            onChange={ this.handleSearch }
          />
        </label>
        <button
          type="button"
          data-testid="query-button"
          onClick={ () => this.fetchProducts(category, searchText) }
        >
          Pesquisar
        </button>
        { categories.map((item, index) => (
          <div
            role="button"
            onClick={ () => this.handleCategory(item.id) }
            name="category"
            data-testid="category"
            key={ index }
          >
            { item.name }
          </div>)) }
        <div>
          { products.map((item) => <Products key={ item.id } products={ item } />) }
        </div>
        <ButtonCart />
      </div>
    );
  }
}

export default Home;

import React, { Component } from 'react';

export default class ProductDetail extends Component {
  constructor() {
    super();
    this.state = {};
    this.getProduct = this.getProduct.bind(this);
  }

  componentDidMount() {

  }

  getProduct() {

  }

  render() {
    console.log(this.props);

    return (
      <div data-testid="product-detail-name">dfs</div>
    );
  }
}

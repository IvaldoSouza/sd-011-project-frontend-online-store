import React, { Component } from 'react';
import { Redirect, Link } from 'react-router-dom';

class ProductDetails extends Component {
  constructor(props) {
    super(props);
    this.state = {
      redirect: false,
      product: {},
      cartProducts: [],
    };

    this.setProduct = this.setProduct.bind(this);
    this.setRedirect = this.setRedirect.bind(this);
    this.addCart = this.addCart.bind(this);
  }

  componentDidMount() {
    const product = JSON.parse(sessionStorage.getItem('product'));
    if (!product) this.setRedirect();
    this.setProduct(product);
  }

  setProduct(product) {
    this.setState(() => ({
      product,
    }));
  }

  setRedirect() {
    this.setState(() => ({
      redirect: true,
    }));
  }

  addCart(product) {
    this.setState((old) => ({
      cartProducts: [...old.cartProducts, product],
    }));
  }

  render() {
    const { redirect, product, cartProducts } = this.state;
    const { title, thumbnail, price } = product;
    return !redirect ? (
      <div>
        <p data-testid="product-detail-name">{ title }</p>
        <img src={ thumbnail } alt={ title } />
        { price }
        <button
          onClick={ () => this.addCart(product) }
          type="button"
          data-testid="product-detail-add-to-cart"
        >
          Adicionar ao carrinho
        </button>
        <Link
          to={ { pathname: '/shopcart', state: cartProducts } }
        >
          <button type="button" data-testid="shopping-cart-button">
            Carrinho de Compras
          </button>
        </Link>
      </div>
    ) : (<Redirect to="/" />);
  }
}

export default ProductDetails;
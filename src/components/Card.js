import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import '../css/Card.css';

export default class Card extends Component {
  constructor() {
    super();
    this.state = {
      counter: 1,
    };
  }

  handleClick = () => {
    const { sumCartItems } = this.props;

    let { counter } = this.state;
    const { title, price, thumbnail, id, attributes } = this.props;
    const availableQuantity = Object.values(this.props)[8];
    console.log(availableQuantity);
    if (localStorage.getItem(title)) {
      const product = JSON.parse(localStorage.getItem(title)).counter;
      this.setState({ counter: +product + 1 });
      counter = +product + 1;
    } else {
      this.setState((previous) => ({ counter: previous.counter + 1 }));
    }

    const object = {
      counter,
      price,
      thumbnail,
      id,
      attributes,
      title,
      availableQuantity,
    };
    const json = JSON.stringify(object);

    localStorage.setItem(title, json);
    sumCartItems();
  };

  render() {
    const {
      title,
      price,
      thumbnail,
      id,
      attributes,
      shipping,
    } = this.props;
    const availableQuantity = Object.values(this.props)[8];
    const { counter } = this.state;
    return (
      <div className="container-card" data-testid="product">
        <Link
          className="link-card"
          data-testid="product-detail-link"
          to={ {
            pathname: `/produtos/${id}`,
            state: {
              title,
              price,
              thumbnail,
              id,
              attributes,
              shipping,
              availableQuantity,
            },
          } }
        >
          <p className="title">{title}</p>
          <img src={ thumbnail } alt={ title } />
          {shipping.free_shipping ? (
            <p data-testid="free-shipping">Frete Grátis!</p>
          ) : null}
          <p className="price">
            R$
            {price}
          </p>
        </Link>
        <button
          disabled={ counter > availableQuantity }
          className="add-cart-button"
          data-testid="product-add-to-cart"
          onClick={ this.handleClick }
          type="button"
        >
          Adicionar ao Carrinho
        </button>
      </div>
    );
  }
}

Card.propTypes = {
  title: PropTypes.string,
  price: PropTypes.number,
  thumbnail: PropTypes.string,
  id: PropTypes.string,
  free_shipping: PropTypes.bool,
}.isRequired;

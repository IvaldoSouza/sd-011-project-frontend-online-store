import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

export default class ProductCard extends Component {
  render() {
    console.log(this.props);
    const { title, price, thumbnail, id, handleAddToShopCart } = this.props;
    return (
      <div data-testid="product">
        <Link
          data-testid="product-detail-link"
          to={ { pathname: `/details/${id}`,
            state: {
              title,
              price,
              thumbnail,
              id,
            },
          } }
        >
          { title }
          <img src={ thumbnail } alt={ title } />
          { price }
        </Link>
        <button
          type="button"
          id={ title }
          className={ thumbnail }
          name={ price }
          onClick={ () => handleAddToShopCart(title, thumbnail, price) }
          data-testid="product-add-to-cart"
        >
          Comprar
        </button>
      </div>
    );
  }
}

ProductCard.propTypes = {
  handleAddToShopCart: PropTypes.func,
  title: PropTypes.string,
  thumbnail: PropTypes.string,
  price: PropTypes.number,
  id: PropTypes.string,
}.isRequired;

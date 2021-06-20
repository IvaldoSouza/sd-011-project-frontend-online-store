import React from 'react';
import { Nav, Button } from 'react-bootstrap';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

export default class NavHome extends React.Component {
  render() {
    const { itemsCart, quantityItems } = this.props;

    return (
      <div className="navHome">
        <h1> Trybe Oline Store </h1>
        <Nav className="mr-auto">
          <Nav.Link><Link to="/"> Home </Link></Nav.Link>
        </Nav>
        <Link
          data-testid="shopping-cart-button"
          to={ {
            pathname: '/shoppingCart',
            state: itemsCart,
          } }
        >
          <Button
            variant="primary"
          >
            Carrinho(
            <span data-testid="shopping-cart-size">{quantityItems}</span>
            )
          </Button>
        </Link>
      </div>
    );
  }
}

NavHome.propTypes = {
  itemsCart: PropTypes.string.isRequired,
  quantityItems: PropTypes.string.isRequired,
};

import React, { Component } from 'react';
import PropTypes from 'prop-types';
import AvaliationForm from './AvaliationForm';
import Avaliations from './Avaliations';

export default class Details extends Component {
  render() {
    const {
      match: { params: { id } },
      location: { state: { element } },
    } = this.props;
    const { title, price, thumbnail, attributes } = element;
    return (
      <div>
        <div>
          <div>
            <span data-testid="product-detail-name">{`${title}, ${price}`}</span>
          </div>
          <div>
            <img src={ thumbnail } alt={ title } />
          </div>
          <div>
            <h3>Especificações técnicas</h3>
            { attributes.map(({ name, value_name: valueName, id: attributeId }) => (
              <p key={ attributeId }>
                { name }
                :
                { valueName }
              </p>
            ))}
          </div>
        </div>
        <div>
          <AvaliationForm
            getForm={ this.getForm }
            productId={ id }
          />
          <Avaliations
            productId={ id }
          />
        </div>
      </div>
    );
  }
}

Details.propTypes = {
  match: PropTypes.shape({
    params: PropTypes.shape({
      id: PropTypes.string,
    }),
  }).isRequired,
  location: PropTypes.shape({
    state: PropTypes.shape({
      element: PropTypes.shape({
        title: PropTypes.string.isRequired,
        price: PropTypes.number.isRequired,
        thumbnail: PropTypes.string.isRequired,
        attributes: PropTypes.arrayOf(PropTypes.object).isRequired,
      }).isRequired,
    }).isRequired,
  }).isRequired,
};
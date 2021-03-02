import React, { Component } from 'react';

import axios from '../../axios-order';
import CheckoutSummary from '../../components/Order/CheckoutSummary/CheckoutSummary';

class Checkout extends Component {
  state = {
    ingredients: {
      salad: 1,
      meat: 1,
      cheese: 1,
      bacon: 1,
    },
  };

  purchaseContinueHandler = () => {
    // alert('You Continue!');
    this.setState({ isLoading: true });

    const order = {
      ingredients: this.state.ingredients,
      price: this.state.totalPrice,
      customer: {
        name: 'Moreshwar Nabar',
        address: {
          street: 'Teststreet 1',
          zipCode: '400610',
          country: 'India',
        },
        email: 'test@test.com',
      },
      deliveryMethod: 'fastest',
    };

    axios
      .post('/orders.json', order)
      .then(response =>
        this.setState({ isLoading: false, isPurchasing: false })
      )
      .catch(error => this.setState({ isLoading: false, isPurchasing: false }));
  };

  render() {
    return (
      <div>
        <CheckoutSummary ingredients={this.state.ingredients} />
      </div>
    );
  }
}

export default Checkout;

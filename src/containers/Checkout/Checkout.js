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

  componentDidMount() {
    const query = new URLSearchParams(this.props.location.search);
    const orderIngs = {};
    for (let param of query.entries()) {
      orderIngs[param[0]] = +param[1];
    }

    this.setState({ ingredients: orderIngs });
  }

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

  cancelCheckoutHandler = () => {
    console.log(this.props.history.goBack());
  };

  render() {
    return (
      <div>
        <CheckoutSummary
          ingredients={this.state.ingredients}
          cancel={this.cancelCheckoutHandler}
        />
      </div>
    );
  }
}

export default Checkout;

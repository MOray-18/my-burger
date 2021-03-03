import React, { Component } from 'react';

import axios from '../../axios-order';
import Order from '../../components/Order/Order';
import withErrorHandler from '../../hoc/withErrorHandler/withErrorHandler';

class Orders extends Component {
  state = {
    orders: [],
    isLoading: true,
  };

  componentDidMount() {
    axios
      .get('/orders.json')
      .then(response => {
        const fetchedOrders = [];
        for (let key in response.data) {
          fetchedOrders.push({
            ...response.data[key],
            id: key,
          });
        }
        this.setState({ isLoading: false, orders: fetchedOrders });
      })
      .catch(error => this.setState({ isLoading: false }));
  }

  render() {
    const orders = this.state.orders.map(order => (
      <Order
        key={order.id}
        ingredients={order.ingredients}
        price={order.price}
      />
    ));

    return <div>{orders}</div>;
  }
}

export default withErrorHandler(Orders, axios);

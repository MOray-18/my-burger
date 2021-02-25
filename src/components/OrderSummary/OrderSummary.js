import React from 'react';

import Aux from '../../hoc/Aux';

const orderSummary = props => {
  const ingredientsSummary = Object.keys(props.ingredients).map(ing => (
    <li>
      <span style={{ textTransform: 'capitalize' }}>{ing}</span>:{' '}
      {props.ingredients[ing]}
    </li>
  ));

  return (
    <Aux>
      <h3>Your Order</h3>
      <p>A delicious burger with the following ingredients:</p>
      <ul></ul>
    </Aux>
  );
};

export default orderSummary;

import React from 'react';

import classes from './Order.module.css';

const order = props => {
  const { ingredients } = props;
  const outputIngs = [];
  for (let [ing, amt] of Object.entries(ingredients)) {
    outputIngs.push(
      <span
        key={ing}
        style={{
          textTransform: 'capitalize',
          display: 'inline-block',
          margin: '0 8px',
          border: '1px solid #ccc',
          padding: '5px',
        }}
      >
        {ing} ({amt})
      </span>
    );
  }

  return (
    <div className={classes.Order}>
      <p>Ingredients: {outputIngs}</p>
      <p>
        Price: <strong>INR {props.price}</strong>
      </p>
    </div>
  );
};

export default order;

import React from 'react';

import classes from './Burger.module.css';
import BurgerIngredient from './BurgerIngredient/BurgerIngredient';

const burger = props => {
  let transformedIng = Object.keys(props.ingredients).flatMap(ing => {
    return [...Array(props.ingredients[ing])].map((_, i) => (
      <BurgerIngredient key={ing + i} type={ing} />
    ));
  });

  if (!transformedIng.length) {
    transformedIng = <p>Please start adding ingredients!</p>;
  }

  return (
    <div className={classes.Burger}>
      <BurgerIngredient type="bread-top" />
      {transformedIng}
      <BurgerIngredient type="bread-bottom" />
    </div>
  );
};

export default burger;

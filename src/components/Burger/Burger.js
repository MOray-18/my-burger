import React from 'react';

import classes from './Burger.module.css';
import BurgerIngredient from './BurgerIngredient/BurgerIngredient';

const burger = props => {
  const transformedIng = Object.keys(props.ingredients).map(ing => {
    return [...Array(props.ingredients[ing])].map((_, i) => (
      <BurgerIngredient key={ing + i} type={ing} />
    ));
  });

  return (
    <div className={classes.Burger}>
      <BurgerIngredient type="bread-top" />
      {transformedIng}
      <BurgerIngredient type="bread-bottom" />
    </div>
  );
};

export default burger;

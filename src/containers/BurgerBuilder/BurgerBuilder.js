import React, { Component } from 'react';

import Aux from '../../hoc/Aux';
import Burger from '../../components/Burger/Burger';
import BuildControls from '../../components/BuildControls/BuildControls';

const INGREDIENT_PRICE = {
  salad: 5,
  bacon: 15,
  cheese: 5,
  meat: 12,
};

class BurgerBuilder extends Component {
  state = {
    ingredients: {
      salad: 0,
      bacon: 0,
      cheese: 0,
      meat: 0,
    },
    totalPrice: 25,
  };

  addIngredientHandler(type) {
    const prevCount = this.state.ingredients[type];
    const updatedIngs = { ...this.state.ingredients };
    const prevPrice = this.state.totalPrice;
    const additionalPrice = INGREDIENT_PRICE[type];

    updatedIngs[type] = prevCount + 1;
    const updatedPrice = prevPrice + additionalPrice;

    this.setState({ ingredients: updatedIngs, totalPrice: updatedPrice });
  }

  removeIngredientHandler(type) {
    const prevCount = this.state.ingredients[type];
    const updatedIngs = { ...this.state.ingredients };
    const prevPrice = this.state.totalPrice;
    const additionalPrice = INGREDIENT_PRICE[type];

    updatedIngs[type] = prevCount - 1;
    const updatedPrice = prevPrice - additionalPrice;

    this.setState({ ingredients: updatedIngs, totalPrice: updatedPrice });
  }

  render() {
    const disabledInfo = {
      ...this.state.ingredients,
    };
    for (let key in disabledInfo) {
      disabledInfo[key] = disabledInfo[key] === 0;
    }

    return (
      <Aux>
        <Burger ingredients={this.state.ingredients} />
        <BuildControls
          addIngredient={this.addIngredientHandler.bind(this)}
          removeIngredient={this.removeIngredientHandler.bind(this)}
          disabled={disabledInfo}
          price={this.state.totalPrice}
        />
      </Aux>
    );
  }
}

export default BurgerBuilder;

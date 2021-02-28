import React, { Component } from 'react';

import Aux from '../../hoc/Aux/Aux';
import Burger from '../../components/Burger/Burger';
import BuildControls from '../../components/BuildControls/BuildControls';
import Modal from '../../components/UI/Modal/Modal';
import OrderSummary from '../../components/OrderSummary/OrderSummary';
import Spinner from '../../components/UI/Spinner/Spinner';
import withErrorHandler from '../../hoc/withErrorHandler/withErrorHandler';
import axios from '../../axios-order';

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
    isPurchasable: false,
    isPurchasing: false,
    isLoading: false,
  };

  updateIsPurchasable(ingredients) {
    const totalIngredients = Object.keys(ingredients)
      .map(ing => ingredients[ing])
      .reduce((acc, curVal) => acc + curVal, 0);

    this.setState({ isPurchasable: totalIngredients > 0 });
  }

  handleIsPurchasing = () => this.setState({ isPurchasing: true });

  purchaseCancelHandler = () => this.setState({ isPurchasing: false });

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

  addIngredientHandler(type) {
    const prevCount = this.state.ingredients[type];
    const updatedIngs = { ...this.state.ingredients };
    const prevPrice = this.state.totalPrice;
    const additionalPrice = INGREDIENT_PRICE[type];

    updatedIngs[type] = prevCount + 1;
    const updatedPrice = prevPrice + additionalPrice;

    this.setState({ ingredients: updatedIngs, totalPrice: updatedPrice });
    this.updateIsPurchasable(updatedIngs);
  }

  removeIngredientHandler(type) {
    const prevCount = this.state.ingredients[type];
    const updatedIngs = { ...this.state.ingredients };
    const prevPrice = this.state.totalPrice;
    const additionalPrice = INGREDIENT_PRICE[type];

    updatedIngs[type] = prevCount - 1;
    const updatedPrice = prevPrice - additionalPrice;

    this.setState({ ingredients: updatedIngs, totalPrice: updatedPrice });
    this.updateIsPurchasable(updatedIngs);
  }

  render() {
    const disabledInfo = {
      ...this.state.ingredients,
    };

    for (let key in disabledInfo) {
      disabledInfo[key] = disabledInfo[key] === 0;
    }

    let orderSummary = (
      <OrderSummary
        ingredients={this.state.ingredients}
        price={this.state.totalPrice}
        purchaseCancelled={this.purchaseCancelHandler}
        purchaseContinued={this.purchaseContinueHandler}
      />
    );

    if (this.state.isLoading) {
      orderSummary = <Spinner />;
    }

    return (
      <Aux>
        <Modal
          show={this.state.isPurchasing}
          modalClosed={this.purchaseCancelHandler}
        >
          {orderSummary}
        </Modal>
        <Burger ingredients={this.state.ingredients} />
        <BuildControls
          addIngredient={this.addIngredientHandler.bind(this)}
          removeIngredient={this.removeIngredientHandler.bind(this)}
          disabled={disabledInfo}
          price={this.state.totalPrice}
          isPurchasable={this.state.isPurchasable}
          isPurchasingHandler={this.handleIsPurchasing}
        />
      </Aux>
    );
  }
}

export default withErrorHandler(BurgerBuilder, axios);

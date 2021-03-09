import React, { Component } from 'react';
import { connect } from 'react-redux';

import Aux from '../../hoc/Aux/Aux';
import Burger from '../../components/Burger/Burger';
import BuildControls from '../../components/BuildControls/BuildControls';
import Modal from '../../components/UI/Modal/Modal';
import OrderSummary from '../../components/OrderSummary/OrderSummary';
import Spinner from '../../components/UI/Spinner/Spinner';
import withErrorHandler from '../../hoc/withErrorHandler/withErrorHandler';
import axios from '../../axios-order';
import * as actionTypes from '../../store/actions';

class BurgerBuilder extends Component {
  state = {
    isPurchasing: false,
    isLoading: false,
    error: false,
  };

  componentDidMount() {
    // axios
    //   .get(
    //     'https://react-my-burger-8d1f8-default-rtdb.firebaseio.com/ingredients.json'
    //   )
    //   .then(response => this.setState({ ingredients: response.data }))
    //   .catch(error => this.setState({ error: true }));
  }

  updateIsPurchasable(ingredients) {
    const totalIngredients = Object.keys(ingredients)
      .map(ing => ingredients[ing])
      .reduce((acc, curVal) => acc + curVal, 0);

    return totalIngredients > 0;
  }

  handleIsPurchasing = () => this.setState({ isPurchasing: true });

  purchaseCancelHandler = () => this.setState({ isPurchasing: false });

  purchaseContinueHandler = () => {
    this.props.history.push('/checkout');
  };

  render() {
    const disabledInfo = {
      ...this.props.ingredients,
    };

    for (let key in disabledInfo) {
      disabledInfo[key] = disabledInfo[key] === 0;
    }

    let orderSummary = null;
    let burger = this.state.error ? (
      <p>Ingredients can't be loaded</p>
    ) : (
      <Spinner />
    );

    if (this.props.ingredients) {
      burger = (
        <Aux>
          <Burger ingredients={this.props.ingredients} />
          <BuildControls
            addIngredient={ingredientName =>
              this.props.onIngredientAdded(ingredientName)
            }
            removeIngredient={ingredientName =>
              this.props.onIngredientRemoved(ingredientName)
            }
            disabled={disabledInfo}
            price={this.props.totalPrice}
            isPurchasable={this.updateIsPurchasable(this.props.ingredients)}
            isPurchasingHandler={this.handleIsPurchasing}
          />
        </Aux>
      );
      orderSummary = (
        <OrderSummary
          ingredients={this.props.ingredients}
          price={this.props.totalPrice}
          purchaseCancelled={this.purchaseCancelHandler}
          purchaseContinued={this.purchaseContinueHandler}
        />
      );
    }

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
        {burger}
      </Aux>
    );
  }
}

const mapStateToProps = state => {
  return {
    ingredients: state.ingredients,
    totalPrice: state.totalPrice,
  };
};

const mapDispatchToProps = dispatch => {
  return {
    onIngredientAdded: ingredientName =>
      dispatch({ type: actionTypes.ADD_INGREDIENT, ingredientName }),
    onIngredientRemoved: ingredientName =>
      dispatch({ type: actionTypes.REMOVE_INGREDIENT, ingredientName }),
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withErrorHandler(BurgerBuilder, axios));

import * as actionTypes from './actions';

const initialState = {
  ingrdients: {
    salad: 0,
    bacon: 0,
    cheese: 0,
    meat: 0,
  },
  totalPrince: 25,
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.ADD_INGREDIENT:
      return {
        ...state,
        ingredients: {
          ...state.ingrdients,
          [action.ingredient.key]: state.ingredients[action.ingredient.key] + 1,
        },
      };

    case actionTypes.REMOVE_INGREDIENT:
      return {
        ...state,
        ingredients: {
          ...state.ingrdients,
          [action.ingredient.key]: state.ingredients[action.ingredient.key] - 1,
        },
      };

    default:
      return state;
  }
};

export default reducer;

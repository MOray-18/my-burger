import React, { Component } from 'react';
import { connect } from 'react-redux';

import axios from '../../../axios-order';
import Button from '../../../components/UI/Button/Button';
import classes from './ContactData.module.css';
import Spinner from '../../../components/UI/Spinner/Spinner';
import Input from '../../../components/UI/Input/Input';

class ContactData extends Component {
  state = {
    orderForm: {
      name: {
        elementType: 'input',
        elementConfig: {
          type: 'text',
          placeholder: 'Your Name',
        },
        value: '',
        validation: {
          required: true,
        },
        isValid: false,
        isTouched: false,
      },
      street: {
        elementType: 'input',
        elementConfig: {
          type: 'text',
          placeholder: 'Street',
        },
        value: '',
        validation: {
          required: true,
        },
        isValid: false,
        isTouched: false,
      },
      zipCode: {
        elementType: 'input',
        elementConfig: {
          type: 'text',
          placeholder: 'ZIP Code',
        },
        value: '',
        validation: {
          required: true,
          minLength: 5,
          maxLength: 5,
        },
        isValid: false,
        isTouched: false,
      },
      country: {
        elementType: 'input',
        elementConfig: {
          type: 'text',
          placeholder: 'Country',
        },
        value: '',
        validation: {
          required: true,
        },
        isValid: false,
        isTouched: false,
      },
      email: {
        elementType: 'input',
        elementConfig: {
          type: 'email',
          placeholder: 'Your E-Mail',
        },
        value: '',
        validation: {
          required: true,
        },
        isValid: false,
        isTouched: false,
      },
      deliveryMethod: {
        elementType: 'select',
        elementConfig: {
          options: [
            { value: 'fastest', displayValue: 'Fastest' },
            { value: 'cheapest', displayValue: 'Cheapest' },
          ],
        },
        value: '',
        validation: {},
        isValid: true,
      },
    },
    isValid: false,
    isLoading: false,
  };

  orderHandler = event => {
    event.preventDefault();
    this.setState({ isLoading: true });

    const formData = {};
    for (let [key, { value }] of Object.entries(this.state.orderForm)) {
      formData[key] = value;
    }

    const order = {
      ingredients: this.props.ingredients,
      price: this.props.price,
      orderData: formData,
    };

    axios
      .post('/orders.json', order)
      .then(response => {
        this.setState({ isLoading: false });
        this.props.history.push('/');
      })
      .catch(error => this.setState({ isLoading: false }));
  };

  checkValidity(value, rules) {
    let isValid = true;

    if (rules.required) {
      isValid = value.trim() !== '' && isValid;
    }

    if (rules.minLength) {
      isValid = value.length >= rules.minLength && isValid;
    }

    if (rules.maxLength) {
      isValid = value.length <= rules.maxLength && isValid;
    }

    return isValid;
  }

  inputChangedHandler = (event, key) => {
    const updatedOrderForm = { ...this.state.orderForm };
    const updatedFormEl = { ...updatedOrderForm[key] };

    updatedFormEl.value = event.target.value;
    updatedFormEl.isValid = this.checkValidity(
      updatedFormEl.value,
      updatedFormEl.validation
    );
    updatedFormEl.isTouched = true;
    updatedOrderForm[key] = updatedFormEl;

    let formIsValid = true;
    for (let { isValid } of Object.values(updatedOrderForm)) {
      formIsValid = isValid && formIsValid;
    }

    this.setState({ orderForm: updatedOrderForm, isValid: formIsValid });
  };

  render() {
    const formElements = [];

    for (let [key, data] of Object.entries(this.state.orderForm)) {
      formElements.push(
        <Input
          key={key}
          elementType={data.elementType}
          elementConfig={data.elementConfig}
          value={data.value}
          changed={event => this.inputChangedHandler(event, key)}
          invalid={!data.isValid}
          shouldValidate={data.validation}
          isTouched={data.isTouched}
        />
      );
    }

    const form = this.state.isLoading ? (
      <Spinner />
    ) : (
      <form onSubmit={this.orderHandler}>
        {formElements}
        <Button btnType="Success" disabled={!this.state.isValid}>
          ORDER
        </Button>
      </form>
    );

    return (
      <div className={classes.ContactData}>
        <h4>Enter your Contact Data</h4>
        {form}
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    ingredients: state.ingredients,
    price: state.totalPrice,
  };
};

export default connect(mapStateToProps)(ContactData);

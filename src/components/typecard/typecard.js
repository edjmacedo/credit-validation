import React, { Component } from 'react';

import PropTypes from 'prop-types';
import classnames from 'classnames';
import {
  VISA_IDENTIFIER,
  MASTERCARD_IDENTIFIER,
  AMERICAN_FIRSTIDENTIFIER,
  AMERICAN_SECONDIDENTIFIER,
  VISA_NAME,
  MASTERCARD_NAME,
  AMERICAN_NAME,
  MIN_CARD_LENGTH,
  MAX_CARD_LENGTH,
  AMERICAN_LENGTH,
  INVALID_CARD
} from '../../constants';

class TypeCard extends Component {

  static propTypes = {
    creditCardNumber: PropTypes.string,
    carrierCard: PropTypes.string,
    undefinedCarrier: PropTypes.bool
  };

  static defaultProps = {
    creditCardNumber: '',
    carrierCard: '',
    undefinedCarrier: true
  }

  constructor(props) {
    super(props);
    this.state = {
      creditCardNumber: this.props.creditCardNumber,
      carrierCard: '',
      undefinedCarrier: true
    }
  }

  componentWillReceiveProps(nextProps) {
    let digits = '';
    const indexOfCheckDigits = 2;
    const lengthOfValidCard = 13;
    const firstIndexCheck = 0;
    const secIndexCheck = 1;
    const radix = 10;

    this.setState({
      creditCardNumber: nextProps.creditCardNumber.replace(/\s/g,'').replace(/_/g, "")
    });

    // Verify type of possible credit card getting two digits only
    if (nextProps.creditCardNumber.length <= indexOfCheckDigits)
      this.validateCarrierCard(nextProps.creditCardNumber)

    // Handle digits in case of paste entire value in input
    if (nextProps.creditCardNumber.length > lengthOfValidCard) {
      digits = parseInt(nextProps.creditCardNumber.charAt(firstIndexCheck), radix);

      if ((this.state.carrierCard == '' ||
           this.state.carrierCard == AMERICAN_NAME ||
           this.state.carrierCard == VISA_NAME ||
           this.state.carrierCard == MASTERCARD_NAME) &&
         (digits == VISA_IDENTIFIER || digits == MASTERCARD_IDENTIFIER)) {
        this.validateCarrierCard(digits);
      } else {
        digits = `${digits}${parseInt(nextProps.creditCardNumber.charAt(secIndexCheck), radix)}`;
        this.setState({
          carrierCard: '',
          undefinedCarrier: true
        });
        this.validateCarrierCard(digits);
      }
    }

  }

  // Validate the type of credit card - Visa - Mastercard - American Express
  validateCarrierCard(cardNumber) {
    if (cardNumber == VISA_IDENTIFIER) {
      this.setState({
        carrierCard: VISA_NAME,
        undefinedCarrier: false
      })
    } else if (cardNumber == MASTERCARD_IDENTIFIER) {
      this.setState({
        carrierCard: MASTERCARD_NAME,
        undefinedCarrier: false
      })
    } else if (cardNumber == AMERICAN_FIRSTIDENTIFIER ||
    cardNumber == AMERICAN_SECONDIDENTIFIER) {
      this.setState({
        carrierCard: AMERICAN_NAME,
        undefinedCarrier: false
      })
    } else if (cardNumber.length === 0) {
      this.setState({
        undefinedCarrier: true
      })
    }
  }

  // Validate credit card by length
  validateCreditNumberByLength(cardNumber) {
    let indexLength = cardNumber.length - 1;
    let alternateNumber = false;
    let nextDigit;
    let sumNumbers = 0;

    if (cardNumber.length < MIN_CARD_LENGTH || cardNumber.length > MAX_CARD_LENGTH)
      return false;

    // Handle length of visa cards
    if (this.state.carrierCard === VISA_NAME &&
      cardNumber.length > MIN_CARD_LENGTH && cardNumber.length < MAX_CARD_LENGTH)
      return false;

    // Handle length of mastercard
    if (this.state.carrierCard === MASTERCARD_NAME && cardNumber.length < MAX_CARD_LENGTH)
      return false;

    // Handle length of american express
    if (this.state.carrierCard === AMERICAN_NAME &&
        (cardNumber.length < AMERICAN_LENGTH || cardNumber.length > AMERICAN_LENGTH))
      return false;

    // Implementation of Luhn Algorithm
    while (indexLength >= 0) {
      nextDigit = parseInt(cardNumber.charAt(indexLength), 10);
      if (isNaN(nextDigit))
        return false;

      if (alternateNumber) {
        nextDigit *= 2;
        if (nextDigit > 9) {
          nextDigit = (nextDigit % 10) + 1;
        }
      }
      alternateNumber = !alternateNumber;
      sumNumbers += nextDigit;
      indexLength--;
    }

    return (sumNumbers % 10 == 0);

  }

  render() {
    // Avoid to re-render everytime with state also improve performance
    let { carrierCard, creditCardNumber, undefinedCarrier } = this.state;
    let isValidCardLenght = this.validateCreditNumberByLength(creditCardNumber);

    return (
      <div className="input-group-addon" id="type">
        <label className={
          classnames({"control-label": !undefinedCarrier},
            {"glyphicon": undefinedCarrier},
            {"glyphicon-question-sign": undefinedCarrier})}>
            {!undefinedCarrier ? carrierCard : ''}
          </label>
        { isValidCardLenght ?
            <div className={classnames("glyphicon", "glyphicon-ok")}></div> :
            <div className={classnames("glyphicon", "glyphicon-remove")}></div>
        }
      </div>
    );
  }
}

export default TypeCard;

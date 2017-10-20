import React, { Component } from 'react';

import PropTypes from 'prop-types';
import classnames from 'classnames';
import TypeCard from '../typecard/typecard';
import MaskedInput from 'react-maskedinput';
import { SERVER_URL } from '../../constants';

class Panel extends Component {

  static propTypes = {
    creditCardNumber: PropTypes.string,
    ownerName: PropTypes.string,
    expirydate: PropTypes.string,
    cvv: PropTypes.string,
    submitted: PropTypes.bool,
    fillBlanks: PropTypes.bool
  };

  static defaultProps = {
    creditCardNumber: '',
    ownerName: '',
    expirydate: '',
    cvv: '',
    submitted: false,
    fillBlanks: false
  }

  constructor(props) {
    super(props);
    this.onSubmit = this.handleSubmit.bind(this);
    this.state = {
      creditCardNumber: '',
      ownerName: '',
      expirydate: '',
      cvv: '',
      submitted: false,
      fillBlanks: false
    }
  }

  handleSubmit(e) {
    e.preventDefault();

    let reqBody = {
      creditnumber: this.state.creditCardNumber,
      name: this.state.ownerName,
      expirydate: this.state.expirydate,
      cvv: this.state.cvv
    };

    let self = this;
    // Verify all fields and send a post request to server
    if (reqBody.creditnumber != '' && reqBody.name != '' &&
      reqBody.expirydate != '' && reqBody.cvv != '') {
      this.setState({
        fillBlanks: false
      })
      fetch(SERVER_URL, {
          method: 'POST',
          body: JSON.stringify(reqBody)
        }).then(function(response) {
          console.log(response);
          if (response.ok) {
            self.setState({
              submitted: true,
              creditCardNumber: '',
              ownerName: '',
              expirydate: '',
              cvv: ''
            })
          } else {
            self.setState({submitted: false})
          }
        }).then(function(body) {});
    } else {
      this.setState({
        fillBlanks: true,
        submitted: false
      })
    }
  }

  render() {
    let { submitted, fillBlanks } = this.state;

    return (
      <div className="panel">
        <div className={
          classnames(
            {"alert": submitted},
            {"alert-success": submitted}
          )}
        >
          { submitted ? <strong>Submitted</strong> : ''}
        </div>
        <div className={
          classnames(
            {"alert": fillBlanks},
            {"alert-danger": fillBlanks},
          )}
        >
          { fillBlanks ? <strong>Please fill the blanks</strong> : ''}
        </div>

        <div className="panel-body">
          <form onSubmit={this.onSubmit}>
            <div className="form-group">
              <label>Credit card number:</label>
              <div className="input-group">
                <MaskedInput
                  mask="1111 1111 1111 1111"
                  name="creditCard"
                  size="19"
                  className="form-control"
                  id="creditCard"
                  value={this.state.creditCardNumber}
                  onChange={
                    event => this.setState({
                      creditCardNumber: event.target.value
                    })
                  }
                />
                <TypeCard
                  creditCardNumber={this.state.creditCardNumber}
                />
              </div>
            </div>
            <div className="form-group">
              <label>Name on card:</label>
              <input
                type="text"
                className={classnames("form-control", "crname")}
                value={this.state.ownerName}
                onChange={
                  event => this.setState({
                    ownerName: event.target.value
                  })
                }
              />
            </div>
            <div className="clearfix">
              <div className={classnames("form-group", "form-group-mini")}>
                <label>Expiry date:</label>
                <MaskedInput
                  mask="11/1111"
                  placeholder="mm/yyyy"
                  className="form-control"
                  value={this.state.expirydate}
                  onChange={
                    event => this.setState({
                      expirydate: event.target.value
                    })
                  }
                />
              </div>
              <div className={classnames("form-group", "form-group-mini")}>
                <label>CVV:</label>
                <MaskedInput
                  mask="111"
                  className="form-control"
                  value={this.state.cvv}
                  onChange={
                    event => this.setState({
                      cvv: event.target.value
                    })
                  }
                />
              </div>
            </div>
            <br/>
            <p>
              <button type="submit" className={classnames("btn", "btn-primary")}>Submit</button>
            </p>
          </form>
        </div>
      </div>
    );
  }
}

export default Panel;

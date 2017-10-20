import React, { Component } from 'react';

import PropTypes from 'prop-types';
import classnames from 'classnames';
import TypeCard from '../typecard/typecard';
import MaskedInput from 'react-maskedinput';

class Panel extends Component {

  static propTypes = {};

  static defaultProps = {
    creditCardNumber: ''
  }

  constructor(props) {
    super(props);
    this.state = {
      creditCardNumber: '',
      expirydate: '',
      cvv: '',
      submitted: false,
      fillBlanks: false
    }
    this.onSubmit = this.handleSubmit.bind(this);
  }

  componentDidMount() {}

  componentWillReceiveProps(nextProps) {}

  handleSubmit(e) {
    e.preventDefault();

    let reqBody = {
      creditnumber: this.state.creditCardNumber,
      name: this.refs.name.value,
      expirydate: this.state.expirydate,
      cvv: this.state.cvv
    };

    let self = this;
    console.log(reqBody);
    if (reqBody.creditnumber != '' && reqBody.name != '' &&
      reqBody.expirydate != '' && reqBody.cvv != '') {
      this.setState({
        fillBlanks: false
      })
      fetch('https://httpbin.org/post', {
          method: 'POST',
          body: JSON.stringify(reqBody)
        }).then(function(response) {
          console.log(response);
          response.ok ? self.setState({submitted: true}) : self.setState({submitted: false})
          return response.json();
        }).then(function(body) {
          console.log(body);
        });
    } else {
      this.setState({
        fillBlanks: true
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
                  size="20"
                  className="form-control"
                  id="card"
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
              <input type="text" className="form-control" ref="name"/>
            </div>
            <div className="clearfix">
              <div className={classnames("form-group", "form-group-mini")}>
                <label>Expiry date:</label>
                <MaskedInput
                  mask="11/1111"
                  placeholder="mm/yyyy"
                  className="form-control"
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

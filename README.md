# Credit Card Validation

Implementation of validation of credit card number to handle user mistakes with useful feedback

## Live Demo

[demo](http://edjmacedo.com/credit-validation/#/)

## Getting Started

To get a copy of this project you will need:
- Git
- Internet Connection

### Prerequisites

You will need:
- ReactJS
- npm
- yarn

To run webserver in localhost:
- Python >= 2.76

### Installing

To install and run:

* Go to root project directory
```
yarn
```
* To start a local server
```
yarn start
```
* To make a build
```
node ./node_modules/webpack/bin/webpack.js --config webpack.config.js -p
```

## Using application

This application should recognize three types of credit cards:
* Visa
* Mastercard
* American Express

Two validations are made:
1 - Type of Card
* A question mark is showed if card's type does not correspond with one of types above
* The card's type is show if correspond with one of types above.
2 - Lenght of card
* Support until sixteen digits
* Use Luhn Algorithm to validate number
* Shows a icon X if the length is incorrect and a green check mark if is correct

```
Each input text have mask correspond with your data type and the form send a POST request to python server.
```
Some Credit Cards used to test:
```
371449635398431 - American Express
```
```
4218440285893846 - Visa
```
```
5123630736497087 - Mastercard
```
```
4111111111111111 - Visa
```
```
5555555555554444 - Mastercard
```
```
30569309025904 - Diners
```
```
6011111111111117 - Discover
```
```
3530111333300000 - JCB
```

## Deployment

To make a deploy run:
```
node ./node_modules/webpack/bin/webpack.js --config webpack.config.js -p
```
It will create a dist folder with minify files

## Built With

* [ReactJS](https://reactjs.org/) - The web framework used for frontend
* [Yarn](https://yarnpkg.com/en/) - Dependency Management
* [Webpack](https://webpack.js.org/) - Used to generate build

## Author

* **Edvan Macedo**

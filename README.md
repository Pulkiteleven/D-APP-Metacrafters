# Hello World

This is Blockchain based project developed by me.. to run the Project follow the following commands..
## Description

Here we have smartcontracts named Dapp.sol and also Minimal frontend implementation to let it work.. 

## Getting Started

### Executing program

To deploy the contract first run the following command in terminal

```javascript
npx hardhat compile 
```
after the contract is compiled
run this command which will deploy your contract on test net volta this is a whole differnt thing

```javascript
npx hardhat run --network volta scripts/deploy.js
```

after your contract is deployed you will get your contract address in the console
paste it in src/Constant/constant.js

now that you have deployed your contract just run in terminal
and your project will run on web browser
```javascript
npm  start
```

## Authors

Pulkit Dubey 

## License

This project is licensed under the MIT License - see the LICENSE.md file for details

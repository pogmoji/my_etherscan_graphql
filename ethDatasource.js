// Import the RESTDataSource class from Apollo Server
const { RESTDataSource } = require("apollo-datasource-rest"); 

// Define a constant for an Ethereum address we will use in the API calls
// Using Vitalik Buterin's address as an example
const eth_address = "0xd8dA6BF26964aF9D7eEd9e03E53415D37aA96045";

// Create a class that extends RESTDataSource for making Etherscan API calls
class EtherDataSource extends RESTDataSource {

  // Set the base URL for the Etherscan API 
  constructor() {
    super();
    this.baseURL = "https://api.etherscan.io/api";
  }

  // Method to get the ETH balance for an address
  async etherBalanceByAddress() {
    return this.get(
      `?module=account&action=balance&address=${eth_address}&tag=latest&apikey=${process.env.ETHERSCAN_API}`
    );
  }

  // Method to get the total ETH supply
  async totalSupplyOfEther() {
    return this.get(
      `?module=stats&action=ethsupply&apikey=${process.env.ETHERSCAN_API}`
    );
  }

  // Method to get the latest ETH price
  async getLatestEthereumPrice() {
    return this.get(
      `?module=stats&action=ethprice&apikey=${process.env.ETHERSCAN_API}`
    );
  }

  // Method to get estimated block confirmation time
  async getBlockConfirmationTime() {
    return this.get(
      `?module=gastracker&action=gasestimate&gasprice=2000000000&apikey=${process.env.ETHERSCAN_API}`
    );
  }
}

// Export the data source class
module.exports = EtherDataSource;

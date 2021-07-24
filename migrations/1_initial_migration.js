//const SimpleToken = artifacts.require("SimpleToken");
//const LiCoin = artifacts.require("LiCoin");
//const NFToken = artifacts.require("NFToken");
const LoanToken = artifacts.require("LoanToken");
const LoanContract = artifacts.require("LoanContract");
//const LoanRequest = artifacts.require("LoanRequest");
//const testContract = artifacts.require("testContract");

module.exports = function (deployer) {
    //deployer.deploy(SimpleToken);
    //deployer.deploy(LiCoin);
    //deployer.deploy(NFToken);
    deployer.deploy(LoanToken);
    //deployer.deploy(LoanRequest, 1, 1, 1, 60);
    deployer.deploy(LoanContract);
};

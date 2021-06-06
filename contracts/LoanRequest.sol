pragma solidity ^0.4.0;

import "./LoanContract.sol";
import "./LoanToken.sol";
import "zeppelin-solidity/contracts/token/ERC20/StandardToken.sol";
import "./LiCoin.sol";

contract LoanRequest {
    address public company = 0x9Bd41Db18ed0Bd1AD0747eA709CE74522F44a4c1;
    address public customer = msg.sender; //buyer-person
    uint256 public tokenId;
    uint256 public collateral; //customer give to company, change to contract later
    uint256 public payOffAmount;//bro
    uint256 public payBack;
    uint256 public duration; //duration
    uint256 public currentTime;

    constructor (uint256 _collateral, uint256 _payOffAmount, uint256 _interestRate, uint256 _duration) public {
        //company = _company;
        collateral = _collateral;
        payOffAmount = _payOffAmount;
        payBack = _payOffAmount * (1 + _interestRate);
        duration = _duration;
    }

    LoanContract public loan;


    function lendEther() public payable {
        //require(msg.value == loanAmount);
        loan = new LoanContract(
            company, //company
            customer,
            collateral,
            payOffAmount,
            payBack,
            duration
        );
    }
}

pragma solidity ^0.4.24;

import "zeppelin-solidity/contracts/token/ERC721/ERC721Token.sol";
import "zeppelin-solidity/contracts/token/ERC20/StandardToken.sol";

import "./LoanToken.sol";
import "./LiCoin.sol";

contract LoanContract {
    //company: 0x9Bd41Db18ed0Bd1AD0747eA709CE74522F44a4c1
    address public company; //company: issue bond
    address public customer; //buyer
    LoanToken public token; //company send to customer as a collateral
    uint256 public tokenId;
    uint256 public collateral; //几个token
    uint256 public payOffAmount;//customer give money to company
    uint256 public payBack;
    uint256 public dueDate; //duration
    uint256 public time;

    function getTime() external {
        time = block.timestamp;
    }

    constructor (address _lender, address _borrower, uint256 _collateral, uint256 _payOffAmount, uint256 _payBack, uint256 _duration) public {
        company = _lender;
        customer = _borrower;
        token = new LoanToken();
        //tokenId = _tokenId;
        collateral = _collateral;
        payOffAmount = _payOffAmount;
        payBack = _payBack;
        dueDate = time + _duration;
    }

    //customer give money to company, company transfer token to customer
    function payLoan() public payable {
        require(time < dueDate);
        company.transfer(payOffAmount);
        token.safeTransferFrom(company, customer, tokenId);

        selfdestruct(customer);
    }
//
//    //after time, send money+interest to customer
//    function payMoney() public payable {
//        require(block.timestamp >= dueDate);
//        require(company.balance > payBack);
//        token.safeTransferFrom(customer, company, tokenId);
//        address(this).transfer(payBack);
//
//        selfdestruct(company);
//    }
}



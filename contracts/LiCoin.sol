pragma solidity >=0.4.22 <0.9.0;

import "zeppelin-solidity/contracts/token/ERC20/StandardToken.sol";

contract LiCoin is StandardToken{
    string public name = "LiCoin"; //代币名称
    string public symbol = "LC"; //代币简称
    uint256 public time;

    uint8 public decimals = 2;
    uint256 public INITIAL_SUPPLY = 1000;
    constructor() public{
        balances[msg.sender] = INITIAL_SUPPLY;
    }


//    function afterTime() public returns(string){
//        if(){
//
//        }
//    }
}

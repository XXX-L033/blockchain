pragma solidity ^0.8.0;

//import "zeppelin-solidity/contracts/token/ERC721/ERC721Token.sol";

import "openzeppelin-solidity/contracts/token/ERC721/ERC721.sol";
import "openzeppelin-solidity/contracts/utils/Counters.sol";
import "openzeppelin-solidity/contracts/token/ERC721/IERC721Receiver.sol";

contract LoanToken is ERC721 {
    using Counters for Counters.Counter;
    Counters.Counter private _tokenIds;
    string BName;
    string BSymbol;
    uint256 newItemId;

    constructor() public ERC721("LoanToken", "LTC") {}

    //generate new token
    function awardItem(address player, uint256 startTime) public returns (uint256){
        //require(block.timestamp > startTime);
        _tokenIds.increment();

        newItemId = _tokenIds.current();
        _mint(player, newItemId);
        return newItemId;
    }

    //get tokenId
    function getItemId() public view returns(uint256){
        return newItemId;
    }

    //check whether date > maturity date
    function checkEnd(uint256 maturityTime) public returns(bool){
        if(block.timestamp >= maturityTime){
            return true;
        }else{
            return false;
        }
    }

    //transfer token
    function transferItem(address sender, address receiver, uint256 id) public returns (address){
            //isApprovedForAll(receiver, true);
            transferFrom(sender, receiver, id);
        return receiver;
    }

    //allow others to operate the token
    function setApprove(address owner, address operator, bool approved) public{
            ApprovalForAll(owner, operator, approved);
    }
}



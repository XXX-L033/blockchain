pragma solidity ^0.8.0;

import "openzeppelin-solidity/contracts/token/ERC721/IERC721Receiver.sol";
import "./LoanToken.sol";

contract LoanContract is IERC721Receiver {
    function onERC721Received(address, address, uint256, bytes memory) public virtual override returns (bytes4) {
        return this.onERC721Received.selector;
    }

    function getIssuer() public returns (address){
        return msg.sender;
    }
}



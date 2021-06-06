pragma solidity >=0.4.22 <0.9.0;

import "zeppelin-solidity/contracts/token/ERC721/ERC721Token.sol";
//import "zeppelin-solidity/contracts/ownership/Ownable.sol";
//import "openzeppelin/contracts/utils/Counters.sol";

contract LoanToken is ERC721Token{
    uint256 public constant totalTokens = 100000;
    constructor() ERC721Token("LoanToken","LTC")public{

    }

    function mint(address _company, uint256 _tokenId) public {
        super._mint(_company, _tokenId);
    }
}

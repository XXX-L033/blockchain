pragma solidity ^0.8.0;

//import "zeppelin-solidity/contracts/token/ERC721/ERC721Token.sol";

import "openzeppelin-solidity/contracts/token/ERC721/ERC721.sol";
import "openzeppelin-solidity/contracts/utils/Counters.sol";

contract LoanToken is ERC721 {
//    constructor () ERC721Token (" LoanToken "," LTC ") public {
//    }
//
//    function mint ( address _company , uint256 _tokenId )
//    public {
//        super . _mint ( _company , _tokenId );
//    }
    using Counters for Counters.Counter;
    Counters.Counter private _tokenIds;

    constructor() public ERC721("LoanToken", "LTC") {}

    function awardItem(address player) public returns (uint256){
        _tokenIds.increment();

        uint256 newItemId = _tokenIds.current();
        _mint(player, newItemId);
        //_setTokenURI(newItemId, tokenURI);

        return newItemId;
    }
}

pragma solidity >=0.4.22 <0.9.0;

import "zeppelin-solidity/contracts/token/ERC721/ERC721Token.sol";

contract LoanToken is ERC721Token {
    constructor () ERC721Token (" LoanToken "," LTC ") public {
    }

    function mint ( address _company , uint256 _tokenId )
    public {
        super . _mint ( _company , _tokenId );
    }
}

pragma solidity ^0.8.0;

//import "zeppelin-solidity/contracts/token/ERC721/ERC721Token.sol";

import "openzeppelin-solidity/contracts/token/ERC721/ERC721.sol";
import "openzeppelin-solidity/contracts/utils/Counters.sol";
import "openzeppelin-solidity/contracts/token/ERC721/IERC721Receiver.sol";

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
    string BName;
    string BSymbol;
    uint256 newItemId;

    constructor() public ERC721("LoanToken", "LTC") {}

    function awardItem(address player) public returns (uint256){
        _tokenIds.increment();

        newItemId = _tokenIds.current();
        _mint(player, newItemId);
        //_setTokenURI(newItemId, tokenURI);
        return newItemId;
    }

    function getItemId() public view returns(uint256){
        return newItemId;
    }

    function returnNum() public view returns(uint256){
        return 5;
    }


    function transferItem(address sender, address receiver, uint256 id) public returns (address){
        transferFrom(sender, receiver, id);
        return receiver;
    }
}

contract LoanContract is IERC721Receiver {
//    LoanToken token;
//
//    constructor() public{
//        LoanToken newToken = new LoanToken();
//    }
    function onERC721Received(address, address, uint256, bytes memory) public virtual override returns (bytes4) {
        return this.onERC721Received.selector;
    }

    function getIssuer() public returns (address){
        return msg.sender;
    }

    function createToken(LoanToken token, address sender) public{
        token.awardItem(sender);
    }

    function transferToken(LoanToken token, address sender, address receiver, uint256 id) public{
        token.transferItem(sender, receiver, id);
    }
}

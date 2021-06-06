pragma solidity >=0.4.22 <0.9.0;


interface EIP721 {
    //ERC721 interface
    //Metadata
    function name() external view returns (string memory);
    function symbol() external view returns (string memory);
    //function tokenURI(uint256 _tokenId) external view returns (string);

    //record on blockchain
    event Transfer(address indexed _from, address indexed _to, uint256 indexed _tokenId);
    event Approval(address indexed _owner, address indexed _approved, uint256 indexed _tokenId);
    event ApprovalForAll(address indexed _owner, address indexed _operator, bool _approved);

    //achieve function

    function totalSupply() external view returns (uint256);

    function balanceOf(address owner) external view returns (uint256);

    function approve(address _to, uint256 _tokenId) external payable;

    function ownerOf(uint256 _tokenId) external view returns (address);

    function setApprovalForAll(address _operator, bool _approved) external;

    function getApproved(uint256 _tokenId) external view returns (address);

    function isApprovedForAll(address owner, address _operator) external view returns (bool);

    function transfer(address _to, uint256 amount) external payable;

    function transferFrom(address _from, address _to, uint256 _tokenId) external payable;

    //    function safeTransferFrom(address _from, address _to, uint256 _tokenId, bytes data) external payable;
    //
    //    function safeTransferFrom(address _from, address _to, uint256 _tokenId) external payable;
}

contract NFToken is EIP721 {

    uint8 public constant decimals = 3;
    uint256 private constant totalTokens = 10000000;
    constructor() public {
        _numTokenPerson[msg.sender] = 10000;
    }

    //ERC721 Metadata
    function name() external view returns(string memory){
        return "NFToken";
    }

    function symbol() external view returns(string memory){
        return "NFT";
    }
//    string private constant tokenName = "NFToken";
//    string public constant symbol = "NFT";
    //json 描述_tokenId资产的URI。指向一个符合ERC721元数据描述结构的JSON文件
    //string public tokenURI;

    mapping(uint256 => address) public _owner;
    mapping(address => uint256) public _numTokenPerson;
    mapping(uint256 => address) public _approvals;
    mapping(address => mapping(address => bool)) public _approvalsForAll;

    function transfer(address _to, uint256 _amount) external payable{
        require(_amount <= _numTokenPerson[msg.sender]);
        _numTokenPerson[msg.sender] = _numTokenPerson[msg.sender]-_amount;
        _numTokenPerson[_to] = _numTokenPerson[msg.sender]+_amount;
    }

    function totalSupply() external view returns (uint256){
        return totalTokens;
    }

    function ownerOf(uint256 _tokenId) external view returns (address){
        address owner = _owner[_tokenId];
        //address(0) - address is null
        require(owner != address(0), "Token does not exist");
        return owner;
    }

    function balanceOf(address owner) external view returns (uint256){
        return _numTokenPerson[owner];
    }


    //give _tokenId to address approved
    function approve(address _to, uint256 _tokenId) external payable {
        address owner = _owner[_tokenId];
        require(owner == msg.sender);
        require(owner != _to);
        _approvals[_tokenId] = _to;

        //write to log
        emit Approval(owner, _to, _tokenId);
    }

    //get the address of _tokenId
    function getApproved(uint256 _tokenId) external view returns (address){
        return _approvals[_tokenId];
    }

    //cancel or set the operator for _operator
    function setApprovalForAll(address _operator, bool _approved) external {
        _approvalsForAll[msg.sender][_operator] = _approved;
        emit ApprovalForAll(msg.sender, _operator, _approved);
    }

    function isApprovedForAll(address owner, address _operator) external view returns (bool){
        return _approvalsForAll[msg.sender][_operator];
    }

    function transferFrom(address _from, address _to, uint256 _tokenId) external payable {
        require(_from != address(0));
        require(_to != address(0));
        require(_owner[_tokenId] == _from);

        _numTokenPerson[_from]--;
        _numTokenPerson[_to]++;
        _owner[_tokenId] = _to;
        _approvals[_tokenId] = address(0);

        emit Transfer(_from, _to, _tokenId);
    }

    //    function safeTransferFrom(address _from, address _to, uint256 _tokenId, bytes data) external payable{
    //
    //    }
    //
    //    function safeTransferFrom(address _from, address _to, uint256 _tokenId) external payable{
    //
    //    }
}

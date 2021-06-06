pragma solidity >=0.4.22 <0.9.0;

//ERC-20
contract ERC20Interface {
    // name
    string public name;
    string public symbol;
    uint8 public decimals;
    // total
    uint public totalSupply;

    // transfer to other address
    function transfer(address to, uint tokens) public returns (bool success);
    // from:address
    function transferFrom(address from, address to, uint tokens) public returns (bool success);
    // 允许spender多次从你的账户取款，并且最多可取tokens个，主要用于某些场景下授权委托其他用户从你的账户上花费代币
    function approve(address spender, uint tokens) public returns (bool success);
    // 查询spender允许从tokenOwner上花费的代币数量
    function allowance(address tokenOwner, address spender) public view returns (uint remaining);

    event Transfer(address indexed from, address indexed to, uint tokens);

    event Approval(address indexed tokenOwner, address indexed spender, uint tokens);
}

// implement ERC20Interface
contract SimpleToken is ERC20Interface {
    // get the balance of the address
    mapping (address => uint256) public balanceOf;
    // 存储每个地址可操作的地址及其可操作的金额
    mapping (address => mapping (address => uint256)) internal allowed;

    // initialization
    constructor() public {
        name = "Test Token";
        symbol = "TT";
        decimals = 5;
        totalSupply = 1000;
        balanceOf[msg.sender] = totalSupply;
    }

    //receiver
    function transfer(address to, uint tokens) public returns (bool success){
        require(to != address(0));
        require(balanceOf[msg.sender] >= tokens);
        require(balanceOf[to] + tokens >= balanceOf[to]);

        balanceOf[msg.sender] -= tokens;
        balanceOf[to] += tokens;

        emit Transfer(msg.sender, to, tokens);
    }

    function transferFrom(address from, address to, uint tokens) public returns (bool success) {
        // check whether address is legal
        require(to != address(0) && from != address(0));
        // check whether balance is enough
        require(allowed[from][msg.sender] <= tokens);

        require(balanceOf[to] + tokens >= balanceOf[to]);

        balanceOf[from] -= tokens;

        balanceOf[to] += tokens;

        // Transfer
        emit Transfer(from, to, tokens);

        success = true;
    }

    function approve(address spender, uint tokens) public returns (bool success) {
        allowed[msg.sender][spender] = tokens;
        //approve
        emit Approval(msg.sender, spender, tokens);

        success = true;
    }

    function allowance(address tokenOwner, address spender) public view returns (uint remaining) {
        return allowed[tokenOwner][spender];
    }
}

pragma solidity ^0.8.0;
import "hardhat/console.sol";

contract Fund{
    address public owner;
    uint256 public total = 1000;
    mapping(address=>uint256) balances;
    constructor(){
        balances[msg.sender] = total;
        owner = msg.sender;
    }

    function transfer(address to, uint256 amount) external {
        require(balances[msg.sender] >= amount, "Not enough votes.");
        balances[msg.sender] -= amount;
        balances[to] += amount;
        // balances[to] += amount;
    }

    function balanceOf(address account) public view returns (uint256){
        return balances[account];
    }
}
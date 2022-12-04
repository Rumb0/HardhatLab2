// SPDX-License-Identifier: MIT
pragma solidity ^0.8.9;

import "@openzeppelin/contracts/token/ERC20/ERC20.sol";

contract KekiToken is ERC20 {
    constructor(uint256 initialSupply) ERC20("KekiToken", "KEK") {
        _mint(msg.sender, initialSupply);
    }

    struct Test {
        int weight;
        bool is_pasted;
        address address;
        bytes4 identifier;
    }

}

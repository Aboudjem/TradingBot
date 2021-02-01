# Uniswap Trading Bot

Uniswap trading bot that will sell ETH to DAI at predefined target prices.

The bot will read the target prices from a JSON file that looks like this:

target-prices.json:
```json
[
    {
        "from": "ETH",
        "to": "DAI",
        "target": "400",
        "amount": "1"
    },
    {
        "from": "ETH",
        "to": "DAI",
        "target": "500",
        "amount": "2"
    }
]
```

The bot will listen to price changes on a block by block basis and execute the trade when target prices are met.

The Uniswap SDK can be used https://uniswap.org/docs/v2/SDK/getting-started/ to retrieve the prices.

A smart contract is needed to execute the sell, it can look like this:

```solidity
contract Trader {
    function sell(address from, address to, uint fromAmount, uint targetAmount) external payable returns (uint receivedAmount) {
        
        //IMPORTANT: receivedAmount should >= targetAmount
        return receivedAmount;
    }
}
```
To interact with Uniswap, the interface below can be used. Addresses for different testnets can be found here https://uniswap.org/docs/v2/smart-contracts/router02/#address

```solidity
interface IUniswapRouter {
     function swapExactETHForTokens(
        uint amountOutMin,
        address[] calldata path,
        address to,
        uint deadline
    )
        external
        payable
        returns (uint[] memory amounts);
}
```

Notes:

- ETH is expressed in decimals (or Wei), 1 ETH = 1e18 Wei (or 10^18). The same applies to DAI.
- ETH is represented by the address 0xEeeeeEeeeEeEeeEeEeEeeEEEeeeeEeeeeeeeEEeE

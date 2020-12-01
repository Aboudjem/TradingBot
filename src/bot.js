const trader = require("../build/contracts/Trader");
const {
    Contract,
    Wallet,
    getDefaultProvider,
    utils
} = require('ethers')

// Replace 'Kovan' by any other network
const provider = getDefaultProvider('kovan');


const jsonFile = [
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
];

setInterval(
(async() => {

    // Add Signer here
    // const signer = new Wallet('PRIVATEKEY_HERE', provider);
    const contract = new Contract('0x244e37a91Fb5D52072a03446227534C2eeE3818e', trader.abi, provider);

    // Uncomment if Signer is set
    // const contract = new Contract('0x244e37a91Fb5D52072a03446227534C2eeE3818e', trader.abi, signer);

    const currentPrice = await contract.getPrice(utils.parseEther(jsonFile[0].amount));
    if(currentPrice >= jsonFile.target) {
        await contract.sell()
    }
    console.log(currentPrice.toString());

}), 13000);

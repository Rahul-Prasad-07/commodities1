const { networkConfig, developmentChains } = require("../helper-hardhat-config")
const { network } = require("hardhat")
//const { verify } = require("../utils/verify")

module.exports = async ({ getNamedAccounts, deployments }) => {
    const { deploy, log } = deployments
    const { deployer } = await getNamedAccounts()
    const chainId = network.config.chainId

    //set price feed addresses correctly depending on network
    let ETH_USD_PriceFeedaddress,
        BTC_USD_PriceFeedAddress,
        LBS_USD_PriceFeedAddress,
        LINK_USD_PriceFeedaddress,
        WBTC,
        LINK

    if (developmentChains.includes(network.name)) {
        const BTC_USDAggregator = await deployments.get("MockV3AggregatorBTC")
        BTC_USD_PriceFeedAddress = BTC_USDAggregator.address

        const ETH_USDAggregator = await deployments.get("MockV3AggregatorETH")
        ETH_USD_PriceFeedaddress = ETH_USDAggregator.address

        const LINK_USDAggregator = await deployments.get("MockV3AggregatorLINK")
        LINK_USD_PriceFeedaddress = LINK_USDAggregator.address

        const LBS_USDAggregator = await deployments.get("MockV3AggregatorLBS")
        LBS_USD_PriceFeedAddress = LBS_USDAggregator.address

        WBTC = (await deployments.get("MockWBTC")).address
        LINK = (await deployments.get("MockLINK")).address
    } else {
        BTC_USD_PriceFeedAddress = networkConfig[chainId]["btcUsdPriceFeed"]
        ETH_USD_PriceFeedaddress = networkConfig[chainId]["ethUsdPriceFeed"]
        LINK_USD_PriceFeedaddress = networkConfig[chainId]["linkUsdPriceFeed"]

        LBS_USD_PriceFeedAddress = networkConfig[chainId]["lumberUsdPriceFeed"]
        WBTC = networkConfig[chainId]["wbtc"]
        LINK = networkConfig[chainId]["link"]
    }

    const lumberargs = [
        "lumber",
        "LBS",
        LBS_USD_PriceFeedAddress,
        ETH_USD_PriceFeedaddress,
        [WBTC, LINK],
        [BTC_USD_PriceFeedAddress, LINK_USD_PriceFeedaddress],
        15000000000,
    ]
    const lumberVault = await deploy("lumberVault", {
        contract: "Vault",
        from: deployer,
        args: lumberargs,
        log: true,
    })
    console.log("Deployed lumberVault")

    /*if (!developmentChains.includes(network.name) && process.env.ETHERSCAN_API_KEY) {
        await verify(lumberVault.address, args)
    }*/

    log("-------------------------------")
}

module.exports.tags = ["all", "lumber"]
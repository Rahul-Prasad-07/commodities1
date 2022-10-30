const { deployments, ethers, getNamedAccounts } = require("hardhat")
const { assert, expect } = require("chai")
const { developmentChains } = require("../../helper-hardhat-config")
const { Contract } = require("ethers")

!developmentChains.includes(network.name)
    ? describe.skip
    : describe("Vault", function () {
          let deployer, goldVault, mockV3AggregatorBTC, mockV3AggregatorETH, mockV3AggregatorGLD

          beforeEach(async () => {
              await deployments.fixture(["mocks", "gold"])
              deployer = (await getNamedAccounts()).deployer

              goldVault = await ethers.getContract("goldVault")

              mockV3AggregatorBTC = await ethers.getContract("MockV3AggregatorBTC")
              mockV3AggregatorETH = await ethers.getContract("MockV3AggregatorETH")
              mockV3AggregatorGLD = await ethers.getContract("MockV3AggregatorGLD")
              mockWBTC = await ethers.getContract("MockWBTC")
          })

          describe("constructor", function () {
              it("creates the CAT", async () => {
                  const response = await goldVault.getToken()
                  assert.isDefined(response)
              })

              it("sets the aggregator addresses correctly", async () => {
                  let response = await goldVault.getPriceFeed()
                  assert.equal(response, mockV3AggregatorGLD.address)

                  response = await goldVault.getEthPriceFeed()

                  assert.equal(response, mockV3AggregatorETH.address)

                  const allowedCollateral = await goldVault.getAllowedCollateral()
                  response = await goldVault.isAllowedCollateral(mockWBTC.address)
                  assert.isTrue(response)

                  response = await goldVault.get
              })
          })

          describe("addCollateral", function () {
              it("successfully adds allowed collateral", async () => {})
              it("reverts when adding not-allowed collateral", async () => {})
          })

          describe("withdrawCollateral", function () {
              it("successfully withraws existing collateral", async () => {})
              it("reverts when attempting to withdraw invalid collateral type", async () => {})
              it("reverts when attempting to withdraw too much collateral", async () => {})
          })

          describe("borrow", function () {
              it("borrow/mint only when sufficient collateral is available", async () => {})
              it("reverts if insufccient collateral is available for asked borrowAmount", async () => {})
          })

          describe("repayLoan", function () {
              it("succesfully reduces borrowed amount after repay", async () => {})
              it("revert when attempting repay with different token", async () => {})
              it("refund excess when repaying more than borrowed amount", async () => {})
          })

          describe("fallback", function () {})

          describe("receive", function () {
              it("successfully adds eth as collateral for sender", async () => {})
          })
      })
---
DIP: 27
title: GovernanceStrategy Smart Contract Upgrade
status: Proposed
author: Callen Wintermute (@callenwm)
shortDescription: Upgrade the GovernanceStrategy Smart Contract to GovernanceStrategyV2 to give wethDYDX the same utility and functionality as ethDYDX.
discussions: https://dydx.forum/t/drc-v4-adoption-dydx-token-migration-to-dydx-chain/970
created: 2023-09-04
---

## Simple Summary

This proposal seeks to ratify the implementation of wethDYDX into dYdX v3’s governance system, following a successful [Snapshot vote](https://snapshot.org/#/dydxgov.eth/proposal/0x17026e18317dc29fe745d3130246a83b1485612da9c97e7261e8f659cf33663c). Specifically, updating dYdX v3’s governance contracts - replacing the GovernanceStrategy Smart Contract with the GovernanceStrategyV2 Smart Contract -  such that wethDYDX can be used for voting and proposal power purposes akin to ethDYDX in dYdX v3.

## Abstract

On August 3, the dYdX Foundation published “*[Exploring the Future of DYDX](https://dydx.foundation/blog/exploring-the-future-of-dydx)*”. In that blog post the dYdX Foundation explained that it commissioned the development of an Ethereum Smart contract (the “wethDYDX Smart Contract”) that could enable a potential migration of DYDX from Ethereum to the dYdX Chain (If and when deployed). 

When interacted with, the wethDYDX Smart Contract would carry out the following functions in a fully permissionless and automated manner:

Step 1: Receive and permanently lock the Ethereum-based DYDX tokens sent by the user to the wethDYDX Smart Contract; 

Step 2: Send a wrapped version of the Ethereum-based DYDX token (“wethDYDX”) to the user on a 1-1 proportional basis on Ethereum; and

Step 3: dYdX Chain validators can also read and ingest the information in the wethDYDX Smart Contract such that corresponding DYDX can be distributed to users by validators on the dYdX Chain (if and when deployed) once there is confirmation that Step 1 above is complete and the Ethereum-based DYDX is permanently locked in the wethDYDX Smart Contract.



While users who interact with the wethDYDX Smart Contract after the potential genesis of the dYdX Chain will receive native DYDX on the new dYdX Chain (V4), dYdX V3 is expected to continue to operate in parallel and therefore, will still need a governance token. wethDYDX is intended to serve this purpose by allowing wethDYDX holders to vote and create proposals with the token akin to ethDYDX.

On August 29 2023, there was a [Snapshot vote](https://snapshot.org/#/dydxgov.eth/proposal/0x17026e18317dc29fe745d3130246a83b1485612da9c97e7261e8f659cf33663c) to gauge the community’s sentiment towards such a change. The vote passed with 36,376,631.84 DYDX (99.99% of total votes) in favor of the changes and 43 DYDX were opposed.


## Motivation

The potential mainnet launch of the dYdX Chain is quickly approaching. On August 3, 2023, dYdX Foundation published “*[Exploring the Future of DYDX: A take on the Potential Migration of DYDX from Ethereum to the dYdX Chain](https://dydx.foundation/blog/exploring-the-future-of-dydx)*” and presented that, as a Proof-of-Stake blockchain network, the dYdX Chain, if and when deployed on mainnet, will require a Layer 1 (“L1”) protocol token for staking to validators in order to secure the chain and for stakers of the L1 token to govern the network.

In parallel, the dYdX Foundation announced that it commissioned the development of an Ethereum smart contract that, if deployed, would enable a permissionless and autonomous one-way bridge for the DYDX token to be migrated from Ethereum to the dYdX Chain (if and when deployed). 

On September 12 2023, the dYdX Foundation published an “*[Update on the Potential Migration of DYDX from Ethereum to the dYdX Chain](https://dydx.foundation/blog/update-on-exploring-the-future-of-dydx)*” and explained that (1) the wethDYDX Smart Contract commissioned by the dYdX Foundation was completed, (2) in connection with a potential migration of DYDX from Ethereum to the dYdX Chain, the dYdX Foundation also commissioned the development of a GovernanceStrategyV2 smart contract (the “GovernanceStrategyV2 Smart Contract”) that, if deployed and if the dYdX community decided through dYdX governance, could enable the wrapped version of the Ethereum-based DYDX token (“wethDYDX”) to have the same governance and utility functions as Ethereum-based DYDX (hereinafter “ethDYDX”) in dYdX v3.

This on-chain vote ratifies the acceptance of wethDYDX as a recognised token within dYdX V3’s governance system. This is particularly important as we expect an increasing number of ethDYDX to be permanently locked over time which could have adverse implications for V3’s governance. By accepting wethDYDX as a recognised governance token we can help avoid such adverse events and ensure that V3’s governance system remains robust.

## Specification

Wrapped Ethereum DYDX (wethDYDX) is a transferable ERC-20 token based on Ethereum Mainnet that is issued 1:1 when ethDYDX tokens are sent to the wethDYDX Smart Contract.

The [wethDYDX Smart Contract](https://etherscan.io/address/0x46b2deae6eff3011008ea27ea36b7c27255ddfa9) and the [GovernanceStrategyV2 Smart Contract](https://etherscan.io/address/0xc2f5f3505910da80f0592a3cc023881c50b16505) have been deployed on Ethereum mainnet.

ethDYDX holders should only consider sending ethDYDX to the wethDYDX Smart Contract if and when the corresponding governance proposal is executed on-chain. Otherwise, a user sending its ethDYDX to the wethDYDX Smart Contract before such governance proposal is adopted and implemented would receive wethDYDX before the governance or utility functions of that token in dYdX v3 are known or confirmed. Users should also refrain from interacting with the wethDYDX Smart Contract without proper knowledge of how to derive private keys on the dYdX Chain (if and when deployed on mainnet).

Upon a successful on-chain vote, a user holding wethDYDX will be able to participate in dYdX V3 governance (voting and proposing).

## Test Cases

A full suite of test cases is provided in the implementation found [here](https://github.com/dydxfoundation/governance-contracts/blob/master/test/misc/upgrade-governance-strategy-v2.spec.ts).

## Implementation

To implement wethDYDX within dYdX v3 Governance, the [Governance Strategy](https://docs.dydx.community/dydx-governance/resources/technical-overview) contract must be updated to [GovernanceStrategyV2](https://github.com/dydxfoundation/governance-contracts/blob/master/contracts/governance/strategy/GovernanceStrategyV2.sol). The “setGovernanceStrategy” function must then be called within the [DydxGovernor](https://docs.dydx.community/dydx-governance/resources/technical-overview) which is owned by the Long Timelock Executor. Next, the GovernanceStrategy contract should be set to the address of the new [GovernanceStrategyV2](https://github.com/dydxfoundation/governance-contracts/blob/master/contracts/governance/strategy/GovernanceStrategyV2.sol) contract.

The on-chain proposal to be voted on by governance will include the following transaction to be executed via the [Long Timelock](https://docs.dydx.community/dydx-governance/voting-and-governance/governance-parameters):

Call the setGovernanceStrategy function within the Dydxgovernor contract and set the contract address to the newly deployed GovernanceStrategyV2 contract.

A full implementation of the proposed changes can be found [here](https://github.com/dydxfoundation/governance-contracts/blob/master/test/migrations/upgrade-governance-strategy-v2.ts).

## Copyright

Copyright and related rights waived via [CC0](https://creativecommons.org/publicdomain/zero/1.0/).

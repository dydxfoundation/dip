---
DIP: 26
title: "V4 Adoption & DYDX Token Migration to dYdX Chain"
status: "Passed"
author: "Callen Wintermute (@callenwm)"
shortDescription: "V4 Adoption & DYDX Token Migration to dYdX Chain: (1) adopt dYdX v4 open source software, (2) adopt DYDX as the L1 token of the dYdX Chain, (3) adopt the Ethereum Smart Contract commissioned by the dYdX Foundation that, if deployed, could enable a permissionless and autonomous one-way bridge for the ethDYDX token to be migrated from Ethereum to the dYdX Chain, (4) recommend that dYdX Chain validators (if and when dYdX Chain is deployed on mainnet) reference Ethereum Smart Contract when minting tokens on the dYdX Chain, and (5) give wethDYDX the same governance and utility functions as Ethereum-based DYDX (“ethDYDX”) on dYdX v3."
discussions: "https://dydx.forum/t/drc-v4-adoption-dydx-token-migration-to-dydx-chain/970"
created: "2023-09-06"
---

## Simple Summary

On September 1, 2023, the [Snapshot vote]( https://snapshot.org/#/dydxgov.eth/proposal/0x17026e18317dc29fe745d3130246a83b1485612da9c97e7261e8f659cf33663c) for dYdX v4 Adoption and the migration of the DYDX to dYdX Chain concluded with almost unanimous support from the dYdX community (36M DYDX from 392 unique addresses). The dYdX community voted in support of:

1.	The dYdX community adopting the dYdX v4 open-source software (if and when deployed on mainnet) as the next version of the dYdX protocol,
2.	The dYdX community adopting DYDX as the L1 token of the dYdX Chain (if and when deployed on mainnet),
3.	The dYdX community adopting the Ethereum smart contract (the “Ethereum Smart Contract”) commissioned by the dYdX Foundation that, if deployed, would enable a permissionless and autonomous one-way bridge for the DYDX token to be migrated from Ethereum to the dYdX Chain, 
4.	The dYdX community recommending that dYdX Chain validators should reference the Ethereum Smart Contract commissioned by the dYdX Foundation when distributing DYDX on the dYdX Chain, and
5.	wethDYDX having the same governance and utility functions as Ethereum-based DYDX (“ethDYDX”) on dYdX v3.

## Abstract

On September 1, 2023, the [Snapshot vote](https://snapshot.org/#/dydxgov.eth/proposal/0x17026e18317dc29fe745d3130246a83b1485612da9c97e7261e8f659cf33663c) to gauge the community’s sentiment towards v4 adoption and migration of the DYDX Token to dYdX Chain concluded. The vote passed with 36,376,631.84 DYDX (99.99% of total votes) in favor of the changes and 43 DYDX were opposed.

Proposal items 1-4 do not require any smart contract changes and as such, a Snapshot vote established dYdX community consensus. The vote satisfied the 
[Minimum Requirements for Binding Snapshot Polls](https://dydx.forum/t/minimum-requirements-for-binding-snapshot-polls/923).

Proposal item 5 - giving wethDYDX the same governance and utility functions as Ethereum-based DYDX (“ethDYDX”) on dYdX v3 - requires an on-chain vote with the subject matter falling under the [Long Timelock Executor](https://docs.dydx.community/dydx-governance/voting-and-governance/governance-process#long-timelock-executor).


## Motivation

The potential mainnet launch of the dYdX Chain is quickly approaching. On August 3, 2023, dYdX Foundation published [“Exploring the Future of DYDX: A take on the Potential Migration of DYDX from Ethereum to the dYdX Chain”](https://dydx.foundation/blog/exploring-the-future-of-dydx) and explained that, as a Proof-of-Stake blockchain network, the dYdX Chain, if and when deployed on mainnet, will require a Layer 1 (“L1”) protocol token for staking to validators in order to secure the chain and for stakers of the L1 token to govern the network.

As a result, the dYdX Foundation announced that it has commissioned the development of an Ethereum Smart Contract that, if deployed, would enable a permissionless and autonomous one-way bridge for the DYDX token to be migrated from Ethereum to the dYdX Chain. In return for bridging, users will receive wethDYDX which will have the same governance and utility functions as Ethereum-based DYDX (“ethDYDX”) on dYdX v3.

The Snapshot vote was held to establish alignment about:
1.	The dYdX community adopting the dYdX v4 open-source software (if and when deployed on mainnet) as the next version of the dYdX protocol,
2.	The dYdX community adopting DYDX as the L1 token of the dYdX Chain (if and when deployed on mainnet),
3.	The dYdX community adopting the Ethereum smart contract (the “Ethereum Smart Contract”) commissioned by the dYdX Foundation that, if deployed, would enable a permissionless and autonomous one-way bridge for the DYDX token to be migrated from Ethereum to the dYdX Chain, and
4.	The dYdX community recommending that dYdX Chain validators should reference the Ethereum Smart Contract commissioned by the dYdX Foundation when distributing DYDX on the dYdX Chain. 

Separately, in reference to the [proposal lifecycle](https://docs.dydx.community/dydx-governance/voting-and-governance/dip-proposal-lifecycle), the off-chain Snapshot vote served as sentiment signalling and a necessary step before the creation of an on-chain vote to potentially give wethDYDX the same governance and utility functions as Ethereum-based DYDX (“ethDYDX”) on dYdX v3. Such an on-chain vote would require updating the GovernanceStrategy smart contract to include wethDYDX and change the way that voting power and proposal power are counted. 

## Specification

1.	The dYdX community will adopt the dYdX v4 open-source software (if and when deployed on mainnet) as the next version of the dYdX protocol (Snapshot),
2.	The dYdX community will adopt DYDX as the L1 token of the dYdX Chain (if and when deployed on mainnet) (Snapshot),
3.	The dYdX community will adopt the Ethereum smart contract (the “Ethereum Smart Contract”) commissioned by the dYdX Foundation that, if deployed, would enable a permissionless and autonomous one-way bridge for the DYDX token to be migrated from Ethereum to the dYdX Chain (Snapshot),
4.	The dYdX community is recommending that dYdX Chain validators should reference the Ethereum Smart Contract commissioned by the dYdX Foundation when distributing DYDX on the dYdX Chain (Snapshot)

## Implementation

Proposal items 1-4 do not require any smart contract changes and as such, can be ratified by a Snapshot vote. Notably, the Snapshot vote satisfied the [Minimum Requirements for Binding Snapshot Polls](https://dydx.forum/t/minimum-requirements-for-binding-snapshot-polls/923).

Proposal item 5 - giving wethDYDX the same governance and utility functions as Ethereum-based DYDX (“ethDYDX”) on dYdX v3 - requires an on-chain vote with the subject matter falling under the [Long Timelock Executor](https://docs.dydx.community/dydx-governance/voting-and-governance/governance-process#long-timelock-executor).

## Copyright

Copyright and related rights waived via [CC0](https://creativecommons.org/publicdomain/zero/1.0/).

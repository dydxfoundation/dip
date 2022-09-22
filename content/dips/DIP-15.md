---
DIP: 15
title: Reduce Trading Rewards by 25%
status: Proposed
author: Callen Wintermute (@callenwm)
shortDescription: Reduce Trading Rewards by 25% 
discussions: https://forums.dydx.community/discussion/6324-discussion-revisionssimplification-of-trading-rewards
created: 2022-09-21
---

## Simple Summary

Ratify the 25% reduction in trading rewards. Each Epoch 2,876,712 will be distributed as trading rewards and the remaining 958,904 DYDX (“Excess DYDX”) that were previously allocated for distribution will accrue in the Rewards Treasury. The Excess DYDX (958,904 DYDX per epoch) that accrues in the Rewards Treasury can be used/directed by the dYdX community with a governance vote ([Short Timelock](https://docs.dydx.community/dydx-governance/voting-and-governance/governance-parameters))

## Abstract

dYdX trading rewards are the largest form of reward emissions across the platform by a significant margin, emitting 3,835,616 DYDX per epoch or roughly 50m DYDX a year. 

On July 31, the Snapshot vote to reduce trading rewards by 25% concluded with the majority (22.8M DYDX (99.13%) from 532 voters) of the dYdX community that voted in support of the reduction. This proposal seeks to ratify a 25% reduction in trading rewards.

Relevant Links:
* Snapshot:
https://snapshot.org/#/dydxgov.eth/proposal/0x28193f3cc8f0a1d1a98a7c32ea4cd51b497c27b8de6bdb36208c4fd4883a0c73
* Community Discussion:
https://forums.dydx.community/discussion/6324-discussion-revisionssimplification-of-trading-rewards
* Trading Rewards:
https://docs.dydx.community/dydx-governance/rewards/trading-rewards
* Rewards Treasury: https://etherscan.io/address/0x639192D54431F8c816368D3FB4107Bc168d0E871
* Pull Request with the Proposed Update:
https://github.com/dydxfoundation/governance-contracts/pull/34

## Motivation
  
In light of ongoing depressed market conditions, the current trading reward emission schedule seems excessively high relative to the growth in platform activity. When thinking about the long-term success of dYdX and its transition to v4, it makes sense to eliminate areas of overspending in the protocol to ensure future opportunities or needs can be met. This proposal requests to reduce trading rewards by 25% every epoch for the foreseeable future, eliminating the overspending of DYDX and preserving funds for future expenditure.

## Specification
Proposal Changes:
 * Reduce per-epoch trading reward emissions from 3,835,616 DYDX to 2,876,712 DYDX (Excess DYDX: 958,904)

Note: Excess DYDX will accrue in the Rewards Treasury, but can be moved via an on-chain community vote
  
*Smart Contract Implementations:*
* Updates setRewardsParameters for trader rewards in the Merkle Distributor to 2,876,712 per epoch

The on-chain proposal to be approved by governance will include the following transaction to be executed via the [Short Timelock](https://docs.dydx.community/dydx-governance/voting-and-governance/governance-parameters):
* Update the Merkle Distributor to the new trading rewards parameters

## Rationale
The community was largely in agreement with the reduction in trading rewards as evident by forum discussion and the passing of a snapshot vote. While there were discussions about the magnitude of reduction in trading rewards, starting with 25% was agreed upon as a reasonable start to limiting emissions and assessing the effects on trading activity.

## Test Cases

A full test case is provided in the implementation found [here](https://github.com/dydxfoundation/governance-contracts/blob/486e3f4966c4f8763ce4e4e301074fa0cd18649c/test/misc/update-merkle-distributor-rewards-parameters.spec.ts).

## Implementation

A [full implementation](https://github.com/dydxfoundation/governance-contracts/pull/34) is open-sourced in the dYdX Foundation governance contracts repository.

## Copyright

Copyright and related rights waived via [CC0](https://creativecommons.org/publicdomain/zero/1.0/).

---
DIP: 24
title: Shifting from LP rewards toward market maker rebates
status: Proposed
author: Max Holloway - Xenophon Labs (@max_holloway)
shortDescription: Reduce LP Rewards to 575,343 DYDX per epoch.
discussions: https://dydx.forum/t/drc-shifting-from-lp-rewards-toward-market-maker-rebates
created: Jul 26, 2023
---

## Simple Summary
This proposal seeks to reduce liquidity provider rewards to 575,343 DYDX per epoch from 1,150,685 DYDX per epoch. The excess 575,342 DYDX per epoch will accrue in the Rewards Treasury and can be used/directed by the dYdX community with a governance vote ([Short Timelock](https://docs.dydx.community/dydx-governance/voting-and-governance/governance-parameters)).

## Abstract
We propose to reduce LP rewards to 575,343 DYDX per epoch, along with recommending to dYdX Trading Inc. that they set the maker rebate to 0.85 bps. We believe that these changes will promote more active liquidity near the top of the orderbook, which will be beneficial to the vast majority of traders on the exchange. Of course, this will also benefit token holders, 575, 342 additional DYDX will accrue in the Rewards Treasury each epoch and can be used by the dYdX community with a governance vote.

On July 18, there was a Snapshot vote to gauge the community’s sentiment towards such a change. The vote passed with 25,482,204.81 DYDX in favor (99.96% of votes) and 9,015.7 DYDX in opposition.

## Relevant Links
* [Snapshot](https://snapshot.org/#/dydxgov.eth/proposal/0x0ea7f312f0970e0a9e4e34bd38af59dd79babcd11169282971df1fc210228359)
* [Forum Discussion](https://dydx.forum/t/drc-shifting-from-lp-rewards-toward-market-maker-rebates/594)

## Motivation
The motivation for this proposal has two components: DAO cost savings and improved exchange liquidity. This proposal would increase the DYDX funds controlled by token holders, which would in turn enable the DAO to fund key initiatives. Furthermore, if dYdX Trading Inc. implements the recommended increase in maker rebates, we anticipate that there will be even more liquidity closer to the top of the order book. Given that historically, most volume eats through less than 1bp of liquidity, the increase in top-of-orderbook liquidity should benefit the majority of taker volume.

## Specification
### Proposed Changes
Reduce the LP rewards by 50% from 1,150,685 DYDX/epoch to 575,343 DYDX/epoch. The 575,342 DYDX/epoch that are not distributed to LPs will vest to the rewards treasury, which can be redirected by a DAO vote.

## Implementation
[Updates setRewardsParameters](https://github.com/dydxfoundation/governance-contracts/blob/9514fd8c2b7f874c395754f887e4f7026725e7b5/src/migrations/update-merkle-distributor-rewards-parameters-dip24.ts) for LP rewards in the Merkle Distributor to 575,343 DYDX per epoch. The on-chain proposal to be voted on by governance will include the following transaction to be executed via the [Short Timelock](https://docs.dydx.community/dydx-governance/voting-and-governance/governance-parameters):

* Update the Merkle Distributor to the new liquidity provider rewards parameter.

## Test Cases
A full test case is provided in the implementation found [here](https://github.com/dydxfoundation/governance-contracts/blob/9514fd8c2b7f874c395754f887e4f7026725e7b5/test/misc/update-merkle-distributor-rewards-parameters-dip24.spec.ts#L33).

## Implementation
A full implementation of the proposed changes can be found [here](https://github.com/dydxfoundation/governance-contracts/pull/46).

## Copyright
Copyright and related rights waived via [CC0](https://creativecommons.org/publicdomain/zero/1.0/).



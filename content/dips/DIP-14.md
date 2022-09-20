---
DIP: 14
title: Winding Down the Liquidity Module
status: Proposed
author: Sixtant / Reverie
shortDescription: Wind down the existing liquidity module
discussions: https://commonwealth.im/dydx/discussion/5661-drc-winding-down-the-borrowing-pool
created: 2022-08-20
---

## Simple Summary

The dYdX Liquidity Staking Pool, which allowed users to stake USDC that was borrowed by Market Makers, will be shut down. The remaining rewards allocated to the Liquidity Staking Pool will not be distributed, but accrue in the Rewards Treasury, which in turn can be claimed by the Community.

## Abstract

Sixtant proposed winding down the Liquidity Module due underutilization and inefficient allocation of DYDX rewards. Data shows the USDC staked in the Pool is underutilized, resulting in the Community inefficiently rewarding stakers with DYDX for their staked USDC.

We expect to see a revamp of liquidity programs throuhg new initiatives outside of the Liquidity Staking Pool.

Each epoch, the 383,562 DYDX currently allocated to USDC stakers will instead be distributed to the Rewards Treasury. This Treasury is owned by the Community, and an additional proposal can be submitted to transfer the DYDX back to the Community Treasury if needed.

The snapshot vote concluded with 632 voters and 17M DYDX in agreement (99.96%). The vote results have shown significant support for the proposal.
https://snapshot.org/#/dydxgov.eth/proposal/0x6a0c11c6749661fa59f887e521deada80d30dcbc0961af555227a5c4d0b00a4e

**Relevant Links**

- DRC discussion: https://commonwealth.im/dydx/discussion/5661-drc-winding-down-the-borrowing-pool
- DRC Snapshot: https://snapshot.org/#/dydxgov.eth/proposal/0x6a0c11c6749661fa59f887e521deada80d30dcbc0961af555227a5c4d0b00a4e
- Pull Request with the Proposed Implementation: https://github.com/dydxfoundation/governance-contracts/pull/33
- Liquidity Module Documentation: https://docs.dydx.community/dydx-governance/staking-pools/liquidity-staking-pool

## Motivation

To promote liquidity network effects and incentivize professional LPs, 2.50% of DYDX is currently allocated to be distributed over 5 years to users who stake USDC in the Liquidity Staking Pool. As a result, 383, 562 DYDX are distributed pro-rata to stakers each epoch. While this had some success initially, the program is no longer an efficient allocation of DYDX for the following reasons:

**1. Underutilization**

The dYdX community is currently rewarding USDC stakers with 383, 562 DYDX each epoch. Assuming DYDX is priced at $2.00, this amounts to over $767K in DYDX. Given that $193M USDC is currently unborrowed (~70%), the dYdX community is paying DYDX rewards for underutilized USDC capital.

**2. Inadequate Disclosure**

Most prospective borrowers have not fulfilled the disclosure requirements that the community voted to adopt in the borrowing framework.

**3. Impact on Market Structure**

In Epoch 9, the dYdX community almost unanimously supported updating the LP rewards formula to redistribute LP rewards in a more equitable manner to incentivize competition. Currently, the structure of the borrowing pool negatively impacts competition among LPs.

Instead, re-allocating the remaining rewards back to the Community Treasury will allow the DAO to scale and initiate different growth programs. In addition to this, we anticipate new liquidity programs to be launched after the winding down of this Pool.

## Specification

All epoch rewards will be set to accrue in the [Rewards Treasury](https://etherscan.io/address/0x639192D54431F8c816368D3FB4107Bc168d0E871). DYDX held in the Rewards Treasury can be claimed by the Community through a governance vote to transfer funds from the Rewards Treasury to the Community Treasury.

While this may not be the most efficient process, it is at this time the best option to efficiently wind down the paying of Liquidity Module rewards and allowing the Community to accrue these tokens instead. The rewards will be in control of the Community, only accruing in the Rewards Treasury.

The following code changes will be approved in relation to this proposal:
- Setting the liquidity staking pool rewards per second to 0.
- Decreasing the length of the blackout window to three days.


## Rationale

The community had expressed overwhelming support for the winding down of the Liquidity Staking Pool in discussions. We believe this to be in the best interest of the community and protocol.

## Copyright

Copyright and related rights waived via [CC0](https://creativecommons.org/publicdomain/zero/1.0/).

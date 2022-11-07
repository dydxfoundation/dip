---
DIP: 17
title: Winding Down the Safety Staking Module
status: Proposed
author: Xenophon Labs
shortDescription: Wind down the existing safety staking module
discussions: https://forums.dydx.community/discussion/7013-dydx-safety-staking-review
created: 2022-11-02
---

## Simple Summary

The dYdX Safety Staking Module, which allowed users to stake DYDX that would then be used as an insurance backstop in the case of a protocol shortfall event, will be shut down. The remaining rewards allocated to the Safety Staking Module will not be distributed, but accrue in the Rewards Treasury, which in turn can be directed by the community.

## Abstract

Xenophon Labs proposed winding down the Safety Staking Module due to its impracticality as an insurance fund and inefficient allocation of DYDX token.

Each epoch, the 383,562 DYDX currently allocated to DYDX stakers will instead accummulate in the Rewards Treasury. The dYdX community may redirect the DYDX from the Rewards Treasury with a vote falling under the requirement of the short timelock. Also, an additional proposal can be submitted to transfer the DYDX back to the Rewards Treasury if needed.

Each epoch, the 383,562 DYDX currently allocated to DYDX stakers will instead accumulate in the Rewards Treasury. The dYdX community may redirect the DYDX from the Rewards Treasury with a vote falling under the requirement of the short timelock. Also, an additional proposal can be submitted to transfer the DYDX back to the Community Treasury if needed.

The snapshot vote concluded with 7.7M DYDX in agreement (92.95%).
https://snapshot.org/#/dydxgov.eth/proposal/0x756f174ea610a5891365f19881b3e300c719a80b16e8d67643aace30d4ca3bc4

**Relevant Links**

- DRC discussion: https://forums.dydx.community/discussion/7013-dydx-safety-staking-review
- DRC Snapshot: https://snapshot.org/#/dydxgov.eth/proposal/0x756f174ea610a5891365f19881b3e300c719a80b16e8d67643aace30d4ca3bc4
- Pull Request with the Proposed Implementation: https://github.com/dydxfoundation/governance-contracts/pull/37
- Safety Staking Module Documentation: https://docs.dydx.community/dydx-governance/staking-pools/safety-staking-pool

## Motivation

There are 383,562 DYDX tokens allocated to Safety Staking Module (SSM) each epoch. This spending is meant to provide insurance power for the protocol in the case of a shortfall event. However, our research suggests that the SSM is not an effective insurance fund, due to the practical difficulty of slashing the SSM, as well as the much lower value that the DYDX token would be sellable for in the case of a shortfall event, due to market contagion and lack of liquidity. While in the long term we believe the SSM should be replaced by a module with better insurance power, such as a USDC Safety Staking Module or a USDC-DYDX Balancer LP token Safety Staking Module, this would require too much of a lift for the dYdX team currently. Thus, we believe it is appropriate to halt emissions to the current SSM until we can replace it following the launch of dYdX V4.

## Specification

Under the implementation, DYDX will accrue in the [Rewards Treasury](https://etherscan.io/address/0x639192D54431F8c816368D3FB4107Bc168d0E871) each epoch. The dYdX community will have control over accrued DYDX that previously would have been distributed to stakers in the liquidity module. With a governance vote, DYDX held in the Rewards Treasury can be (1) sent to the Community Treasury or (2) sent directly to an Ethereum address for any Community directed purpose.

The following code changes will be approved in relation to this proposal:
- Setting the safety staking module rewards per second to 0.
- Decreasing the length of the blackout window to three days.

## Rationale

See motivation.

## Implementation

A full implementation is open-sourced on the dYdX Foundation Github ([link](https://github.com/dydxfoundation/governance-contracts/pull/37)). We are targeting implementation date in Epoch 17, any time after November 22, 3 PM UTC.

## Copyright

Copyright and related rights waived via [CC0](https://creativecommons.org/publicdomain/zero/1.0/).

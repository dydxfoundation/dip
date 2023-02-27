---
DIP: 20
title: Reduce Trading Rewards by ~45%
status: Proposed
author: Callen - Wintermute (@callenwm)
shortDescription: Reduce Trading Rewards to 1,582,192 DYDX per epoch
discussions: https://forums.dydx.community/discussion/9949-drc-reduce-trading-rewards-by-45
created: 2023-02-23
---

## Simple Summary

This proposal seeks to reduce trading rewards to 1,582,192 DYDX from 2,876,712 DYDX. The excess 1,294,520 DYDX will accrue in the Rewards Treasury and can be used/directed by the dYdX community with a governance vote ([Short Timelock](https://docs.dydx.community/dydx-governance/voting-and-governance/governance-parameters)).

## Abstract

As part of our [V4 Vanguard Post](https://forums.dydx.community/discussion/9916-v4-vanguard), we propose to reduce Trading Rewards by ~45%. In the current market downturn, we believe Trading Rewards remain excessive and are the highest contributor to yearly token inflation.

On Feb 15th, 2023, there was a Snapshot vote to gauge the community’s sentiment towards such a change. The vote passed with 27,534,218 DYDX in favour (91.60% of votes) from 776 voters.

### Relevant Links
- [Snapshot](https://snapshot.org/#/dydxgov.eth/proposal/0xf6560afee2b771db087a9bf67abb1aa98023cabff066c0e7033fb83d2980179c)
- [Forum Discussion](https://forums.dydx.community/discussion/9949-drc-reduce-trading-rewards-by-45)

## Motivation
By reducing trading rewards, excess DYDX are retained in the rewards/community treasury. This can be accessed by the community through a governance vote, but most importantly, the retained DYDX will have a significant impact on the DAOs ability to fund initiatives in V4 in a sustainable and controlled manner!

## Specification

### Proposed Changes:
- Reduce per-epoch trading reward emissions to 1,582,192 DYDX from 2,876,712 DYDX (Excess DYDX: 1,294,520)
Note: Excess DYDX will accrue in the Rewards Treasury, but can be moved via an on-chain community vote.

### Smart Contract Implementations:
Updates setRewardsParameters for trader rewards in the Merkle Distributor to 1,582,192 per epoch
The on-chain proposal to be approved by governance will include the following transaction to be executed via the [Short Timelock](https://docs.dydx.community/dydx-governance/voting-and-governance/governance-parameters):
- Update the Merkle Distributor to the new trading rewards parameter.

## Rationale

The magnitude of the cut to Trading Rewards was driven by the disproportionate allocation towards DYDX Trading Rewards in comparison to Liquidity Provider Rewards and the Community/Rewards Treasury. Furthermore, the change aligns with a new distribution and emission schedule outline in V4 Vanguard. There were community members not in favour of the reduction, however, given the current market conditions the majority of the community was in favour of this proposal as indicated in the Snapshot.

## Test Cases

A full test case is provided in the implementation found [here.](https://github.com/dydxfoundation/governance-contracts/blob/f82ae1165d428b282da57831408da4520bd8570e/test/misc/update-merkle-distributor-rewards-parameters-v2.spec.ts)

## Implementation

A full implementation of the proposed change can be found [here.](https://github.com/dydxfoundation/governance-contracts/pull/39/commits/f82ae1165d428b282da57831408da4520bd8570e#diff-7eb7d483f4a795b587ba7224faf58d79f0ffa5e2ef1924534d50c2c740e733ba)

## Copyright

Copyright and related rights waived via [CC0](https://creativecommons.org/publicdomain/zero/1.0/).

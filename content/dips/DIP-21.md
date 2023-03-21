---
DIP: 21
title: Increase Maximum Funding Rates (8h) to 4%
status: Proposed
author: Considered Finance / Reverie
shortDescription: Rase the maximum funding rates from 0.75% to 4% on all markets
discussions: https://commonwealth.im/dydx/discussion/10234-drc-increase-the-maximum-funding-rate
created: 2023-03-21
---

## Simple Summary

Increase the maximum 8h funding rate from 0.75% to 4% across all markets.

## Abstract

Considered Finance, through a research grant from the DGP, published a [paper](https://drive.google.com/file/d/1SyZJPmJXhyjapY_Dr9gJjU_gJLAwwWgf/view) on the implications of the existing funding rate bounds on dYdX markets. The research identified several occasions where the maximum rates have been insufficient to incentivize convergence between dYdX market prices and underlying index prices. This causes inefficiencies in dYdX markets and trading experiences. To solve for this problem, Considered Finance proposes increasing the maximum 8h rates to a bound between -4% and 4%, up from the existing -0.75% and 0.75%. This change will improve the trading experience and reduce the need for manual interventions through margin adjustments.

The snapshot vote concluded with 657 voters and 18M DYDX in agreement (99.99%). The vote results have shown significant support for the proposal.

### Relevant Links
- [Snapshot](https://snapshot.org/#/dydxgov.eth/proposal/0xfabe06f07828bf6d38110a17cb189ccd3e7b2f97d120023c7723f8893c89214d)
- [Forum Discussion](https://commonwealth.im/dydx/discussion/10234-drc-increase-the-maximum-funding-rate)
- [Paper](https://drive.google.com/file/d/1SyZJPmJXhyjapY_Dr9gJjU_gJLAwwWgf/view)

## Motivation
Increasing the maximum funding rate bounds reduces the need for manual intervention on markets, for example increasing the initial margin fractions and imposing Close-Only modes. These interventions hamper user experiences for traders. Further, increasing the bound reduces the likelihood of dislocation between dYdX market prices and the underlying index prices, improving the health of dYdX markets.

## Specification

### Proposed Changes:
Increase the _max_funding_rate_ parameter from 0.75% to 4% to be implemented across all dYdX perpetual markets.

The following code change will be approved as part of this proposal:
- Change the max_funding_rate variable found in the dydx production_general_config of the starkware contract from '1120' to '5970.

This change will be executed through a Starkware Priority Timelock Executor proposal.

## Rationale

The community has expressed strong support for the proposal in both forum and snapshot voting stages. The proposal is an improvement to the health of dYdX markets and user experiences for active traders.


## Implementation

A full implementation of the proposed change can be found [here.](https://github.com/dydxfoundation/governance-contracts/pull/39/commits/f82ae1165d428b282da57831408da4520bd8570e#diff-7eb7d483f4a795b587ba7224faf58d79f0ffa5e2ef1924534d50c2c740e733ba)

## Copyright

Copyright and related rights waived via [CC0](https://creativecommons.org/publicdomain/zero/1.0/).

---
DIP: 19
title: Move LP rewards formula weight from stkDYDX to MakerVolume
status: Proposed
author: Xenophon Labs (@XenophonLabs)
shortDescription: Remove `stkDYDX` from LP rewards
discussions: https://forums.dydx.community/discussion/7872-drc-remove-stkdydx-from-lp-rewards-formulas
created: 2022-12-10
---

## Simple Summary

Remove `stkDYDX` from the LP rewards mechanism, and reallocate the `stkDYDX` term's weight to `MakerVolume`.

## Abstract

We propose removing the `stkDYDX` term from the LP rewards mechanism and reallocating the `stkDYDX` term's weight to `MakerVolume`. The decision to remove the `stkDYDX` term follows naturally from the community's decision to wind down the safety staking module. The decision to reallocate the `stkDYDX` term's weight to the `MakerVolume` term comes from our opinion that volume is the best proxy for value that LPs provide to the protocol's traders.

On December 10, 2022, there was a Snapshot vote on this which concluded with 883 voters and 16,177,534 DYDX in agreement (99.97%) to make these LP rewards formula changes.

**Relevant Links**
* [DRC discussion](https://forums.dydx.community/discussion/7872-drc-remove-stkdydx-from-lp-rewards-formulas)
* [Snapshot](https://snapshot.org/#/dydxgov.eth/proposal/0xa81ef2ab284b27338fcb96da592d2b1900fc121eccc445e52597c9208491afa1)

## Motivation
Since the safety staking module is being wound down, incentivizing `stkDYDX` no longer makes sense. As for giving more weight to the volume term, this is because we believe volume is the most direct way of incentivizing LPs to provide better-utilizedliquidity to traders of the protocol.


## Specification

Weights for non BTC/ETH markets to `v = 0.65, d = 0.35, and s = 0.00`. In effect, remove the `stkDYDX` (`s`) term entirely and give its previous weight to the volume (`v`) term.

Weights for BTC and ETH markets to `v= 0.85, d = 0.15, s = 0.00`. In effect, remove the `stkDYDX` (`s`) term entirely and give its previous weight to the volume (`v`) term.

Updates to the LP rewards formula and rewards allocation do not require any smart contract changes. Revisions to the LP rewards formula and rewards allocation will be implemented by dYdX Trading after the start of Epoch 18 (December 20, 2022, at 3 PM UTC). Epoch 18's rewards will be calculated using the new weights.


## Copyright

Copyright and related rights waived via [CC0](https://creativecommons.org/publicdomain/zero/1.0/).
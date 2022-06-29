---
DIP: 12
title: New Assets to the Starkware Priority Timelock Executor (Epoch 11)
status: Proposed
author: Reverie
shortDescription: Add 15 new assets to the Starkware contracts in Epoch 11
discussions: https://commonwealth.im/dydx/discussion/5215-new-assets-for-epoch-11
created: 2022-06-29
---

## Simple Summary

Add 15 new assets to the StarkEx contract configuration for eventual listing on the dYdX platform.

## Abstract

Reverie is proposing to add the following new assets to the StarkEx contract to ready the protocol for listing and signal community belief that dYdX Trading should prioritize these new markets:

ApeCoin (APE)

Stepn (GMT)

Fantom (FTM)

Axie Infinity (AXS)

Optimism (OP)

Waves (WAVES)

Gala (GALA)

The Sandbox (SAND)

Decentraland (MANA)

Shiba Inu (1000SHIB)

Theta Network (THETA)

Reserve Rights (RSR)

Zilliqa (ZIL)

VeChain (VET)

Ethereum Name Service (ENS)

These assets have been reviewed by the New Asset Listing group, and received positive feedback from market makers and community members. Please review the assets using the Chaos Labs tool here: https://dydx.chaoslabs.xyz/asset-listing

The snapshot vote concluded with 282 voters and 13M DYDX in agreement (99%). The vote results have shown significant support for adding these assets.
https://commonwealth.im/dydx/snapshot/dydxgov.eth/0x16c1fa1ad9ae00241c8f451313d3b03a17c670ef5bf339e92e508e660780400a

**Relevant Links**

Asset Listing Tool: https://dydx.chaoslabs.xyz/asset-listing

DRC discussion: https://commonwealth.im/dydx/discussion/5215-new-assets-for-epoch-11

New Asset Listing Group Discussion: https://commonwealth.im/dydx/discussion/4993-new-asset-listing-group

## Motivation

Listing new assets is a well-known growth strategy used by exchanges to attract new users and increase trading volumes. We believe dYdX will need to increase its listing frequency to remain competitive. By adding these assets to the StarkEx contract, we hope to signal and improve the likelihood that dYdX Trading will add these new markets to the platform.

Adding these new markets should improve overall trading volumes and hopefully attract more traders.

## Specification

With assistance from dYdX developers and the Starkware team, Reverie has generated the data to execute the function executeAssetConfigurationChanges in the StarkExHelperGovernor contract. This will add the asset configurations on the backend to enable trading on the platform.


## Copyright

Copyright and related rights waived via [CC0](https://creativecommons.org/publicdomain/zero/1.0/).

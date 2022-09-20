---
DIP: 15
title: A Further Step Towards More Equitable LP Rewards
status: Approved
author: SLN Capital (@SLNcapital)
shortDescription: Improvement to LP rewards
discussions: https://forums.dydx.community/discussion/6322-discussion-revisions-to-improve-the-lp-reward-formula
created: 2022-09-20
---

## Simple Summary

Improvement to LP rewards

## Abstract

We propose:

- Changing the weights for non BTC/ETH markets to `v = 0.6, d = 0.35, and s = 0.05`. 
- For BTC/ETH, `v = 0.8, d = 0.15, s = 0.05` 
- Reducing the amount paid for BTC/ETH to 10% / 10% rather than 20% / 20%, thus giving 80% to the other markets.

The main direction then is to increase weight towards the Volume term that was added last time by Wintermute’s proposal, as well as acknowledge the maturity of BTC/ETH markets and the lower need there to incentivize book-quoting.

Over time as other markets mature we can move further on towards even more simple volume weighting.

Relevant Links

DRC discussion: https://forums.dydx.community/discussion/6322-discussion-revisions-to-improve-the-lp-reward-formula

## Motivation

Moving towards more sustainable LP rewards that reward liquidity providing where it is actually needed, and increase importance of volume actually done versus other metrics that are indermediary.

## Specification

Weights for non BTC/ETH markets to v = 0.6, d = 0.35, and s = 0.05.
Weights for BTC/ETH markets to v= 0.8, d = 0.15, s = 0.05 
Reducing the amount paid for BTC/ETH to 10% / 10% rather than 20% / 20%, thus giving 80% to the other markets

## Rationale

Making a further step towards incentivizing volume, and focusing on growth markets for rewards rather than developed ones.

## Copyright

Copyright and related rights waived via [CC0](https://creativecommons.org/publicdomain/zero/1.0/).

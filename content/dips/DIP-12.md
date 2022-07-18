---
DIP: 12
title: dYdX Grants Program v1.5
status: Proposed
author: Reverie
shortDescription: Launch dYdX Grants Program v1.5 with $5.5M DYDX and Two new Trusteees
discussions: https://commonwealth.im/dydx/discussion/5808-dydx-grants-program-v15
created: 2022-07-13
---

## Simple Summary

Launch v1.5 of the dYdX Grants Program with $5.5m moved from the Community Treasury to the Grants Multi-sig. Additionally, remove two existing Trustees and appoint two new Trustees to the dYdX Grants Trust.

## Abstract

Reverie is proposing launching a new version of the dYdX Grants Program, leveraging the lessons learned from v1, to help dYdX grow users and support the migration to the new dYdX Chain.
Reverie will continue to act as lead for the program, and maintain its position as Enforcer of the dYdX Grants Trust.
Two existing Trustees of the dYdX Grants Trust, Su Zhu and Zhuoxun Yin, will be removed as Trustees.
Lily Liu and Alexios Valonasis will be appointed as the new Trustees for the dYdX Grants Trust.

The snapshot vote concluded with 314 voters and 18M DYDX in agreement (98.9%). The vote results have shown significant support for the program.
https://forums.dydx.community/snapshot/dydxgov.eth/0xe77513bfec9f55b1d620d973af1c4da1266ceffd333cbb120bc54a9359d27a40

**Relevant Links**

DGP website: https://dydxgrants.com/

DRC discussion: https://commonwealth.im/dydx/discussion/5808-dydx-grants-program-v15

## Motivation

Following on the success of dYdX Grants Program v1, the goal is to leverage the lessons learned to build a more effective, focused grants program to contribute towards protocol growth.
The program will focus on International growth to expand brand awarness and user adoption, and work on different research initiatives to tackle upcoming challenges with the dYdX Chain.
Additional grants will be funded where applicable, always with the aim of contributing towards dYdX growth.

As part of a regular changing of Trustees based on contributions and availability, Su Zhu and Zhuoxun Yin will be removed as Trustees of the dYdX Grants Trust.
To replace the two Trustees removed, Lily Liu and Alexios Valonasis will be appointed as the new Trustees. Lily has significant experience in the crypto space and Alexios has been an active community member with experience working alongside the dYdX Grants team.

## Specification

**Program Design**

* $5.5M funding in DYDX
* 6 months timeframe ahead of V4 launch
* Reverie as Full Time Lead
* 8 Trustees

The treasury will move $5.5m worth of DYDX to the dYdX Grants Trust multi-sig managed by the Trustees.

Funds will be used to reward Grantees, pay the Lead and cover additional program costs. Grantees will be subject to milestones that can determine compensation structure, with standard payouts being 25% upfront and the remainder upon completion.

**DYDX Amount**

The amount of DYDX to be moved from the community treasury to the DGP Multisig will be determined using a 24h vwap of the trades executed on the most liquid exchange, namely Binance.com. Given it makes up roughly 20% of the 24h volume, the DYDX/USDT Binance market data will be used to derive a market price. The data will be pulled from https://data.binance.vision/?prefix=data/spot/daily/trades/DYDXUSDT/. The previous day's trades will be used to capture a full 24h window so as to avoid timing constraints. The following data file is used: https://data.binance.vision/data/spot/daily/trades/DYDXUSDT/DYDXUSDT-trades-2022-07-15.zip

This formula will be used to calculate the price: Σ(Price * Volume) / Σ(Volume).

From the data, we find: $30,673,037.51 / 14,600,009.13 = $2.10.

The DYDX Amount to be transferred will be $5,500,000 / $2.10 = **2,619,000** (rounded up to the nearest thousand for simplicity).

**Trustee Changes**

Below is a formal letter drafted by the Grants team counsel outlining the actions enacted on behalf of DYDX tokenholders if the proposal passes with the regards to the changes made of Trustees.

https://docs.google.com/document/d/1XEjuFBkxDeaSM4xG6OqOaI88LwxSLz4ZP6XJzwnZHpA/edit?usp=sharing

## Rationale

The community has addressed certain concerns and issues with a v1.5 of the Grants program in the DRC, but overall consensus has been in strong support of launching. The program will work to grow the dYdX user base and trading volume through various initiatives while also helping the community tackle important questions and challenges ahead of the V4 launch.


## Copyright

Copyright and related rights waived via [CC0](https://creativecommons.org/publicdomain/zero/1.0/).

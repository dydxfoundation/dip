---
DIP: 6
title: dYdX Grants Program
status: Proposed
author: Reverie
shortDescription: Launch a Grants Program with $6.25m from the Community Treasury
discussions: https://forums.dydx.community/proposal/discussion/2511-drc-dydx-grants-program/
created: 2021-12-20
---

## Simple Summary

Launch the dYdX Grants Program with $6.25m moved from the Community Treasury to the Grants Multi-sig.

## Abstract

Reverie is proposing to lead a Grants program for the dYdX community to engage participants and attract new contributors. Grants will include both small and large projects with grantees ranging from single individuals to institutional teams. A Grants Committee, specified in the DRC, will control the multi-sig and
advise the lead team on grants. A list of initial RFP ideas has been published on the website with the hopes of inspiring future contributors. Applicants are
encouraged to apply for existing RFPs or propose new Grant projects. The lead team will review all applications and submit funding proposals to the Committee.

The snapshot vote concluded with 314 voters and 18M DYDX in agreement (98.9%). The vote results have shown significant support for the program.
https://forums.dydx.community/snapshot/dydxgov.eth/0xe77513bfec9f55b1d620d973af1c4da1266ceffd333cbb120bc54a9359d27a40

**Relevant Links**

DGP website: https://dydxgrants.com/

DRC discussion: https://forums.dydx.community/proposal/discussion/2511-drc-dydx-grants-program/

## Motivation

The goal of the program is to increase the contributor count and actively promote the growth of the dYdX protocol. While initial grants cannot directly change
the dYdX product or core development, Grantees will have the opportunity to impact growth through external tools and non-technical projects (e.g. Analytics dashboards, newsletters, governance etc..). This contributor growth will lead to improvements across both user experiences and the overall community.

## Specification

**Program Design**

* $3m DYDX Funding per quarter for two quarters
* 1 Full Time Lead
* 8 Committee Members
* Committee Member held Multi-Sig

The treasury will move $6.25m worth of DYDX to the Committee Member multi-sig.

Funds will be used to reward Grantees, pay the Lead and cover additional program costs. Grantees will be subject to milestones that can determine compensation structure, with standard payouts being 25% upfront and the remainder upon completion.

**DYDX Amount**

The amount of DYDX to be moved from the community treasury to the DGP Multisig will be determined using a 24h vwap of the trades executed on the most liquid exchange, namely Binance.com. Given it makes up roughly 30% of the 24h volume, the DYDX/USDT Binance market data will be used to derive a market price. The data will be pulled from https://data.binance.vision/?prefix=data/spot/daily/trades/DYDXUSDT/. The previous day's trades will be used to capture a full 24h window so as to avoid timing constraints. As such, we will use the following data set: https://data.binance.vision/data/spot/daily/trades/DYDXUSDT/DYDXUSDT-trades-2021-12-19.zip.

This formula will be used to calculate the price: Σ(Price * Volume) / Σ(Volume).
From the data above, we find: $19,474,341.64 / 2,412,099.90 = $8.07.

The DYDX Amount to be transferred will be $6,250,000 / $8.07 = 775000.00 (rounded up to the nearest thousand for simplicity).

## Rationale

The community has addressed certain concerns and issues with a Grants program in the DRC, but overall consensus has been in strong support of launching. The program will make productive use of treasury funds to promote the protocol and engage contributors. Promoting external tools and analytics dashboards, among other projects, will improve the product experience and should lead to user growth. The program will also attract third party providers and other institutional teams that can build bridges and relevant tools to improve governance and trading experiences.
Grants programs have been successful to grow an active contributor base and benefit the underlying protocol. We hope to bring this same positive growth to dYdX with this program.


## Copyright

Copyright and related rights waived via [CC0](https://creativecommons.org/publicdomain/zero/1.0/).

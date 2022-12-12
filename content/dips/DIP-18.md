---
DIP: 18
title: dYdX Operations subDAO
status: Proposed
author: Reverie
shortDescription: Establish a Guernsey Purpose Trust with $360,000
discussions: https://commonwealth.im/dydx/discussion/7620-drc-dydx-operations-trust
created: 2022-12-12
---

## Simple Summary

Launch a dYdX Operations subDAO by establishing a Guernsey Purpose Trust entity funded with $360,000 of DYDX transferred from the Community Treasury.

## Abstract

Reverie is proposing to launch an Operations subDAO for the dYdX DAO to manage the publication of a DAO Playbook, run DAO communications, open a fiat bank account, and additional responsibilities.

The subDAO will be established through a Guernsey Purpose Trust, named the dYdX Operations Trust. Three Trustees and an Enforcer will be appointed to manage the responsibilities of the Trust.

To cover compensation and expenses, we are requesting a total of $360,000 in DYDX to be transferred from the Community Treasury to the Ops Trust multisig.
The Operations subDAO will be operational for an initial 6 month period to deliver the responsibilites outlined below.

The snapshot vote concluded with 783 voters and 7.7M DYDX in agreement (75.43%). The vote results have shown significant support for the program.
https://snapshot.org/#/dydxgov.eth/proposal/0xa710b0ca85e04ac2db123ae522ac5030a008ccbc8d4d413e83d18f6032b39758

**Relevant Links**

DRC discussion: https://commonwealth.im/dydx/discussion/7620-drc-dydx-operations-trust

## Motivation

dYdX is facing an important decision to scale the protocol thoughtfully as it transitions to full community control. As a community, we have to look ahead towards organizational transformation through the use of subDAOs. Accomplishing this goal will first require guidance on structural implementation.

Speaking from experience with the Grants Trust, launching a subDAO is not quite as simple as opening a wallet and getting community funding. There are tons of legal procedures, operational headaches, and other nuances to building a truly internet-native organization. Community members should be able to benefit from the know-how and experience gained through the process that led to the creation and operation of the Grants Trust.

To keep up with the competitive landscape, the DAO will also need to operate quickly. Doing so will require a standardized process for launching new subDAOs in charge of important functions. The playbook to be written by the Ops Trust will give the community a thoughtful approach for quickly spinning up new subDAOs, including all legal and operational procedures necessary.

## Specification

**Trust Agreement**
If this proposal is passed, the Trust will be formed with dYdX Consent as defined in the Trust Agreement. The full agreement can be seen here:
https://drive.google.com/file/d/16ubaQpxlnmybYkoSE5ML_NkgR36EyrH0/view?usp=sharing

**The subDAO will be funded for a period of 6 months**

Reverie will work with outside legal counsel to establish a Guernsey Purpose Trust. The Trust will be formed with the following contributors:

**Trustees**
- Reverie Reserves, LLC
- Joanna Pope
- Callen Van Den Elst

**Enforcer**
George Beall

**Responsibilities**
- Open a fiat bank account for the Ops Trust
- Hire and manage external legal staff for ongoing guidance
- Payments and Financial Reporting
- Create communication channels for the Ops Trust, as needed, which can serve as the standard dYdX DAO’s communication channel going forward
- Build and share a DAO playbook for launching new dYdX subDAOs

**Compensation and Expenses**
- Reverie will receive **$15,000 per month** and a **$90,000 success fee** for publishing the DAO playbook
- Joanna Pope will receive **$1,500 per month** as Trustee
- Callen Van Den Else has waived compensation as Trustee
- George Beall will receive **$2,000 per month** as Enforcer

We are requesting an additional **$100,000** to cover legal and operational expenses for all Ops Trust related engagements.

In total, $360,000 will be used to fund the initial 6 month operation of the Ops subDAO.

**DYDX Amount**

The amount of DYDX to be moved from the community treasury to the Ops Trust Multisig will be determined using a 24h vwap of the trades executed on the most liquid exchange, namely Binance.com. The previous day's trades will be used to capture a full 24h window so as to avoid timing constraints. The following data file is used: https://data.binance.vision/data/spot/daily/trades/DYDXUSDT/DYDXUSDT-trades-2022-12-10.zip

This formula will be used to calculate the price: Σ(Price * Volume) / Σ(Volume).

From the data, we find: $6,370,831.51 / 3,967,848 = $1.606.

The DYDX Amount to be transferred will be $360,000 / $1.606 = **225,000.00 DYDX** (rounded up to the nearest thousand for simplicity).


## Rationale

The community has addressed certain concerns and issues with a dYdX Operations subDAO run by Reverie in the DRC, namely regarding possible conflicts with the existing involvement in the Grants program. Since the responsibilities of this Trust do not overlap with our responsibilities as Grants lead and Enforcer on the dYdX Grants Trust, we believe there is no conflict in our role as Trustee for the Ops Trust. Beyond these initial concerns, overall consensus has been in strong support of launching as indicated through the Snapshot vote and general positive feedback. The dYdX Ops subDAO will act as a catalyst for the growth of the dYdX DAO through the launching of new subDAOs.


## Copyright

Copyright and related rights waived via [CC0](https://creativecommons.org/publicdomain/zero/1.0/).

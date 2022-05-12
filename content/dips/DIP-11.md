---
DIP: 11
title: A Step Towards a More Equitable Liquidity Provider Reward Structure
status: Approved
author: Callen Wintermute (@callenwm)
shortDescription: Change Liquidity Provider Reward Formula Weightings and Include Maker Volume
discussions: https://commonwealth.im/dydx/discussion/4407-a-step-towards-a-more-equitable-liquidity-provider-reward-structure
created: 2022-05-03

---

## Simple Summary

The purpose of this DIP is to implement maker volume into the calculation of liquidity provider rewards, as well as reduce the weight of depth, spread and stkDYDX. This should in theory provide a more equitable distribution of rewards and incentivize LP compeition, while creating a better trading environment for users.

## Abstract

dYdX’s liquidity provider reward program is dominated by two liquidity providers earning +90% of rewards every Epoch. While dYdX incentivizes for depth, spread, uptime and protocol alignment, market makers are not incentivized to compete for market share. This composition of market structure is detrimental to the longevity of dYdX as it produces a sub-optimal trading environment (large spreads) and discourages entrants (rewards are cornered due to size and stkDYDX). 

The Snapshot vote concluded with 553 unique voters and a total of 18,263,364 DYDX voted. The overwhelming majority of the community (539 & 99.97% of DYDX) were in favor of moving forward with this proposal.

## Motivation

Currently, dYdX rewards LPs for showing size and not their ability to compete for market share. This is done by:
- Rewarding depth with increasing returns to scale, allowing LPs who have huge size sit passively in the orderbook and earn large amounts of rewards.
- Largely reward stkDYDX with increasing returns to scale, allowing LPs with a big stkDYDX balance to compound their rewards as opposed to new entrants who need significant capital outlay to compete.

This deters new MM's from competiting as the current reward scheme is dominated by 2 LPs. This is not sustainable for one of the largest derivative protocols. Futhermore, by not incentivizing LPs to compete for market share there is less liquidity at the top of the order book which is not ideal for traders on the platform.

## Specification

Proposed solution: 
1. Introduce maker volume into the calculation of LP rewards
2. Reduce the weight of depth, spread and stkDYDX

New Liquidity Provider Reward Calculation:
Let,

![image](https://user-images.githubusercontent.com/105179217/167971038-8ead6700-61fd-410a-911c-6d256e7f8b2d.png)

The total rewards score for an individual LP, Qi, is then calculated as follows:

![image](https://user-images.githubusercontent.com/105179217/167971051-cec27e63-dac0-45bc-8195-a8fbd08ed87a.png)

Note:
In the original formula stkDYDX is defined as:

![image](https://user-images.githubusercontent.com/105179217/167971084-261f87b5-6c5b-4453-9fc2-ffc0be53cc68.png)

representing an LP’s average stkDYDX score as a proportion of the total pool of stkDYDX. However, given that “Total Pool stkDYDX” is constant across all LPs it simply scales each LP’s score. Therefore,

![image](https://user-images.githubusercontent.com/105179217/167971099-78235ec4-0f0d-481b-bf29-d617ced539dc.png)

is equivalent. This is true for uptime and maker volume as well.

Constant Returns to Scale:
The new weightings are constructed to have constant returns to scale i.e.,

![image](https://user-images.githubusercontent.com/105179217/167971164-c5b650e7-e251-4f4e-97c6-2648f1193b8a.png)

This ensures that if an LP were to split their activity in half across two addresses, they would receive half of their share of rewards in each address and therefore, the same total amount of rewards. Originally, d = 1, v = 0, and s =0.5 producing increasing returns to scale. This advantages large players and incentives combining activity in a single address. For example, doubling the depth posted and stkDYDX results in more than twice the reward share currently.

## Rationale

Introducing maker volume rewards active liquidity, pushing current liquidity closer to ‘desired’ liquidity by inviting competition towards the top of the order book. Naturally, spreads become tighter as LPs fight for market share, traders receive a better trading environment, and active LPs are rewarded for facilitating flow. Weighting maker volume with the highest exponent of v = 0.45 (except uptime), should incentivize such behavior. However, when combined with a reduction in the weight of depth and spread, there is a possibility that deep/passive liquidity is overpenalized.

Without reducing the weight of depth and spread, I expect LPs with large size to continue sitting deep in the order book unless disincentivized. Reducing the exponent of Di from d = 1 to d = 0.35, forces LPs to re-optimize their strategy from passive to active as incentives get cut, once again inviting a better trading experience for users and a more equitable reward scheme amongst a variety of LPs. One concern with the aforementioned changes is the possibility of overpenalizing depth and the quality of liquidity, discouraging large traders from using dYdX. Our goal is to not strictly eliminate depth, but instead taper how much dYdX is paying for such liquidity.

The final reduction in weighting is for the stkDYDX term, from s = 0.5 to s = 0.2. Currently, stkDYDX plays a notable role in LPs receiving rewards. While a large stkDYDX balance is not necessary to achieve a substantial amount of rewards (i.e. new kid on the block), LPs with large amounts of stDYDX can afford to be ‘lazy’ and/or dominate reward share. This leads to incumbents having a major competitive advantage over entrants, and misalignment with current and desired liquidity. As early supporters, Wintermute has chosen to stake a large majority of our rewards and thus have a large stkDYDX balance. While rewarding early supporters is important and having stkDYDX in the LP calculation is beneficial for LP-protocol alignment, I think reducing the dependency on stkDYDX will allow for a more equitable distribution of rewards and increase LP participation.

Alternative Weighting:
The proposed weights were chosen based on how desired liquidity could be achieved without overpenalizing depth, favoring an LPs ability to compete for market share as opposed to showing size. However, it’s important to consider alternative weighting:

Scenario 1:
Equally weight maker volume and depth/spread:

![image](https://user-images.githubusercontent.com/105179217/167971277-f6b13812-3668-4a5a-acd6-a374b6783e40.png)

Scenario 2:
Equal Weights w/ Reduce weight of stkDYDX (i.e., LP - Protocol Alignment):

![image](https://user-images.githubusercontent.com/105179217/167971287-e15f7680-932d-4221-85f0-972967ec2d68.png)

Scenario 3:
Heavily Favor Maker Volume:

![image](https://user-images.githubusercontent.com/105179217/167971296-bfb30a6e-5aaa-446b-bc1f-673d601ac2e9.png)

Scenario 4:
Heavily Favor Depth/Spread:

![image](https://user-images.githubusercontent.com/105179217/167971306-b70f982d-70c7-4536-8a6a-b1d17e555685.png)

General Consensus:
The very large majority of the community were in favour of introducing maker volume and reducing the weights of stkDYDX, depth and spread. There 2 prominent arguments were the constructs of the weights: v = 0.45, d = 0.35, s = 0.2 vs. v = 0.7, d = 0.2, s = 0.1. However, the weights introduced in this proposal were seen as more appropriate given the significant change this proposal introduces in general. Futhermore, this proposal is intended to limit the amount of rewards spent on depth without trying to completely eliminate it.

## Copyright

Copyright and related rights waived via [CC0](https://creativecommons.org/publicdomain/zero/1.0/).

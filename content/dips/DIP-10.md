---
DIP: 10
title: dYdX Trader Reward Formula Fee Parameter Update
status: Approved
author: Max Holloway of Xenophon Labs (twitter @XenophonLabs)
shortDescription: Increase Fee Weight in dYdX Trader Reward Formula
discussions: https://forums.dydx.community/discussion/4190-discussion-dydx-trader-rewards-mechanism-review
created: 2022-04-27
---

## Simple Summary

The purpose of this DIP is to change the weight of the fee parameter from `a=0.67` to `a=0.8`, and decreasing the open interest parameter from `b=0.28` to `b=0.15` in the trader rewards formula, which we expect will lead to an increase in fees paid and a decrease in average open interest in each epoch. The dYdX Community voted and approved these changes via a Snapshot vote that concluded on April 23, 2022.

## Abstract

The dYdX Grants Program [funded](https://dydxgrants.com/funded-grants/approved-grants/rewards-optimization-research-and-paper) [Xenophon Labs](https://xenophonlabs.com/) to conduct [research](https://xenophonlabs.com/dydx_trade_rewards.pdf) into the dYdX trader rewards mechanism. In addition to demonstrating provably optimal rewards-maximizing trading strategies, we found that cumulative fees paid by the protocol are approximately linear in the fee weight parameter `a`. We also find that incentivizing open interest has not made a tangible impact on long-term protocol growth. Therefore, we propose an increase in the fee weight parameter `a` and a decrease in the open interest parameter `b`.

We submitted a snapshot vote on April 18 2022 to conclude on April 23 2022. The Snapshot vote concluded with 8.2M DYDX voting "Yes" and 1.7M DYDX voting "NO". The majority of the community (312 voters & 82.51%) supported to change the formula. This passes the quorum and consensus requirements for an off-chain proposal.

## Motivation / Rationale

Our research suggests that dYdX is leaving money on the table by giving open interest such a high weight in the trader rewards formula. This change is an effort to generate more revenue for the protocol. Specifically, we expect revenues to increase 20\%, which at current prices would lead to an increase in trading fees paid of approximately \$3M per epoch. For a more in-depth summary, see the post [here](https://forums.dydx.community/discussion/4190-discussion-dydx-trader-rewards-mechanism-review); for the research itself, see the research paper [here](https://xenophonlabs.com/dydx_trade_rewards.pdf).

### Important Objections
* Stakeholders who believe open interest parameter is more important than exchange revenues should vote `no` on this proposal.
* Stakeholders who are currently maximizing their trader rewards will receive lower returns-per-fees-paid, however they will *also* not need to carry out as much open interest as before. How this affects their rewards-profit maximizing behavior is up to them to decide.


## Specification
All relevant terms are defined in [dYdX's community documentation](https://docs.dydx.community/dydx-governance/rewards/trading-rewards#:~:text=DYDX%20will%20be%20distributed%20to,to%20any%20vesting%20or%20lockups.).


## Implementation


dYdX smart contracts do not directly control the trader rewards mechanism. If approved, the dYdX Foundation will request that dYdX Trading Inc. implement the changes in time for Epoch 10 (May 10, 2022).

This change should be rather simple to implement, and it is entirely off-chain.
1. Increase the fee weight parameter `a` from `a=0.67` to `a=0.8`.
2. Decrease the open interest weight parameter `b` from `b=0.28` to `b=0.15`.

## Relevant Links
* [Forum Discussion](https://forums.dydx.community/discussion/4190-discussion-dydx-trader-rewards-mechanism-review)
* [Snapshot Vote](https://snapshot.org/#/dydxgov.eth/proposal/0xce4b1334f337975a42c3f78dd16fb25e0b60e816a2d9382e402b5384bea37475)

## Copyright

Copyright and related rights waived via [CC0](https://creativecommons.org/publicdomain/zero/1.0/).

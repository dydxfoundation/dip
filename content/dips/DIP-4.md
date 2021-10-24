---
DIP: 4
title: Safety Module Staker Reimbursement and Compensation
status: Proposed
author: TODO
shortDescription: Reimburse and compensate the early Safety Module stakers whose funds were stuck.
discussions: https://commonwealth.im/dydx/proposal/discussion/1743-safety-staking-pool-on-pause
created: 2021-10-14
---


**DIP Summary**

Reimburse early Safety Module stakers for the full amount of their staked funds, plus an additional 10% compensation.

**Abstract**

An error in the Safety Module deployment led to stakers' funds being stuck in the contract. As a result, DIP-1 was submitted as a proposal to fix the Safety Module, return funds to stakers, and compensate stakers for their missed rewards and inconvenience.

The on-chain vote for DIP-1 failed. This new proposal aims to enact the reimbursement and compensation plan that would have taken effect under DIP-1. Unlike DIP-1, this proposal does not fix the Safety Module itself. This proposal is therefore governed by the parameters of the short timelock, which has a much lower quorum requirement than the long timelock.

**Relevant Links**

* Safety Module Incident Report: [https://dydx.foundation/blog/en/outage-1](https://dydx.foundation/blog/en/outage-1)
* Community discussion thread: [https://commonwealth.im/dydx/proposal/discussion/1743-safety-staking-pool-on-pause](https://commonwealth.im/dydx/proposal/discussion/1743-safety-staking-pool-on-pause)
* DRC - Incident Report of the Safety Module Outage & Proposed Solution Thread: [https://commonwealth.im/dydx/proposal/discussion/1770-drc-incident-report-of-the-safety-module-outage-proposed-solution](https://commonwealth.im/dydx/proposal/discussion/1770-drc-incident-report-of-the-safety-module-outage-proposed-solution)
* DRC Snapshot: [https://snapshot.org/#/dydxgov.eth/proposal/QmbJ5QxHr1pyShKTDaF5DjAr6vxQn8DVxshH2fyWgzDCBn](https://snapshot.org/#/dydxgov.eth/proposal/QmbJ5QxHr1pyShKTDaF5DjAr6vxQn8DVxshH2fyWgzDCBn)
* Pull Request with Proposed Fix Implementation: [https://github.com/dydxfoundation/governance-contracts/pull/1](https://github.com/dydxfoundation/governance-contracts/pull/1)
* Safety Module Smart Contract: [https://etherscan.io/address/0x65f7BA4Ec257AF7c55fd5854E5f6356bBd0fb8EC](https://etherscan.io/address/0x65f7BA4Ec257AF7c55fd5854E5f6356bBd0fb8EC)
* Safety Module Documentation: [https://docs.dydx.community/dydx-governance/staking-pools/safety-staking-pool](https://docs.dydx.community/dydx-governance/staking-pools/safety-staking-pool)
* Safety Module Blogpost: [https://dydx.foundation/blog/en/safety-staking](https://dydx.foundation/blog/en/safety-staking)

**Motivation**

As discussed in DIP-1, following the Safety Module outage, the dYdX Foundation released a detailed [incident report](https://dydx.foundation/blog/en/outage-1) explaining the cause of the error, the impact to users, a proposed solution, and lessons learned.

After robust discussion on the Forums, a community member launched a 5-day poll on Snapshot regarding the question of reimbursing stakers for rewards they did not receive due to the outage. The results of the poll are available [here](https://snapshot.org/#/dydxgov.eth/proposal/QmbJ5QxHr1pyShKTDaF5DjAr6vxQn8DVxshH2fyWgzDCBn). In aggregate, 575 DYDX token holders and delegates voted with 17,112,789 DYDX. With 413 voters and 16,682,487.634 DYDX (97.4855% of total) in agreement, there was an overwhelming consensus that stakers should receive 10% of their staked DYDX to make them whole.

**Specification**

Users affected by the Safety Module outage will receive funds via a Recovery Contract. The same contract that was deployed as part of the DIP-1 implementation will be used.

***Reimbursement***

There are currently ~157,459 DYDX staked to the Safety Pool from 56 unique stakers. These funds are recoverable by governance via the long timelock.

This DIP specifies that action be taken via the **short timelock** to withdraw the same amount of DYDX from the Rewards Treasury to fund the Recovery Contract. This allows the stakers to get their funds back sooner.

***Additional Reimbursement***

Those 56 stakers who were affected by the bug will receive an additional 15,746 DYDX, pro-rata, to make them whole. This will be paid out from the Rewards Treasury, and claimable by stakers through the same Recovery Contract. There will be no lockup on these funds.

Each staker will need to call the claim() function directly on the Recovery Contract to receive their funds. They may then decide if they want to re-stake in the Safety Module.

***Smart Contract Implementations:***

* The [Recovery Contract](https://github.com/dydxfoundation/governance-contracts/blob/master/contracts/safety/v2/helpers/SM2Recovery.sol) will be deployed with a hardcoded mapping from address to DYDX token amount. This amount should include the amount that was staked by that address, plus the additional 10%.
    * As a precaution, this contract will be upgradeable via the [Short Timelock](https://docs.dydx.community/dydx-governance/voting-and-governance/governance-parameters).

The on-chain proposal to be approved by governance will include the following transaction to be executed via the [Short Timelock](https://docs.dydx.community/dydx-governance/voting-and-governance/governance-parameters):

* Call transfer() on the [Rewards Treasury](https://github.com/dydxfoundation/governance-contracts/blob/336cb686b0c50693639a0fdb639d0b8f3b0670b3/contracts/treasury/Treasury.sol) contract, to transfer ~15,746 DYDX to the [Recovery Contract](https://github.com/dydxfoundation/governance-contracts/blob/336cb686b0c50693639a0fdb639d0b8f3b0670b3/contracts/safety/v2/helpers/SM2Recovery.sol) which was previously deployed to `0xF3f6e3fad2D453ca0Ce3c8580ecBE801F04c5662`.

**Rationale**

Staked DYDX tokens have been locked in the smart contract since September 7, and remain locked until a fix is implemented by governance. Given that the Staking Module only processes withdrawals on an epoch basis (every 28 days), the staked tokens would have been locked at a minimum for the remainder of the epoch. The community generally agreed that it was reasonable to make stakers whole due to this error. Consensus evolved around the need to repay stakers for the amount they reasonably could have expected to earn by staking over an epoch, plus some damages. 10% of the amount staked for each affected address is a reasonable and simple policy.

**Test Cases**

The recovery contract implementation, as well as test and deploy scripts, were open-sourced in the dYdX Foundation [governance contracts](https://github.com/dydxfoundation/governance-contracts) repository. The reimbursement process was thoroughly tested in both test and mainnet fork environments.

[Detailed instructions](https://github.com/dydxfoundation/governance-contracts/blob/master/contracts/safety/README.md) are provided on GitHub to allow anybody to run the same tests.

**Implementation**

A [full implementation](https://github.com/dydxfoundation/governance-contracts/tree/master/contracts/safety/v2) is open-sourced in the dYdX Foundation governance contracts repository.

**Copyright**

Copyright and related rights waived via [CC0](https://creativecommons.org/publicdomain/zero/1.0/).

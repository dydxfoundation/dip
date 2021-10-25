---
DIP: 3
title: Safety Module Restoration
status: Proposed
author: Paradigm
shortDescription: Restore functionality to the Safety Module staking pool.
discussions: https://commonwealth.im/dydx/proposal/discussion/1743-safety-staking-pool-on-pause
created: 2021-10-14
---


**DIP Summary**

Restore functionality to the Safety Module staking pool. Recover locked funds and send them to the Rewards Treasury.

**Abstract**

An error in the Safety Module deployment led to stakers' funds being stuck in the contract. As a result, we submitted [DIP-1](https://github.com/danrobinson/dip/blob/master/content/dips/DIP-1.md) as a proposal to fix the Safety Module, return funds to stakers, and compensate stakers for their missed rewards and inconvenience.

The on-chain vote for DIP-1 failed. This new proposal aims to fix the Safety Module in the same way proposed by DIP-1, but without making any reimbursements or other compensation for users (this could be addressed by governance seperately). Funds locked in the Safety Module will be sent to the Rewards Treasury.

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

As discussed in DIP-1, following the Safety Module outage, the dYdX Foundation released a detailed [incident report](https://dydx.foundation/blog/en/outage-1) explaining the cause of the error, the impact to users, a proposed solution, and lessons learned. This proposal aims to fix the Safety Module in as simple a way as possible.

**Specification**

The Safety Module will be reset to a clean slate. Staking and earning of rewards will become active as soon as the fix is executed by governance.

***Smart Contract Implementations:***

* The new [SafetyModuleV2](https://github.com/dydxfoundation/governance-contracts/blob/master/contracts/safety/v2/SafetyModuleV2.sol) implementation will be deployed with the following changes:
    1. A new initializer function which:
        1. Calls transfer() to send all held DYDX to the Rewards Treasury.
        2. Restores functionality to the Safety Module by setting the correct exchange rate.
        3. Deletes data set by the original initializer, which is now garbage due to the shift in the storage layout.
    2. Updates DISTRIBUTION_END to account for the delayed start to the Safety Module rewards.
    3. Updates getRevision() to return a value of 2.

The on-chain proposal to be approved by governance will include the following transaction to be executed via the [Long Timelock](https://docs.dydx.community/dydx-governance/voting-and-governance/governance-parameters):



* Call upgradeAndCall() on the Safety Module [Proxy Admin](https://github.com/dydxfoundation/governance-contracts/blob/dd1c396733a245ffb0faac15f657ace87d289b92/contracts/dependencies/open-zeppelin/ProxyAdmin.sol) contract, to atomically perform the following:
    1. Upgrade the Safety Module to use the new implementation contract.
    2. Run the initializer function.

**Rationale**

Different approaches were considered as to how to handle the funds that had already been staked. The “clean slate” approach of resetting the Safety Module is recommended as we believe it is the simplest and safest solution from a technical perspective.

Reaching community consensus and implementing a quick solution will allow recovery of the locked funds, and allow everyone access to the Safety Module staking pool. The Safety Module adds an important, additional safeguard to the protocol. It should be noted that Safety Module contract upgrades must use the long timelock, which imposes a minimum 18 day period (~1 day voting delay, 10 days voting duration, and 7 day timelock) between when a proposal is created and when it takes effect. In addition, long timelock proposals require a minimum quorum of 100 million DYDX (10% of the total supply) in order to pass. This means any solution will require broad community support as well as governance participation from dYdX investor token holders. For these reasons, it is imperative that the community approve this DIP in its simplest form as soon as possible.

**Test Cases**

The Safety Module has a full suite of [unit tests](https://github.com/dydxfoundation/governance-contracts/tree/master/test/safety-module) providing 100% code coverage. The proposed fix was simulated in both a local and forked mainnet environment. The test suite was then run, to ensure that full functionality will be restored, following the execution of the governance proposal on mainnet.

In addition to unit testing, thorough validation was performed on the mainnet state to ensure that we have a thorough and accurate understanding of both the current smart contract state on mainnet and the precise nature of the bug. This validation included checking all smart contract [state](https://github.com/dydxfoundation/governance-contracts/blob/master/test/safety-module/state.spec.ts) and [logs](https://github.com/dydxfoundation/governance-contracts/blob/master/test/safety-module/events.spec.ts), verification of the contract [bytecode](https://github.com/dydxfoundation/governance-contracts/blob/master/test/safety-module/bytecode.spec.ts), and detailed analysis of [storage slots](https://github.com/dydxfoundation/governance-contracts/blob/master/test/safety-module/storage-slots.spec.ts), including those that are not directly accessible by the contract. All test and deploy scripts are open-sourced in the dYdX Foundation [governance contracts](https://github.com/dydxfoundation/governance-contracts) repository.

[Detailed instructions](https://github.com/dydxfoundation/governance-contracts/blob/master/contracts/safety/README.md) are provided on GitHub to allow anybody to run the same tests.

**Implementation**

A [full implementation](https://github.com/dydxfoundation/governance-contracts/tree/master/contracts/safety/v2) is open-sourced in the dYdX Foundation governance contracts repository.

**Copyright**

Copyright and related rights waived via [CC0](https://creativecommons.org/publicdomain/zero/1.0/).
© 2021 GitHub, Inc.
Terms
Privacy
Security
Status
Docs
Contact GitHub
Pricing
API
Training
Blog
About

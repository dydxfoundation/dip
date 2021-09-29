---
DIP: 1
title: Safety Module Restoration & Staker Recovery
status: Proposed
author: Paradigm
shortDescription: Restore functionality to the Safety Module staking pool.
discussions: https://commonwealth.im/dydx/proposal/discussion/1743-safety-staking-pool-on-pause
created: 2021-09-23
---


**DIP Summary**

Restore functionality to the Safety Module staking pool. Allow users who are currently staked to recover their funds and receive an additional 10% of their staked amount to make them whole.

**Abstract**

The dYdX Foundation open-sourced a proposed solution that will do the following in order to minimize impact to users:



* Restore functionality to the Safety Module.
* Allow the users who are currently staked to recover their funds.
* Reimburse those users for the missed rewards that they should have received for participating in the Safety Module, based on the consensus view of the community.

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

Shortly after the launch of the Safety Module staking pool, the dYdX Foundation discovered an error in the deployment process for the Safety Module smart contract. In response, access to the Safety Module staking pool was temporarily removed from [dydx.community](https://dydx.community/).

Following the Safety Module outage, the dYdX Foundation released a detailed [incident report](https://dydx.foundation/blog/en/outage-1) explaining the cause of the error, the impact to users, a proposed solution, and lessons learned.

After robust discussion on the Forums, a community member launched a 5-day poll on Snapshot regarding one aspect of the fix: reimbursing stakers for rewards they did not receive due to the error. The results of the poll are available [here](https://snapshot.org/#/dydxgov.eth/proposal/QmbJ5QxHr1pyShKTDaF5DjAr6vxQn8DVxshH2fyWgzDCBn). A minimum of 10K DYDX tokens was required to submit this off-chain proposal.

In aggregate, 575 DYDX token holders and delegates voted with 17,112,789 DYDX. With 413 voters and 16,682,487.634 DYDX (97.4855% of total) in agreement, there was an overwhelming consensus that stakers should receive 10% of their staked DYDX to make them whole.



**Specification**

The Safety Module will be reset to a clean slate. Staking and earning of rewards will become active as soon as the fix is executed by governance. Users affected by the bug will receive funds via a separate Recovery Contract.

***Reimbursement***

There are currently ~157,459 DYDX staked to the Safety Pool from 56 unique stakers. No staked funds were lost. Stakers will receive their funds via the Recovery Contract.

***Additional Reimbursement***

Those 56 stakers who were affected by the bug will receive an additional 15,746 DYDX, pro-rata, to make them whole. This will be paid out from the Rewards Treasury, and claimable by stakers through the same Recovery Contract. There will be no lockup on these funds.

Each staker will need to call the claim() function directly on the Recovery Contract to receive their funds. They may then decide if they want to re-stake in the Safety Module.

***Smart Contract Implementations:***



1. The [Recovery Contract](https://github.com/dydxfoundation/governance-contracts/blob/master/contracts/safety/v2/helpers/SM2Recovery.sol) will be deployed with a hardcoded mapping from address to DYDX token amount. This amount should include the amount that was staked by that address, plus the additional 10%.
    1. As a precaution, this contract will be upgradeable via the [Short Timelock](https://docs.dydx.community/dydx-governance/voting-and-governance/governance-parameters).
2. The new [SafetyModuleV2](https://github.com/dydxfoundation/governance-contracts/blob/master/contracts/safety/v2/SafetyModuleV2.sol) implementation will be deployed with the following changes:
    1. A new initializer function which:
        1. Calls transfer() to send all held DYDX to the specified Recovery Contract address.
        2. Calls transferFrom() to send the specified additional amount from the rewards treasury to the specified Recovery Contract address.
        3. Restores functionality to the Safety Module by setting the correct exchange rate.
        4. Deletes data set by the original initializer, which is now garbage due to the shift in the storage layout.
    2. Updates DISTRIBUTION_END to account for the delayed start to the Safety Module rewards.
    3. Updates getRevision() to return a value of 2.

The on-chain proposal to be approved by governance will include the following transaction to be executed via the [Long Timelock](https://docs.dydx.community/dydx-governance/voting-and-governance/governance-parameters):



* Call upgradeAndCall() on the Safety Module [Proxy Admin](https://github.com/dydxfoundation/governance-contracts/blob/master/contracts/dependencies/open-zeppelin/ProxyAdmin.sol) contract, to atomically perform the following:
    1. Upgrade the Safety Module to use the new implementation contract.
    2. Run the initializer function with the agreed amount and Recovery Contract address.

**Rationale**

Different approaches were considered as to how to handle the funds that had already been staked. The “clean slate” approach of resetting the Safety Module is recommended as we believe it is the simplest and safest solution from a technical perspective.

Discussion on the forums has so far centered around two main issues:



* **The need for the Safety Module fix to be passed as soon as possible:** Reaching community consensus and implementing a quick solution will allow affected addresses to recover their funds, and allow everyone to access the Safety staking pool. The Safety Module adds an additional safeguard to the protocol. It should be noted that Safety Module contract upgrades must use the long timelock, which imposes a minimum 18 day period (~1 day voting delay, 10 days voting duration, and 7 day timelock) between when a proposal is created and when it takes effect. In addition, long timelock proposals require a minimum quorum of 100 million DYDX (10% of the total supply) in order to pass. This means any solution will require broad community support as well as governance participation from dYdX investor token holders. For these reasons, it is imperative that the community approve this DIP in its simplest form as soon as possible.
* **The amount to offer affected addresses to make them whole:** Staked DYDX tokens have been locked in the smart contract since September 7, and remain locked until a fix is implemented by governance. Given that the Staking Module only processes withdrawals on an epoch basis (every 28 days), the staked tokens would have been locked at a minimum for the remainder of the epoch. The community generally agreed that it was reasonable to make stakers whole due to this error. Consensus evolved around the need to repay stakers for the amount they reasonably could have expected to earn by staking over an epoch, plus some damages. 10% of the amount staked for each affected address is a reasonable and simple policy.

**Test Cases**

The Safety Module has a full suite of [unit tests](https://github.com/dydxfoundation/governance-contracts/tree/master/test/safety-module) providing 100% code coverage. The proposed fix was simulated in both a local and forked mainnet environment. The test suite was then run, to ensure that full functionality will be restored, following the execution of the governance proposal on mainnet.

In addition to unit testing, thorough validation was performed on the mainnet state to ensure that we have a thorough and accurate understanding of both the current smart contract state on mainnet and the precise nature of the bug. This validation included checking all smart contract [state](https://github.com/dydxfoundation/governance-contracts/blob/master/test/safety-module/state.spec.ts) and [logs](https://github.com/dydxfoundation/governance-contracts/blob/master/test/safety-module/events.spec.ts), verification of the contract [bytecode](https://github.com/dydxfoundation/governance-contracts/blob/master/test/safety-module/bytecode.spec.ts), and detailed analysis of [storage slots](https://github.com/dydxfoundation/governance-contracts/blob/master/test/safety-module/storage-slots.spec.ts), including those that are not directly accessible by the contract. All test and deploy scripts are open-sourced in the dYdX Foundation [governance contracts](https://github.com/dydxfoundation/governance-contracts) repository.

[Detailed instructions](https://github.com/dydxfoundation/governance-contracts/blob/master/contracts/safety/README.md) are provided on GitHub to allow anybody to run the same tests.

**Implementation**

A [full implementation](https://github.com/dydxfoundation/governance-contracts/tree/master/contracts/safety/v2) is open-sourced in the dYdX Foundation governance contracts repository.

**Copyright**

Copyright and related rights waived via [CC0](https://creativecommons.org/publicdomain/zero/1.0/).



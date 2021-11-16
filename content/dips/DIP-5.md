---
DIP: 5
title: Upgrade the StarkProxy smart contract
status: Proposed
author: Yuriy Myronovych (@YuriyWintermute)
short description: Upgrade StarkProxy smart contracts to support deposit cancellation and recovery.
discussions: https://forums.dydx.community/proposal/discussion/2437-drc-smart-contract-upgrade-for-market-maker-borrowers-from-liquidity-staking-pool/
---

## Simple Summary

Upgrade StarkProxy smart contracts to support deposit cancellation and recovery.

## Abstract

When depositing USDC to the dYdX Layer 2 exchange, the funds are held in a bridge contract while waiting for the deposit to be processed by the L2 sequencer and prover. While funds are on the bridge awaiting confirmation, the depositor can initiate a time-locked recovery process to cancel the deposit. This functionality is not currently supported by the Stark Proxy smart contracts which manage the funds borrowed by market makers from the Liquidity Module staking pool. These Stark Proxy smart contracts should be upgraded to support deposit cancelation and recovery.

## Motivation

On October 27, 2021 09:37:37 AM +UTC, we (Wintermute) borrowed 50 million USDC (transaction [here](https://etherscan.io/tx/0xa9cc82d4d8e6360538bb3c61e91a6c2494d98d7644d4516b0456a8008dad0e47)) from the [Liquidity Staking Pool](https://docs.dydx.community/dydx-governance/staking-pools/liquidity-staking-pool) and attempted to deposit the funds to our trading account on the dYdX exchange. We had to send deposit programmatically because the client provided by the dYdX Foundation team does not support wallet-connect yet. Unfortunately, the wrong “vaultId” parameter was passed in the call to “depositToExchange” (transaction [here](https://etherscan.io/tx/0xe6a1130a56abf62a076ef4210a28da20e06226295b54fc52b89a6b61850dca8e)). Because this “vaultId” did not correspond to our STARK key, the deposit was invalid and could not be confirmed on L2.
The 50M USDC are safely held by the dYdX L2 exchange smart contract and can be reclaimed by the StarkProxy contract. However, to reclaim the funds, the StarkProxy contract must call “depositCancel” and “depositReclaim” on the L2 exchange smart contract. 
Upgrading these smart contracts would allow us to recover the 50M USDC and ensure that other market makers can safely make use of the Liquidity Staking Pool.

Following a forum DRC [thread](https://forums.dydx.community/proposal/discussion/2437-drc-smart-contract-upgrade-for-market-maker-borrowers-from-liquidity-staking-pool/), Wintermute launched a 5-day poll on Snapshot regarding the question of Stark Proxy upgrade. The results of the poll are available [here](https://snapshot.org/#/dydxgov.eth/proposal/0x3d62d5b77b2b9bd3ab1c42c296cc36ccf89f77bea22815081e785d5d28d32366). The Snapshot vote has concluded with 5.3M DYDX (99.92%) from 474 voters indicating consensus in favor of the DRC. 

## Specification

When market makers borrow funds from the Liquidity Module staking pool they must do so via a StarkProxy smart contract which manages the funds and limits how they may be used. The StarkProxy borrows funds from the pool using a “borrow” call and then deposits those to the exchange using “depositToExchange” providing multiple parameters in transaction data describing which account should be credited. This deposit transaction transfers funds to the dYdX L2 exchange smart contract ([here](https://etherscan.io/address/0xd54f502e184b6b739d7d27a6410a67dc462d69c8)) and, if a deposit is valid, it is submitted and confirmed on L2. If the deposit parameters are misspecified by the caller, it may not be possible to credit the deposit. In such a case, as long as the “starkKey” was correctly specified in the deposit, the depositor can reclaim their funds using the “depositCancel” and “depositReclaim” functions. This process is described [here](https://docs.starkware.co/starkex-v3/starkex-deep-dive/smart-contracts-1/public-interactions#deposit).
Since “depositCancel” and “depositReclaim” are not currently implemented on the StarkProxy contract, it is not possible for those contracts to reclaim funds in the case where a deposit transaction is malformed and unable to be processed. 
Currently there is one such invalid deposit of 50M USDC which must be canceled in order for the funds to be recovered and put to use. The deposit is invalid because the wrong vault number was used, and the vault number and stark key specified in the deposit transaction do not match.
  
**Implementation**

Upgraded Stark Proxy implementation [Stark Proxy V2](https://github.com/dydxfoundation/governance-contracts/blob/master/contracts/stark-proxy/README.md) is open-sourced in the dYdX Foundation governance contracts repository.


**Test Cases**

Test cases for Stark Proxy have been extended to cover new V2 functions. It is open-sourced in the dYdX Foundation [Stark Proxy tests](https://github.com/dydxfoundation/governance-contracts/tree/master/test/stark-proxy) folder. The deposit and cancelation process was thoroughly tested in both test and mainnet fork environments.

[Detailed instructions](https://github.com/dydxfoundation/governance-contracts/blob/master/contracts/stark-proxy/README.md) are provided on GitHub to allow anybody to run the same tests.

**Copyright**

Copyright and related rights waived via [CC0](https://creativecommons.org/publicdomain/zero/1.0/).

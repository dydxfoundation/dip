---
DIP: 5
title: Upgrade the StarkProxy smart contract
status: WIP
author: Yuriy Myronovych (@YuriyWintermute)
short description: Upgrade StarkProxy smart contracts to support deposit cancellation and recovery.
discussions: https://forums.dydx.community/proposal/discussion/2437-drc-smart-contract-upgrade-for-market-maker-borrowers-from-liquidity-staking-pool/
---

## Simple Summary

Upgrade StarkProxy smart contracts to support deposit cancellation and recovery.

## Abstract

When depositing USDC to the dYdX Layer 2 exchange, the funds are held in a bridge contract while waiting for the deposit to be processed by the L2 sequencer and prover. While funds are on the bridge awaiting confirmation, the depositor can initiate a time-locked recovery process to cancel the deposit. This functionality is not currently supported by the Stark Proxy smart contracts which manage the funds borrowed by market makers from the Liquidity Module staking pool. These Stark Proxy smart contracts should be upgraded to support deposit cancelation and recovery.

## Motivation

On October 27, 2021 09:37:37 AM +UTC, we (Wintermute) borrowed 50 million USDC (transaction here) from the Liquidity Staking Pool and attempted to deposit the funds to our trading account on the dYdX exchange. We had to send deposit programmatically because the client provided by the dYdX Foundation team does not support wallet-connect yet. Unfortunately, the wrong “vaultId” parameter was passed in the call to “depositToExchange” (transaction here). Because this “vaultId” did not correspond to our STARK key, the deposit was invalid and could not be confirmed on L2.
The 50M USDC are safely held by the dYdX L2 exchange smart contract and can be reclaimed by the StarkProxy contract. However, to reclaim the funds, the StarkProxy contract must call “depositCancel” and “depositReclaim” on the L2 exchange smart contract. 
Upgrading these smart contracts would allow us to recover the 50M USDC and ensure that other market makers can safely make use of the Liquidity Staking Pool.

## Specification

When market makers borrow funds from the Liquidity Module staking pool they must do so via a StarkProxy smart contract which manages the funds and limits how they may be used. The StarkProxy borrows funds from the pool using a “borrow” call and then deposits those to the exchange using “depositToExchange” providing multiple parameters in transaction data describing which account should be credited. This deposit transaction transfers funds to the dYdX L2 exchange smart contract (here) and, if a deposit is valid, it is submitted and confirmed on L2. If the deposit parameters are misspecified by the caller, it may not be possible to credit the deposit. In such a case, as long as the “starkKey” was correctly specified in the deposit, the depositor can reclaim their funds using the “depositCancel” and “depositReclaim” functions. This process is described here: https://docs.starkware.co/starkex-v3/starkex-deep-dive/smart-contracts-1/public-interactions#deposit.
Since “depositCancel” and “depositReclaim” are not currently implemented on the StarkProxy contract, it is not possible for those contracts to reclaim funds in the case where a deposit transaction is malformed and unable to be processed. 
Currently there is one such invalid deposit of 50M USDC which must be canceled in order for the funds to be recovered and put to use. The deposit is invalid because the wrong vault number was used, and the vault number and stark key specified in the deposit transaction do not match.
  
**Implementation**

A [full implementation](https://github.com/dydxfoundation/governance-contracts/blob/master/contracts/stark-proxy/README.md) is open-sourced in the dYdX Foundation governance contracts repository.

**Copyright**

Copyright and related rights waived via [CC0](https://creativecommons.org/publicdomain/zero/1.0/).

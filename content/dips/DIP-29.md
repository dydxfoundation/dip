---

DIP: 29

title: Bridging the Community and Rewards Treasuries

status: Proposed

author: Xenophon Labs | Sponsored by Wintermute

shortDescription: Wind down v3 Rewards; Upgrade the Treasury contract; and Bridge the vested and unvested ethDYDX on Community and Rewards Treasuries from Ethereum to the dYdX Chain.

discussions: https://dydx.forum/t/drc-bridging-the-community-and-rewards-treasuries/1258

created: 2023-11-12

---

## Simple Summary

Following a successful [Snapshot vote](https://snapshot.org/#/dydxgov.eth/proposal/0x35ffe29ac42b5d42b493cadff77e8d53caeab98bef5cceb984847cd501974dde), this proposal seeks to implement the remaining steps to bridge the [Community Treasury](https://etherscan.io/address/0xe710ced57456d3a16152c32835b5fb4e72d9ea5b), the [Community Treasury Vester](https://etherscan.io/address/0x08a90Fe0741B7DeF03fB290cc7B273F1855767D8), the [Rewards Treasury](https://etherscan.io/address/0x639192D54431F8c816368D3FB4107Bc168d0E871), and the [Rewards Treasury Vester](https://etherscan.io/address/0xb9431e19b29b952d9358025f680077c3fd37292f) to the dYdX Chain. Further, this proposal involves winding down dYdX v3 Trading and LP rewards.

## Abstract

This proposal aims to bridge the dYdX community’s vested and unvested ethDYDX tokens from Ethereum to dYdX Chain. To accomplish this, this proposal first upgrades the [Treasury Contract](https://github.com/dydxfoundation/governance-contracts/blob/master/contracts/treasury/Treasury.sol) for each of the [Community Treasury](https://etherscan.io/address/0xe710ced57456d3a16152c32835b5fb4e72d9ea5b) and [Rewards Treasury](https://etherscan.io/address/0x639192D54431F8c816368D3FB4107Bc168d0E871) smart contracts to the [Community Treasury Bridge](https://etherscan.io/address/0x5D8541e3078BE7c2D773185aD8C8b9ED5105E08c) and [Rewards Treasury Bridge](https://etherscan.io/address/0x8d0051943D4c72aF12D638c6b7253C71929A910A) contracts respectively.

This upgrade sets the `recipient` of the [Community Treasury Vester](https://etherscan.io/address/0x08a90Fe0741B7DeF03fB290cc7B273F1855767D8) and [Rewards Treasury Vester](https://etherscan.io/address/0xb9431e19b29b952d9358025f680077c3fd37292f) contracts to specified burner addresses for each respective vester, and enables the `bridgeTreasury` function. By effectively burning unvested ethDYDX, this proposal allows dYdX Chain governance to credit the community vester and rewards vester accounts on dYdX Chain with a corresponding amount of unvested ethDYDX.

Following these upgrades, this proposal bridges available ethDYDX in the [Community Treasury](https://etherscan.io/address/0xe710ced57456d3a16152c32835b5fb4e72d9ea5b) and the [Rewards Treasury](https://etherscan.io/address/0x639192D54431F8c816368D3FB4107Bc168d0E871) by leveraging [Community Treasury Bridge](https://etherscan.io/address/0x5D8541e3078BE7c2D773185aD8C8b9ED5105E08c) and [Rewards Treasury Bridge](https://etherscan.io/address/0x8d0051943D4c72aF12D638c6b7253C71929A910A) by calling the `bridgeTreasury` function on both contracts, and setting the community treasury account on dYdX Chain as the recipient (`dydx15ztc7xy42tn2ukkc0qjthkucw9ac63pgp70urn`).

This proposal also winds down the dYdX v3 Trading and LP Rewards programs by gradually reducing the rewards emissions throughout epochs 30, 31, and 32.

## Motivation

The purpose of this proposal is to ensure that activities on dYdX Chain can be funded by dYdX Chain governance promptly. This potentially includes:

1. Enabling the trading rewards program on dYdX Chain. Note, the activation of trading rewards on dYdX Chain is subject to a governance proposal on dYdX Chain.

2. Funding the dYdX Chain insurance fund. Note, funding the insurance fund is subject to a governance proposal on dYdX Chain.

3. Enabling dYdX Chain governance to potentially fund the [Launch Incentives Program](https://dydx.forum/t/dydx-v4-launch-incentives-proposal/1075) proposed by Chaos Labs.

4. Enabling dYdX Chain governance to fund contributor grants, community initiatives, liquidity mining, and other initiatives.

In order for governance on dYdX Chain to be able to fund such activities, the ethDYDX sitting in the treasury contracts on dYdX v3 must be bridged over to dYdX Chain.

## Specification

1. Upgrade the [Treasury Contract](https://github.com/dydxfoundation/governance-contracts/blob/master/contracts/treasury/Treasury.sol) for each of the [Community Treasury](https://etherscan.io/address/0xe710ced57456d3a16152c32835b5fb4e72d9ea5b) and [Rewards Treasury](https://etherscan.io/address/0x639192D54431F8c816368D3FB4107Bc168d0E871) smart contracts to the [Community Treasury Bridge](https://etherscan.io/address/0x5D8541e3078BE7c2D773185aD8C8b9ED5105E08c) and [Rewards Treasury Bridge](https://etherscan.io/address/0x8d0051943D4c72aF12D638c6b7253C71929A910A) contracts respectively. This will enable the `bridgeTreasury` function.

2. Set recipient address to a burner address for [Community Treasury Vester](https://etherscan.io/address/0x08a90Fe0741B7DeF03fB290cc7B273F1855767D8) (`0x0000000000000000000000000000000000000002`) and [Rewards Treasury Vester](https://etherscan.io/address/0xb9431e19b29b952d9358025f680077c3fd37292f) (`0x0000000000000000000000000000000000000001`), respectively, to effectively burn all unvested ethDYDX in the Community Treasury Vester and the Rewards Treasury Vester.

3. Reduce trading and LP rewards by ⅓ from Epoch 30-32 on dYdX v3. Given the date that the proposal could first be executed, there will need to be sufficient LP and Trading rewards for Epoch 29-32 in the rewards treasury. The dYdX community shall request that Chainlink make the following ethDYDX emission reductions on the following dates:

	a. Reduce rewards to the following values on Nov 21, 2023, 15:00 UTC (start of Epoch 30)

    	i. Trading: 1,054,795

    	ii. LP: 383,562

	b. Reduce rewards to the following values on Dec 19, 2023, 15:00 UTC (start of Epoch 31)

    	i.Trading: 527,398

    	ii.LP: 191,781

	c. Reduce rewards to the following values on Jan 16, 2024, 15:00 UTC (start of Epoch 32)

    	i.Trading: 0

    	ii.LP: 0

4. Bridge the vested balance of the [Rewards Treasury](https://etherscan.io/address/0x639192D54431F8c816368D3FB4107Bc168d0E871) minus approximately 13,199,453 ethDYDX (for Trading and LP Rewards for Epochs 29-32 and allocated but unclaimed rewards) to dYdX Chain Community Treasury address (`dydx15ztc7xy42tn2ukkc0qjthkucw9ac63pgp70urn`) as the recipient. See the Appendix for further details.

5. Bridge the vested balance of the [Community Treasury](https://etherscan.io/address/0xe710ced57456d3a16152c32835b5fb4e72d9ea5b) to dYdX Chain Community Treasury address (`dydx15ztc7xy42tn2ukkc0qjthkucw9ac63pgp70urn`) as the recipient.

6. Recommend that the validators of the dYdX Chain credit the dYdX Chain Rewards Treasury Vester (`dydx1ltyc6y4skclzafvpznpt2qjwmfwgsndp458rm`) and dYdX Chain Community Treasury Vester (`dydx1wxje320an3karyc6mjw4zghs300dmrjkwn7xtk`) with tokens that are effectively burned from the [Community Treasury Vester](https://etherscan.io/address/0x08a90Fe0741B7DeF03fB290cc7B273F1855767D8) and the [Rewards Treasury Vester](https://etherscan.io/address/0xb9431e19b29b952d9358025f680077c3fd37292f). Note, crediting the dYdX Chain [Community Treasury Vester](https://etherscan.io/address/0x08a90Fe0741B7DeF03fB290cc7B273F1855767D8) and [Rewards Treasury Vester](https://etherscan.io/address/0xb9431e19b29b952d9358025f680077c3fd37292f) will require a dYdX Chain community governance proposal.

## Rationale

The dYdX community has expressed strong sentiment for winding down ecosystem incentives on dYdX v3 and enabling ecosystem incentives on dYdX Chain. This proposal addresses this by winding down dYdX v3 rewards and bridging available ethDYDX sitting on the dYdX v3 community and rewards treasury contracts to the dYdX Chain community treasury. The dYdX community through dYdX Chain governance may then (1) initiate community spend proposals, (2) vote to enable rewards on dYdX Chain, such as Chaos Labs’ Launch Incentives Program and the native Trading Rewards module, among other things.

To bridge ethDYDX from Ethereum to dYdX Chain, this proposal leverages the [wethDYDX smart contract](https://etherscan.io/address/0x46b2deae6eff3011008ea27ea36b7c27255ddfa9). The upgraded TreasuryBridge contract enables and streamlines the process of bridging vested funds with the `bridgeTreasury` function.

Given that it is not possible to bridge unvested ethDYDX, this proposal instead sets the vesting recipient on both the community treasury vester and rewards treasury vester to specified burner address for each vester contract. By effectively burning all unvested ethDYDX, this proposal allows the dYdX community through governance on dYdX Chain to credit the corresponding amount of burned tokens to the respective vester accounts on dYdX Chain.

## Implementation and Test Cases

A full implementation and test cases of the proposed change can be found [here](https://github.com/dydxfoundation/governance-contracts/pull/57) and [here](https://github.com/dydxfoundation/governance-contracts/tree/master/test/treasury-bridge/treasury-bridge.spec.ts).

## Copyright

Copyright and related rights waived via [CC0](https://creativecommons.org/publicdomain/zero/1.0/).

# Appendix

## Detailed calculations for ethDYDX tokens to bridge from the rewards treasury

All ethDYDX that is unallocated from rewards can be bridged to the community treasury on dYdX Chain. Note that to calculate the unallocated rewards, we can subtract the allocated rewards from the original total allocated rewards.

There were originally 450,000,000 ethDYDX tokens allocated to rewards. Specifically, the initial allocations were the following:

* 25% of the token supply allocated to [trading rewards](https://docs.dydx.community/dydx-governance/rewards/trading-rewards).
* 7.5% of the token supply allocated to [retroactive mining rewards](https://docs.dydx.community/dydx-governance/rewards/retroactive-mining-rewards).
* 7.5% of the token supply allocated to [liquidity provider rewards](https://docs.dydx.community/dydx-governance/rewards/liquidity-provider-rewards).
* 2.5% of the token supply allocated to [liquidity module rewards](https://docs.dydx.community/dydx-governance/staking-pools/liquidity-staking-pool).
* 2.5% of the token supply allocated to [safety module rewards](https://docs.dydx.community/dydx-governance/staking-pools/safety-staking-pool).

### Currently allocated rewards up to epoch 28

As of epoch 28, 205,165,433.5392799029 ethDYDX were allocated to rewards. Reasoning:

* 173,204.7618238715 ethDYDX for safety module compensation ([source](https://github.com/dydxfoundation/governance-contracts/blob/18f2e9007831cab3e1c13cf8a29626ea4f416615/src/deploy-config/base-config.ts#L230)).
    * Note this was taken from the rewards treasury.
* 5,116,733.9553627416 ethDYDX tokens allocated for safety module rewards. Reasoning:
    * The rewards rate was 0.1585489619 ethDYDX tokens per second.
        * 25,000,000 total ethDYDX / 157,679,998 seconds of rewards, which is 65.1785708699 epochs.
    * Rewards were allocated for 32,272,264 seconds. Reasoning:
        * Safety module rewards began being distributed on Nov-20-2021 04:42:55 AM UTC, which is unix timestamp 1637383375.
            * Note this was block 13649857 which contained the first safety module staking TX ([source](https://etherscan.io/tx/0x480c35631456098c0ec666cfa8e971eb970ea99a197f2b4e503b16cf99fc7216)).
            * Note the safety module proxy admin was upgraded on block 13649826 as part of [this executed proposal](https://etherscan.io/tx/0xfd332147899fd3ef1db62f262ffae92bbd7d18a5ed4e142eb0407a173dbf0453/advanced), but rewards were not allocated until there was a non-zero amount staked.
        * The safety module rewards were set to 0 on Nov-28-2022 05:13:59 PM UTC, which is unix timestamp 1669655639.
            * This occurred as part of a governance proposal executed on block 16069909 ([source](https://etherscan.io/tx/0xf98e9d0e0017fce10217477e7fab414b2210e9eebe28f450a71619ac036ad7fd/advanced#eventlog)).
        * 1669655639 - 1637383375 = 32,272,264 seconds.
* 5,779,607.8220932898 ethDYDX tokens were allocated for liquidity staking rewards. Reasoning:
    * The rewards rate was 0.1585489619 ethDYDX tokens per second.
        * 25,000,000 total ethDYDX / 157,679,998 seconds of rewards, which is 65.1785708699 epochs.
    * Rewards were allocated for 36,453,142 seconds. Reasoning:
        * The first staking TX occurred on Aug-03-2021 04:24:01 PM UTC, which is unix timestamp 1628007841.
            * Note this was block 12953339 which contained the first liquidity module staking TX ([source](https://etherscan.io/tx/0x3c0830f88a05298765e89e3c591dd4fb9579ea13ca4181ddd78bd47b9042a640)).
        * The liquidity module rewards were set to 0 on Sep-29-2022 02:16:23 PM UTC, which is unix timestamp 1664460983.
            * This occurred as part of a governance proposal executed on block 15639536 ([source](https://etherscan.io/tx/0xcda8c40f45aac4ef7f5d6aa5d82cb84e89057c03842b549c00151ffbae854a4e#eventlog)).
* 194,095,887 ethDYDX tokens were allocated for trading, MM, and retroactive mining rewards up to epoch 28 (note, this doesn't include epoch 29 rewards since they aren't allocated on-chain yet). Reasoning:
    * Latest dYdX v3 rewards are [here](https://cloudflare-ipfs.com/ipfs/bafybeic22w5uxknvce4kzci7fftgezsccxgpvruyh2ro4a4qkbxpi5pdqu). Note this includes retroactive allocations as well.
        * The number can be reproduced by running the below script.

### Future allocated rewards after epoch 28

For epoch 29 and onwards, 4,315,071 ethDYDX will be allocated in rewards. Reasoning:

* Epoch 29 will allocate 2,157,535 ethDYDX tokens for MM and trading rewards.
    * 575,343 ethDYDX tokens will be allocated to MM rewards.
    * 1,582,192 ethDYDX tokens will be allocated for trading rewards.
* Epoch 30 will allocate 1,438,357 ethDYDX tokens for MM and trading rewards, which is 2/3 of the original amount.
    * 383,562 ethDYDX tokens will be allocated to MM rewards.
    * 1,054,795 ethDYDX tokens will be allocated for trading rewards (rounded up to the nearest whole number).
* Epoch 31 will allocate 719,179 ethDYDX tokens for MM and trading rewards, which is 1/3 of the original amount.
    * 191,781 ethDYDX tokens will be allocated to MM rewards.
    * 527,398 ethDYDX tokens will be allocated for trading rewards (rounded up to the nearest whole number).
* Epochs 32 and onwards will allocate 0 ethDYDX tokens to MM and trading rewards.

### Total ethDYDX allocated to rewards

In total there are 205,165,433.5392799029 ethDYDX + 4,315,071 ethDYDX = 209,480,504.5392799029 ethDYDX allocated to rewards.

### Total unallocated ethDYDX rewards that can be bridged

Therefore there are 450,000,000 ethDYDX - 209,480,504.5392799029 ethDYDX = 240,519,495.4607200971 ethDYDX that are unallocated to rewards and can be bridged to the ethDYDX chain community treasury.

### Python script for calculating total rewards

```
import requests
def fetch_data(url):
    """Fetches data from the given URL."""
    response = requests.get(url)
    response.raise_for_status()
    return response.json()
def compute_cumulative_rewards(data):
    """Computes the cumulative rewards from the given data."""
    return sum(int(entry[1]) for entry in data)
def main():
    url = "https://cloudflare-ipfs.com/ipfs/bafybeic22w5uxknvce4kzci7fftgezsccxgpvruyh2ro4a4qkbxpi5pdqu"
    data = fetch_data(url)
    total_rewards = compute_cumulative_rewards(data)
    print(f"Cumulative rewards: {total_rewards}")
if __name__ == "__main__":
    main()
```

### Upper bound on ethDYDX rewards left in rewards treasury

The upper bound of ethDYDX rewards left in the rewards treasury should be 13,199,452.995434493 ethDYDX. Note the following:



* This is an upper bound and will decrease as more rewards are claimed. This includes 4,315,071 ethDYDX that will be allocated in future rewards in epoch 29 and onwards. Reasoning:
    * Based on the current ethDYDX token balances of the rewards treasury and rewards treasury vester:
        * Rewards treasury - 50,467,466.809546687539273567 ethDYDX
        * Rewards treasury vester - 203,251,481.646607902569875471 ethDYDX
    * The amount that will be left in the rewards treasury can be calculated using the following reasoning:
        * The amount left in the rewards treasury will be the allocated rewards.
        * Allocated rewards = rewards treasury balance + rewards treasury vester balance - unallocated ethDYDX
        * Given 240,519,495.4607200971 ethDYDX can be bridged and the above balances, the equation is the following:
            * 50,467,466.809546687539273567 ethDYDX + 203,251,481.646607902569875471 ethDYDX - 240,519,495.4607200971 ethDYDX = 13,199,452.995434493 ethDYDX
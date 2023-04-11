---
DIP: 21
title: Increase Maximum Funding Rates (8h) to 4% and Fix Data Bug in the V3 Perp Contract
status: Proposed
author: Considered Finance / Reverie / Starkware
shortDescription: Increase the maximum funding rates from 0.75% to 4% on all markets. Modify the V3 Perpetual smart-contracts to point to a new ‘FinalizableGpsFactAdapter’ contract which addresses the data availability issue.
discussions: https://commonwealth.im/dydx/discussion/10234-drc-increase-the-maximum-funding-rate & https://commonwealth.im/dydx/discussion/10634-v3-starkware-contract-data-availability-bug
created: 2023-04-11
---

## Simple Summary

Increase the maximum 8h funding rate from 0.75% to 4% across all markets, and deploy a fix to the relevant dYdX V3 perpetual smart contracts to fix a data availability issue. Due to efficiencies on testing and deployment with recommendation from the Starkware team, the changes from these 2 separate proposals are bundled into one single on-chain DIP for implementation.

## Abstract

### Increase the maximum 8h funding rate from 0.75% to 4% across all markets
Considered Finance, through a research grant from the DGP, published a paper on the implications of the existing funding rate bounds on dYdX markets. The research identified several occasions where the maximum rates have been insufficient to incentivize convergence between dYdX market prices and underlying index prices. This causes inefficiencies in dYdX markets and trading experiences. To solve this problem, Considered Finance proposes increasing the maximum 8h rates to a bound between -4% and 4%, up from -0.75% and 0.75%. This change will improve the trading experience and reduce the need for manual interventions through margin adjustments.

The snapshot [vote](https://snapshot.org/#/dydxgov.eth/proposal/0xfabe06f07828bf6d38110a17cb189ccd3e7b2f97d120023c7723f8893c89214d) concluded with 657 voters and 18M DYDX in agreement (99.99%). The vote results have shown significant support for the proposal.


### Modify the V3 Perpetual smart-contracts to fix DA issue
A bug has been identified in the current version of the dYdX StarkEx Cairo code, which is only triggered for the specific case of a Trade resulting in the collateral balance (i.e. value) equaling exactly zero (after all fees are paid) and for an account that still has positions open. In this case, instead of sending the correct funding timestamp for the position, a zero value is sent on-chain, thus, the timestamp won’t be converted into the actual funding indices which constitute the state. This may result in the inability to retrieve funds once the exchange is frozen (doomsday scenario) and both dYdX and StarkWare are unable to provide assistance to users (become malicious or maliciously hacked).

Starkware has prepared a fix to the relevant Cairo code to prevent this, and confirmed that other operational change from Starkware or dYdX Trading is minimal around the issue; the on-chain data does not have to change except in this rare-case scenario.

The snapshot [vote](https://snapshot.org/#/dydxgov.eth/proposal/0x31f58b0bef1cbc336fd0f65a52e8add8943e1448afe7fc32da85744501020148) concluded with 889 voters and 21M DYDX in agreement (100%). The vote results have shown significant support for the proposal.

### Relevant Links
#### Increase the maximum 8h funding rate from 0.75% to 4% across all markets
- [Snapshot](https://snapshot.org/#/dydxgov.eth/proposal/0xfabe06f07828bf6d38110a17cb189ccd3e7b2f97d120023c7723f8893c89214d)
- [Forum Discussion](https://commonwealth.im/dydx/discussion/10234-drc-increase-the-maximum-funding-rate)
- [Paper](https://drive.google.com/file/d/1SyZJPmJXhyjapY_Dr9gJjU_gJLAwwWgf/view)

#### Modify the V3 Perpetual smart-contracts to fix DA issue
- [Snapshot](https://snapshot.org/#/dydxgov.eth/proposal/0x31f58b0bef1cbc336fd0f65a52e8add8943e1448afe7fc32da85744501020148)
- [Forum Discussion](https://commonwealth.im/dydx/discussion/10634-v3-starkware-contract-data-availability-bug)

## Motivation
### Increase the maximum 8h funding rate from 0.75% to 4% across all markets
Increasing the maximum funding rate bounds reduces the need for manual intervention on markets, for example increasing the initial margin fractions and imposing Close-Only modes. These interventions hamper user experiences for traders. Further, increasing the bound reduces the likelihood of dislocation between dYdX market prices and the underlying index prices, improving the health of dYdX markets.

### Modify the V3 Perpetual smart-contracts to fix DA issue
Deploying this fix will ensure that there are no dependencies on both dYdX Trading and StarkWare to allow users to reconstruct the entire Position Merkle Tree holding the positions. In particular, this allows them to trustless-ly escape the dYdX exchange in case it becomes frozen (e.g. due to the inability of the exchange to operate or as a result of censorship of forced transactions).

## Specification

### Increase the maximum 8h funding rate from 0.75% to 4% across all markets
**Proposed Changes:**

Increase the max_funding_rate parameter from 0.75% to 4% to be implemented across all dYdX perpetual markets.

The following code change will be approved as part of this proposal:
- Change the max_funding_rate variable found in the dydx production_general_config of the starkware contract from '1120' to '5970'. 
- 5970 is determined using 0.04 * 2 ^ 32 / (60 * 60 * 8)

### Modify the V3 Perpetual smart-contracts to fix DA issue
**Proposed Changes:**

- Starkware will first deploy a new FinalizableGpsFactAdapter contract with the new programHash variable which is a hash of the Cairo code. The existing version of the contract can be found here.


- The V3 Perpetual smart-contracts will be modified to “point” to this new contract. The data of the governance vote would involve sending two transactions:
  - add_implementation to add the already-deployed contracts with the new_adapter on top. 
  - upgrade_to transaction with the same data as the add_implementation.

These change will be executed through a Starkware Priority Timelock Executor [proposal](https://docs.dydx.community/dydx-governance/resources/technical-overview).

### Summary of specification
The DIP [ref7] contains the transactions needed to be submitted by the PriorityExecutor [ref5] onto the dydx smart contract [ref6].
The transaction set includes six transactions: three for the max funding rate change, and three for the change of the Cairo program hash required for the on-chain DA bug fix.
1. Transaction 0-2 (max funding rate fix):
    - Tx 0 PriorityExecutor accepts governance (main governance) which is required to perform config hash change.
    - Tx 1 register new config hash.
    - Tx 2 apply the new config hash.

2. Transaction 3-5 (DA bug fix):
    - Tx 3 PriorityExecutor accepts governance (proxy governance) which is required to perform upgrades.
    - Tx 4 addImplementation - The update of the Cairo program hash is performed in a manner of an upgrade, which effectively only replaces the       FinalizableGpsFactAdapter with the new one[4] bearing the new hash.
    - Tx 5 upgradeTo - applying the upgrade cycle submitted in Tx 4.

### References and Implementation:
1. DYDX funding rate change to 4% Pull Request https://github.com/starkware-libs/dydx-config/pull/17/files

2. Script for calculating the config hash https://github.com/starkware-libs/stark-perpetual/blob/master/src/services/perpetual/public/generate_perpetual_config_hash.py the new global config hash with per the new max funding rate is 0x03cbd17769430aed60aa8b9a5867b375c3fdca23e56cbbd83e33290577f50449.

3. StarkPerpetual Cairo program hash from our code in github https://github.com/starkware-libs/stark-perpetual/blob/Perpetual-v1.0-on-chain-data-fix/src/services/perpetual/cairo/program_hash.json . The new program hash is 3022993219738828102988654230098311570191704199468817569337520096526584973032.

4. https://etherscan.io/address/0x16b484Ca53424F1e09Fa124687fc63E4cC14C4C2 
The new deployed FinalizableGpsFactAdapter contract, bearing the same program hash (3022993219738828102988654230098311570191704199468817569337520096526584973032)

5. PriorityExecutor https://etherscan.io/address/0xa306989ba6bcacdeccf3c0614fff2b8c668e3cae 
6. dYdX Smart contract https://etherscan.io/address/0xD54f502e184B6B739d7D27a6410a67dc462D69c8 

7. DIP Content:
[
    // DIP Target - Executor,
    "0xa306989BA6BcacdECCf3C0614FfF2B8C668e3CaE",

    // Transaction destination - (all sent to dydx smart contract).
    [
        "0xD54f502e184B6B739d7D27a6410a67dc462D69c8",
        "0xD54f502e184B6B739d7D27a6410a67dc462D69c8",
        "0xD54f502e184B6B739d7D27a6410a67dc462D69c8",
        "0xD54f502e184B6B739d7D27a6410a67dc462D69c8",
        "0xD54f502e184B6B739d7D27a6410a67dc462D69c8",
        "0xD54f502e184B6B739d7D27a6410a67dc462D69c8"
    ],

	// Value. 0 eth in all txs.
    [
        0,
        0,
        0,
        0,
        0,
        0
    ],

	// Tx signatures.
    [
        "mainAcceptGovernance()",
        "registerGlobalConfigurationChange(bytes32)",
        "applyGlobalConfigurationChange(bytes32)",
        "proxyAcceptGovernance()",
        "addImplementation(address,bytes,bool)",
        "upgradeTo(address,bytes,bool)"
    ],

	// Tx calldata.
    [
        "0x",
        "0x03cbd17769430aed60aa8b9a5867b375c3fdca23e56cbbd83e33290577f50449",
        "0x03cbd17769430aed60aa8b9a5867b375c3fdca23e56cbbd83e33290577f50449",
        "0x",
        "0x0000000000000000000000002c0df87e073755139101b35c0a51e065291cc2d30000000000000000000000000000000000000000000000000000000000000060000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000e00000000000000000000000005d8cc5659db74eebf19aa2bb39973f9339012ac50000000000000000000000003fed7bf5bf3e738bc30fbe61b048fdcb82368545000000000000000000000000df9c117cad37f2ed8c99e36a40317d8cc340d4a0000000000000000000000000c43f5526124877f9125e3b48101dca6d7c6b4ea3000000000000000000000000ccfeb952c6d0ac4ac6f29110c29bcbe7d3e0bb4f00000000000000000000000016b484ca53424f1e09fa124687fc63e4cc14c4c29e4f28fe4560da90869c18f8731d565775989cf96cfabfd6a534aee5c87c2135",
        "0x0000000000000000000000002c0df87e073755139101b35c0a51e065291cc2d30000000000000000000000000000000000000000000000000000000000000060000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000e00000000000000000000000005d8cc5659db74eebf19aa2bb39973f9339012ac50000000000000000000000003fed7bf5bf3e738bc30fbe61b048fdcb82368545000000000000000000000000df9c117cad37f2ed8c99e36a40317d8cc340d4a0000000000000000000000000c43f5526124877f9125e3b48101dca6d7c6b4ea3000000000000000000000000ccfeb952c6d0ac4ac6f29110c29bcbe7d3e0bb4f00000000000000000000000016b484ca53424f1e09fa124687fc63e4cc14c4c29e4f28fe4560da90869c18f8731d565775989cf96cfabfd6a534aee5c87c2135"
    ],

	// All txs executed w/o delegation.
    [
        false,
        false,
        false,
        false,
        false,
        false
    ],

	// IPFS hash.
    "0x0000000000000000000000000000000000000000000000000000000000000000"
]

### Testing

- The change to the funding rate is only a change of a number and doesn't require testing on StarkWare’s end. 
- The on-chain data fix is quite small and the code is published so the diff is fully visible (see reference 3 above). The code was validated with unit tests as well as system tests and has been successfully deployed on the Goerli system on which dYdX perform their testing.


## Rationale

The community has expressed strong support for the proposal in both the DRC and snapshot voting stages. The implementation of the proposal will result in an improvement to the health of dYdX markets and user experiences for active traders.

## Copyright

Copyright and related rights waived via [CC0](https://creativecommons.org/publicdomain/zero/1.0/).

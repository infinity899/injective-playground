# Frontend Injective

### Setup Environment

1. setup layers folder (https://nuxt.com/docs/getting-started/layers)
   ```
   | folder
   | -- injective-playground
   | -- injective-ui
   ```
   ```bash
   git clone https://github.com/InjectiveLabs/injective-ui.git
   cd injective-ui/layer
   yarn
   ```
2. create .env file using .env.template
3. spin up injective-playground repo
   ```bash
   cd injective-playground
   yarn
   yarn dev
   ```

### Note:

- dev is expected to install both metamask & keplr chrome wallet extension for the test
- the environment is pre-configured to point to testnet via the values in the .env.example file
- dev can get some testnet INJ token via https://testnet.faucet.injective.network/
- dev is encouraged to look through the follow links:
  - https://docs.ts.injective.network/
  - https://docs.ts.injective.network/core-modules/bank#msgsend
  - https://docs.ts.injective.network/querying/querying-api/querying-indexer-portfolio#using-grpc
  - https://docs.ts.injective.network/querying/querying-chain/querying-chain-staking#fetch-delegations-for-an-injective-address
- dev is encouraged to look through the follow repos:
  - [layer folder](https://github.com/InjectiveLabs/injective-ui/tree/master/layer) github repo
  - [injective-helix-demo](https://github.com/InjectiveLabs/injective-helix-demo) github repo
  - [injective-ts](https://github.com/injectiveLabs/injective-ts) github repo

### Requirements

- create a login flow that supports both metamask and keplr
- retrieve user’s wallet balance from the injective chain
- display user’s wallet balance and total USD value of holdings on the UI
- retrieve account/address staked amount
- add staked amount and add the holdings to the total USD value on step 3
  - dev should display staked amount along wallet balance in the same table
- create an injective balance transfer form (similar to the one on hub wallet’s page https://hub.injective.network/wallet)
  - dev should use a different design than what we currently have on [hub](https://hub.injective.network/)
- add the functionality for broadcasting a `MsgSend` message to the chain
  - it’s ok if the transaction fails to broadcast, proper error handling should be added

### Guideline

- Build each part of the exercise incrementally (one commit per step)
- Once you have finished:
  - compress the source code into a zip file
  - upload it to google drive and send us the link

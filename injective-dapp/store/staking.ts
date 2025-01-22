import { defineStore } from 'pinia'
import { stakingApi } from '@shared/Service'
import { Coin } from '@injectivelabs/ts-types'

type StakingStoreState = {}

const initialStateFactory = (): StakingStoreState => ({})

export const useStakingStore = defineStore('staking', {
  state: (): StakingStoreState => initialStateFactory(),
  actions: {
    async fetchDelegations(): Promise<Coin[]> {
      const accountStore = useAccountStore()
      const delegation = await stakingApi.fetchDelegationsNoThrow({
        injectiveAddress: accountStore.address
      })
      return delegation.delegations.map((item) => {
        return {
          denom: 'Staked ' + item.balance.denom,
          amount: item.balance.amount
        }
      })
    }
  }
})

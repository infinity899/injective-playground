import { defineStore } from 'pinia'
// import { stakingApi } from '@shared/Service'

type StakingStoreState = {}

const initialStateFactory = (): StakingStoreState => ({})

export const useStakingStore = defineStore('staking', {
  state: (): StakingStoreState => initialStateFactory(),
  actions: {}
})

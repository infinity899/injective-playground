import { MsgSend, TokenStatic } from '@injectivelabs/sdk-ts'
import { MsgBroadcaster } from '@injectivelabs/wallet-ts'
import { BigNumberInBase } from '@injectivelabs/utils'
import { walletStrategy } from '@shared/wallet/wallet-strategy'
import { NETWORK } from '~/app/Service'

export const msgBroadcastClient = new MsgBroadcaster({
  walletStrategy,
  network: NETWORK
})

export const transfer = async ({
  amount,
  denom,
  token,
  destination
}: {
  amount: BigNumberInBase
  denom: string
  memo?: string
  token: TokenStatic
  destination: string
}) => {
  const sharedWalletStore = useSharedWalletStore()

  await sharedWalletStore.validate()

  const messages = MsgSend.fromJSON({
    srcInjectiveAddress: sharedWalletStore.hwAddresses[0],
    dstInjectiveAddress: destination,
    amount: {
      denom,
      amount: amount.toWei(token.decimals).toFixed()
    }
  })

  await msgBroadcastClient.broadcast({
    injectiveAddress: sharedWalletStore.hwAddresses[0],
    msgs: messages
  })
}

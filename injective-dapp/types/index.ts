import { MsgType } from '@injectivelabs/ts-types'
export interface SubaccountBalance {
  denom: string
  availableBalance: string
  totalBalance: string
}

export const TRADING_MESSAGES = [
  MsgType.MsgCancelSpotOrder,
  MsgType.MsgCreateSpotLimitOrder,
  MsgType.MsgCancelDerivativeOrder,
  MsgType.MsgCreateSpotMarketOrder,
  MsgType.MsgBatchCancelSpotOrders,
  MsgType.MsgCreateDerivativeLimitOrder,
  MsgType.MsgCreateDerivativeMarketOrder,
  MsgType.MsgBatchCancelDerivativeOrders
]

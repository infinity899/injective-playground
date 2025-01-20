import {
  BigNumber,
  BigNumberInWei,
  BigNumberInBase
} from '@injectivelabs/utils'
import { Coin } from '@injectivelabs/sdk-ts'
import { SharedBalanceWithToken } from '@shared/types'

BigNumber.config({
  FORMAT: {
    decimalSeparator: '.',
    groupSeparator: ',',
    groupSize: 3,
    secondaryGroupSize: 0,
    fractionGroupSeparator: ' ',
    fractionGroupSize: 0
  }
})

export const formatWalletAddress = (address: string): string => {
  if (address.length <= 10) {
    return address
  }

  return `${address.slice(0, 6)}...${address.slice(
    address.length - 6,
    address.length
  )}`
}

export function formatAmount(
  amount: BigNumberInBase,
  displayDecimals: number
): string {
  return amount.toFormat(displayDecimals || 1, BigNumber.ROUND_DOWN)
}

export function formatPrice(
  amount: BigNumberInBase,
  displayDecimals: number
): string {
  return amount.toFormat(displayDecimals || 1, BigNumber.ROUND_HALF_UP)
}

export function formatPriceUp(
  amount: BigNumberInBase,
  displayDecimals: number
): string {
  return amount.toFormat(displayDecimals || 1, BigNumber.ROUND_UP)
}

export function formatPriceDown(
  amount: BigNumberInBase,
  displayDecimals: number
): string {
  return amount.toFormat(displayDecimals || 1, BigNumber.ROUND_DOWN)
}

export function formatPrecision(amount: BigNumber, precision: number): string {
  return amount.toFormat(precision, BigNumber.ROUND_DOWN)
}

export function formatPercent({
  number,
  precision = 0,
  appendPlusSign = false
}: {
  number: any
  precision: number
  appendPlusSign: boolean
}): string {
  const numberInBigNumber =
    number instanceof BigNumber ? number : new BigNumber(number)
  const prefix = appendPlusSign && numberInBigNumber.isGreaterThan(0) ? '+' : ''
  const suffix = '%'

  return `${prefix}${String(numberInBigNumber.toFixed(precision))}${suffix}`
}

export const toBalanceInToken = ({
  value,
  decimalPlaces,
  fixedDecimals,
  roundingMode
}: {
  value: string | number
  decimalPlaces: number
  fixedDecimals?: number
  roundingMode?: BigNumber.RoundingMode
}): string => {
  const balanceInToken = new BigNumberInWei(value).toBase(decimalPlaces)

  if (fixedDecimals) {
    return balanceInToken.toFixed(fixedDecimals, roundingMode)
  }

  return balanceInToken.toFixed()
}

export const convertCoinToBalancesWithToken = (
  coin: Coin
): SharedBalanceWithToken | undefined => {
  const tokenStore = useTokenStore()

  const meta = tokenStore.tokenByDenomOrSymbol(coin.denom)

  if (!meta) {
    return
  }

  return {
    token: meta,
    denom: coin.denom,
    balance: coin.amount
  }
}

export const abbreviateNumber = (value: string | number) => {
  const VALUE_TO_ABBREVIATE = 10_000_000

  const valueToBigNumber = new BigNumberInBase(value)

  if (valueToBigNumber.lte(VALUE_TO_ABBREVIATE)) {
    return undefined
  }

  const abbreviatedValue = new Intl.NumberFormat('en-US', {
    notation: 'compact',
    compactDisplay: 'short'
  }).format(valueToBigNumber.toNumber())

  return abbreviatedValue
}

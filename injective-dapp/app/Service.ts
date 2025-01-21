import {
  TokenFactoryStatic,
  TokenStatic,
  ChainGrpcBankApi,
  IndexerGrpcSpotApi,
  IndexerGrpcDerivativesApi,
  IndexerGrpcOracleApi,
  IndexerGrpcDerivativesStream
} from '@injectivelabs/sdk-ts'
import { getNetworkEndpoints, Network } from '@injectivelabs/networks'
import tokens from '@/app/data/tokens.json'

// Services
export const tokenFactoryStatic = new TokenFactoryStatic(
  tokens as TokenStatic[]
)

export const NETWORK = Network.Testnet
export const ENDPOINTS = getNetworkEndpoints(NETWORK)

export const chainBankApi = new ChainGrpcBankApi(ENDPOINTS.grpc)
export const indexerSpotApi = new IndexerGrpcSpotApi(ENDPOINTS.indexer)
export const indexerDerivativesApi = new IndexerGrpcDerivativesApi(
  ENDPOINTS.indexer
)

export const indexerSpotStream = new IndexerGrpcDerivativesStream(
  ENDPOINTS.indexer
)
export const indexerDerivativeStream = new IndexerGrpcDerivativesStream(
  ENDPOINTS.indexer
)

const derivativesApi = new IndexerGrpcDerivativesApi(ENDPOINTS.indexer)
const indexerGrpcOracleApi = new IndexerGrpcOracleApi(ENDPOINTS.indexer)

// price from Oracle Service but not using it as price from shared-layer is preferred
export async function getInjUsdtPerpOraclePrice() {
  const markets = await derivativesApi.fetchMarkets()

  const market = markets.find((m) => m.ticker === 'INJ/USDT PERP')
  if (!market) {
    throw new Error('INJ/USDT PERP market not found!')
  }

  const baseSymbol = (market as any).oracleBase
  const quoteSymbol = (market as any).oracleQuote
  const oracleType = (market as any).oracleType

  const oraclePrice = await indexerGrpcOracleApi.fetchOraclePriceNoThrow({
    baseSymbol,
    quoteSymbol,
    oracleType
  })

  return oraclePrice
}

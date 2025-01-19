import {
  TokenFactoryStatic,
  TokenStatic,
  ChainGrpcBankApi,
  IndexerGrpcSpotApi,
  IndexerGrpcDerivativesApi,
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

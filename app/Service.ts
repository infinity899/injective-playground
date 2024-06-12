import { TokenFactoryStatic, TokenStatic } from '@injectivelabs/sdk-ts'
import tokens from '@/app/data/tokens.json'

// Services
export const tokenFactoryStatic = new TokenFactoryStatic(
  tokens as TokenStatic[]
)

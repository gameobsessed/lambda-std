import { Context } from 'aws-lambda'
import { ConfigurationStorage } from './configurator/configuration-storage'

const CONFIGURATION_STORAGE_SYMBOL = Symbol('LAMBDA_STD_CONFIGURATION_STORAGE')

export function getConfigurationStorage(): ConfigurationStorage {
  return ((global as any)[CONFIGURATION_STORAGE_SYMBOL] =
    (global as any)[CONFIGURATION_STORAGE_SYMBOL] || new ConfigurationStorage())
}

export function caller<T, R>(input: unknown) {
  return input as (event: T, context?: Context) => Promise<R>
}

export * from './configurator/configuration-storage'
export * from './decorators/controller'
export * from './decorators/handler'
export * from './decorators/initializer'
export * from './decorators/param'
export * from './decorators/validator'

import type { AnyObjectSchema } from 'yup'
import { getConfigurationStorage } from '..'

export function Validator(schema: AnyObjectSchema, options?: any) {
  return function (object: any) {
    getConfigurationStorage().addValidator({
      object,
      schema,
      options,
    })
  }
}

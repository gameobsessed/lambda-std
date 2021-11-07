import { getConfigurationStorage, IValidate } from '..'

export function Validator(validate: IValidate, options?: any) {
  return function (object: any) {
    getConfigurationStorage().addValidator({
      object,
      validate,
      options,
    })
  }
}

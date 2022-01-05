export interface IErrorHandler<R> {
  (error: Error | unknown): R
}

export function defaultErrorHandler(error: Error | unknown) {
  console.error(error)
  throw error
}

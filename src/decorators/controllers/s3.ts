import { S3Event, S3EventRecord } from 'aws-lambda'
import { IUserControllerCtor, RecordsControllerClass } from './controller'
import { defaultErrorHandler, IErrorHandler } from './error-handler'

export class S3EventControllerClass extends RecordsControllerClass<
  S3Event,
  S3EventRecord
> {
  getHandlerName() {
    return 'allRecords'
  }

  getRecordHandlerName(record: S3EventRecord) {
    return record.eventName
  }
}

export interface IRecordsControllerProps {
  mode: 'event' | 'record'
  errorHandler?: IErrorHandler<any>
}

export function S3EventController(
  {
    mode = 'record',
    errorHandler = defaultErrorHandler,
  }: IRecordsControllerProps = {} as any
) {
  return function S3EventController(UserControllerCtor: IUserControllerCtor) {
    const controller = new S3EventControllerClass(UserControllerCtor)

    try {
      switch (mode) {
        case 'record':
          return controller.handleRecords.bind(controller) as any
        case 'event':
          return controller.handle.bind(controller) as any
      }
    } catch (error) {
      return errorHandler(error)
    }
  }
}

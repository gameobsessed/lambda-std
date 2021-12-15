import { S3Event, S3EventRecord } from 'aws-lambda'
import { IUserControllerCtor, RecordsControllerClass } from './controller'

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
}

export function S3EventController(
  { mode = 'record' }: IRecordsControllerProps = {} as any
) {
  return function S3EventController(UserControllerCtor: IUserControllerCtor) {
    const controller = new S3EventControllerClass(UserControllerCtor)

    switch (mode) {
      case 'record':
        return controller.handleRecords.bind(controller) as any
      case 'event':
        return controller.handle.bind(controller) as any
    }
  }
}

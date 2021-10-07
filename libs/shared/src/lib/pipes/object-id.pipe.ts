import { PipeTransform, Injectable, ArgumentMetadata } from '@nestjs/common';
import { ObjectId } from 'mongodb';

@Injectable()
export class ObjectIdPipe implements PipeTransform {
  transform(value: any, metadata: ArgumentMetadata) {
    return typeof value === 'string' ? new ObjectId(value) : value;
  }
}

@Injectable()
export class ObjectIdToStringPipe implements PipeTransform {
  transform(value: any, metadata: ArgumentMetadata) {
    return value && typeof value !== 'string' ? value.toHexString() : value;
  }
}

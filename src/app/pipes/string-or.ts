import { DatePipe } from '@angular/common';
import { Inject, Injectable, LOCALE_ID, Pipe, PipeTransform } from '@angular/core';


@Pipe({ name: 'stringOr' })
// @Injectable()
export class StringOrPipe implements PipeTransform {
  constructor() { }
  transform(value: any, msg: string, ...args: any[]): string {
    if (!value) {
      return msg || 'Unknown';
    } else {
      return value;
    }
  }
}

import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'listSend'
})
export class ListSendPipe implements PipeTransform {

  transform(value: any, args?: any): any {
    return null;
  }

}

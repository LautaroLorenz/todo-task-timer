import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'msToMin',
})
export class MsToMinPipe implements PipeTransform {
  transform(ms: number | null): any {
    if(!ms) {
      return 0;
    }
    return Math.floor(ms / 60000);
  }
}

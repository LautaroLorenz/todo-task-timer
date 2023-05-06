import { Pipe, PipeTransform } from '@angular/core';
import { PriorityEnum } from 'src/app/models';

@Pipe({
  name: 'priority',
})
export class PriorityPipe implements PipeTransform {
  transform(value: PriorityEnum | null): any {
    switch (value) {
      case PriorityEnum.LOW:
        return 'Low';
      case PriorityEnum.MEDIUM:
        return 'Medium';
      case PriorityEnum.HIGH:
        return 'High';
      default:
        return 'Unknown';
    }
  }
}

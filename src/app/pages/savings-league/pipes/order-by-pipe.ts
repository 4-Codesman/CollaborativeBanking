import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'orderBy'
})
export class OrderByPipe implements PipeTransform {
  transform(array: any[], field: string, desc: boolean = false): any[] {
    if (!Array.isArray(array)) return array;
    return array.sort((a, b) => {
      const comp = a[field] > b[field] ? 1 : -1;
      return desc ? -comp : comp;
    });
  }
}

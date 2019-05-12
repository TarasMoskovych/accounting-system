import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'filter'
})
export class FilterPipe implements PipeTransform {
  transform(items: [],  value: string, field: string): any {
    if (items.length === 0 || !value) {
      return items;
    }

    return items.filter((item: any) => String(item[field]).toLowerCase().includes(value.toLowerCase()));
  }
}

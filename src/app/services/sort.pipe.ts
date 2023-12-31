import { Pipe, PipeTransform } from '@angular/core';
import { Account, Select } from '../interfaces/interfaces';
import { SortType } from '../interfaces/sort-options';

@Pipe({
  name: 'sort',
})
export class SortPipe implements PipeTransform {
  transform(accounts: Account[], sortBy: Select): Account[] {
    const sortType = sortBy.type;
    const sortDirection = sortBy.direction;

    if (sortType === SortType.DEFAULT) {
      return accounts;
    }

    return accounts.sort((a, b) => {
      const x = a[sortType] !== null ? a[sortType] : 0;
      const y = b[sortType] !== null ? b[sortType] : 0;
      if (x > y) {
        return sortDirection;
      }
      if (x < y) {
        return -1 * sortDirection;
      }
      return 0;
    });
  }
}

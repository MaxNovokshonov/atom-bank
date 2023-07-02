import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'includes',
})
export class IncludesPipe implements PipeTransform {
  transform(accounts: string[], search = ''): string[] {
    if (!search) {
      return accounts;
    }
    return accounts.filter((account) => {
      return account.toLowerCase().includes(search.toLowerCase());
    });
  }
}

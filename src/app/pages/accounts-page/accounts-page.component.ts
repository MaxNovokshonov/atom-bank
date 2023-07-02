import { Component, OnDestroy, OnInit } from '@angular/core';
import { BehaviorSubject, Observable, Subscription } from 'rxjs';
import { DataService } from '../../services/data.service';
import { FormControl, FormGroup } from '@angular/forms';
import { map } from 'rxjs/operators';
import { SortOptions, SortType } from '../../interfaces/sort-options';
import { Select } from '../../interfaces/interfaces';

@Component({
  selector: 'app-accounts-page',
  templateUrl: './accounts-page.component.html',
  styleUrls: ['./accounts-page.component.scss'],
})
export class AccountsPageComponent implements OnInit, OnDestroy {
  accounts$: Observable<any>;

  sortField$ = new BehaviorSubject<Select>({ direction: 1, type: SortType.DEFAULT });

  sortSubscription = new Subscription();

  options: SortOptions[] = [
    {
      title: 'Сортировка',
      disabled: true,
      value: SortType.DEFAULT,
      sortDirection: 1,
    },
    {
      title: 'По номеру   ↑',
      disabled: false,
      value: SortType.ACCOUNT,
      sortDirection: 1,
    },
    {
      title: 'По номеру   ↓',
      disabled: false,
      value: SortType.ACCOUNT,
      sortDirection: -1,
    },
    {
      title: 'По балансу  ↑',
      disabled: false,
      value: SortType.BALANCE,
      sortDirection: 1,
    },
    {
      title: 'По балансу  ↓',
      disabled: false,
      value: SortType.BALANCE,
      sortDirection: -1,
    },
    {
      title: 'По транзакциям  ↑',
      disabled: false,
      value: SortType.TRANSACTION,
      sortDirection: 1,
    },
    {
      title: 'По транзакциям  ↓',
      disabled: false,
      value: SortType.TRANSACTION,
      sortDirection: -1,
    },
  ];

  sortForm = new FormGroup({
    select: new FormControl<Select>({ direction: 1, type: SortType.DEFAULT }),
  });

  constructor(private dataService: DataService) {}

  get select() {
    return this.sortForm.controls.select as FormControl;
  }

  ngOnInit(): void {
    this.getAccounts();
    this.sortSubscription.add(
      this.select.valueChanges.subscribe((value: Select) => this.sortBy(value)),
    );
  }

  getAccounts() {
    this.accounts$ = this.dataService.getAllAccounts().pipe(
      map((response) =>
        response.payload.map((account) => ({
          ...account,
          lastTransaction: account.transactions.length ? account.transactions[0].date : undefined,
        })),
      ),
    );
  }

  createNewAccount() {
    this.dataService.createNewAccount('').subscribe(() => {
      this.getAccounts();
    });
  }

  sortBy(field: Select): void {
    this.sortField$.next(field);
  }

  ngOnDestroy(): void {
    this.sortSubscription.unsubscribe();
  }
}

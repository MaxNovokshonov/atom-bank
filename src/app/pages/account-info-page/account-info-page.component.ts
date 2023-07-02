import { Component, OnInit } from '@angular/core';
import { Account, Transactions } from '../../interfaces/interfaces';
import { DataService } from '../../services/data.service';
import { ActivatedRoute, Params } from '@angular/router';
import { switchMap } from 'rxjs';

@Component({
  selector: 'app-account-info-page',
  templateUrl: './account-info-page.component.html',
  styleUrls: ['./account-info-page.component.scss'],
})
export class AccountInfoPageComponent implements OnInit {
  account: Account;

  allAccounts: string[];

  lastTransactions: Transactions[];

  allTransactions: Transactions[];

  constructor(private dataService: DataService, private route: ActivatedRoute) {}

  ngOnInit(): void {
    this.getAccounts();
    this.getAccountById();
  }

  getAccounts() {
    this.dataService.getAllAccounts().subscribe((response) => {
      this.allAccounts = response.payload.map((el) => el.account);
    });
  }

  getAccountById() {
    this.route.params
      .pipe(
        switchMap((params: Params) => {
          return this.dataService.getAccountByID(params['id']);
        }),
      )
      .subscribe((response) => {
        this.account = response.payload;
        this.lastTransactions = this.account.transactions.length
          ? this.account.transactions.slice(-10).reverse()
          : [];
        this.allTransactions = this.account.transactions.length ? this.account.transactions : [];
      });
  }
}

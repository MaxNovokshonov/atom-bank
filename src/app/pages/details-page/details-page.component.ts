import {Component, OnInit} from '@angular/core';
import {Account, Transactions} from "../../interfaces/interfaces";
import {DataService} from "../../services/data.service";
import {ActivatedRoute, Params} from "@angular/router";
import {switchMap} from "rxjs";

@Component({
  selector: 'app-details-page',
  templateUrl: './details-page.component.html',
  styleUrls: ['./details-page.component.scss']
})
export class DetailsPageComponent implements OnInit{
  account$: Account;
  lastTransactions: Transactions[];
  allTransactions: Transactions[];

  constructor(private dataService: DataService, private route: ActivatedRoute,) {
  }

  ngOnInit(): void {
    this.getAccountById();
  }

  getAccountById() {
    this.route.params
      .pipe(
        switchMap((params: Params) => {
          return this.dataService.getAccountByID(params['id']);
        }),
      )
      .subscribe((response) => {
        this.account$ = response.payload;
        this.lastTransactions = this.account$.transactions.slice(-10).reverse();
        this.allTransactions = this.account$.transactions;
        console.log(this.allTransactions)
        console.log(this.account$)
      })
  }
}

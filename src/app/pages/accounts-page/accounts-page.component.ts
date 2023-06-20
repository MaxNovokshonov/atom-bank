import {Component, OnInit} from '@angular/core';
import {Observable} from "rxjs";
import {DataService} from "../../services/data.service";
import {Account, AccountsResponse} from "../../interfaces/interfaces";

@Component({
  selector: 'app-accounts-page',
  templateUrl: './accounts-page.component.html',
  styleUrls: ['./accounts-page.component.scss']
})
export class AccountsPageComponent implements OnInit {
  accounts$: Account[];

  constructor(private dataService: DataService) {
  }

  ngOnInit(): void {
    this.getAccounts()
  }

  getAccounts() {
    this.dataService.getAllAccounts().subscribe((response) => {
      this.accounts$ = response.payload
    })
  }

  createNewAccount() {
    this.dataService.createNewAccount('').subscribe(() => {
      this.getAccounts()
    })
  }

}

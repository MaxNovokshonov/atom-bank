import {Component, OnInit} from '@angular/core';
import {BehaviorSubject, Observable} from "rxjs";
import {DataService} from "../../services/data.service";
import {Account, AccountsResponse} from "../../interfaces/interfaces";
import {FormControl, FormGroup, Validators} from "@angular/forms";

@Component({
  selector: 'app-accounts-page',
  templateUrl: './accounts-page.component.html',
  styleUrls: ['./accounts-page.component.scss']
})
export class AccountsPageComponent implements OnInit {
  accounts$: Account[];
  sortForm = new FormGroup({
    select: new FormControl('default'),
  })

  constructor(private dataService: DataService) {
  }

  get select() {
    return this.sortForm.controls.select as FormControl;
  }
  ngOnInit(): void {
    this.getAccounts()
  }

  getAccounts() {
    this.dataService.getAllAccounts().subscribe((response) => {
      this.accounts$ = response.payload
      console.log(this.accounts$)
    })
  }

  createNewAccount() {
    this.dataService.createNewAccount('').subscribe(() => {
      this.getAccounts()
    })
  }


}

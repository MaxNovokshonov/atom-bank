import {Component, Input} from '@angular/core';
import {Account} from "../../../interfaces/interfaces";
import {Router} from "@angular/router";

@Component({
  selector: 'app-account',
  templateUrl: './account.component.html',
  styleUrls: ['./account.component.scss']
})
export class AccountComponent {

  @Input() account: Account;

  constructor(private router: Router) {
  }
}

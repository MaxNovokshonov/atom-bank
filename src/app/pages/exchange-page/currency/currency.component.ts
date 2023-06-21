import {Component, OnInit} from '@angular/core';
import {CurrencyItem} from "../../../interfaces/interfaces";
import {DataService} from "../../../services/data.service";
import {map} from "rxjs";

@Component({
  selector: 'app-currency',
  templateUrl: './currency.component.html',
  styleUrls: ['./currency.component.scss']
})
export class CurrencyComponent implements OnInit {

  currencies$: CurrencyItem[];

  constructor(private dataService: DataService) {
  }

  ngOnInit(): void {
    this.getCurrencies()
  }

  getCurrencies() {
    this.dataService.getAllCurrencies()
      .pipe(
        map(response => response.payload),
        map(response => Object.values<CurrencyItem>(response))
      )
      .subscribe((res) => {
        this.currencies$ = res
        console.log(this.currencies$)
      })
  }
}

import { Component, OnInit } from '@angular/core';
import { map } from 'rxjs';
import { CurrencyItem } from '../../interfaces/interfaces';
import { DataService } from '../../services/data.service';

@Component({
  selector: 'app-exchange-page',
  templateUrl: './exchange-page.component.html',
  styleUrls: ['./exchange-page.component.scss'],
})
export class ExchangePageComponent implements OnInit {
  currencies: CurrencyItem[];

  constructor(private dataService: DataService) {}

  ngOnInit(): void {
    this.getCurrencies();
  }

  getCurrencies() {
    this.dataService
      .getAllCurrencies()
      .pipe(
        map((response) => response.payload),
        map((response) => Object.values<CurrencyItem>(response)),
      )
      .subscribe((res) => {
        this.currencies = res;
      });
  }
}

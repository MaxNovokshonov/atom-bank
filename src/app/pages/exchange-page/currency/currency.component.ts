import { Component, Input } from '@angular/core';
import { CurrencyItem } from '../../../interfaces/interfaces';

@Component({
  selector: 'app-currency',
  templateUrl: './currency.component.html',
  styleUrls: ['./currency.component.scss'],
})
export class CurrencyComponent {
  @Input() currencies: CurrencyItem[];
}

import {Component, EventEmitter, OnInit, Output} from '@angular/core';
import {DataService} from "../../../services/data.service";
import {map} from "rxjs";
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {Transfer} from "../../../interfaces/interfaces";

@Component({
  selector: 'app-exchange-form',
  templateUrl: './exchange-form.component.html',
  styleUrls: ['./exchange-form.component.scss']
})
export class ExchangeFormComponent implements OnInit {

  @Output() exchangeDone = new EventEmitter();

  codes$: string[];
  errorMessage = '';
  successMessage = '';
  exchangeForm = new FormGroup({
    from: new FormControl(''),
    to: new FormControl(''),
    amount: new FormControl('', [Validators.required, Validators.pattern('[0-9]+')])
  })

  constructor(private dataService: DataService) {
  }

  get from() {
    return this.exchangeForm.controls.from as FormControl;
  }

  get to() {
    return this.exchangeForm.controls.to as FormControl;
  }

  get amount() {
    return this.exchangeForm.controls.amount as FormControl;
  }
  ngOnInit(): void {
    this.getCurrenciesCodes()
  }

  getCurrenciesCodes() {
    this.dataService.getCurrenciesCodes()
      .pipe(
        map((res) => res.payload)
      )
      .subscribe((response) => {
      this.codes$ = response;
      console.log(this.codes$)
    })
  }

  submit() {
    if (this.exchangeForm.invalid) {
      return;
    }

    const exchangeData: Transfer = {
      from: this.exchangeForm.value.from!,
      to: this.exchangeForm.value.to!,
      amount: this.exchangeForm.value.amount!
    }

    this.dataService.createExchange(exchangeData).subscribe((response) => {
      if (response.payload) {
        this.exchangeForm.reset();
        this.exchangeDone.emit(response.payload);
        this.successMessage = 'Обмен валюты успешно совершен';
        setTimeout(() => {
          this.successMessage = ''
        }, 2000)
      } else {
        this.exchangeForm.reset();
        switch (response?.error) {
          case 'Unknown currency code':
            this.errorMessage = 'Неверный валютный код'
            break;
          case 'Invalid amount':
            this.errorMessage = 'Не указана сумма, либо она отрицательна'
            break;
          case 'Not enough currency':
            this.errorMessage = 'На валютном счёте списания нет средств'
            break;
          case 'Overdraft prevented':
            this.errorMessage = 'Не хватает средств'
            break;
          default:
            this.errorMessage = ''
        }
        setTimeout(() => {
          this.errorMessage = ''
        }, 2000)
      }
    })
  }
}

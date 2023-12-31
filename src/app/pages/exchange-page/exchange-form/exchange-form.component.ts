import { Component, EventEmitter, OnDestroy, OnInit, Output } from '@angular/core';
import { DataService } from '../../../services/data.service';
import { map, merge, Subscription } from 'rxjs';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Transfer } from '../../../interfaces/interfaces';
import { ExchangeError } from '../../../interfaces/exchange-error';

@Component({
  selector: 'app-exchange-form',
  templateUrl: './exchange-form.component.html',
  styleUrls: ['./exchange-form.component.scss'],
})
export class ExchangeFormComponent implements OnInit, OnDestroy {
  @Output() exchangeDone = new EventEmitter();

  codes: string[];

  errorMessage = '';

  successMessage = '';

  errorSubscription = new Subscription();

  exchangeForm = new FormGroup({
    from: new FormControl(''),
    to: new FormControl(''),
    amount: new FormControl('', [Validators.required, Validators.pattern('[0-9]+')]),
  });

  constructor(private dataService: DataService) {}

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
    this.getCurrenciesCodes();
    this.errorSubscription.add(
      merge(this.from.valueChanges, this.to.valueChanges, this.amount.valueChanges).subscribe(() =>
        this.clearError(),
      ),
    );
  }

  clearError() {
    this.errorMessage = '';
  }

  getCurrenciesCodes() {
    this.dataService
      .getCurrenciesCodes()
      .pipe(map((res) => res.payload))
      .subscribe((response) => {
        this.codes = response;
      });
  }

  submit() {
    if (this.exchangeForm.invalid) {
      return;
    }

    const exchangeData: Transfer = {
      from: this.exchangeForm.value.from || '',
      to: this.exchangeForm.value.to || '',
      amount: this.exchangeForm.value.amount || '',
    };

    this.dataService.createExchange(exchangeData).subscribe((response) => {
      if (response.payload) {
        this.exchangeForm.reset();
        this.exchangeDone.emit(response.payload);
        this.successMessage = 'Обмен валюты успешно совершен';
        setTimeout(() => {
          this.successMessage = '';
        }, 2000);
      } else {
        this.exchangeForm.reset();
        this.errorMessage = this.getErrorMessage(response.error);
      }
    });
  }

  getErrorMessage(error: string): string {
    switch (error) {
      case ExchangeError.UNKNOWN_CURRENCY_CODE:
        return 'Неверный валютный код';
      case ExchangeError.INVALID_AMOUNT:
        return 'Не указана сумма, либо она отрицательна';
      case ExchangeError.NOT_ENOUGH_CURRENCY:
        return 'На валютном счёте списания нет средств';
      case ExchangeError.OVERDRAFT_PREVENTED:
        return 'Не хватает средств';
      default:
        return 'Неизвестная ошибка';
    }
  }

  ngOnDestroy(): void {
    this.errorSubscription.unsubscribe();
  }
}

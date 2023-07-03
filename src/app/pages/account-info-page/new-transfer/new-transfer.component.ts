import { Component, EventEmitter, Input, OnDestroy, OnInit, Output } from '@angular/core';
import { Transfer } from '../../../interfaces/interfaces';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { DataService } from '../../../services/data.service';
import { TransferError } from '../../../interfaces/transfer-error';
import { merge, Subscription } from 'rxjs';

@Component({
  selector: 'app-new-transfer',
  templateUrl: './new-transfer.component.html',
  styleUrls: ['./new-transfer.component.scss'],
})
export class NewTransferComponent implements OnInit, OnDestroy {
  @Input() accounts: string[];

  @Input() from: string;

  @Output() transferDone = new EventEmitter();

  transferForm = new FormGroup({
    to: new FormControl('', [Validators.required, Validators.pattern('[0-9]+')]),
    amount: new FormControl('', [Validators.required, Validators.pattern('[0-9]+')]),
  });

  errorMessage = '';

  successMessage = '';

  isDropdownOpen = false;

  errorSubscription = new Subscription();

  constructor(private dataService: DataService) {}

  ngOnInit(): void {
    this.errorSubscription.add(
      merge(this.to.valueChanges, this.amount.valueChanges).subscribe(() => this.clearError()),
    );
  }

  get to() {
    return this.transferForm.controls.to as FormControl;
  }

  get amount() {
    return this.transferForm.controls.amount as FormControl;
  }

  clearError() {
    this.errorMessage = '';
    this.isDropdownOpen = false;
  }

  dropdownOpen() {
    if (this.to.value == '') {
      this.isDropdownOpen = false;
    }
    this.isDropdownOpen = true;
  }

  submit() {
    if (this.transferForm.invalid) {
      return;
    }

    const transfer: Transfer = {
      from: this.from,
      to: this.to.value,
      amount: this.transferForm.value.amount || '',
    };

    this.dataService.createTransfer(transfer).subscribe((response) => {
      if (response.payload) {
        this.transferForm.reset();
        this.transferDone.emit(response);
        this.successMessage = 'Перевод успешно выполнен';
        setTimeout(() => {
          this.successMessage = '';
        }, 2000);
      } else {
        this.transferForm.reset();
        this.errorMessage = this.getErrorMessage(response.error);
      }
    });
  }

  getErrorMessage(error: string): string {
    switch (error) {
      case TransferError.INVALID_ACCOUNT_TO:
        return 'Номер счета не существует';
      case TransferError.INVALID_ACCOUNT_FROM:
        return 'Не указан счет списания';
      case TransferError.INVALID_AMOUNT:
        return 'Не указана сумма, либо она отрицательна';
      case TransferError.OVERDRAFT_PREVENTED:
        return 'Не хватает средств';
      default:
        return 'Неизвестная ошибка';
    }
  }

  setValue(value: string) {
    this.to.setValue(value);
    this.isDropdownOpen = false;
  }

  ngOnDestroy(): void {
    this.errorSubscription.unsubscribe();
  }
}

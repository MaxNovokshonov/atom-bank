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
      amount: this.transferForm.value.amount ? this.transferForm.value.amount : '',
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
        switch (response?.error) {
          case 'Invalid account to':
            this.errorMessage = TransferError.INVALID_ACCOUNT_TO;
            break;
          case 'Invalid account from':
            this.errorMessage = TransferError.INVALID_ACCOUNT_FROM;
            break;
          case 'Invalid amount':
            this.errorMessage = TransferError.INVALID_AMOUNT;
            break;
          case 'Overdraft prevented':
            this.errorMessage = TransferError.OVERDRAFT_PREVENTED;
            break;
          default:
            this.errorMessage = TransferError.DEFAULT;
        }
      }
    });
  }

  setValue(value: string) {
    this.to.setValue(value);
    this.isDropdownOpen = false;
  }

  ngOnDestroy(): void {
    this.errorSubscription.unsubscribe();
  }
}

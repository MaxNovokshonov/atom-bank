import {Component, EventEmitter, Input, Output} from '@angular/core';
import {Account, Transfer} from "../../../interfaces/interfaces";
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {DataService} from "../../../services/data.service";

@Component({
  selector: 'app-new-transfer',
  templateUrl: './new-transfer.component.html',
  styleUrls: ['./new-transfer.component.scss']
})
export class NewTransferComponent {
  @Input() accounts: string[];
  @Input() from: string;
  @Output() transferDone = new EventEmitter();
  transferForm = new FormGroup({
    to: new FormControl('', [Validators.required, Validators.pattern('[0-9]+')]),
    amount: new FormControl('', [Validators.required, Validators.pattern('[0-9]+')])
  })

  errorMessage = '';
  successMessage = '';
  isDropdownOpen = false;
  toValue: string;

  constructor(private dataService: DataService) {
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
    this.toValue = this.to.value;
    this.isDropdownOpen = true;
  }

  submit() {
    if (this.transferForm.invalid) {
      return;
    }

    const transfer: Transfer = {
      from: this.from,
      to: this.toValue,
      amount: this.transferForm.value.amount!
    }

    this.dataService.createTransfer(transfer).subscribe((response) => {
      if (response.payload) {
        this.transferForm.reset();
        this.transferDone.emit(response);
        this.successMessage = 'Перевод успешно выполнен';
        setTimeout(() => {
          this.successMessage = ''
        }, 2000)
      } else {
        this.transferForm.reset();
        switch (response?.error) {
          case 'Invalid account to':
            this.errorMessage = 'Номер счета не существует'
            break;
          case 'Invalid account from':
            this.errorMessage = 'Не указан счет списания'
            break;
          case 'Invalid amount':
            this.errorMessage = 'Не указана сумма, либо она отрицательна'
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

  setValue(value: string) {
    this.toValue = value;
    this.isDropdownOpen = false;
  }
}

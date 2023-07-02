export enum TransferError {
  INVALID_ACCOUNT_TO = 'Номер счета не существует',
  INVALID_ACCOUNT_FROM = 'Не указан счет списания',
  INVALID_AMOUNT = 'Не указана сумма, либо она отрицательна',
  OVERDRAFT_PREVENTED = 'Не хватает средств',
  DEFAULT = 'Неизвестная ошибка',
}

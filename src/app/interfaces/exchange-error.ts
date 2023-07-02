export enum ExchangeError {
  UNKNOWN_CURRENCY_CODE = 'Неверный валютный код',
  INVALID_AMOUNT = 'Не указана сумма, либо она отрицательна',
  NOT_ENOUGH_CURRENCY = 'На валютном счёте списания нет средств',
  OVERDRAFT_PREVENTED = 'Не хватает средств',
  DEFAULT = 'Неизвестная ошибка',
}

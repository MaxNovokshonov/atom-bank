import {Component, Input} from '@angular/core';
import {Transactions} from "../../interfaces/interfaces";

@Component({
  selector: 'app-transfer-history',
  templateUrl: './transfer-history.component.html',
  styleUrls: ['./transfer-history.component.scss']
})
export class TransferHistoryComponent {
  @Input() transactions: Transactions[]
}

import {Component, Input} from '@angular/core';
import {Account} from "../../interfaces/interfaces";

@Component({
  selector: 'app-details-header',
  templateUrl: './details-header.component.html',
  styleUrls: ['./details-header.component.scss']
})
export class DetailsHeaderComponent {
  @Input() title = '';
  @Input() account: Account;
}

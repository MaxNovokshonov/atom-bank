import {Component, OnInit} from '@angular/core';
import {Atm} from "../../interfaces/interfaces";
import {DataService} from "../../services/data.service";
import {map} from "rxjs/operators";

@Component({
  selector: 'app-atm-page',
  templateUrl: './atm-page.component.html',
  styleUrls: ['./atm-page.component.scss']
})
export class AtmPageComponent implements OnInit{

  coordinates$: Atm[];

  constructor(private dataService: DataService) {
  }

  ngOnInit(): void {
    this.getCoordinates()
  }

  getCoordinates() {
    this.dataService.getAtmCoordinates().pipe(
      map(response => response.payload),
    )
      .subscribe((response) => {
      this.coordinates$ = response;
        console.log(this.coordinates$)
    })
  }

}

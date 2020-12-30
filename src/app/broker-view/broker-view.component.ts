import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-broker-view',
  templateUrl: './broker-view.component.html',
  styleUrls: ['./broker-view.component.scss']
})
export class BrokerViewComponent implements OnInit {

  constructor() { }

  title : string;
  type : string;
  data : any ;
  columnNames : Array<String>;
  options : {};

  ngOnInit() {
    this.title = 'Broker View';
    this.type = 'ColumnChart';
    this.data = [
        ["Policies Created last 1 year", 1.5, 1.75, 0.25, 1.5, 1.75, 0.25, 2.25, 1.15],
        ["Premium Gathetred last 1 year", 2.5, 4.4, 2, 2.25, 8, 2, 5, 9],
        ["Claims Created last 1 year", 3.5, 1.8, 3, 1.75, 5, 2.45, 2, 1],
        ["Claims Setteled last 1 year", 4.5, 2.8, 5, 1.5, 4, 3, 3, 1]
    ];
    this.columnNames = ['Broker View','BrokerA', 'BrokerB','BrokerC', 'BrokerD', 'BrokerE', 'BrokerF', 'BrokerG', 'BrokerH'];
    this.options = {
    };
  }

}

import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-claim-type',
  templateUrl: './claim-type.component.html',
  styleUrls: ['./claim-type.component.scss']
})
export class ClaimTypeComponent implements OnInit {

  constructor() { }

  title : string;
  type : string;
  data : any ;
  columnNames : Array<String>;
  options : {};

  ngOnInit() {
    this.title = 'Claim Count in K';
    this.type = 'PieChart';
    this.data = [
       ['Auto Claim', 8.2],
       ['Fire Claim', 3.2],
       ['Liability Claim', 1.4],
       ['Enterprise Claim', 1.2]
    ];
    this.columnNames = ['Claim Type', 'Percentage'];
    this.options = {    
       is3D:true,
      
    };
  }

}

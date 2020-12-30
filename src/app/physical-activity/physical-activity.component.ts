import { takeUntil } from 'rxjs/operators';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subject } from 'rxjs';
import { SharedService } from '../models/shared.service';
import { Utility } from '../utility/utility';

@Component({
  selector: 'app-physical-activity',
  templateUrl: './physical-activity.component.html',
  styleUrls: ['./physical-activity.component.scss']
})
export class physicalActivityComponent implements OnInit, OnDestroy {

  constructor(
    private readonly shared: SharedService
  ) { }

  titleStep : string;
  titleSleep : string;
  type : string;
  stepsData : any ;
  sleepData : any ;
  stepsColumnNames : Array<String>;
  sleepColumnNames : Array<String>;
  percentageStep: number;
  percentageSleep: number;
  options : {};
  risk: string;
  subscriptions = new Subject();

  ngOnInit() {
    this.titleStep = 'Walking Activity in Steps';
    this.titleSleep = 'Sleep Activity in Hours'
    this.type = 'ColumnChart';
    this.loadData();
    // this.stepsData = [
    //   ['Dec\'1', 1487],
    //   ['Dec\'2', 5668],
    //   ['Dec\'3', 3981],
    //   ['Dec\'4', 6457],
    //   ['Dec\'5', 7947],
    //   ['Dec\'6', 4715],
    //   ['Dec\'7', 1872],
    // ];
    // this.percentageStep = Utility.changeinLastTwoDays(+this.stepsData[5][1], +this.stepsData[6][1]);
    // this.sleepData = [
    //   ['Dec\'1', 6.8],
    //   ['Dec\'2', 7.1],
    //   ['Dec\'3', 5.9],
    //   ['Dec\'4', 7.8],
    //   ['Dec\'5', 7.4],
    //   ['Dec\'6', 6.4],
    //   ['Dec\'7', 7.1],
    // ];
    // this.percentageSleep = Utility.changeinLastTwoDays(+this.sleepData[5][1], +this.sleepData[6][1])
    this.stepsColumnNames = ['Day', 'Steps'];
    this.sleepColumnNames = ['Day', 'Sleep Duration'];
    this.options = {
    };
  }
  getAbsolute(num: number) {
    return Math.abs(num)
  }
  loadData() {
    this.shared.getPhysicalActivityData().pipe(takeUntil(this.subscriptions)).subscribe(resp => {
      if (resp) {
        this.stepsData = resp.stepData;
        this.sleepData = resp.sleepData;
        this.percentageStep = Utility.changeinLastTwoDays(+this.stepsData[5][1], +this.stepsData[6][1]);
        this.percentageSleep = Utility.changeinLastTwoDays(+this.sleepData[5][1], +this.sleepData[6][1]);
        this.risk = resp.risk;
      }
    })
  }
  ngOnDestroy() {
    this.subscriptions.next();
    this.subscriptions.complete();
  }

}

import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { SharedService } from '../models/shared.service';
import { Utility } from '../utility/utility';

@Component({
  selector: 'app-medical-activity',
  templateUrl: './medical-activity.component.html',
  styleUrls: ['./medical-activity.component.scss']
})
export class MedicalActivityComponent implements OnInit, OnDestroy {
  percentageHeartRate: number;
  percentageBloodPressureLow: number;
  percentageBloodPressureHigh: number;
  percentageOxySaturation: number;

  constructor(
    private readonly shared: SharedService
  ) { }

  titleHeartRate : string;
  titleBloodPressure : string;
  titleOxySaturation : string;
  typeHeartRate : string;
  typeBloodPressure : string;
  typeOxySaturation : string;
  dataHeartRate : any ;
  dataBloodPressure : any ;
  dataOxySaturation : any ;
  columnNamesHeartRate  : Array<String>;
  columnNamesBloodPressure  : Array<String>;
  columnNamesOxySaturation  : Array<String>;
  options : {};
  risk: string;
  subscriptions = new Subject();

  ngOnInit() {
    this.processHeartRate();
    this.processBloodPressure();
    this.processOxySaturation();
    this.loadData();
    this.options = {
    };
  }
  processHeartRate() {
    this.titleHeartRate = 'Heart Rate';
    this.typeHeartRate = 'LineChart';
    // this.dataHeartRate = [
    //   ['Dec\'1', 67],
    //   ['Dec\'2', 79],
    //   ['Dec\'3', 81],
    //   ['Dec\'4', 64],
    //   ['Dec\'5', 72],
    //   ['Dec\'6', 69],
    //   ['Dec\'7', 70],
    // ];
    // this.percentageHeartRate= Utility.changeinLastTwoDays(+this.dataHeartRate[5][1], +this.dataHeartRate[6][1]);
    this.columnNamesHeartRate  = ['Day','Avg. Heart Rate / Day'];
  }
  processBloodPressure() {
    this.titleBloodPressure = 'Blood Pressure';
    this.typeBloodPressure = 'ColumnChart'; 
    // this.dataBloodPressure = [
    //   ['Dec\'1', 75, 110],
    //   ['Dec\'2', 77, 111],
    //   ['Dec\'3', 80, 120],
    //   ['Dec\'4', 76, 115],
    //   ['Dec\'5', 79, 118],
    //   ['Dec\'6', 76, 119],
    //   ['Dec\'7', 81, 122],
    // ];
    // this.percentageBloodPressureLow= Utility.changeinLastTwoDays(+this.dataBloodPressure[5][1], +this.dataBloodPressure[6][1]);
    // this.percentageBloodPressureHigh= Utility.changeinLastTwoDays(+this.dataBloodPressure[5][2], +this.dataBloodPressure[6][2]);
    this.columnNamesBloodPressure = ['Day','Avg. Blood Pressure(Low) / Day', 'Avg. Blood Pressure(High) / Day'];
  }
  processOxySaturation() {
    this.titleOxySaturation = 'Oxygen Saturation';
    this.typeOxySaturation = 'LineChart'; 
    // this.dataOxySaturation = [
    //   ['Dec\'1', 80],
    //   ['Dec\'2', 77],
    //   ['Dec\'3', 82],
    //   ['Dec\'4', 76],
    //   ['Dec\'5', 81],
    //   ['Dec\'6', 79],
    //   ['Dec\'7', 78],
    // ];
    // this.percentageOxySaturation= Utility.changeinLastTwoDays(+this.dataOxySaturation[5][1], +this.dataOxySaturation[6][1]);
    this.columnNamesOxySaturation = ['Day','Avg. Oxygen Saturation / Day'];
  }
  getAbsolute(num: number) {
    return Math.abs(num)
  }
  loadData() {
    this.shared.getMedicalActivityData().pipe(takeUntil(this.subscriptions)).subscribe(resp => {
      if (resp) {
        this.dataHeartRate = resp.heratRateData;
        this.dataBloodPressure = resp.bloodPressureData;
        this.dataOxySaturation = resp.oxySaturationData
        this.percentageHeartRate= Utility.changeinLastTwoDays(+this.dataHeartRate[5][1], +this.dataHeartRate[6][1]);
        this.percentageBloodPressureLow= Utility.changeinLastTwoDays(+this.dataBloodPressure[5][1], +this.dataBloodPressure[6][1]);
        this.percentageBloodPressureHigh= Utility.changeinLastTwoDays(+this.dataBloodPressure[5][2], +this.dataBloodPressure[6][2]);
        this.percentageOxySaturation= Utility.changeinLastTwoDays(+this.dataOxySaturation[5][1], +this.dataOxySaturation[6][1]);
        this.risk = resp.risk;
      }
    })
  }
  ngOnDestroy() {
    this.subscriptions.next();
    this.subscriptions.complete();
  }
}

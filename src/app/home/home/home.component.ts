import { HttpClient } from '@angular/common/http';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { SharedService } from 'src/app/models/shared.service';
import { UserInfo } from 'src/app/models/userInfo';
import { UserMedicalInfo } from 'src/app/models/userMedicalInfo';
import { Utility } from 'src/app/utility/utility';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit, OnDestroy {
  userData: Array<UserInfo>;
  subscriptions = new Subject();
  constructor(
    private readonly shared: SharedService,
    private readonly router: Router,
    private readonly http: HttpClient
  ) { }

  ngOnInit() {
    this.shared.getUserData().pipe(takeUntil(this.subscriptions)).subscribe(resp => {
      if(resp) {
        this.userData = resp;
      }
    });
    
  }
  selectUser(user: any) {
    console.log(user);
    this.shared.setSelelectedUser(user);
    this.getActivityDetails(user);
    this.router.navigate(['/PhysicalActivity']);
  }
  getActivityDetails(user: UserInfo) {
    this.http.get('https://vl8o2dlbvg.execute-api.us-east-2.amazonaws.com/dev/userhealthinfo?userid=' + user.userid).subscribe((resp: any) => {
      if (resp) {
        console.log(resp);
        this.processActivityDetails(resp.body.Items, user);
      }
    })
  }
  processActivityDetails(userMedicalInfo: Array<UserMedicalInfo>, user: UserInfo) {
    const last7days = Utility.getLast7Days();
    const stepData = [];
    const sleepData = [];
    const heratRateData = [];
    const bloodPressureData = [];
    const oxySaturationData = [];
    let index = 0;
    userMedicalInfo.sort((x, y) => (+x.id - +y.id)).forEach(x => {
      stepData.push([last7days[index], +x.step]);
      sleepData.push([last7days[index], +x.sleep]);
      heratRateData.push([last7days[index], +x.heartrate]);
      bloodPressureData.push([last7days[index], +x.bloodpressurelow, +x.bloodpressurehigh]);
      oxySaturationData.push([last7days[index], +x.oxysaturation]);
      index += 1;
    });
    console.log(userMedicalInfo);
    console.log(stepData);
    console.log(sleepData);
    console.log(heratRateData);
    console.log(bloodPressureData);
    console.log(oxySaturationData);
    this.shared.setPhysicalActivityData({
      stepData: stepData,
      sleepData: sleepData,
      risk: user.physicaltrack.toLowerCase()
    });
    this.shared.setMedicalActivityData({
      heratRateData: heratRateData,
      bloodPressureData: bloodPressureData,
      oxySaturationData: oxySaturationData,
      risk: user.medicalrisk.toLowerCase()
    })
  }
  ngOnDestroy() {
    this.subscriptions.next();
    this.subscriptions.complete();
  }

}
